import {
  TWO_DOLLAR_VALUES,
  TWO_DOLLAR_VALUES_UPDATED,
  type TwoDollarValue,
} from "@/data/two-dollar-values";

function money(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format a low/high pair, handling nulls and equal bounds explicitly. */
function range(low: number | null, high: number | null): string {
  if (low === null || high === null) return "not recorded";
  if (low === high) return money(low);
  return `${money(low)}–${money(high)}`;
}

function Row({ row }: { row: TwoDollarValue }) {
  return (
    <tr className="border-b border-[var(--border-soft)] align-top">
      <th scope="row" className="py-2 pr-4 text-left font-medium">
        {row.series}
        {row.correction ? (
          <sup title="Adjusted for consistency" className="ml-0.5 text-amber-600">
            †
          </sup>
        ) : null}
      </th>
      <td className="py-2 pr-4 tabular-nums">
        {range(row.circulatedLow, row.circulatedHigh)}
      </td>
      <td className="py-2 pr-4 tabular-nums">
        {range(row.uncirculatedLow, row.uncirculatedHigh)}
      </td>
      <td className="py-2">
        <span className="pill bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {row.confidence}
        </span>
      </td>
    </tr>
  );
}

function Table({ caption, rows }: { caption: string; rows: TwoDollarValue[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <caption className="mb-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-[var(--border-soft)] text-left">
            <th scope="col" className="py-2 pr-4 font-semibold">Series</th>
            <th scope="col" className="py-2 pr-4 font-semibold">Circulated</th>
            <th scope="col" className="py-2 pr-4 font-semibold">Uncirculated</th>
            <th scope="col" className="py-2 font-semibold">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.series} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Numeric $2 value chart grouped by seal colour. Face-value (still-circulating)
 * series are grouped and introduced with the plain fact that they are normally
 * worth $2. Nulls read "not recorded"; corrected rows are flagged, not shown
 * raw. Server Component.
 */
export function TwoDollarValueChart() {
  const red = TWO_DOLLAR_VALUES.filter((r) => r.sealColor === "red");
  const green = TWO_DOLLAR_VALUES.filter((r) => r.sealColor === "green");
  const anyCorrection = TWO_DOLLAR_VALUES.some((r) => r.correction);

  return (
    <div className="flex flex-col gap-6">
      <Table
        caption="Red seal — Legal Tender Notes (1928–1963), a genuine collector market"
        rows={red}
      />
      <div>
        <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">
          The green-seal series below still circulate and are normally worth
          exactly <strong>$2</strong>. The figures show occasional small premiums
          on crisp, uncirculated examples — not a collector market.
        </p>
        <Table
          caption="Green seal — Federal Reserve Notes (1976 onward), still in circulation"
          rows={green}
        />
      </div>
      <div className="flex flex-col gap-1 text-xs text-zinc-500">
        <p>Last updated {TWO_DOLLAR_VALUES_UPDATED}.</p>
        {anyCorrection ? (
          <p>
            † Adjusted for consistency (an uncirculated figure cannot fall below
            the circulated one for the same series); such rows are marked
            indicative.
          </p>
        ) : null}
        <p>
          Compiled from a published price guide that aggregates eBay and Heritage
          Auctions sold data. &ldquo;Indicative&rdquo; marks a thin or adjusted
          sample.
        </p>
      </div>
    </div>
  );
}
