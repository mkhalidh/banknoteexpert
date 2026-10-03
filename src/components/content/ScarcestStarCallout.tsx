import Link from "next/link";
import { STAR_NOTE_RUNS } from "@/data/star-notes/runs";

// Verified against the data at render time, no hardcoded figure.
const RUNS_2003 = STAR_NOTE_RUNS.filter(
  (r) => r.denomination === 2 && r.series === "2003",
);
const MIN_2003 = RUNS_2003.length ? Math.min(...RUNS_2003.map((r) => r.runSize)) : 0;
const DISTRICTS_AT_MIN = RUNS_2003.filter((r) => r.runSize === MIN_2003).length;
const GLOBAL_MIN = Math.min(...STAR_NOTE_RUNS.map((r) => r.runSize));
const IS_SCARCEST = MIN_2003 === GLOBAL_MIN;

/**
 * Factual callout about the scarcest star runs in the dataset, $2 series 2003.
 * All figures are computed from STAR_NOTE_RUNS, not hardcoded. Renders nothing
 * if the data no longer supports the claim. Server Component.
 */
export function ScarcestStarCallout({ cta }: { cta?: { href: string; label: string } }) {
  if (!IS_SCARCEST || DISTRICTS_AT_MIN === 0) return null;
  return (
    <aside className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700/60 dark:bg-amber-950/30">
      <p className="text-zinc-800 dark:text-zinc-200">
        <strong>The scarcest runs in the dataset are $2 series 2003 stars.</strong>{" "}
        {DISTRICTS_AT_MIN} Federal Reserve districts printed just{" "}
        {MIN_2003.toLocaleString("en-US")} star notes each, a small fraction of a
        normal star run, and by a wide margin the smallest print runs recorded.
      </p>
      {cta ? (
        <p className="mt-2">
          <Link href={cta.href} className="link-accent font-semibold">
            {cta.label}
          </Link>
        </p>
      ) : null}
    </aside>
  );
}
