// $2 print-run figures for HISTORICAL series not covered by the primary BEP
// monthly-production dataset.
//
// WHY THIS FILE EXISTS
// --------------------
// src/data/star-notes/runs.ts is built strictly from BEP monthly production
// reports (FY2003 onward) and, for $2, only covers series 2003, 2003A, 2009,
// 2017A and 2021. It has NO data for the 1928-1963 red seal issues or the 1976
// Bicentennial issue. Those series pre-date the online BEP monthly reports, so
// their figures cannot be sourced the same way.
//
// SOURCE TIER (read before using)
// -------------------------------
// These are SECONDARY, BEP-records-derived figures, NOT scraped from BEP primary
// PDFs. They come from uspapermoney.info (Doug Murray's compilation of BEP
// delivery records) cross-checked against mycurrencycollection.com. The two
// independent compilations agree exactly on the per-district 1976 star totals,
// which sum to the published 15,360,000 / 24-run grand total. uspapermoney.info
// is already the cited source for $2 series metadata in two-dollar-series.ts, so
// this file uses the same accepted authority. Any page presenting these numbers
// must attribute them as "BEP production records (via uspapermoney.info)", not
// as our own BEP monthly-report dataset.
//
// WHAT IS AND ISN'T HERE
// ----------------------
// - Per-district STAR totals and per-series regular totals: stored (verified).
// - Per-run STAR serial ranges: NOT stored. The only run-level ranges that could
//   be verified are the three single-run short-run districts (E/I/J 1976, and the
//   1963 star run), which run 1..640000. For the multi-run districts the secondary
//   sources disagree on the individual run boundaries, so they are deliberately
//   left out rather than published as unreliable ranges. This is why the data is
//   NOT wired into the serial-range star lookup (src/lib/star-note) - doing so
//   with only 3 of 12 districts would make the tool report false "no match" for
//   the other nine. Use this file for value/scarcity CONTENT, not serial lookup.
// - $2 star VALUE bands: NONE. A deliberate research pass (Oct 2026) could not
//   find >=3 de-confounded recorded sold prices for any $2 star series/condition
//   (Heritage realized prices are login-gated; the one public figure was an
//   auction estimate, not a sale). Per the site's >=3-record rule, no $2 star
//   value band is published. Leave those cells blank until real sold data exists.
//
// 1963 vs 1963A: both are United States Notes (red seal), the last red seal $2
// issues. Series 1963 had a far larger regular run (15,360,000) than Series 1963A
// (3,200,000); both had a single 640,000-note star run. 1963A figures sourced Oct
// 2026 from uspapermoney.info/serials/u1963ab.html and corroborated 3-0 by Numista
// (Friedberg Fr 1514 / 1514*). (The earlier 404 was a wrong URL guess, u1963a_b.html;
// the real page is u1963ab.html.)
//
// Last researched/verified: 2026-10-29.

export type TwoDollarNoteKind = "regular" | "star";

/** Short-run / scarcity thresholds, matching src/lib/star-note/lookup.ts. */
export const STAR_RUN_FULL = 3_200_000;
export const STAR_RUN_SCARCE_MAX = 640_000; // <= this is scarce ("Rare")
export const STAR_RUN_VERY_RARE_MAX = 320_000; // <= this is "Very Rare"

const USPM_1976 = "http://www.uspapermoney.info/serials/f1976_b.html";
const USPM_1963 = "http://www.uspapermoney.info/serials/u1963_b.html";
const USPM_1963A = "http://www.uspapermoney.info/serials/u1963ab.html";
const SRC = "BEP production records (via uspapermoney.info, cross-checked with mycurrencycollection.com)";
// Red seal (United States Note) series are cross-checked against Numista's Friedberg catalog figures, not mycurrencycollection.
const SRC_USN = "BEP/Friedberg production records (via uspapermoney.info, cross-checked with Numista Friedberg catalog)";

export interface TwoDollarStarDistrictRun {
  series: string;
  /** Federal Reserve district letter. null for United States Notes (no district). */
  frbLetter: string | null;
  frbName: string | null;
  /** Total star notes printed for this series + district (all runs combined). */
  starNotesPrinted: number;
  /** Number of star print runs, when the sources agree. null when uncertain. */
  printRuns: number | null;
  /** True for a single short run at or below the 640,000 scarcity threshold. */
  shortRun: boolean;
  source: string;
  sourceUrl: string;
}

