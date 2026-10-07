/**
 * Deterministic, explainable scoring of a serial number.
 *
 * PRIMARY CLASSIFICATION — DETECTION ORDER WINS
 * ---------------------------------------------
 * The `patterns` registry is ordered rarest/most-specific first. The PRIMARY tag
 * (matches[0]) is the FIRST pattern in that order whose detector fires. This is
 * the "first match wins, then stop" rule: a serial is never reported as a generic
 * pattern when a rarer one also matches (e.g. 12211221 is a Radar Repeater, not a
 * Binary Radar; 00000011 is True Binary, not a Low Serial).
 *
 * SHOWN TAGS / SUPERSESSION
 * -------------------------
 * The primary is always shown. In addition, a cross-axis fact (a pattern on a
 * DIFFERENT structural axis from the primary) is shown too, so a Super Radar that
 * is also a Binary and a Flipper reports all three. A secondary tag is hidden when
 * (a) it sits on the SAME axis as the primary — stacking two forms of one idea
 * adds nothing — or (b) a stronger, more specific form of the same concept is also
 * present (SUPERSEDED_BY). Claim-equivalence (a "radar" claim is satisfied by a
 * Super Radar) is DATA in IMPLIES.
 *
 * The primary scores its baseScore; each shown secondary on a DIFFERENT axis adds
 * a flat combination bonus, capped at COMBO_CAP. Star notes add a documented flat
 * bonus.
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
 * A secondary tag is hidden when any id in its list is also present. These are
 * cross-concept redundancies: a Palindrome Radar is just a plain Radar by a more
 * specific name, so Radar is hidden under it; a Double Quad already explains an
 * AAAABBBB serial, so the Four Pairs family is hidden under it; the generic
 * Bookends fact is hidden whenever a structured pattern that implies it is
 * present. Same-AXIS redundancy is handled separately (by the axis check in
 * scoreSerial), so these lists only need the CROSS-axis cases.
 */
const SUPERSEDED_BY: Record<string, string[]> = {
  // radar / symmetry family
  "super-radar": ["solid", "true-binary-radar"],
  "binary-radar": ["solid", "super-radar", "true-binary-radar"],
  "bookends-radar": ["solid", "super-radar", "true-binary-radar"],
  "palindrome-radar": [
    "solid",
    "super-radar",
    "true-binary-radar",
    "binary-radar",
    "bookends-radar",
    "radar-repeater",
  ],
  radar: [
    "solid",
    "super-radar",
    "true-binary-radar",
    "binary-radar",
    "bookends-radar",
    "palindrome-radar",
    "radar-repeater",
  ],
  // repeater family
  "super-repeater": ["solid", "bookends-repeater"],
  "binary-repeater": [
    "solid",
    "true-binary-repeater",
    "radar-repeater",
    "double-binary-repeater",
    "bookends-repeater",
  ],
  repeater: [
    "solid",
    "super-repeater",
    "bookends-repeater",
    "binary-repeater",
    "radar-repeater",
    "double-binary-repeater",
    "ladder-repeater",
    "trinary-repeater",
    "true-binary-repeater",
  ],
  // repeated-pair family
  "binary-four-pairs": ["solid", "double-quad"],
  "bookends-four-pairs": ["solid", "double-quad"],
  "ladder-four-pairs": ["solid", "double-quad"],
  "four-pairs": [
    "solid",
    "double-quad",
    "binary-four-pairs",
    "ladder-four-pairs",
    "bookends-four-pairs",
  ],
  // generic positional fact — hidden whenever a structured pattern explains it
  "bookends-binary": [
    "solid",
    "super-repeater",
    "bookends-repeater",
    "bookends-four-pairs",
  ],
  bookends: [
    "solid",
    "super-repeater",
    "bookends-repeater",
    "trinary-repeater",
    "bookends-four-pairs",
    "bookends-binary",
    "double-binary-repeater",
  ],
  // digit-count family
  binary: ["true-binary"],
  // A solid serial is all one digit; "also True Binary" is noise on 00000000 /
  // 11111111, and the taxonomy says 11111111 is Solid, never True Binary.
  "true-binary": ["solid"],
  // value tiers
  flipper: ["solid"],
  "broken-ladder": ["ladder"],
  "low-serial-100": ["low-serial-10"],
  "low-serial-1000": ["low-serial-10", "low-serial-100"],
  "high-serial": ["super-high-serial"],
};

/**
 * A seller's claim counts as satisfied if the claimed pattern is shown OR is
 * implied by a stronger shown pattern (Super Radar satisfies a "radar" claim).
 * Used by patternSatisfied() and the re-test harness.
 */
