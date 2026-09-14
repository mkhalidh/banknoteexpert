import type { ReactNode } from "react";

/**
 * One accordion FAQ entry. Native `<details>` — no JS, works with JS
 * disabled, and the answer stays in the DOM (readable by search engines and
 * assistive tech) even while visually collapsed. The open/close motion is a
 * pure CSS `grid-template-rows` transition; author CSS overrides the
 * browser's default "hide closed details content" rule, so the animation
 * runs instead of an abrupt show/hide. Server Component.
 */
export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="group card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-zinc-700 dark:text-zinc-300">{children}</p>
        </div>
      </div>
    </details>
  );
}
