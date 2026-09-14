import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  /** Absolute path with a trailing slash. */
  path: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Renders visible breadcrumbs AND emits BreadcrumbList JSON-LD from the same
 * source data, so the two can never drift apart. Server Component.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-zinc-600 dark:text-zinc-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-[var(--accent)]">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-zinc-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
