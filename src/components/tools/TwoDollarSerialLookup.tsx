"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial } from "@/lib/serial/score";
import { estimateValue } from "@/lib/serial/value";
import { ValueResultPanel } from "@/components/tools/ValueResultPanel";
import { ScoreMeter } from "@/components/tools/ScoreMeter";
import { AlertIcon, CheckCircleIcon, StarIcon, XIcon } from "@/components/ui/icons";
import { twoDollarSeries, getTwoDollarSeries } from "@/data/two-dollar-series";

const DEFAULT_SERIES = "1976";

export function TwoDollarSerialLookup() {
  const [series, setSeries] = useState(DEFAULT_SERIES);
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState("");
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
      setSubmitted(initialSerial);
    }
  }, []);

  // Keep the URL shareable without a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("series", series);
    const trimmed = submitted.trim();
    if (trimmed) {
      url.searchParams.set("serial", trimmed);
    } else {
      url.searchParams.delete("serial");
    }
    window.history.replaceState(null, "", url);
  }, [series, submitted]);

  const seriesInfo = useMemo(() => getTwoDollarSeries(series), [series]);
  const parsed = useMemo(
    () => (submitted.trim() ? parseSerial(submitted) : null),
    [submitted],
  );

  const analysis = useMemo(() => {
    if (!parsed || !parsed.ok) return null;
    const score = scoreSerial(parsed);
    const value = estimateValue(score.matches, 2);
    return { score, value, isStar: parsed.isStar };
  }, [parsed]);

  const errorMessage = parsed && !parsed.ok ? parsed.error : null;

  function clear() {
    setRaw("");
    setSubmitted("");
  }

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr_auto] sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(raw);
        }}
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
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 py-3.5 text-lg text-[var(--foreground)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-zinc-800"
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
          <div className="relative mt-1">
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
              className="w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-4 py-3.5 font-mono text-lg tracking-wider text-[var(--foreground)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-zinc-800"
            />
            {raw ? (
              <button
                type="button"
                aria-label="Clear serial number"
                onClick={clear}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <XIcon className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className="btn-primary h-[52px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Check
        </button>
      </form>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div aria-live="polite" className="card mt-6 min-h-[24rem] p-5">
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
          <p
            id={errorId}
            role="alert"
            key={errorMessage}
            className="animate-in mt-3 flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-400"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMessage}
          </p>
        ) : !analysis ? (
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Enter your note&rsquo;s 8-digit serial number to check it for
            collectible patterns and a star. Most $2 bills are worth exactly $2,
            and the tool will tell you honestly if yours is one of them. The
            check runs entirely in your browser.
          </p>
        ) : (
          <div key={submitted.trim()} className="animate-in mt-4 flex flex-col gap-5">
            <ScoreMeter score={analysis.score.score} tier={analysis.score.tier} />

            <div>
              <h3 className="text-sm font-semibold">Matched patterns</h3>
              {analysis.score.matches.length === 0 ? (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  No fancy pattern detected. This is an ordinary $2 note, worth
                  its face value of $2.
                </p>
              ) : (
                <ul className="mt-2 flex flex-col gap-2">
                  {analysis.score.matches.map((match, index) => (
                    <li
                      key={match.id}
                      className="animate-in flex items-start gap-2 text-sm"
                      style={{ animationDelay: `${80 + index * 60}ms` }}
                    >
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        <Link href={match.href} className="link-accent font-semibold">
                          {match.name}
                        </Link>
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {" "}
                          (roughly {match.rarityOdds})
                        </span>
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
              <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-700/60 dark:bg-amber-950/30">
                <StarIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p>
                  This is a <strong>star note</strong>, since its serial ends in a
                  star, marking it a replacement note.{" "}
                  <Link href="/star-note-lookup/" className="link-accent font-semibold">
                    Look it up in our star note tool
                  </Link>
                  .
                </p>
              </div>
            ) : null}

            <details className="text-sm">
              <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
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
                    <span className="font-mono tabular-nums">+{line.points}</span>
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
