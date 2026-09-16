import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { PatternExplainer } from "@/components/content/PatternExplainer";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { Comments } from "@/components/comments/Comments";
import { patternsById } from "@/lib/serial/patterns";
import {
  content,
  patternCopy,
  patternOrder,
  spokeLinks,
} from "@/content/fancy-serial-numbers";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = [
  ...content.sections.map((section) => ({
    id: section.id,
    heading: section.heading,
  })),
  { id: "patterns", heading: "Every pattern, explained" },
  { id: "guides", heading: "Dedicated pattern guides" },
];

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
        <div className="mt-6">
          <FancySerialChecker />
        </div>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />
      <ContentSections sections={content.sections} />

      <section id="patterns" aria-labelledby="patterns-heading" className="scroll-mt-24">
        <h2 id="patterns-heading" className="text-h2">
          Every pattern, explained
        </h2>
        <div className="mt-4 flex flex-col gap-5">
          {patternOrder.map((id) => {
            const pattern = patternsById[id];
            const copy = patternCopy[id];
            return (
              <PatternExplainer
                key={id}
                id={pattern.slug}
                name={pattern.name}
                example={pattern.example}
                rarityOdds={pattern.rarityOdds}
                href={pattern.href}
                definition={copy.definition}
                valueNote={copy.valueNote}
                linkLabel={copy.linkLabel}
              />
            );
          })}
        </div>
      </section>

      <div id="guides" className="scroll-mt-24">
        <RelatedPages title="Dedicated pattern guides" links={spokeLinks} />
      </div>

      <RelatedPages title="Keep exploring" links={content.related} />

      <Comments path={content.meta.path} />

      <ArticleSchema
        headline={content.meta.h1}
        description={content.meta.description}
        path={content.meta.path}
      />
    </article>
  );
}
