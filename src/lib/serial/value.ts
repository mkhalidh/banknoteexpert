/**
 * Value estimation. Reads real, sampled bands from src/data/value-ranges.ts.
 * Pure module, no React, no side effects.
 *
 * Honesty rules enforced here:
 * - Never returns a single number; always a low–high band with its sample size.
 * - Never substitutes a neighbouring condition's band for a missing one.
 * - Never returns 0. A missing combination is an explicit "insufficient-data".
 * - Engine detector ids that have no genuine value-data equivalent map to null.
 */

import type { PatternMatch } from "@/lib/serial/score";
import {
  PATTERN_VALUE_BANDS,
  PATTERN_VALUE_GAPS,
  PATTERN_VALUES_UPDATED,
  type PatternValueBand,
  type NoteCondition,
  type ValueConfidence,
} from "@/data/value-ranges";

export const VALUE_UPDATED = PATTERN_VALUES_UPDATED;

export const ALL_CONDITIONS: NoteCondition[] = ["circulated", "vf", "unc"];

export const CONDITION_LABELS: Record<NoteCondition, string> = {
  circulated: "Circulated",
  vf: "Very Fine",
  unc: "Uncirculated",
};

/**
 * Task A, explicit mapping from every engine detector id to a value-data
 * pattern name, or null where no genuine market equivalent exists.
 *
 * Deliberately NOT mapped (different notes, different markets):
 *   super-repeater, trinary, seven-of-a-kind, double-quad, flipper, high-serial.
 *
 * The <10 and <100 low-serial tiers both resolve to the "low-serial-under-100"
 * value data (a serial below 10 is also below 100). This fixes the earlier
 * defect where those two tiers mapped to null and returned nothing.
 */
export const ENGINE_TO_VALUE_PATTERN: Record<string, string | null> = {
  solid: "solid",
  "seven-of-a-kind": null,
  "super-radar": "super-radar",
  radar: "radar",
  // Palindrome Radar is the canonical new name for a plain radar; it maps to the
  // same recorded value data so the headline rename does not drop value lookups.
  "palindrome-radar": "radar",
  "super-repeater": null,
  repeater: "repeater",
  "double-quad": null,
  ladder: "ladder",
  "broken-ladder": "ladder-partial",
  binary: "binary",
  trinary: null,
  "low-serial-10": "low-serial-under-100",
  "low-serial-100": "low-serial-under-100",
  "low-serial-1000": "low-serial-under-1000",
  "high-serial": null,
  "birthday-note": "birthday-note",
  flipper: null,
};

/**
 * Map a grade number or a grade/condition term onto one of the three value
 * buckets, exactly the way the evidence sheet bucketed its records:
 *   grade 60-70, or Uncirculated / Gem / Crisp / New  -> "unc"
 *   grade 20-58, or VF / XF / Extremely Fine / AU / About Uncirculated -> "vf"
 *   below grade 20, or Fine / Very Good / Good / Circulated -> "circulated"
 * A numeric grade in the string takes precedence over the words, so
 * "About Uncirculated 55" resolves to "vf" (55) rather than "unc".
 */
export function conditionForGrade(gradeOrTerm: string | number): NoteCondition {
  const byNumber = (g: number): NoteCondition =>
    g >= 60 ? "unc" : g >= 20 ? "vf" : "circulated";
  if (typeof gradeOrTerm === "number") return byNumber(gradeOrTerm);
  const t = gradeOrTerm.toLowerCase();
  const num = t.match(/\b(\d{1,2})\b/);
  if (num) return byNumber(Number(num[1]));
  // "About Uncirculated" / "AU" must resolve to vf, so the vf terms are tested
  // before the unc terms (otherwise "uncirculated" inside "about uncirculated"
  // would win).
  if (/very fine|\bvf\b|extremely fine|\bxf\b|\bef\b|about uncirculated|\bau\b/.test(t)) return "vf";
  if (/uncirculated|\bgem\b|crisp|\bunc\b|\bcu\b|\bnew\b/.test(t)) return "unc";
  return "circulated";
}

/** Human labels for value-data pattern names. */
export const VALUE_PATTERN_LABELS: Record<string, string> = {
  radar: "Radar",
  "super-radar": "Super radar",
  binary: "Binary",
  "birthday-note": "Birthday note",
  ladder: "Ladder",
  "ladder-partial": "Broken ladder",
  "low-serial-under-1000": "Low serial (under 1000)",
  "low-serial-under-100": "Low serial (under 100)",
  repeater: "Repeater",
  solid: "Solid",
  // New patterns shown in the chart (no recorded sales yet).
  "six-of-a-kind": "Six of a kind",
  "five-of-a-kind": "Five of a kind",
  "true-binary-radar": "True binary radar",
  "true-binary-repeater": "True binary repeater",
  "near-true-binary": "Near true binary",
  "true-binary": "True binary",
  "radar-repeater": "Radar repeater",
  "double-binary-repeater": "Double binary repeater",
  "ladder-repeater": "Ladder repeater",
  "trinary-repeater": "Trinary repeater",
  "bookends-repeater": "Bookends repeater",
  "binary-repeater": "Binary repeater",
  "binary-radar": "Binary radar",
  "bookends-radar": "Bookends radar",
  "binary-four-pairs": "Binary four pairs",
  "ladder-four-pairs": "Ladder four pairs",
  "four-pairs": "Four Pairs (Quad Doubles)",
  "bookends-binary": "Bookends binary",
  bookends: "Bookends",
  "near-radar-repeater": "Near radar repeater",
  "near-binary-radar": "Near binary radar",
  "super-high-serial": "Super high serial",
};

