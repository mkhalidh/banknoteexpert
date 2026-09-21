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
    <nav aria-label="Table of contents" className="contents-nav card p-4">
      <h2 className="eyebrow">{title}</h2>
      <ol className="mt-2 flex flex-col gap-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="link-accent">
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
