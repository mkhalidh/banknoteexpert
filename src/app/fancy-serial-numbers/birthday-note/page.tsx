import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { content, comparison } from "@/content/birthday-note";

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
          { name: "Birthday Note", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
      </header>
      <KeyTakeaways items={content.takeaways} />
      <ContentSections sections={content.sections} />
      <section aria-label="Which dates are prized" className="scroll-mt-24">
        <ComparisonTable caption={comparison.caption} columns={comparison.columns} rows={comparison.rows} />
      </section>
      <RelatedPages links={content.related} />
      <ArticleSchema headline={content.meta.h1} description={content.meta.description} path={content.meta.path} />
    </article>
  );
}
