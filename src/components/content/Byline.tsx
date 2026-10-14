import { pageModified, pagePublished } from "@/config/page-dates";
import Link from "next/link";
import { AUTHOR_NAME, PUBLISHED_ISO } from "@/config/site";

/**
 * Article byline: author (linked to the author profile) plus the shared
 * "Updated" stamp as a machine-readable <time>. Surfaces authorship and
 * freshness on guide pages for E-E-A-T. Server Component.
 */
export function Byline({ path, className }: { path: string; className?: string }) {
  return (
    <p className={className}>
      By{" "}
      <Link href="/about-the-author/" className="underline underline-offset-2">
        {AUTHOR_NAME}
      </Link>
      {"; published "}
      <time dateTime={pagePublished[path] ?? PUBLISHED_ISO}>{pagePublished[path] ?? PUBLISHED_ISO}</time>{"; updated "}
      <time dateTime={pageModified[path]}>{pageModified[path]}</time>
    </p>
  );
}
