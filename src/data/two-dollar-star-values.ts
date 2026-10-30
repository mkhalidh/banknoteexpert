// $2 STAR note value bands by series and condition.
//
// SOURCE: Heritage Auctions realized prices (currency.ha.com Auction Archives),
// compiled from the auction-archive "Sold For" results, Oct 2026. These are
// genuine realized hammer+premium prices from the auction house's own archive,
// not competitor price-guide ranges and not asking prices.
//
// METHOD (mirrors src/data/value-ranges.ts):
// - SINGLE notes only. Every multi-note lot, original pack of 100, uncut sheet,
//   district set and "consecutive examples" lot is excluded (a pack price is not
//   a per-note price). Low-serial-number notes, fancy-serial notes (radar,
//   ladder, etc.), error notes and impaired "Net"/"Apparent" holders are also
//   excluded as confounders.
// - A band is published ONLY where at least 3 clean single-note records exist for
//   that series + condition. low/high are the min and max of those records.
// - sampleSize is the clean single-note record count behind the band.
//   >= 8 records = "estimate"; 3 to 7 = "indicative".
// - Condition buckets follow conditionForGrade() in src/lib/serial/value.ts:
//   grade 60+ = unc; grade 20 to 58 (VF/XF/AU) = vf; below 20 (Fine/VG) = circulated.
//
// HONEST BLANKS (deliberate, do not fill):
// - The red-seal star notes (1928-1963A) almost never trade in circulated or VF
//   single-note form; they survive and sell as uncirculated, so most circulated/vf
//   cells have fewer than 3 clean records and are left blank.
// - 1953B: fewer than 3 clean single-note records; blank.
// - 1976 (Fr. 1935) star notes trade overwhelmingly as packs, uncut sheets and
//   district sets, and value is district-driven (Minneapolis/Kansas City key vs
//   Boston/New York common), so a single series-wide band would be misleading.
//   Left blank; use the district print-run scarcity (two-dollar-print-runs.ts) as
//   the value signal instead.
// - 1995, 2003, 2003A, 2009, 2017A star notes trade almost entirely as packs,
//   sheets, sets, low-serial or error notes; no clean single-note band exists. Blank.
//
// Last compiled: 2026-10-29.

export type NoteCondition = "circulated" | "vf" | "unc";
export type ValueConfidence = "estimate" | "indicative";

export interface TwoDollarStarValueBand {
  series: string;
  condition: NoteCondition;
  low: number;
  high: number;
  /** Clean single-note realized-sale records behind this band. */
  sampleSize: number;
  confidence: ValueConfidence;
  source: string;
}

const SRC = "Heritage Auctions realized prices (Auction Archives), Oct 2026; single notes only, packs/sheets/sets/low-serial/fancy/error excluded";

export const TWO_DOLLAR_STAR_VALUE_BANDS: TwoDollarStarValueBand[] = [
  // 1928E (Fr. 1506*) - the key red-seal $2 star; the only red-seal series with
  // enough clean circulated and VF single records to publish all three cells.
  { series: "1928E", condition: "circulated", low: 1116.25, high: 5750.0, sampleSize: 5, confidence: "indicative", source: SRC },
  { series: "1928E", condition: "vf", low: 1110.0, high: 4080.0, sampleSize: 12, confidence: "estimate", source: SRC },
  { series: "1928E", condition: "unc", low: 7800.0, high: 28750.0, sampleSize: 4, confidence: "indicative", source: SRC },

  // 1953 (Fr. 1509*) - uncirculated only; circulated/vf singles are too few.
  { series: "1953", condition: "unc", low: 240.0, high: 720.0, sampleSize: 16, confidence: "estimate", source: SRC },

  // 1953A (Fr. 1510*)
  { series: "1953A", condition: "unc", low: 216.0, high: 480.0, sampleSize: 8, confidence: "estimate", source: SRC },

  // 1953C (Fr. 1512*) - clean singles are all Superb Gem 67-69.
  { series: "1953C", condition: "unc", low: 660.0, high: 1440.0, sampleSize: 5, confidence: "indicative", source: SRC },

  // 1963 (Fr. 1513*) - wide range: the high end is driven by Superb Gem 69 records
  // ($2,160-$2,640); typical Gem/Superb 66-68 singles sit near $320-$390.
  { series: "1963", condition: "unc", low: 322.0, high: 2640.0, sampleSize: 9, confidence: "estimate", source: SRC },

  // 1963A (Fr. 1514*)
  { series: "1963A", condition: "unc", low: 193.88, high: 432.0, sampleSize: 16, confidence: "estimate", source: SRC },
];

/**
 * Series + condition cells with NO publishable single-note band (fewer than 3
 * clean records, or a market that only trades in packs/sets/district pieces).
 * Render as "no recorded sales", never $0 or a guessed figure.
 */
export const TWO_DOLLAR_STAR_VALUE_GAPS: { series: string; condition: NoteCondition; reason: string }[] = [
  // red-seal circulated/vf cells with <3 clean singles
  { series: "1928", condition: "circulated", reason: "no clean single-note records" },
  { series: "1928", condition: "vf", reason: "no clean single-note records" },
  { series: "1928", condition: "unc", reason: "no clean single-note records" },
  { series: "1953", condition: "circulated", reason: "<3 clean single-note records (these stars survive uncirculated)" },
  { series: "1953", condition: "vf", reason: "<3 clean single-note records" },
  { series: "1953A", condition: "circulated", reason: "<3 clean single-note records" },
  { series: "1953A", condition: "vf", reason: "<3 clean single-note records" },
  { series: "1953B", condition: "circulated", reason: "<3 clean single-note records" },
  { series: "1953B", condition: "vf", reason: "<3 clean single-note records" },
  { series: "1953B", condition: "unc", reason: "<3 clean single-note records (sold mostly in packs)" },
  { series: "1953C", condition: "circulated", reason: "<3 clean single-note records" },
  { series: "1953C", condition: "vf", reason: "<3 clean single-note records" },
  { series: "1963", condition: "circulated", reason: "<3 clean single-note records" },
  { series: "1963", condition: "vf", reason: "<3 clean single-note records" },
  { series: "1963A", condition: "circulated", reason: "<3 clean single-note records" },
  { series: "1963A", condition: "vf", reason: "<3 clean single-note records" },
  // modern green-seal: sold as packs/sheets/sets/low-serial/error, no clean single band
  ...(["1976", "1995", "2003", "2003A", "2009", "2017A"] as const).flatMap((series) =>
    (["circulated", "vf", "unc"] as const).map((condition) => ({
      series,
      condition,
      reason: "trades as packs/sheets/sets/low-serial/error notes; no clean single-note band",
    })),
  ),
];

export const TWO_DOLLAR_STAR_VALUES_UPDATED = "2026-10-29";
