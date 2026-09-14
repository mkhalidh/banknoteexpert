import {
  CONDITION_LABELS,
  VALUE_PATTERN_LABELS,
  type ValueResult,
} from "@/lib/serial/value";

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function patternLabel(pattern: string): string {
  return VALUE_PATTERN_LABELS[pattern] ?? pattern;
}

/**
 * Renders a value result honestly: a range per condition with its sample size
 * and confidence, or an explicit "insufficient data" message. Never a single
 * number, never $0, never an empty cell. Presentational — no client hooks.
 */
export function ValueResultPanel({ result }: { result: ValueResult }) {
  if (result.status === "insufficient-data") {
    const label = patternLabel(result.pattern);
    const message =
      result.reason === "unmapped"
        ? "We don't have recorded sales for this pattern, so we can't show a value. We leave it blank rather than guess."
        : `No recorded sales for the ${label} pattern yet. We leave this blank rather than guess a figure.`;
    return (
      <div>
        <h3 className="text-sm font-semibold">Estimated value</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
      </div>
    );
  }

  const hasIndicative = result.bands.some((b) => b.confidence === "indicative");

  return (
    <div>
      <h3 className="text-sm font-semibold">
        Estimated value{" "}
        <span className="font-normal text-zinc-500">
          &mdash; {patternLabel(result.pattern)}
        </span>
      </h3>
      <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {result.bands.map((band) => (
          <div
            key={band.condition}
            className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <dt className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-500">
              <span>{CONDITION_LABELS[band.condition]}</span>
              {band.confidence === "indicative" ? (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                  indicative
                </span>
              ) : null}
            </dt>
            <dd className="mt-1 text-base font-semibold tabular-nums">
              {formatUsd(band.low)}&ndash;{formatUsd(band.high)}
            </dd>
            <dd className="mt-0.5 text-xs text-zinc-500">
              based on {band.sampleSize} recorded{" "}
              {band.sampleSize === 1 ? "sale" : "sales"}
            </dd>
          </div>
        ))}
      </dl>
      {hasIndicative ? (
        <p className="mt-2 text-xs text-zinc-500">
          &ldquo;Indicative&rdquo; bands rest on a small sample: they show what
          has been paid, not a reliable market range.
        </p>
      ) : null}
      <p className="mt-1 text-xs text-zinc-500">
        Ranges are guidance, not an appraisal. Last updated {result.updated}.
      </p>
    </div>
  );
}
