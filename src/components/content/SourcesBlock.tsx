import Link from "next/link";
import { VALUE_SOURCES } from "@/config/site";

/**
 * Lists the named data sources behind value estimates and links to the
 * methodology page. Reads the shared VALUE_SOURCES list. Server Component.
 */
export function SourcesBlock({
  title = "Sources",
  note,
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section
      aria-label={title}
      className="scroll-mt-24 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {note ? (
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{note}</p>
      ) : null}
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {VALUE_SOURCES.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <Link
          href="/methodology/"
          className="font-medium text-indigo-700 hover:underline dark:text-indigo-400"
        >
          How we estimate value
        </Link>
      </p>
    </section>
  );
}
