"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial } from "@/lib/serial/score";
import { estimateValue } from "@/lib/serial/value";
import { ValueResultPanel } from "@/components/tools/ValueResultPanel";
import { ScoreMeter } from "@/components/tools/ScoreMeter";
import { AlertIcon, CheckCircleIcon, StarIcon, XIcon } from "@/components/ui/icons";

export function FancySerialChecker() {
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState("");
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
      setSubmitted(initial);
    }
  }, []);

  // Keep the URL shareable without triggering a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    const trimmed = submitted.trim();
    if (trimmed) {
      url.searchParams.set("serial", trimmed);
    } else {
      url.searchParams.delete("serial");
    }
    window.history.replaceState(null, "", url);
  }, [submitted]);

  const parsed = useMemo(
    () => (submitted.trim() ? parseSerial(submitted) : null),
    [submitted],
  );

  const analysis = useMemo(() => {
    if (!parsed || !parsed.ok) return null;
    const score = scoreSerial(parsed);
    const value = estimateValue(score.matches);
    return { score, value, isStar: parsed.isStar, normalized: parsed.normalized };
  }, [parsed]);

  const errorMessage = parsed && !parsed.ok ? parsed.error : null;

  function clear() {
    setRaw("");
    setSubmitted("");
  }

  return (
    <div className="rounded-[1.5rem] border border-[rgba(31,92,66,0.12)] bg-[rgba(255,255,255,0.68)] p-4 shadow-[0_14px_32px_-22px_rgba(18,45,34,0.3)] md:p-6">
      <form
        className="flex flex-col gap-3 rounded-[1.25rem] border border-[rgba(31,92,66,0.12)] bg-[rgba(255,255,255,0.7)] p-3 md:flex-row md:items-end md:p-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(raw);
        }}
        noValidate
      >
        <div className="flex-1">
          <label htmlFor={inputId} className="block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Enter your bill&rsquo;s serial number
          </label>
          <div className="relative mt-1.5">
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
              className="w-full rounded-2xl border border-[rgba(31,92,66,0.15)] bg-[rgba(247,243,236,0.9)] px-4 py-3.5 font-mono text-lg tracking-[0.22em] text-[var(--foreground)] shadow-inner transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] dark:border-zinc-800"
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
          className="btn-primary mt-1 h-[52px] shrink-0 self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:mt-0"
        >
          Check
        </button>
      </form>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div aria-live="polite" className="card mt-6 min-h-[22rem] overflow-hidden rounded-[1.5rem] p-5">
        {errorMessage ? (
          <p
            id={errorId}
            role="alert"
            key={errorMessage}
            className="animate-in flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-400"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMessage}
          </p>
        ) : !analysis ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your bill&rsquo;s 8-digit serial number above to see its rarity
            score, any matched patterns and an estimated value range. Nothing is
            uploaded. The check runs entirely in your browser.
          </p>
        ) : (
          <div key={analysis.normalized} className="animate-in flex flex-col gap-5">
            <ScoreMeter score={analysis.score.score} tier={analysis.score.tier} />

            <div>
              <h3 className="text-sm font-semibold">Matched patterns</h3>
              {analysis.score.matches.length === 0 ? (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  No fancy pattern detected. This looks like an ordinary
                  serial number.
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

            <ValueResultPanel result={analysis.value} />

            {analysis.isStar ? (
              <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-700/60 dark:bg-amber-950/30">
                <StarIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p>
                  This is a <strong>star note</strong> (its serial ends in a star).
                  Star notes are replacement notes and are scarcer than standard
                  runs.{" "}
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
