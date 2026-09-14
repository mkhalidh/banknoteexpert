import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME, PUBLISHED_ISO, LAST_UPDATED_ISO } from "@/config/site";

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  /** Absolute path with trailing slash for this article. */
  path: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Emits Article JSON-LD with an author (Person, linked to /about/),
 * datePublished, dateModified and publisher. Used by every guide page.
 * Server Component.
 */
export function ArticleSchema({
  headline,
  description,
  path,
  datePublished = PUBLISHED_ISO,
  dateModified = LAST_UPDATED_ISO,
}: ArticleSchemaProps) {
  const url = `${SITE_URL}${path}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
  return <JsonLd data={data} />;
}
