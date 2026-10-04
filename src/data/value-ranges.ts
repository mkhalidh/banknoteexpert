// Pattern value bands, rebuilt from the clean sold-price evidence sheet
// ("Value Bands (Clean)", Heritage Auctions + eBay sold records).
//
// Method:
// - A band is set ONLY where the sheet summary shows status OK (10 or more clean
//   per-note records in that condition bucket). SHORTFALL buckets are left blank.
// - Within an OK bucket the published low-high is the min-max of the CLEAN,
//   DE-CONFOUNDED records: modern small-size notes only. Confounders that trade
//   in a different market (large-size notes dated before 1928, National Bank
//   Notes, gold/silver certificates, Treasury/Coin notes, high denominations
//   $500+, star notes, error notes, Hawaii/MPC notes, courtesy autographs) are
//   excluded from the range and listed per band below. This is why the figures
//   are far lower than the sheet's raw summary highs (which were driven by those
//   notes, e.g. a $90,000 Silver Certificate solid).
// - Two buckets pass the 10-record gate but have ZERO modern records once
//   confounders are removed (low-serial-under-100 / vf and
//   low-serial-under-1000 / unc). There is no honest modern figure, so they are
//   left blank (gaps) rather than publish a confounder-inflated range.
// - sampleSize is the de-confounded record count actually behind the band.
//   8 or more = "estimate"; fewer = "indicative" (shows what has been paid, not a
//   reliable market range).
//
// The full derivation, including the reproduced sheet summary and every excluded
// record, lives in src/data/value-bands-evidence.json for review.
//
// Gaps are deliberate. estimateValue() must return an explicit "insufficient
// data" state for them, never a $0 or a neighbouring band.
//
// Last rebuilt from evidence: 2026-10-03.

export type ValueConfidence = "estimate" | "indicative";
export type NoteCondition = "circulated" | "vf" | "unc";

export interface PatternValueBand {
  pattern: string;
  condition: NoteCondition;
  low: number;
  high: number;
  /** Number of de-confounded recorded sales behind this band. */
  sampleSize: number;
  confidence: ValueConfidence;
  source: string;
}

const SRC_EST = "Heritage Auctions and eBay sold records, Oct 2026; confounders excluded";
const SRC_IND = "Heritage Auctions and eBay sold records, Oct 2026; small de-confounded sample";

export const PATTERN_VALUE_BANDS: PatternValueBand[] = [
  // solid: excluded silver certificates, a 1917/1914 large-size and a 1899 large-size, a courtesy autograph and a star note.
  { pattern: "solid", condition: "circulated", low: 364.25, high: 1150.0, sampleSize: 6, confidence: "indicative", source: SRC_IND },
  { pattern: "solid", condition: "vf", low: 1320.0, high: 4800.0, sampleSize: 9, confidence: "estimate", source: SRC_EST },
  { pattern: "solid", condition: "unc", low: 9600.0, high: 27600.0, sampleSize: 5, confidence: "indicative", source: SRC_IND },

  // ladder: excluded one 1899 silver certificate. Only the uncirculated bucket clears 10 clean records.
  { pattern: "ladder", condition: "unc", low: 1560.0, high: 4392.0, sampleSize: 15, confidence: "estimate", source: SRC_EST },

  // broken ladder (ladder-partial): excluded two star notes.
  { pattern: "ladder-partial", condition: "unc", low: 15.0, high: 616.88, sampleSize: 24, confidence: "estimate", source: SRC_EST },

  // low serial under 100: excluded National Bank Notes, large-size (1863/1864/1914/1918), high-denomination, star, legal tender and silver certificates.
  // The vf bucket is blank: every clean record there is a large-size, Treasury, high-denom or NBN note (no modern evidence).
  { pattern: "low-serial-under-100", condition: "circulated", low: 74.0, high: 390.4, sampleSize: 7, confidence: "indicative", source: SRC_IND },
  { pattern: "low-serial-under-100", condition: "unc", low: 6168.75, high: 9400.0, sampleSize: 3, confidence: "indicative", source: SRC_IND },

  // low serial under 1000: excluded star notes, large-size (1899/1922/1923), gold/silver certificates and high-denominations.
  // The unc bucket is blank: its clean records are all 1918 large-size / 1896 silver certificate / high-denom notes.
  { pattern: "low-serial-under-1000", condition: "circulated", low: 61.0, high: 156.0, sampleSize: 2, confidence: "indicative", source: SRC_IND },
  { pattern: "low-serial-under-1000", condition: "vf", low: 150.0, high: 150.0, sampleSize: 1, confidence: "indicative", source: SRC_IND },

  // repeater: excluded a mule, large-size (1914/1918/1923), gold/silver certificates, legal tender, a courtesy autograph and star notes.
  { pattern: "repeater", condition: "vf", low: 14.0, high: 384.0, sampleSize: 7, confidence: "indicative", source: SRC_IND },
  { pattern: "repeater", condition: "unc", low: 432.0, high: 600.0, sampleSize: 5, confidence: "indicative", source: SRC_IND },

  // super radar: excluded a 1923 large-size, a silver certificate, an error note and a QA-flagged record. Only unc clears the gate.
  { pattern: "super-radar", condition: "unc", low: 264.0, high: 1020.0, sampleSize: 9, confidence: "estimate", source: SRC_EST },

  // binary: excluded star notes, silver certificates, a Hawaii WWII note and a QA-flagged super-repeater.
  { pattern: "binary", condition: "vf", low: 135.13, high: 336.0, sampleSize: 4, confidence: "indicative", source: SRC_IND },
  { pattern: "binary", condition: "unc", low: 366.0, high: 1920.0, sampleSize: 11, confidence: "estimate", source: SRC_EST },

  // radar: excluded legal tender notes, silver certificates, a 1899/1923 large-size and star notes.
  { pattern: "radar", condition: "vf", low: 40.0, high: 432.0, sampleSize: 4, confidence: "indicative", source: SRC_IND },
  { pattern: "radar", condition: "unc", low: 378.2, high: 1020.0, sampleSize: 12, confidence: "estimate", source: SRC_EST },
];

/**
 * Combinations with no publishable band. Render as "insufficient data", never $0.
 * Includes both SHORTFALL buckets (fewer than 10 clean records) and the two OK
 * buckets whose records are entirely confounded (see note above).
 */
export const PATTERN_VALUE_GAPS: { pattern: string; condition: NoteCondition }[] = [
  { pattern: "ladder", condition: "circulated" },
  { pattern: "ladder", condition: "vf" },
  { pattern: "birthday-note", condition: "circulated" },
  { pattern: "birthday-note", condition: "vf" },
  { pattern: "birthday-note", condition: "unc" },
  { pattern: "ladder-partial", condition: "circulated" },
  { pattern: "ladder-partial", condition: "vf" },
  { pattern: "low-serial-under-100", condition: "vf" }, // OK count, but all records confounded
  { pattern: "low-serial-under-1000", condition: "unc" }, // OK count, but all records confounded
  { pattern: "repeater", condition: "circulated" },
  { pattern: "super-radar", condition: "circulated" },
  { pattern: "super-radar", condition: "vf" },
  { pattern: "binary", condition: "circulated" },
  { pattern: "radar", condition: "circulated" },
];

export const PATTERN_VALUES_UPDATED = "2026-10-03";
