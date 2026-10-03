import Link from "next/link";
import { AUTHOR_NAME, LAST_UPDATED, LAST_UPDATED_ISO } from "@/config/site";

/**
 * Article byline: author (linked to the author profile) plus the shared
 * "Updated" stamp as a machine-readable <time>. Surfaces authorship and
 * freshness on guide pages for E-E-A-T. Server Component.
 */
export function Byline({ className }: { className?: string }) {
  return (
    <p className={className}>
      By{" "}
      <Link href="/about-the-author/" className="underline underline-offset-2">
        {AUTHOR_NAME}
      </Link>
      {" · Updated "}
      <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
    </p>
  );
}