export interface ValueBand {
  condition: NoteCondition;
  low: number;
  high: number;
  sampleSize: number;
  confidence: ValueConfidence;
}

export type ValueResult =
  | {
      status: "ok";
      /** value-data pattern name used. */
      pattern: string;
      /** engine detector id that mapped to it. */
      enginePattern: string;
      bands: ValueBand[];
      source: string;
      updated: string;
    }
  | {
      status: "insufficient-data";
      pattern: string;
      reason: "no-band" | "gap" | "unmapped";
    };

/** Per-cell resolution for value tables (a pattern × condition combination). */
export type ValueCell =
  | { status: "ok"; band: PatternValueBand }
  | { status: "insufficient-data"; reason: "gap" | "no-band" };

function bandsForPattern(valuePattern: string): PatternValueBand[] {
  return PATTERN_VALUE_BANDS.filter((b) => b.pattern === valuePattern);
}

function isGap(valuePattern: string, condition: NoteCondition): boolean {
  return PATTERN_VALUE_GAPS.some(
    (g) => g.pattern === valuePattern && g.condition === condition,
  );
}

/**
 * Resolve one pattern × condition cell. A recorded band, an explicit gap, or a
 * plain absence (no-band), never a fabricated or substituted value.
 */
export function valueCell(
  valuePattern: string,
  condition: NoteCondition,
): ValueCell {
  const band = PATTERN_VALUE_BANDS.find(
    (b) => b.pattern === valuePattern && b.condition === condition,
  );
  if (band) return { status: "ok", band };
  return {
    status: "insufficient-data",
    reason: isGap(valuePattern, condition) ? "gap" : "no-band",
  };
}

/** All value-data pattern names that appear in the dataset (bands or gaps). */
export function valuePatternUniverse(): string[] {
  const set = new Set<string>();
  for (const b of PATTERN_VALUE_BANDS) set.add(b.pattern);
  for (const g of PATTERN_VALUE_GAPS) set.add(g.pattern);
  return [...set];
}

/**
 * Estimate a serial's collectible value from its matched patterns.
 *
 * When several patterns match, the highest-value mapped pattern wins and is
 * named in the result. Returns an explicit "insufficient-data" state (never a
 * fallback or a zero) when the winning pattern has no usable band.
 *
 * `denomination` is accepted for call-site compatibility but intentionally NOT
 * used to scale: the value bands are per-pattern, sampled across denominations,
 * so scaling by face value would be an invented figure.
 */
export function estimateValue(
  matches: PatternMatch[],
  denomination?: number,
): ValueResult {
  void denomination;

  const mapped = matches
    .map((m) => ({
      enginePattern: m.id,
      valuePattern: ENGINE_TO_VALUE_PATTERN[m.id] ?? null,
    }))
    .filter(
      (x): x is { enginePattern: string; valuePattern: string } =>
        x.valuePattern !== null,
    );

  if (mapped.length === 0) {
    return {
      status: "insufficient-data",
      pattern: matches[0]?.id ?? "none",
      reason: "unmapped",
    };
  }

  // Rank by highest recorded high; patterns with no bands sink to the bottom.
  const ranked = mapped
    .map((m) => {
      const bands = bandsForPattern(m.valuePattern);
      const maxHigh = bands.length ? Math.max(...bands.map((b) => b.high)) : -1;
      return { ...m, bands, maxHigh };
    })
    .sort((a, b) => b.maxHigh - a.maxHigh);

  const best = ranked[0];

  if (best.bands.length > 0) {
    return {
      status: "ok",
      pattern: best.valuePattern,
      enginePattern: best.enginePattern,
      bands: best.bands.map((b) => ({
        condition: b.condition,
        low: b.low,
        high: b.high,
        sampleSize: b.sampleSize,
        confidence: b.confidence,
      })),
      source: best.bands[0].source,
      updated: PATTERN_VALUES_UPDATED,
    };
  }

  const allGap = ALL_CONDITIONS.every((c) => isGap(best.valuePattern, c));
  return {
    status: "insufficient-data",
    pattern: best.valuePattern,
    reason: allGap ? "gap" : "no-band",
  };
}
