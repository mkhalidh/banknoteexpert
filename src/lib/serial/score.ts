/**
 * Deterministic, explainable scoring of a serial number.
 *
 * SHOWN TAGS / SUPERSESSION
 * -------------------------
 * Every strictly-true pattern is a shown tag. Only a SAME-AXIS weaker form is
 * hidden when its stronger form is also present (super-radar hides radar;
 * low-serial-10 hides the looser low tiers). Cross-axis facts are independent
 * and always shown: a Seven of a Kind that is also a Binary shows both, because
 * "exactly two distinct digits" is true regardless of the repetition. Same-axis
 * supersession is DATA in `SUPERSEDED_BY`; claim-equivalence (a "radar" claim is
 * satisfied by Super Radar) is DATA in `IMPLIES`.
 *
 *   solid | super-radar  > radar
 *   solid | super-repeater > repeater
 *   ladder > broken-ladder
 *   low-serial-10 > low-serial-100 > low-serial-1000
 *
 * The highest-baseScore shown tag is primary and scores its baseScore; each
 * secondary tag on a DIFFERENT axis adds a flat combination bonus, capped at
 * COMBO_CAP. Star notes add a documented flat bonus.
 */

import { patterns } from "@/lib/serial/patterns";
import type { ParsedSerial } from "@/lib/serial/parse";
import { parseSerial } from "@/lib/serial/parse";

export type Tier =
  | "Common"
  | "Notable"
  | "Rare"
  | "Very Rare"
  | "Exceptional";

export interface PatternMatch {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  rarityOdds: string;
  /** Points this match contributed to the final score. */
  points: number;
}

export interface ScoreLine {
  label: string;
  points: number;
  detail?: string;
}

export interface SerialScore {
  score: number;
  tier: Tier;
  matches: PatternMatch[];
  breakdown: ScoreLine[];
  isStar: boolean;
  digits: string;
}

/**
 * Same-axis supersession ONLY: a weak id is hidden from the shown tags when a
 * stronger form of the SAME idea is also present (super-radar is a stronger
 * radar; low-serial-10 is a tighter low serial). Cross-axis patterns are NOT
 * suppressed here: a serial that is both a Seven of a Kind and a Binary shows
 * both, because "two distinct digits" is an independent, strictly-true fact.
 * Forward references (true-binary, radar-repeater, bookends) are intentional so
 * the rules already work once those patterns ship.
 */
const SUPERSEDED_BY: Record<string, string[]> = {
  radar: ["solid", "super-radar", "radar-repeater"],
  "super-radar": ["solid"],
  repeater: ["solid", "super-repeater", "radar-repeater"],
  "super-repeater": ["solid"],
  flipper: ["solid"],
  "broken-ladder": ["ladder"],
  "low-serial-100": ["low-serial-10"],
  "low-serial-1000": ["low-serial-10", "low-serial-100"],
  binary: ["true-binary"],
  bookends: ["solid", "super-repeater"],
};

/**
 * A seller's claim counts as satisfied if the claimed pattern is shown OR is
 * implied by a stronger shown pattern (Super Radar satisfies a "radar" claim).
 * Used by patternSatisfied() and the re-test harness.
 */
const IMPLIES: Record<string, string[]> = {
  "super-radar": ["radar"],
  "super-repeater": ["repeater"],
  "radar-repeater": ["radar", "repeater"],
  ladder: ["broken-ladder"],
  "true-binary": ["binary"],
  solid: ["radar", "super-radar", "repeater", "super-repeater", "flipper"],
  "low-serial-10": ["low-serial-100", "low-serial-1000"],
  "low-serial-100": ["low-serial-1000"],
};

/**
 * Each pattern's structural axis. The combination bonus only rewards secondary
 * tags that sit on a DIFFERENT axis from the primary, so stacking two forms of
 * the same idea does not inflate the score. Forward ids are included so new
 * patterns classify correctly on arrival.
 */
const AXIS_OF: Record<string, string> = {
  solid: "repetition",
  "seven-of-a-kind": "repetition",
  "six-of-a-kind": "repetition",
  "five-of-a-kind": "repetition",
  "double-quad": "repetition",
  repeater: "repetition",
  "super-repeater": "repetition",
  "radar-repeater": "repetition",
  radar: "symmetry",
  "super-radar": "symmetry",
  ladder: "sequence",
  "broken-ladder": "sequence",
  binary: "digit-count",
  "true-binary": "digit-count",
  trinary: "digit-count",
  flipper: "rotation",
  bookends: "positional",
  "low-serial-10": "value",
  "low-serial-100": "value",
  "low-serial-1000": "value",
  "high-serial": "value",
  "birthday-note": "date",
};

