"use client";

import { useEffect, useRef, useState } from "react";

export const SCORE_TIER_STYLES: Record<string, { bar: string; pill: string }> = {
  Common: {
    bar: "bg-zinc-400",
    pill: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  },
  Notable: {
    bar: "bg-teal-600",
    pill: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
  },
  Rare: {
    bar: "bg-[var(--secondary)]",
    pill: "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  },
  "Very Rare": {
    bar: "bg-rose-800",
    pill: "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
  },
  Exceptional: {
    bar: "bg-amber-500",
    pill: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  },
};

const DURATION_MS = 650;
// Ease-out cubic: fast start, gentle settle, matches the bar's own easing.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animated rarity score bar + tier pill + count-up number, shared by every
 * checker. The number and the bar are driven by the same rAF-interpolated
 * value each frame, so they land together instead of the number jumping
 * ahead of the fill (apple-design §11: continuous motion, not a jump cut).
 */
export function ScoreMeter({ score, tier }: { score: number; tier: string }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);
  const style = SCORE_TIER_STYLES[tier] ?? SCORE_TIER_STYLES.Common;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip the count-up when motion is reduced
      setDisplay(score);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setDisplay(Math.round(easeOut(progress) * score));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [score]);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Rarity score
        </span>
        <span className={`pill ${style.pill}`}>{tier}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className={`h-2.5 rounded-full ${style.bar}`}
            style={{ width: `${display}%` }}
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={score}
            aria-label={`Rarity score ${score} out of 100`}
          />
        </div>
        <span className="w-14 text-right font-mono text-2xl font-bold tabular-nums">
          {display}
        </span>
      </div>
    </div>
  );
}
