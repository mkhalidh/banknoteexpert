import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME, PUBLISHED_ISO, LAST_UPDATED_ISO } from "@/config/site";
import { articles } from "@/config/editorial";

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  /** Absolute path with trailing slash for this article. */
  path: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Emits Article JSON-LD with an author linked to the dedicated author profile,
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
  const article = articles.find(item => item.path === path);
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
      "@id": `${SITE_URL}/about-the-author/#person`,
      url: `${SITE_URL}/about-the-author/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
  if (article) {
    data.datePublished = article.published;
    data.image = `${SITE_URL}${article.image}`;
    data.articleSection = article.category;
  }
  return <JsonLd data={data} />;
}