/**
 * Series 1976 $2 Federal Reserve Note STAR notes, by district. Per-district
 * totals sum to 15,360,000 across 24 runs (verified). The three single-run
 * 640,000-note districts - Richmond (E), Minneapolis (I) and Kansas City (J) -
 * are the recognised scarce short runs of the series.
 */
export const STAR_RUNS_1976: TwoDollarStarDistrictRun[] = [
  { series: "1976", frbLetter: "A", frbName: "Boston", starNotesPrinted: 1_280_000, printRuns: 2, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "B", frbName: "New York", starNotesPrinted: 2_560_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "C", frbName: "Philadelphia", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "D", frbName: "Cleveland", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "E", frbName: "Richmond", starNotesPrinted: 640_000, printRuns: 1, shortRun: true, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "F", frbName: "Atlanta", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "G", frbName: "Chicago", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "H", frbName: "St. Louis", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "I", frbName: "Minneapolis", starNotesPrinted: 640_000, printRuns: 1, shortRun: true, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "J", frbName: "Kansas City", starNotesPrinted: 640_000, printRuns: 1, shortRun: true, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "K", frbName: "Dallas", starNotesPrinted: 1_280_000, printRuns: null, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
  { series: "1976", frbLetter: "L", frbName: "San Francisco", starNotesPrinted: 1_920_000, printRuns: 3, shortRun: false, source: SRC, sourceUrl: USPM_1976 },
];

/**
 * Series 1963 $2 United States Note (red seal, Legal Tender). A single national
 * issue with no Federal Reserve district. The star note is one 640,000-note run,
 * the scarce part of the series. Notes delivered to Treasury March-June 1964 per
 * BEP records. 1963 and 1963A were the last red seal $2 issues.
 */
export const STAR_RUNS_1963: TwoDollarStarDistrictRun[] = [
  { series: "1963", frbLetter: null, frbName: null, starNotesPrinted: 640_000, printRuns: 1, shortRun: true, source: SRC_USN, sourceUrl: USPM_1963 },
];

/**
 * Series 1963A $2 United States Note (red seal, Legal Tender). The last red seal
 * $2 issue, with a much smaller regular run than 1963 (3,200,000 vs 15,360,000)
 * but the same single 640,000-note star run. No Federal Reserve district.
 */
export const STAR_RUNS_1963A: TwoDollarStarDistrictRun[] = [
  { series: "1963A", frbLetter: null, frbName: null, starNotesPrinted: 640_000, printRuns: 1, shortRun: true, source: SRC_USN, sourceUrl: USPM_1963A },
];

export interface TwoDollarSeriesProduction {
  series: string;
  /** Total regular (non-star) notes printed for the series, all districts. */
  regularNotes: number | null;
  /** Total star notes printed for the series, all districts. */
  starNotes: number | null;
  source: string;
  sourceUrl: string;
  note?: string;
}

/**
 * Series-level $2 production totals for the historical issues. Modern series
 * (2003+) live in the BEP monthly dataset, not here.
 */
export const TWO_DOLLAR_PRODUCTION: TwoDollarSeriesProduction[] = [
  {
    series: "1963",
    regularNotes: 15_360_000,
    starNotes: 640_000,
    source: SRC_USN,
    sourceUrl: USPM_1963,
    note: "United States Note (red seal), Friedberg Fr 1513/1513*, Granahan-Dillon signatures. Delivered to Treasury March-June 1964.",
  },
  {
    series: "1963A",
    regularNotes: 3_200_000,
    starNotes: 640_000,
    source: SRC_USN,
    sourceUrl: USPM_1963A,
    note: "United States Note (red seal), Friedberg Fr 1514/1514*. The last red seal $2 issue. Regular run much smaller than Series 1963 (3,200,000 vs 15,360,000); star run equal at 640,000. Corroborated by Numista Friedberg catalog.",
  },
  {
    series: "1976",
    regularNotes: 575_360_000,
    starNotes: 15_360_000,
    source: SRC,
    sourceUrl: USPM_1976,
    note: "Federal Reserve Note (green seal). Star notes across 24 runs; Richmond, Minneapolis and Kansas City each a single 640,000-note short run.",
  },
];

export const TWO_DOLLAR_PRINT_RUNS_UPDATED = "2026-10-29";
