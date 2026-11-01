import { ComparisonTable } from "@/components/content/ComparisonTable";
import { STAR_NOTE_RUNS } from "@/data/star-notes/runs";
import { rarityForRunSize } from "@/lib/star-note/lookup";

/**
 * Per-district $2 star print-run table for one series, straight from the BEP
 * star-note dataset. Renders an honest note when the series has no run data.
 * Server Component.
 */
export function TwoDollarStarRunTable({ series }: { series: string }) {
  const runs = STAR_NOTE_RUNS.filter(
    (r) => r.denomination === 2 && r.series === series,
  ).sort((a, b) => a.runSize - b.runSize);

  if (runs.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Our BEP production dataset has no $2 star print runs recorded for Series{" "}
        {series}, so we do not publish run sizes for it. Star notes from this series
        still carry a premium; condition and scarcity decide the figure.
      </p>
    );
  }

  const rows = runs.map((r) => [
    `${r.frbLetter} ${r.frbName}`,
    r.runSize.toLocaleString("en-US"),
    rarityForRunSize(r.runSize),
  ]);

  return (
    <ComparisonTable
      caption={`Series ${series} $2 star notes printed by Federal Reserve district`}
      columns={["District", "Star notes printed", "Rarity tier"]}
      rows={rows}
    />
  );
}
