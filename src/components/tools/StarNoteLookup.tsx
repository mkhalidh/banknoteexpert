"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial } from "@/lib/serial/score";
import { estimateValue } from "@/lib/serial/value";
import { ValueResultPanel } from "@/components/tools/ValueResultPanel";
import {
  lookupStarNote,
  coveredDenominations,
  seriesForDenomination,
} from "@/lib/star-note/lookup";
import { STAR_NOTE_DATA_UPDATED } from "@/data/star-notes/runs";

const DENOMINATIONS = coveredDenominations();
const DEFAULT_DENOM = String(DENOMINATIONS[0] ?? 1);
const DEFAULT_SERIES = seriesForDenomination(Number(DEFAULT_DENOM))[0] ?? "";

const RARITY_STYLE: Record<string, string> = {
  "Very Rare": "text-amber-700 dark:text-amber-400",
  Rare: "text-violet-700 dark:text-violet-400",
  Uncommon: "text-sky-700 dark:text-sky-400",
  Common: "text-zinc-600 dark:text-zinc-400",
};

function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

export function StarNoteLookup() {
  const [denom, setDenom] = useState(DEFAULT_DENOM);
  const [series, setSeries] = useState(DEFAULT_SERIES);
  const [raw, setRaw] = useState("");
  const denomId = useId();
  const seriesId = useId();
  const inputId = useId();
  const errorId = useId();

  const seriesOptions = useMemo(() => {
    const covered = seriesForDenomination(Number(denom));
    // Keep a URL-injected uncovered series in the list so the control stays
    // valid and the result panel can explain it is out of coverage.
    return series && !covered.includes(series) ? [series, ...covered] : covered;
  }, [denom, series]);

  function selectDenom(next: string) {
    setDenom(next);
    const options = seriesForDenomination(Number(next));
    if (!options.includes(series)) setSeries(options[0] ?? "");
  }

  // Read ?denom=&series=&serial= once on mount for shareable links.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("denom");
    const s = params.get("series");
    const serial = params.get("serial");
    const nextDenom = d && DENOMINATIONS.includes(Number(d)) ? d : DEFAULT_DENOM;
    const covered = seriesForDenomination(Number(nextDenom));
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate shareable state from the URL on mount */
    setDenom(nextDenom);
    // Honour a URL series verbatim (even if uncovered, so the tool can say so);
    // otherwise default to the first covered series for the denomination.
    setSeries(s ? s : (covered[0] ?? ""));
    if (serial) setRaw(serial);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Keep the URL shareable without a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("denom", denom);
    url.searchParams.set("series", series);
    const trimmed = raw.trim();
    if (trimmed) url.searchParams.set("serial", trimmed);
    else url.searchParams.delete("serial");
    window.history.replaceState(null, "", url);
  }, [denom, series, raw]);

  const result = useMemo(
    () => lookupStarNote(Number(denom), series, raw.trim() ? raw : ""),
    [denom, series, raw],
  );

  const fancy = useMemo(() => {
    if (!raw.trim()) return null;
    const parsed = parseSerial(raw);
    if (!parsed.ok) return null;
    const score = scoreSerial(parsed);
    return { matches: score.matches, value: estimateValue(score.matches, Number(denom)) };
  }, [raw, denom]);

  const showResult = raw.trim().length > 0;

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-3 sm:grid-cols-[7rem_9rem_1fr]"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div>
          <label htmlFor={denomId} className="block text-sm font-medium">
            Denomination
          </label>
          <select
            id={denomId}
            value={denom}
            onChange={(event) => selectDenom(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-lg text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {DENOMINATIONS.map((d) => (
              <option key={d} value={d}>
                ${d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={seriesId} className="block text-sm font-medium">
            Series
          </label>
          <select
            id={seriesId}
            value={series}
            onChange={(event) => setSeries(event.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-lg text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {seriesOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium">
            Star serial number
          </label>
          <input
            id={inputId}
            name="serial"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. L00088892*"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            aria-describedby={result.status === "invalid-serial" ? errorId : undefined}
            aria-invalid={result.status === "invalid-serial" ? true : undefined}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-lg tracking-wider text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </form>

      <p className="mt-3 text-xs text-zinc-500">
        For ${denom}, the dataset covers series {seriesOptions.join(", ") || "—"}.
        Figures come from BEP monthly production reports; last updated{" "}
        {STAR_NOTE_DATA_UPDATED}.
      </p>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div
        aria-live="polite"
        className="mt-6 min-h-[24rem] rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        {!showResult ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your star note&rsquo;s serial number to check its print run,
            rarity tier and any fancy pattern. A star note ends in a star (*).
            Everything runs in your browser.
          </p>
        ) : result.status === "invalid-serial" ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
            {result.message}
          </p>
        ) : result.status !== "found" ? (
          <div>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {result.status === "not-star"
                ? "Not a star note"
                : result.status === "series-unsupported"
                  ? "Series not in the dataset"
                  : "No matching print run"}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {result.message}
            </p>
            {fancy && fancy.matches.length > 0 ? (
              <div className="mt-3">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  The serial itself is still a fancy one:
                </p>
                <FancyBlock matches={fancy.matches} />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Fact label="Run size">{formatInt(result.runs[0].runSize)} notes</Fact>
              <Fact label="FRB district">
                {result.runs[0].frbName} ({result.runs[0].frbLetter})
              </Fact>
              <Fact label="Rarity tier">
                <span className={RARITY_STYLE[result.rarityTier ?? "Common"]}>
                  {result.rarityTier}
                </span>
              </Fact>
            </div>

            {fancy && fancy.matches.length > 0 ? (
              <FancyBlock matches={fancy.matches} />
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No fancy pattern in the serial itself — its value comes from the
                star and the print-run size.
              </p>
            )}

            {fancy && fancy.matches.length > 0 ? (
              <ValueResultPanel result={fancy.value} />
            ) : null}

            <p className="text-sm">
              <a
                href={result.runs[0].sourcePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-700 hover:underline dark:text-indigo-400"
              >
                Verify this run in the BEP report it came from
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-base font-semibold">{children}</p>
    </div>
  );
}

function FancyBlock({
  matches,
}: {
  matches: { id: string; name: string; href: string; rarityOdds: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">Fancy pattern in the serial</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {matches.map((match) => (
          <li key={match.id} className="text-sm">
            <Link
              href={match.href}
              className="font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
            >
              {match.name}
            </Link>
            <span className="text-zinc-600 dark:text-zinc-400">
              {" "}
              &mdash; roughly {match.rarityOdds}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
