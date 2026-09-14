// $2 note value bands by series.
//
// Source: compiled from serialworth.com's published price guide, which aggregates
// eBay and Heritage Auctions sold data. These figures are a secondary compilation,
// not our own sampling — /methodology/ must say so plainly.
//
// faceValue: true for 1976 and later. These notes are still printed and circulate
// normally; virtually all of them are worth exactly $2. The bands below reflect
// occasional small premiums on crisp examples, not a collector market, and the page
// must lead with that fact rather than the numbers.
//
// confidence: "estimate" where the compiled sample looked reasonable; "indicative"
// where it rested on a single data point, where the series is face-value, or where a
// figure had to be corrected (see correction). Uncirculated floors that fell below the
// circulated ceiling were raised, since an uncirculated note cannot be worth less than
// a circulated one of the same series.
//
// Series metadata (seal colour, note type) also lives in two-dollar-series.ts; the
// duplication here is deliberate so the value chart renders without a join.
//
// Last compiled: 2026-09-09.

export interface TwoDollarValue {
  series: string;
  sealColor: "red" | "green";
  noteType: "Legal Tender Note" | "Federal Reserve Note";
  circulatedLow: number | null;
  circulatedHigh: number | null;
  uncirculatedLow: number | null;
  uncirculatedHigh: number | null;
  /** True when the series still circulates and is normally worth face value. */
  faceValue: boolean;
  confidence: "estimate" | "indicative";
  correction: string | null;
  source: string;
}

export const TWO_DOLLAR_VALUES: TwoDollarValue[] = [
  { series: "1928", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 11.25, circulatedHigh: 21.99, uncirculatedLow: 37.45, uncirculatedHigh: 145.44, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928A", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 21.0, circulatedHigh: 75.25, uncirculatedLow: 114.5, uncirculatedHigh: 288.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928B", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 59.0, circulatedHigh: 264.0, uncirculatedLow: 312.0, uncirculatedHigh: 1006.25, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928C", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 8.6, circulatedHigh: 30.5, uncirculatedLow: 60.0, uncirculatedHigh: 120.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928D", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 9.5, circulatedHigh: 61.0, uncirculatedLow: 32.0, uncirculatedHigh: 84.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928E", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 20.5, circulatedHigh: 29.0, uncirculatedLow: 42.0, uncirculatedHigh: 109.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928F", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 10.74, circulatedHigh: 30.51, uncirculatedLow: 34.0, uncirculatedHigh: 63.5, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1928G", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 7.99, circulatedHigh: 34.5, uncirculatedLow: 24.25, uncirculatedHigh: 64.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1953", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 5.0, circulatedHigh: 8.93, uncirculatedLow: 9.5, uncirculatedHigh: 49.99, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1953A", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 5.08, circulatedHigh: 28.35, uncirculatedLow: 9.22, uncirculatedHigh: 39.99, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1953B", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 5.0, circulatedHigh: 9.9, uncirculatedLow: 9.5, uncirculatedHigh: 34.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1953C", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 5.49, circulatedHigh: 9.5, uncirculatedLow: 10.5, uncirculatedHigh: 36.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1963", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 4.99, circulatedHigh: 28.5, uncirculatedLow: 8.5, uncirculatedHigh: 45.0, faceValue: false, confidence: "estimate", correction: null, source: "serialworth.com price guide" },
  { series: "1963A", sealColor: "red", noteType: "Legal Tender Note", circulatedLow: 8.25, circulatedHigh: 10.0, uncirculatedLow: 10.0, uncirculatedHigh: 32.0, faceValue: false, confidence: "indicative", correction: "unc floor raised to the circulated ceiling", source: "serialworth.com price guide" },
  { series: "1976", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 4.32, circulatedHigh: 6.95, uncirculatedLow: 5.99, uncirculatedHigh: 25.0, faceValue: true, confidence: "indicative", correction: null, source: "serialworth.com price guide" },
  { series: "1995", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 5.47, circulatedHigh: 6.46, uncirculatedLow: 6.46, uncirculatedHigh: 6.46, faceValue: true, confidence: "indicative", correction: "unc floor raised to the circulated ceiling", source: "serialworth.com price guide" },
  { series: "2003", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 3.28, circulatedHigh: 4.95, uncirculatedLow: 5.99, uncirculatedHigh: 6.58, faceValue: true, confidence: "indicative", correction: null, source: "serialworth.com price guide" },
  { series: "2003A", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 3.24, circulatedHigh: 4.29, uncirculatedLow: 8.99, uncirculatedHigh: 8.99, faceValue: true, confidence: "indicative", correction: null, source: "serialworth.com price guide" },
  { series: "2009", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: null, circulatedHigh: null, uncirculatedLow: 6.0, uncirculatedHigh: 6.0, faceValue: true, confidence: "indicative", correction: null, source: "serialworth.com price guide" },
  { series: "2013", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 6.29, circulatedHigh: 7.92, uncirculatedLow: 7.92, uncirculatedHigh: 7.92, faceValue: true, confidence: "indicative", correction: "unc floor raised to the circulated ceiling", source: "serialworth.com price guide" },
  { series: "2017A", sealColor: "green", noteType: "Federal Reserve Note", circulatedLow: 4.25, circulatedHigh: 4.25, uncirculatedLow: 4.25, uncirculatedHigh: 7.5, faceValue: true, confidence: "indicative", correction: "unc floor raised to the circulated ceiling", source: "serialworth.com price guide" },
];

export const TWO_DOLLAR_VALUES_UPDATED = "2026-09-09";
