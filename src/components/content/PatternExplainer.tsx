import Link from "next/link";

export interface PatternExplainerProps {
  /** Anchor id (the pattern slug), e.g. "binary". */
  id: string;
  name: string;
  example: string;
  rarityOdds: string;
  /** Registry href: a "#slug" hub anchor or a dedicated page path. */
  href: string;
  /** Prose definition (from the content module). */
  definition: string;
  /** Prose note on what drives this pattern's value (from the content module). */
  valueNote: string;
  /** Custom anchor text for the dedicated-page link, when one exists. */
  linkLabel?: string;
}

/**
 * One explained pattern section on the hub. Reads routing from the registry
 * href; the definition and value note come from the content module. When the
 * pattern has its own page (href is not a "#" anchor), a link out is shown.
 * Server Component.
 */
export function PatternExplainer({
  id,
  name,
  example,
  rarityOdds,
  href,
  definition,
  valueNote,
  linkLabel,
}: PatternExplainerProps) {
  const hasDedicatedPage = !href.includes("#");
  return (
    <div id={id} className="pattern-explainer scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-h3">{name}</h3>
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {example}
        </code>
      </div>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">{definition}</p>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">{valueNote}</p>
      <p className="mt-2 text-sm text-zinc-500">Rough odds: {rarityOdds}</p>
      {hasDedicatedPage ? (
        <p className="mt-2 text-sm">
          <Link href={href} className="link-accent">
            {linkLabel ?? `Read the full ${name} guide`}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
