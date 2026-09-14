"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial } from "@/lib/serial/score";
import { estimateValue } from "@/lib/serial/value";
import { ValueResultPanel } from "@/components/tools/ValueResultPanel";

const TIER_BAR: Record<string, string> = {
  Common: "bg-zinc-400",
  Notable: "bg-sky-500",
  Rare: "bg-indigo-500",
  "Very Rare": "bg-violet-600",
  Exceptional: "bg-amber-500",
};

export function FancySerialChecker() {
  const [raw, setRaw] = useState("");
  const inputId = useId();
  const errorId = useId();

  // Show a shared link's result immediately: read ?serial= once on mount.
  // The URL query is an external source only available on the client, so a
  // one-time post-mount sync is intentional here.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("serial");
    if (initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate shareable state from the URL on mount
      setRaw(initial);
    }
  }, []);

  // Keep the URL shareable without triggering a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    const trimmed = raw.trim();
    if (trimmed) {
      url.searchParams.set("serial", trimmed);
    } else {
      url.searchParams.delete("serial");
    }
    window.history.replaceState(null, "", url);
  }, [raw]);

  const parsed = useMemo(() => (raw.trim() ? parseSerial(raw) : null), [raw]);

  const analysis = useMemo(() => {
    if (!parsed || !parsed.ok) return null;
    const score = scoreSerial(parsed);
    const value = estimateValue(score.matches);
    return { score, value, isStar: parsed.isStar, normalized: parsed.normalized };
  }, [parsed]);

  const errorMessage = parsed && !parsed.ok ? parsed.error : null;

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div className="flex-1">
          <label htmlFor={inputId} className="block text-sm font-medium">
            Enter your bill&rsquo;s serial number
          </label>
          <input
            id={inputId}
            name="serial"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. 12344321"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-invalid={errorMessage ? true : undefined}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-lg tracking-wider text-zinc-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <button
          type="submit"
          className="mt-1 h-[52px] shrink-0 self-end rounded-lg bg-indigo-600 px-6 text-base font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-7"
        >
          Check
        </button>
      </form>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div
        aria-live="polite"
        className="mt-6 min-h-[22rem] rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        {errorMessage ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
            {errorMessage}
          </p>
        ) : !analysis ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your bill&rsquo;s 8-digit serial number above to see its rarity
            score, any matched patterns and an estimated value range. Nothing is
            uploaded &mdash; the check runs entirely in your browser.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Rarity score
                </span>
                <span className="text-sm font-semibold">
                  {analysis.score.tier}
                </span>
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
                  No fancy pattern detected &mdash; this looks like an ordinary
                  serial number.
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

            <ValueResultPanel result={analysis.value} />

            {analysis.isStar ? (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-700/60 dark:bg-amber-950/30">
                This is a <strong>star note</strong> (its serial ends in a star).
                Star notes are replacement notes and are scarcer than standard
                runs.{" "}
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
