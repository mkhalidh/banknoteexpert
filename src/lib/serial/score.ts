/**
 * Deterministic, explainable scoring of a serial number.
 *
 * PRECEDENCE / SUPPRESSION
 * ------------------------
 * Some patterns subsume others: a solid serial is trivially also a binary,
 * repeater and super-repeater, but only the strongest should be reported.
 * Suppression is expressed as DATA in `SUPPRESSED_BY` (weak id -> stronger ids
 * that hide it), not as nested if-statements. Precedence, strongest first:
 *
 *   solid > seven-of-a-kind
 *   solid > super-radar > radar
 *   solid > super-repeater > repeater
 *   solid > double-quad
 *   {solid, super-radar, super-repeater, double-quad, seven-of-a-kind} > binary
 *   solid > trinary
 *   solid > flipper
 *   {ladder, radar, super-radar} > broken-ladder
 *   low-serial-10 > low-serial-100 > low-serial-1000
 *
 * When several un-suppressed patterns survive, the one with the highest
 * baseScore is the primary match; the rest contribute a fixed combination
 * bonus. Star notes add a documented flat bonus.
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

/** Weak pattern id -> stronger pattern ids that suppress it when also present. */
const SUPPRESSED_BY: Record<string, string[]> = {
  radar: ["solid", "super-radar"],
  "super-radar": ["solid"],
  repeater: ["solid", "super-repeater"],
  "super-repeater": ["solid"],
  "double-quad": ["solid"],
  binary: [
    "solid",
    "super-radar",
    "super-repeater",
    "double-quad",
    "seven-of-a-kind",
  ],
  trinary: ["solid"],
  flipper: ["solid"],
  "broken-ladder": ["ladder", "radar", "super-radar"],
  "low-serial-100": ["low-serial-10"],
  "low-serial-1000": ["low-serial-10", "low-serial-100"],
};

/** Flat combination bonus per additional (non-primary) surviving pattern. */
export const COMBO_BONUS = 5;
/** Documented flat bonus applied to star notes. */
export const STAR_BONUS = 10;

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

  const survivors = detected.filter((p) => {
    const killers = SUPPRESSED_BY[p.id] ?? [];
    return !killers.some((k) => detectedIds.has(k));
  });

  // Highest baseScore is primary; deterministic tie-break by id.
  survivors.sort((a, b) => {
    if (b.baseScore !== a.baseScore) return b.baseScore - a.baseScore;
    return a.id.localeCompare(b.id);
  });

  const breakdown: ScoreLine[] = [];
  const matches: PatternMatch[] = [];
  let raw = 0;

  survivors.forEach((p, index) => {
    const points = index === 0 ? p.baseScore : COMBO_BONUS;
    raw += points;
    matches.push({
      id: p.id,
      name: p.name,
      slug: p.slug,
      href: p.href,
      description: p.description,
      rarityOdds: p.rarityOdds,
      points,
    });
    breakdown.push({
      label: p.name,
      points,
      detail: index === 0 ? p.rarityOdds : "Combination bonus",
    });
  });

  if (survivors.length === 0) {
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
