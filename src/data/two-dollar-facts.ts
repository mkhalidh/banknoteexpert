// Verified reference facts for the $2 cluster pages (Silo C). Each fact was
// adversarially fact-checked (Oct 2026). Only VERIFIED facts are exported for use
// in page copy; the REFUTED list records claims that failed verification so they
// are NOT published, even though the Silo C prompt mentioned them.
//
// These are plain reference facts, not dollar figures. Value/print-run numbers
// live in two-dollar-print-runs.ts and the existing datasets. Sources are plain
// text only (site rule: no external links in page content).
//
// Last verified: 2026-10-28.

export interface TwoDollarFact {
  id: string;
  /** The fact, phrased for reuse in copy. */
  statement: string;
  /** Plain-text source attribution (no hyperlink). */
  source: string;
  /** Verification vote from the research pass, for audit. */
  confidence: "high";
}

export const TWO_DOLLAR_FACTS: TwoDollarFact[] = [
  {
    id: "1976-release-date",
    statement:
      "The Series 1976 $2 Federal Reserve Note was first released into circulation on April 13, 1976, Thomas Jefferson's birthday.",
    source: "uspapermoney.info; Wikipedia; CoinWeek",
    confidence: "high",
  },
  {
    id: "1976-first-day-postmark",
    statement:
      "On the first day of issue, people could take the new $2 bill to a post office and have it postmarked APR 13 1976, which is why many 1976 $2 notes carry a first-day postmark and stamp.",
    source: "Wikipedia; Coin World; CoinWeek",
    confidence: "high",
  },
  {
    id: "1976-print-window",
    statement:
      "Series 1976 $2 notes were printed from December 1975 through September 1979 and carry Neff-Simon signatures.",
    source: "uspapermoney.info",
    confidence: "high",
  },
  {
    id: "no-1975-1978-series",
    statement:
      "No $2 bills were series-dated 1975 or 1978. Small-size $2 notes jump from Series 1963/1963A (red seal) to Series 1976, then 1995 and later. Series year is the design year, not the exact print date.",
    source: "uspapermoney.info; multiple catalog references",
    confidence: "high",
  },
  {
    id: "1963-class",
    statement:
      "A 1963 or 1953 red seal $2 bill is a United States Note (Legal Tender Note), not a silver certificate. The red seal marks the United States Note class.",
    source: "Banknote Expert $2 series dataset; uspapermoney.info",
    confidence: "high",
  },
  {
    id: "1963-last-red-seal",
    statement:
      "Series 1963 and 1963A were the last red seal $2 issues. The $2 denomination was then discontinued in 1966 and not issued again until the Series 1976 green seal Federal Reserve Note.",
    source: "uspapermoney.info; numismatic reference",
    confidence: "high",
  },
  {
    id: "still-legal-tender",
    statement:
      "All of these $2 notes, including the 1963 red seal, are still legal tender and spendable at face value.",
    source: "general public record",
    confidence: "high",
  },
  {
    id: "1963-vs-1963a-runs",
    statement:
      "Series 1963A $2 notes are much scarcer than Series 1963. The Bureau of Engraving and Printing printed 15,360,000 regular 1963 notes but only 3,200,000 regular 1963A notes; each series had a single 640,000-note star run.",
    source: "BEP/Friedberg production records via uspapermoney.info, cross-checked with Numista",
    confidence: "high",
  },
];

/**
 * Claims the Silo C prompt asked about that FAILED verification. Do NOT publish
 * these. Kept here so no future pass re-introduces them by mistake.
 */
export const TWO_DOLLAR_REFUTED_CLAIMS: { statement: string; reason: string }[] = [
  {
    statement: "Over 10 million 1976 $2 notes were postmarked on the first day of issue.",
    reason: "Refuted in verification (1-2). No reliable source supports the 10 million figure; do not state a postmark count.",
  },
  {
    statement: "Post offices were authorised for the first time to postmark 13-cent stamps on April 13, 1976.",
    reason: "Refuted in verification (1-2). The 13-cent-stamp 'first authorised' detail is not supported; describe the postmark generically instead.",
  },
];

export const TWO_DOLLAR_FACTS_UPDATED = "2026-10-29";
