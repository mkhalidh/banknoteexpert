import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME } from "@/config/site";
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

// Person JSON-LD matches the `author` reference emitted by ArticleSchema exactly.
const personSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  url: `${SITE_URL}/about/`,
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
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
