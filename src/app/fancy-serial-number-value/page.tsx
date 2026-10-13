import type { Metadata } from "next";
import { ArticleCategory, ArticleIntro } from "@/components/content/ArticleIntro";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { ValueRangeTable } from "@/components/content/ValueRangeTable";
import { SourcesBlock } from "@/components/content/SourcesBlock";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { Comments } from "@/components/comments/Comments";
import { content } from "@/content/fancy-serial-number-value";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = [
  { id: "chart", heading: "Value chart by pattern and condition" },
  ...content.sections.map((section) => ({
    id: section.id,
    heading: section.heading,
  })),
];

export default function Page() {
  return (
    <article className="editorial-page flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Price Guide", path: content.meta.path },
        ]}
      />
      <header>
        <ArticleCategory path={content.meta.path} />
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
        <ArticleIntro path={content.meta.path} />
        <div className="mt-6">
          <FancySerialChecker />
        </div>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />

      {/* Price side leads with the table */}
      <section id="chart" aria-labelledby="chart-heading" className="scroll-mt-24">
        <h2 id="chart-heading" className="text-h2">
          Value chart by pattern and condition
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Estimated ranges in US dollars, grouped by rarity tier. Each row shows
          a confidence rating; see the notes below the table.
        </p>
        <div className="mt-4">
          <ValueRangeTable />
        </div>
      </section>

      <ContentSections sections={content.sections} />

      <SourcesBlock note="Value ranges are built from recorded realised sale prices, not asking prices. Sample sizes are shown; small samples are marked indicative, and combinations with no recorded sales have no value estimate." />

      <RelatedPages links={content.related} />

      <Comments path={content.meta.path} />
    </article>
  );
}