/** Flat combination bonus per additional different-axis tag; total capped below. */
export const COMBO_BONUS = 5;
/** Maximum total combination bonus, regardless of how many axes stack. */
export const COMBO_CAP = 15;
/** Documented flat bonus applied to star notes. */
export const STAR_BONUS = 10;

/**
 * True when a claimed pattern id is satisfied by a scored serial: it is either
 * in the shown tags, or implied by a stronger shown tag (via IMPLIES).
 */
export function patternSatisfied(result: SerialScore, claimedId: string): boolean {
  const shown = new Set(result.matches.map((m) => m.id));
  if (shown.has(claimedId)) return true;
  for (const id of shown) {
    if ((IMPLIES[id] ?? []).includes(claimedId)) return true;
  }
  return false;
}

function tierFor(score: number): Tier {
  if (score >= 80) return "Exceptional";
  if (score >= 60) return "Very Rare";
  if (score >= 40) return "Rare";
  if (score >= 20) return "Notable";
  return "Common";
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Score a serial number. Accepts either a raw string (parsed internally) or an
 * already-parsed ParsedSerial. Invalid input yields a zero score with an
 * explanatory breakdown so callers never crash.
 */
export function scoreSerial(input: string | ParsedSerial): SerialScore {
  const parsed = typeof input === "string" ? parseSerial(input) : input;

  if (typeof input === "string" && !("ok" in parsed && parsed.ok)) {
    const error = "ok" in parsed && !parsed.ok ? parsed.error : "Invalid serial.";
    return {
      score: 0,
      tier: "Common",
      matches: [],
      breakdown: [{ label: "Invalid serial number", points: 0, detail: error }],
      isStar: false,
      digits: "",
    };
  }

  const serial = parsed as ParsedSerial;
  const { digits, isStar } = serial;

  const detected = patterns.filter((p) => p.detect(digits));
  const detectedIds = new Set(detected.map((p) => p.id));

  // Shown tags: every strictly-true pattern, hiding only a same-axis WEAKER
  // form when its stronger form is also present. Cross-axis facts (e.g. Binary)
  // are kept, so a Seven of a Kind that is also a Binary shows both.
  const shown = detected.filter((p) => {
    const stronger = SUPERSEDED_BY[p.id] ?? [];
    return !stronger.some((k) => detectedIds.has(k));
  });

  // Highest baseScore is primary; deterministic tie-break by id.
  shown.sort((a, b) => {
    if (b.baseScore !== a.baseScore) return b.baseScore - a.baseScore;
    return a.id.localeCompare(b.id);
  });

  const matches: PatternMatch[] = shown.map((p, index) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    href: p.href,
    description: p.description,
    rarityOdds: p.rarityOdds,
    points: index === 0 ? p.baseScore : 0,
  }));

  const breakdown: ScoreLine[] = [];
  let raw = 0;

  if (shown.length > 0) {
    const primary = shown[0];
    raw += primary.baseScore;
    breakdown.push({
      label: primary.name,
      points: primary.baseScore,
      detail: primary.rarityOdds,
    });

    // Combination bonus: only secondary tags on a DIFFERENT axis count, and the
    // total is capped, so stacking same-idea forms cannot inflate the score.
    const primaryAxis = AXIS_OF[primary.id];
    const crossAxis = shown
      .slice(1)
      .filter((p) => AXIS_OF[p.id] !== primaryAxis);
    const comboBonus = Math.min(COMBO_CAP, COMBO_BONUS * crossAxis.length);
    if (comboBonus > 0) {
      raw += comboBonus;
      breakdown.push({
        label: "Combination bonus",
        points: comboBonus,
        detail: `Also ${crossAxis.map((p) => p.name).join(", ")}`,
      });
    }
  } else {
    breakdown.push({ label: "No fancy pattern detected", points: 0 });
  }

  if (isStar) {
    raw += STAR_BONUS;
    breakdown.push({
      label: "Star note",
      points: STAR_BONUS,
      detail: "Replacement note bonus",
    });
  }

  const score = clamp(raw);

  return {
    score,
    tier: tierFor(score),
    matches,
    breakdown,
    isStar,
    digits,
  };
}
