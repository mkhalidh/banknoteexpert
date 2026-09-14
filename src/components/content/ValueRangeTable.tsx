import {
  ALL_CONDITIONS,
  CONDITION_LABELS,
  VALUE_PATTERN_LABELS,
  VALUE_UPDATED,
  valueCell,
  valuePatternUniverse,
} from "@/lib/serial/value";
import type { NoteCondition } from "@/data/value-ranges";

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function patternLabel(pattern: string): string {
  return VALUE_PATTERN_LABELS[pattern] ?? pattern;
}

/** Highest recorded high for a pattern, or -1 when it has no bands. */
function maxHigh(pattern: string): number {
  let max = -1;
  for (const condition of ALL_CONDITIONS) {
    const cell = valueCell(pattern, condition);
    if (cell.status === "ok") max = Math.max(max, cell.band.high);
  }
  return max;
}

function Cell({ pattern, condition }: { pattern: string; condition: NoteCondition }) {
  const cell = valueCell(pattern, condition);
  if (cell.status === "insufficient-data") {
    return (
      <td className="py-2 pr-4 text-xs italic text-zinc-400">no recorded sales</td>
    );
  }
  const { band } = cell;
  return (
    <td className="py-2 pr-4">
      <span className="font-medium tabular-nums">
        {formatUsd(band.low)}&ndash;{formatUsd(band.high)}
      </span>
      <span className="ml-2 whitespace-nowrap text-xs text-zinc-500">
        {band.sampleSize} {band.sampleSize === 1 ? "sale" : "sales"}
        {band.confidence === "indicative" ? " · indicative" : ""}
      </span>
    </td>
  );
}

/**
 * Full pattern × condition value matrix, built from the real sampled bands via
 * the value engine. Every figure shows its sample size; small samples are
 * flagged "indicative"; missing combinations read "no recorded sales" rather
 * than a zero or a dash. Server Component.
 */
export function ValueRangeTable() {
  const rows = valuePatternUniverse().sort((a, b) => maxHigh(b) - maxHigh(a));

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <caption className="sr-only">
            Recorded value ranges by pattern and condition, with sample sizes
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-soft)] text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Pattern
              </th>
              {ALL_CONDITIONS.map((condition) => (
                <th key={condition} scope="col" className="py-2 pr-4 font-semibold">
                  {CONDITION_LABELS[condition]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((pattern) => (
              <tr key={pattern} className="border-b border-[var(--border-soft)] align-top">
                <th scope="row" className="py-2 pr-4 text-left font-medium">
                  {patternLabel(pattern)}
                </th>
                {ALL_CONDITIONS.map((condition) => (
                  <Cell key={condition} pattern={pattern} condition={condition} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-col gap-1 text-xs text-zinc-500">
        <p>Last updated {VALUE_UPDATED}.</p>
        <p>
          Bands are the range of recorded sold prices. &ldquo;Indicative&rdquo;
          marks a small sample — what has been paid, not a reliable market range.
          Blank combinations have no recorded sales and are left empty rather than
          guessed.
        </p>
      </div>
    </div>
  );
}
