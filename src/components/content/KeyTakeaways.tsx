/**
 * Highlighted "key takeaways" box for the top of a guide. Server Component.
 */
export function KeyTakeaways({
  items,
  title = "Key takeaways",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <aside
      aria-label={title}
      className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-800 dark:text-indigo-300">
        {title}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
