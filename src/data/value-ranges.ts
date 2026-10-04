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
// - sampleSize is the de-confounded record count actually behind the band. A
//   bucket needs at least 3 de-confounded records to publish a band: one or two
//   sales is an anecdote, not a range, so it is left blank. 8 or more records =
//   "estimate"; 3 to 7 = "indicative" (shows what has been paid, not a reliable
//   market range).
//
// The full derivation, including the reproduced sheet summary and every excluded
// record, lives in src/data/value-bands-evidence.json for review.
//
// Gaps are deliberate. estimateValue() must return an explicit "insufficient
// data" state for them, never a $0 or a neighbouring band.
//
// Last rebuilt from evidence: 2026-10-03. Refreshed 2026-10-04 with new sold
// records. Seven previously blank buckets published from new evidence (ladder/vf,
// birthday/circulated, birthday/unc, low-serial-under-1000/circulated,
// low-serial-under-1000/vf, repeater/circulated, radar/circulated), and two more
// (ladder-partial/vf, super-radar/vf) published on their existing 5 de-confounded
// records. low-serial-under-100/vf was left blank (serial number 1 $5,000 outlier).
// See src/data/value-bands-evidence.json (newRecords).

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

  // ladder: excluded one 1899 silver certificate.
  // vf: a 2003A PMG VF20 ascending ladder ($218.50) joins two older VF records ($1,403 to $1,464).
  { pattern: "ladder", condition: "vf", low: 218.5, high: 1464.0, sampleSize: 3, confidence: "indicative", source: SRC_IND },
  { pattern: "ladder", condition: "unc", low: 1560.0, high: 4392.0, sampleSize: 15, confidence: "estimate", source: SRC_EST },

  // birthday note: modern $1 and $2 birthday-date notes (valid MMDDYYYY serials).
  { pattern: "birthday-note", condition: "circulated", low: 2.99, high: 60.0, sampleSize: 10, confidence: "estimate", source: SRC_EST },
  { pattern: "birthday-note", condition: "unc", low: 15.0, high: 79.0, sampleSize: 10, confidence: "estimate", source: SRC_EST },

  // broken ladder (ladder-partial): excluded two star notes (unc) and a legal-tender star note (vf).
  // vf has 5 de-confounded records and publishes per the 3-record rule.
  { pattern: "ladder-partial", condition: "vf", low: 129.25, high: 372.0, sampleSize: 5, confidence: "indicative", source: SRC_IND },
  { pattern: "ladder-partial", condition: "unc", low: 15.0, high: 616.88, sampleSize: 24, confidence: "estimate", source: SRC_EST },

  // low serial under 100: excluded National Bank Notes, large-size, high-denomination,
  // star, legal tender and silver certificates. Circulated unchanged (a new $1 at $140
  // sits inside the range; a $20 best-offer at $399 is approximate and not promoted).
  // vf stays blank by owner decision: its only modern records are $249.99 and $450 plus
  // serial number 1 ($20 PMG VF 25, $5,000). Serial 1 is an outlier, and without it the
  // bucket has two records, so we leave it blank rather than publish a $250 to $5,000 range.
  { pattern: "low-serial-under-100", condition: "circulated", low: 74.0, high: 390.4, sampleSize: 7, confidence: "indicative", source: SRC_IND },
  { pattern: "low-serial-under-100", condition: "unc", low: 6168.75, high: 9400.0, sampleSize: 3, confidence: "indicative", source: SRC_IND },

  // low serial under 1000: circulated and vf now publish on modern small-size records
  // (new $1/$20 three-digit serials). One circulated record ($89.99) was a best-offer
  // accepted eBay sale, so its price is approximate. The unc bucket stays blank (its
  // clean records are all 1918 large-size, 1896 silver certificate or high-denom notes).
  { pattern: "low-serial-under-1000", condition: "circulated", low: 49.99, high: 156.0, sampleSize: 5, confidence: "indicative", source: SRC_IND },
  { pattern: "low-serial-under-1000", condition: "vf", low: 6.0, high: 150.0, sampleSize: 4, confidence: "indicative", source: SRC_IND },

  // repeater: excluded a mule, large-size (1914/1918/1923), gold/silver certificates, legal tender, a courtesy autograph and star notes.
  // circulated: modern $1 quad repeaters (Series 2017A/2021).
  { pattern: "repeater", condition: "circulated", low: 8.99, high: 59.0, sampleSize: 6, confidence: "indicative", source: SRC_IND },
  { pattern: "repeater", condition: "vf", low: 14.0, high: 384.0, sampleSize: 7, confidence: "indicative", source: SRC_IND },
  { pattern: "repeater", condition: "unc", low: 432.0, high: 600.0, sampleSize: 5, confidence: "indicative", source: SRC_IND },

  // super radar: excluded a 1923 large-size, a silver certificate, an error note and QA-flagged records.
  // vf has 5 de-confounded records and publishes per the 3-record rule.
  { pattern: "super-radar", condition: "vf", low: 43.0, high: 118.68, sampleSize: 5, confidence: "indicative", source: SRC_IND },
  { pattern: "super-radar", condition: "unc", low: 264.0, high: 1020.0, sampleSize: 9, confidence: "estimate", source: SRC_EST },

  // binary: excluded star notes, silver certificates, a Hawaii WWII note and a QA-flagged super-repeater.
  { pattern: "binary", condition: "vf", low: 135.13, high: 336.0, sampleSize: 4, confidence: "indicative", source: SRC_IND },
  { pattern: "binary", condition: "unc", low: 366.0, high: 1920.0, sampleSize: 11, confidence: "estimate", source: SRC_EST },

  // radar: excluded legal tender notes, silver certificates, a 1899/1923 large-size and star notes.
  // circulated: seven records. Six are modern $1 to $10 radars ($11 to $25); the high
  // ($253) is a 1928A $100 radar (small-size, not excluded by the rules) and is an
  // outlier relative to a typical modern note. Flagged in the report.
  { pattern: "radar", condition: "circulated", low: 11.0, high: 253.0, sampleSize: 7, confidence: "indicative", source: SRC_IND },
  { pattern: "radar", condition: "vf", low: 40.0, high: 432.0, sampleSize: 4, confidence: "indicative", source: SRC_IND },
  { pattern: "radar", condition: "unc", low: 378.2, high: 1020.0, sampleSize: 12, confidence: "estimate", source: SRC_EST },
];

/**
 * Combinations with no publishable band. Render as "insufficient data", never $0.
 * Most are under 3 de-confounded records. low-serial-under-100 / vf is a special
 * case: it would reach 3 only by counting serial number 1 ($5,000), an outlier, so
 * by owner decision it is left blank rather than publish a $250 to $5,000 range.
 */
export const PATTERN_VALUE_GAPS: { pattern: string; condition: NoteCondition }[] = [
  { pattern: "ladder", condition: "circulated" },
  { pattern: "birthday-note", condition: "vf" },
  { pattern: "ladder-partial", condition: "circulated" },
  { pattern: "low-serial-under-100", condition: "vf" }, // only serial 1 ($5,000) outlier plus 2 records; blanked by owner decision
  { pattern: "low-serial-under-1000", condition: "unc" }, // records all 1918 large-size / 1896 silver certificate / high-denom
  { pattern: "super-radar", condition: "circulated" },
  { pattern: "binary", condition: "circulated" },
];

export const PATTERN_VALUES_UPDATED = "2026-10-04";
