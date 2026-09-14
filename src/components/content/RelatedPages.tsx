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
      <h2 className="text-h2">{title}</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`} className="card card-hover p-4">
            <Link href={link.href} className="link-accent text-base font-semibold">
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