const IMPLIES: Record<string, string[]> = {
  "super-radar": ["radar", "palindrome-radar"],
  "super-repeater": ["repeater", "bookends-repeater"],
  "bookends-repeater": ["repeater", "super-repeater"],
  "radar-repeater": ["radar", "palindrome-radar", "repeater", "near-radar-repeater"],
  "double-binary-repeater": ["repeater"],
  "ladder-repeater": ["repeater"],
  "trinary-repeater": ["repeater"],
  "binary-repeater": ["repeater"],
  "true-binary-repeater": ["repeater", "true-binary", "binary"],
  "true-binary-radar": ["radar", "palindrome-radar", "true-binary", "binary"],
  "binary-radar": ["radar", "palindrome-radar", "binary"],
  "bookends-radar": ["radar", "palindrome-radar"],
  "palindrome-radar": ["radar"],
  ladder: ["broken-ladder"],
  "ladder-four-pairs": ["four-pairs"],
  "binary-four-pairs": ["four-pairs", "binary"],
  "bookends-four-pairs": ["four-pairs"],
  "true-binary": ["binary"],
  "near-true-binary": [],
  solid: ["radar", "super-radar", "palindrome-radar", "repeater", "super-repeater", "flipper"],
  "super-high-serial": ["high-serial"],
  "low-serial-10": ["low-serial-100", "low-serial-1000"],
  "low-serial-100": ["low-serial-1000"],
};

/**
 * Each pattern's structural axis. The combination bonus only rewards secondary
 * tags that sit on a DIFFERENT axis from the primary, and a same-axis secondary
 * is never shown, so stacking two forms of the same idea cannot inflate the
 * score or clutter the tag list.
 */
const AXIS_OF: Record<string, string> = {
  solid: "repetition",
  "seven-of-a-kind": "repetition",
  "six-of-a-kind": "repetition",
  "five-of-a-kind": "repetition",
  "double-quad": "repetition",
  repeater: "repeater",
  "super-repeater": "repeater",
  "bookends-repeater": "repeater",
  "radar-repeater": "repeater",
  "double-binary-repeater": "repeater",
  "ladder-repeater": "repeater",
  "trinary-repeater": "repeater",
  "binary-repeater": "repeater",
  "true-binary-repeater": "repeater",
  radar: "symmetry",
  "super-radar": "symmetry",
  "palindrome-radar": "symmetry",
  "binary-radar": "symmetry",
  "bookends-radar": "symmetry",
  "true-binary-radar": "symmetry",
  "four-pairs": "pairs",
  "binary-four-pairs": "pairs",
  "ladder-four-pairs": "pairs",
  "bookends-four-pairs": "pairs",
  bookends: "bookends",
  "bookends-binary": "bookends",
  "near-binary-radar": "near",
  "near-radar-repeater": "near",
  "near-true-binary": "near",
  ladder: "sequence",
  "broken-ladder": "sequence",
  binary: "digit-count",
  "true-binary": "digit-count",
  trinary: "digit-count",
  flipper: "rotation",
  "low-serial-10": "value",
  "low-serial-100": "value",
  "low-serial-1000": "value",
  "high-serial": "value",
  "super-high-serial": "value",
  "birthday-note": "date",
};

/**
 * Only these axes carry independent "facts" that are worth showing ALONGSIDE the
 * primary (e.g. a Super Radar that is also Binary and a Flipper). Structural axes
 * — repetition, repeater, symmetry, pairs, bookends, near, sequence — describe
 * the same shape the primary already names, so they only ever appear AS the
 * primary, never as a secondary tag. This keeps the tag list informative instead
 * of listing every near-miss and generic form a serial technically satisfies.
 */
const FACT_AXES = new Set(["digit-count", "rotation", "value", "date"]);

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

  // Detect in registry (priority) order: the first hit is the primary.
  const detected = patterns.filter((p) => p.detect(digits));
  const detectedIds = new Set(detected.map((p) => p.id));

  const superseded = (id: string): boolean =>
    (SUPERSEDED_BY[id] ?? []).some((k) => detectedIds.has(k));

  let shown: typeof detected = [];
  if (detected.length > 0) {
    // FIRST MATCH WINS: the earliest-in-order detector is the primary and is
    // never suppressed (nothing rarer precedes it).
    const primary = detected[0];
    const primaryAxis = AXIS_OF[primary.id];
    // Secondary tags: an independent, DIFFERENT-axis fact that no stronger form
    // supersedes. Only fact axes (binary/trinary, flipper, value tier, date) can
    // be a secondary — structural shapes only ever appear as the primary.
    const secondaries = detected
      .slice(1)
      .filter(
        (p) =>
          FACT_AXES.has(AXIS_OF[p.id]) &&
          AXIS_OF[p.id] !== primaryAxis &&
          !superseded(p.id),
      );
    shown = [primary, ...secondaries];
  }

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

    // Combination bonus: every shown secondary is already a different axis, so
    // each counts once, with the total capped.
    const crossAxis = shown.slice(1);
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
