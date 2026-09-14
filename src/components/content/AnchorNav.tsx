export interface AnchorNavItem {
  id: string;
  heading: string;
}

/**
 * In-page table of contents built from a section list. Server Component.
 */
export function AnchorNav({
  items,
  title = "On this page",
}: {
  items: AnchorNavItem[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      <ol className="mt-2 flex flex-col gap-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-indigo-700 hover:underline dark:text-indigo-400"
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
