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
import { AlertIcon, CheckCircleIcon, XIcon } from "@/components/ui/icons";

const DENOMINATIONS = coveredDenominations();
const DEFAULT_DENOM = String(DENOMINATIONS[0] ?? 1);
const DEFAULT_SERIES = seriesForDenomination(Number(DEFAULT_DENOM))[0] ?? "";

const RARITY_STYLE: Record<string, string> = {
  "Very Rare": "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
  Rare: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  Uncommon: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
  Common: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

export function StarNoteLookup() {
  const [denom, setDenom] = useState(DEFAULT_DENOM);
  const [series, setSeries] = useState(DEFAULT_SERIES);
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState("");
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
    if (serial) {
      setRaw(serial);
      setSubmitted(serial);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Keep the URL shareable without a re-render or Next navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("denom", denom);
    url.searchParams.set("series", series);
    const trimmed = submitted.trim();
    if (trimmed) url.searchParams.set("serial", trimmed);
    else url.searchParams.delete("serial");
    window.history.replaceState(null, "", url);
  }, [denom, series, submitted]);

  const result = useMemo(
    () => lookupStarNote(Number(denom), series, submitted.trim() ? submitted : ""),
    [denom, series, submitted],
  );

  const fancy = useMemo(() => {
    if (!submitted.trim()) return null;
    const parsed = parseSerial(submitted);
    if (!parsed.ok) return null;
    const score = scoreSerial(parsed);
    return { matches: score.matches, value: estimateValue(score.matches, Number(denom)) };
  }, [submitted, denom]);

  const showResult = submitted.trim().length > 0;

  function clear() {
    setRaw("");
    setSubmitted("");
  }

  return (
    <div className="star-workstation">
      <form
        className="star-form grid grid-cols-2 gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(raw);
        }}
        noValidate
      >
        <div>
          <span id={denomId} className="block text-sm font-medium">
            Denomination
          </span>
          <div className="star-choices mt-2" role="radiogroup" aria-labelledby={denomId}>
            {DENOMINATIONS.map((d) => (
              <label key={d}>
                <input className="sr-only" type="radio" name={denomId} value={d} checked={denom === String(d)} onChange={() => selectDenom(String(d))} />
                <span>${d}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <span id={seriesId} className="block text-sm font-medium">
            Series
          </span>
          <div className="star-choices star-series mt-2" role="radiogroup" aria-labelledby={seriesId}>
            {seriesOptions.map((s) => (
              <label key={s}>
                <input className="sr-only" type="radio" name={seriesId} value={s} checked={series === s} onChange={() => setSeries(s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium">
            Star serial number
          </label>
          <div className="relative mt-1">
            <input
              id={inputId}
              name="serial"
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. L00088892*"
              value={raw}
              onChange={(event) => setRaw(event.target.value)}
              aria-describedby={result.status === "invalid-serial" ? errorId : undefined}
              aria-invalid={result.status === "invalid-serial" ? true : undefined}
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

      <p className="star-dataset-note mt-3 text-xs text-zinc-500">
        For ${denom}, the dataset covers series {seriesOptions.join(", ") || "none"}.
        Figures come from BEP monthly production reports; last updated{" "}
        {STAR_NOTE_DATA_UPDATED}.
      </p>

      {/* Result region: height reserved up front so there is zero layout shift. */}
      <div aria-live="polite" className="star-result card min-h-[24rem] p-5">
        {!showResult ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your star note&rsquo;s serial number to check its print run,
            rarity tier and any fancy pattern. A star note ends in a star (*).
            Everything runs in your browser.
          </p>
        ) : result.status === "invalid-serial" ? (
          <p
            id={errorId}
            role="alert"
            key={result.message}
            className="animate-in flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-400"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {result.message}
          </p>
        ) : result.status !== "found" ? (
          <div key={result.status} className="animate-in">
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
          <div key={submitted.trim()} className="animate-in flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Fact label="Run size">{formatInt(result.runs[0].runSize)} notes</Fact>
              <Fact label="FRB district">
                {result.runs[0].frbName} ({result.runs[0].frbLetter})
              </Fact>
              <Fact label="Rarity tier">
                <span className={`pill ${RARITY_STYLE[result.rarityTier ?? "Common"]}`}>
                  {result.rarityTier}
                </span>
              </Fact>
            </div>

            {fancy && fancy.matches.length > 0 ? (
              <FancyBlock matches={fancy.matches} />
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No fancy pattern in the serial itself. Its value comes from the
                star and the print-run size.
              </p>
            )}

            {fancy && fancy.matches.length > 0 ? (
              <ValueResultPanel result={fancy.value} />
            ) : null}

            <p className="text-sm">Source: Bureau of Engraving and Printing monthly production report.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="star-fact p-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 font-mono text-base font-semibold">{children}</p>
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
        {matches.map((match, index) => (
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
    </div>
  );
}
