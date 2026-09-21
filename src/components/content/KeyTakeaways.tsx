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
      className="key-takeaways"
    >
      <h2 className="eyebrow">{title}</h2>
      <ul className="takeaway-list mt-4 text-sm text-zinc-800 dark:text-zinc-200">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
