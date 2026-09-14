import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import { LastUpdated } from "@/components/content/LastUpdated";
import { content } from "@/content/methodology";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = content.sections.map((section) => ({
  id: section.id,
  heading: section.heading,
}));

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Methodology", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {content.meta.lead}
        </p>
        <LastUpdated className="mt-3 text-sm text-zinc-500" />
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />
      <ContentSections sections={content.sections} />
      <RelatedPages links={content.related} />

      <ArticleSchema
        headline={content.meta.h1}
        description={content.meta.description}
        path={content.meta.path}
      />
    </article>
  );
}
