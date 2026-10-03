import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME, AUTHOR_BIO, AUTHOR_SAME_AS } from "@/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import { content } from "@/content/about";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

// One canonical Person entity across the site: same @id as the author-profile
// page and the `author` reference emitted by ArticleSchema, so Google merges
// them into a single node instead of three separate people.
const personSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about-the-author/#person`,
  name: AUTHOR_NAME,
  url: `${SITE_URL}/about-the-author/`,
  description: AUTHOR_BIO,
  sameAs: AUTHOR_SAME_AS,
};

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <ContentSections sections={content.sections} />
      <RelatedPages links={content.related} />

      <JsonLd data={personSchema} />
    </article>
  );
}
