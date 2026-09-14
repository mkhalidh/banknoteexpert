import Link from "next/link";
import type { ContentLink } from "@/content/types";

/**
 * A block of related internal links with custom anchor text. Anchor text and
 * hrefs are supplied by the content module so pages can vary anchors and avoid
 * repeating the same text for one destination. Server Component.
 */
export function RelatedPages({
  title = "Related guides",
  links,
}: {
  title?: string;
  links: ContentLink[];
}) {
  if (links.length === 0) return null;
  return (
    <section aria-label={title} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <li
            key={`${link.href}-${link.label}`}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Link
              href={link.href}
              className="text-base font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
            >
              {link.label}
            </Link>
            {link.description ? (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {link.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
