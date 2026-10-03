/**
 * Small-size $2 note series reference.
 *
 * Series years, seal colours and note types are documented public facts.
 * Sources: uspapermoney.info small-size type-note tables and U.S. Bureau of
 * Engraving and Printing records (bep.gov). NO dollar figures live in this file
 *, value ranges come only from src/data/value-ranges.ts.
 *
 * Red seal  = United States Note / Legal Tender Note (1928–1963 series).
 * Green seal = Federal Reserve Note (1976 onward).
 */

export interface TwoDollarSeries {
  series: string;
  sealColor: "red" | "green";
  noteType: "Legal Tender Note" | "Federal Reserve Note";
  hasStarNotes: boolean;
  source: string;
}

const SOURCE =
  "Series, seal colour and note type per uspapermoney.info small-size two-dollar note tables and U.S. Bureau of Engraving and Printing records (bep.gov).";

export const twoDollarSeries: TwoDollarSeries[] = [
  { series: "1928", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928A", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928B", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928C", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928D", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928E", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928F", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1928G", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1953", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1953A", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1953B", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1953C", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1963", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1963A", sealColor: "red", noteType: "Legal Tender Note", hasStarNotes: true, source: SOURCE },
  { series: "1976", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "1995", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "2003", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "2003A", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "2009", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "2013", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
  { series: "2017A", sealColor: "green", noteType: "Federal Reserve Note", hasStarNotes: true, source: SOURCE },
];

/** Look up a single series row by its exact label. Returns undefined if unknown. */
export function getTwoDollarSeries(series: string): TwoDollarSeries | undefined {
  return twoDollarSeries.find((entry) => entry.series === series);
}
