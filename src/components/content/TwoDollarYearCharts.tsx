import { ComparisonTable } from "@/components/content/ComparisonTable";
import { TWO_DOLLAR_VALUES } from "@/data/two-dollar-values";
import {
  TWO_DOLLAR_STAR_VALUE_BANDS,
  type NoteCondition,
} from "@/data/two-dollar-star-values";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

const range = (low: number | null, high: number | null) =>
  low === null || high === null ? "Not recorded" : low === high ? money(low) : `${money(low)} to ${money(high)}`;

const STAR_CONDITIONS: { key: NoteCondition; label: string }[] = [
  { key: "circulated", label: "Circulated" },
  { key: "vf", label: "Very Fine" },
  { key: "unc", label: "Uncirculated" },
];

/**
 * Regular + star value charts for one $2 series year, built only from the site's
 * datasets. Regular rows come from the $2 series compilation; star rows from the
 * recorded single-note star sales. Cells with no data read honestly. Server Component.
 */
export function TwoDollarYearCharts({ seriesList }: { seriesList: string[] }) {
  const regularRows = TWO_DOLLAR_VALUES.filter((v) => seriesList.includes(v.series)).map((v) => [
    `Series ${v.series}`,
    range(v.circulatedLow, v.circulatedHigh),
    range(v.uncirculatedLow, v.uncirculatedHigh),
  ]);

  const starSeries = seriesList.filter((s) =>
    TWO_DOLLAR_STAR_VALUE_BANDS.some((b) => b.series === s),
  );
  const starRows = starSeries.map((series) => [
    `Series ${series} star`,
    ...STAR_CONDITIONS.map(({ key }) => {
      const band = TWO_DOLLAR_STAR_VALUE_BANDS.find((b) => b.series === series && b.condition === key);
      return band
        ? `${money(band.low)} to ${money(band.high)} (${band.sampleSize} sales, ${band.confidence})`
        : "No recorded sales";
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <ComparisonTable
        caption="Regular (non-star) notes by condition, from the $2 series compilation"
        columns={["Series", "Circulated", "Uncirculated"]}
        rows={regularRows}
      />
      {starRows.length > 0 ? (
        <ComparisonTable
          caption="Star notes by condition, from recorded single-note sales"
          columns={["Series", "Circulated", "Very Fine", "Uncirculated"]}
          rows={starRows}
        />
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No recorded single-note star sales for this series yet. Star notes still
          carry a premium; use the star note lookup to read their print run.
        </p>
      )}
    </div>
  );
}
