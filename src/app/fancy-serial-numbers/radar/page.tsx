import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { Byline } from "@/components/content/Byline";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { content, comparison } from "@/content/radar";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Radar", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <Byline className="mt-3 text-sm text-zinc-500" />
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
        <div className="mt-6">
          <FancySerialChecker />
        </div>
      </header>
      <KeyTakeaways items={content.takeaways} />
      <ContentSections sections={content.sections} />
      <section aria-label="Radar versus super radar" className="scroll-mt-24">
        <ComparisonTable caption={comparison.caption} columns={comparison.columns} rows={comparison.rows} />
      </section>
      <RelatedPages links={content.related} />
      <ArticleSchema headline={content.meta.h1} description={content.meta.description} path={content.meta.path} />
    </article>
  );
}
