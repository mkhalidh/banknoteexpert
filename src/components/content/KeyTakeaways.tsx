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
      className="rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/[6%] p-5"
    >
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
