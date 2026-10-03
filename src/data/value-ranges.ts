// Pattern value bands, compiled from recorded sold prices.
//
// Method: every band is computed from a sample of completed sales gathered in
// September 2026 from Heritage Auctions (currency.ha.com) and eBay sold listings.
// Large-size notes (1918, 1899) are excluded, they trade in a different market.
// Where a sample had 8 or more sales the band is the interquartile range, which
// resists single outliers. Below 8 sales the band is the full observed min-max and
// is marked "indicative", meaning it shows what has been paid, not a reliable market
// range. sampleSize is exposed so the UI can be honest about how thin the evidence is.
//
// Gaps are deliberate. Combinations with no recorded sales are absent rather than
// guessed, and estimateValue() must return an explicit "insufficient data" state for
// them rather than falling back to a neighbouring band.
//
// Refresh cadence: re-sample every 3-4 months. Last sampled: 2026-09-09.

export type ValueConfidence = "estimate" | "indicative";
export type NoteCondition = "circulated" | "vf" | "unc";

export interface PatternValueBand {
  pattern: string;
  condition: NoteCondition;
  low: number;
  high: number;
  /** Number of recorded sales behind this band. */
  sampleSize: number;
  confidence: ValueConfidence;
  source: string;
}

export const PATTERN_VALUE_BANDS: PatternValueBand[] = [
  { pattern: "binary", condition: "vf", low: 55.0, high: 156.0, sampleSize: 3, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "binary", condition: "unc", low: 84.0, high: 378.0, sampleSize: 14, confidence: "estimate", source: "Heritage Auctions and eBay sold listings, Sep 2026 sample" },
  { pattern: "birthday-note", condition: "circulated", low: 19.99, high: 19.99, sampleSize: 1, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "birthday-note", condition: "vf", low: 5.0, high: 5.0, sampleSize: 1, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "birthday-note", condition: "unc", low: 13.99, high: 54.25, sampleSize: 10, confidence: "estimate", source: "Heritage Auctions and eBay sold listings, Sep 2026 sample" },
  { pattern: "ladder", condition: "unc", low: 660.0, high: 3600.0, sampleSize: 3, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "ladder-partial", condition: "unc", low: 89.0, high: 312.0, sampleSize: 3, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "low-serial-under-1000", condition: "unc", low: 116.0, high: 295.0, sampleSize: 2, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "radar", condition: "vf", low: 40.0, high: 288.0, sampleSize: 4, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "radar", condition: "unc", low: 228.0, high: 480.0, sampleSize: 29, confidence: "estimate", source: "Heritage Auctions and eBay sold listings, Sep 2026 sample" },
  { pattern: "repeater", condition: "vf", low: 53.0, high: 53.0, sampleSize: 1, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
  { pattern: "repeater", condition: "unc", low: 135.25, high: 222.75, sampleSize: 8, confidence: "estimate", source: "Heritage Auctions and eBay sold listings, Sep 2026 sample" },
  { pattern: "solid", condition: "unc", low: 6325.0, high: 9600.0, sampleSize: 2, confidence: "indicative", source: "Heritage Auctions and eBay sold listings, Sep 2026, small sample" },
];

/** Combinations with no recorded sales. Render as "insufficient data", never as $0. */
export const PATTERN_VALUE_GAPS: { pattern: string; condition: NoteCondition }[] = [
  { pattern: "low-serial-under-100", condition: "circulated" },
  { pattern: "low-serial-under-100", condition: "vf" },
  { pattern: "low-serial-under-100", condition: "unc" },
  { pattern: "low-serial-under-1000", condition: "circulated" },
  { pattern: "low-serial-under-1000", condition: "vf" },
  { pattern: "ladder", condition: "circulated" },
  { pattern: "ladder", condition: "vf" },
  { pattern: "solid", condition: "circulated" },
  { pattern: "solid", condition: "vf" },
  { pattern: "binary", condition: "circulated" },
  { pattern: "super-radar", condition: "circulated" },
  { pattern: "super-radar", condition: "vf" },
  { pattern: "super-radar", condition: "unc" },
];

export const PATTERN_VALUES_UPDATED = "2026-09-09";
