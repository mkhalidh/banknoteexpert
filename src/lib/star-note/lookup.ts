/**
 * Star note lookup: match a star serial against real BEP print runs and
 * classify rarity by run size. Pure module — no React, no side effects. The
 * serial is parsed with the shared engine (src/lib/serial/parse.ts); no second
 * parser. All run data comes from src/data/star-notes/runs.ts.
 */

import { parseSerial } from "@/lib/serial/parse";
import {
  STAR_NOTE_RUNS,
  STAR_NOTE_COVERAGE,
  type StarNoteRun,
} from "@/data/star-notes/runs";

export type RarityTier = "Very Rare" | "Rare" | "Uncommon" | "Common";

export type StarNoteStatus =
  | "found"
  | "no-match"
  | "not-star"
  | "series-unsupported"
  | "invalid-serial";

export interface StarNoteResult {
  found: boolean;
  status: StarNoteStatus;
  runs: StarNoteRun[];
  /** Rarity of the smallest matching run (rarity is driven by run size). */
  rarityTier?: RarityTier;
  message: string;
}

/** Classify a run size into a rarity tier. Smaller runs are rarer. */
export function rarityForRunSize(runSize: number): RarityTier {
  if (runSize <= 320_000) return "Very Rare";
  if (runSize <= 640_000) return "Rare";
  if (runSize <= 1_600_000) return "Uncommon";
  return "Common";
}

/** Denominations that have any data, ascending. */
export function coveredDenominations(): number[] {
  return Object.keys(STAR_NOTE_COVERAGE)
    .map(Number)
    .sort((a, b) => a - b);
}

/** Series covered for a denomination, in dataset order. Empty if none. */
export function seriesForDenomination(denomination: number): string[] {
  return STAR_NOTE_COVERAGE[String(denomination)] ?? [];
}

function coverageMessage(denomination: number): string {
  const forDenom = seriesForDenomination(denomination);
  if (forDenom.length > 0) {
    return `We don't have that series yet. For $${denomination} the dataset covers series ${forDenom.join(", ")}.`;
  }
  const denoms = coveredDenominations()
    .map((d) => `$${d}`)
    .join(", ");
  return `We don't have data for the $${denomination} denomination. The dataset covers these denominations: ${denoms}.`;
}

/**
 * Look up a star note. Explicit branches: invalid serial, a non-star serial,
 * a denomination+series not in the dataset, no matching run, and matches.
 */
export function lookupStarNote(
  denomination: number,
  series: string,
  rawSerial: string,
): StarNoteResult {
  const parsed = parseSerial(rawSerial);
  if (!parsed.ok) {
    return { found: false, status: "invalid-serial", runs: [], message: parsed.error };
  }

  if (!parsed.isStar) {
    return {
      found: false,
      status: "not-star",
      runs: [],
      message:
        "That serial has no star. Star notes end in a star (*) in place of the suffix letter — this lookup is for star notes only.",
    };
  }

  if (!seriesForDenomination(denomination).includes(series)) {
    return {
      found: false,
      status: "series-unsupported",
      runs: [],
      message: coverageMessage(denomination),
    };
  }

  const serialValue = Number(parsed.digits);
  const matches = STAR_NOTE_RUNS.filter(
    (run) =>
      run.denomination === denomination &&
      run.series === series &&
      serialValue >= run.rangeStart &&
      serialValue <= run.rangeEnd,
  );

  if (matches.length === 0) {
    return {
      found: false,
      status: "no-match",
      runs: [],
      message:
        "This star serial falls outside every printed star run recorded for that series. It may be from a run not in the BEP reports we have, or the serial may be mistyped.",
    };
  }

  const rarest = matches.reduce((min, run) => (run.runSize < min.runSize ? run : min));

  return {
    found: true,
    status: "found",
    runs: matches,
    rarityTier: rarityForRunSize(rarest.runSize),
    message: `Matched ${matches.length} print run${matches.length > 1 ? "s" : ""} for $${denomination} series ${series}.`,
  };
}
