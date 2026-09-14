"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial } from "@/lib/serial/score";
import { estimateValue } from "@/lib/serial/value";
import { ValueResultPanel } from "@/components/tools/ValueResultPanel";
import { twoDollarSeries, getTwoDollarSeries } from "@/data/two-dollar-series";

const TIER_BAR: Record<string, string> = {
  Common: "bg-zinc-400",
  Notable: "bg-sky-500",
  Rare: "bg-indigo-500",
  "Very Rare": "bg-violet-600",
  Exceptional: "bg-amber-500",
};

const DEFAULT_SERIES = "1976";

export function TwoDollarSerialLookup() {
  const [series, setSeries] = useState(DEFAULT_SERIES);
  const [raw, setRaw] = useState("");
  const seriesId = useId();
  const inputId = useId();
  const errorId = useId();

  // Read ?series= and ?serial= once on mount so a shared link shows its result.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSeries = params.get("series");
    const initialSerial = params.get("serial");
    if (initialSeries && getTwoDollarSeries(initialSeries)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from URL on mount
      setSeries(initialSeries);
    }
    if (initialSerial) {
      setRaw(initialSerial);
    }
  }, []);

  // Keep the URL shareable without a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("series", series);
    const trimmed = raw.trim();
    if (trimmed) {
      url.searchParams.set("serial", trimmed);
    } else {
      url.searchParams.delete("serial");
    }
    window.history.replaceState(null, "", url);
  }, [series, raw]);

  const seriesInfo = useMemo(() => getTwoDollarSeries(series), [series]);
  const parsed = useMemo(() => (raw.trim() ? parseSerial(raw) : null), [raw]);

  const analysis = useMemo(() => {
    if (!parsed || !parsed.ok) return null;
    const score = scoreSerial(parsed);
    const value = estimateValue(score.matches, 2);
    return { score, value, isStar: parsed.isStar };
  }, [parsed]);

  const errorMessage = parsed && !parsed.ok ? parsed.error : null;

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-end"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
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
            {twoDollarSeries.map((entry) => (
              <option key={entry.series} value={entry.series}>
                {entry.series}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium">
            Serial number
          </label>
          <input
            id={inputId}
            name="serial"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. 12121212"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-invalid={errorMessage ? true : undefined}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-lg tracking-wider text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <button
          type="submit"
          className="h-[52px] shrink-0 rounded-lg bg-indigo-600 px-6 text-base font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Check
        </button>
      </form>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div
        aria-live="polite"
        className="mt-6 min-h-[24rem] rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        {/* Series facts are always shown, even before a serial is entered. */}
        {seriesInfo ? (
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold">Series {seriesInfo.series}:</span>{" "}
            {seriesInfo.sealColor === "red" ? "red" : "green"} seal,{" "}
            {seriesInfo.noteType}
            {seriesInfo.hasStarNotes ? "; star notes exist for this series." : "."}
          </p>
        ) : null}

        {errorMessage ? (
          <p id={errorId} role="alert" className="mt-3 text-sm font-medium text-red-700 dark:text-red-400">
            {errorMessage}
          </p>
        ) : !analysis ? (
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Enter your note&rsquo;s 8-digit serial number to check it for
            collectible patterns and a star. Most $2 bills are worth exactly $2
            &mdash; the tool will tell you honestly if yours is one of them. The
            check runs entirely in your browser.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-5">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Rarity score
                </span>
                <span className="text-sm font-semibold">{analysis.score.tier}</span>
              </div>
              <div className="mt-1 flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className={`h-3 rounded-full ${TIER_BAR[analysis.score.tier]}`}
                    style={{ width: `${analysis.score.score}%` }}
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={analysis.score.score}
                    aria-label={`Rarity score ${analysis.score.score} out of 100`}
                  />
                </div>
                <span className="w-14 text-right text-2xl font-bold tabular-nums">
                  {analysis.score.score}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Matched patterns</h3>
              {analysis.score.matches.length === 0 ? (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  No fancy pattern detected. This is an ordinary $2 note, worth
                  its face value of $2.
                </p>
              ) : (
                <ul className="mt-2 flex flex-col gap-2">
                  {analysis.score.matches.map((match) => (
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
              )}
            </div>

            <div>
              <ValueResultPanel result={analysis.value} />
              <p className="mt-1 text-xs text-zinc-500">
                Ranges reflect the pattern, not the denomination. Most $2 notes
                are worth exactly $2.
              </p>
            </div>

            {analysis.isStar ? (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-700/60 dark:bg-amber-950/30">
                This is a <strong>star note</strong> &mdash; its serial ends in a
                star, marking it a replacement note.{" "}
                <Link
                  href="/star-note-lookup/"
                  className="font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
                >
                  Look it up in our star note tool
                </Link>
                .
              </div>
            ) : null}

            <details className="text-sm">
              <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Score breakdown
              </summary>
              <ul className="mt-2 flex flex-col gap-1">
                {analysis.score.breakdown.map((line, index) => (
                  <li
                    key={`${line.label}-${index}`}
                    className="flex justify-between gap-4 text-zinc-700 dark:text-zinc-300"
                  >
                    <span>
                      {line.label}
                      {line.detail ? (
                        <span className="text-zinc-500"> ({line.detail})</span>
                      ) : null}
                    </span>
                    <span className="tabular-nums">+{line.points}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
