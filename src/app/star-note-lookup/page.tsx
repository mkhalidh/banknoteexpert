import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { LastUpdated } from "@/components/content/LastUpdated";
import { ScarcestStarCallout } from "@/components/content/ScarcestStarCallout";
import { StarNoteLookup } from "@/components/tools/StarNoteLookup";
import { patternsById } from "@/lib/serial/patterns";
import {
  content,
  rarityTierRows,
  patternPageIds,
  patternLinkLabels,
} from "@/content/star-note-lookup";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const patternLinks = patternPageIds.map((id) => ({
  href: patternsById[id].href,
  label: patternLinkLabels[id],
  description: patternsById[id].description,
}));

const sectionById = (id: string) =>
  content.sections.filter((section) => section.id === id);

/** Inline SVG showing the star at the end of a serial number. */
function StarSerialDiagram() {
  return (
    <figure className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <svg
        viewBox="0 0 360 90"
        role="img"
        aria-label="A serial number ending in a star: prefix letter, eight digits, then a star in place of the suffix letter"
        className="h-auto w-full"
      >
        <text
          x="180"
          y="46"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="30"
          fontWeight="700"
          fill="#1a7f37"
        >
          L00088892
          <tspan fill="#b91c1c">&#9733;</tspan>
        </text>
        <text x="34" y="78" fontSize="11" fill="#64748b">
          prefix
        </text>
        <text x="180" y="78" textAnchor="middle" fontSize="11" fill="#64748b">
          8 digits
        </text>
        <text x="326" y="78" textAnchor="end" fontSize="11" fill="#b91c1c">
          star, not a letter
        </text>
      </svg>
    </figure>
  );
}

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Star Notes", path: content.meta.path },
        ]}
      />

      {/* Section 1 — H1, subhead, tool */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {content.meta.lead}
        </p>
        <div className="mt-6">
          {/* Section 2 — result panel lives inside the tool */}
          <StarNoteLookup />
        </div>
      </header>

      <KeyTakeaways items={content.takeaways} />

      {/* Section 3 — how to read, with inline SVG */}
      <div>
        <ContentSections sections={sectionById("how-to-read")} />
        <div className="mt-4">
          <StarSerialDiagram />
        </div>
      </div>

      {/* Section 4 */}
      <ContentSections sections={sectionById("what-makes-valuable")} />

      {/* Section 5 — rarity tiers table */}
      <div>
        <ContentSections sections={sectionById("rarity-tiers")} />
        <div className="mt-4">
          <ComparisonTable
            caption="Star note rarity tiers by print-run size"
            columns={["Tier", "Print run size", "What it means"]}
            rows={rarityTierRows}
          />
        </div>
        <div className="mt-4">
          <ScarcestStarCallout
            cta={{ href: "/2-dollar-bill-value/", label: "See the $2 bill value guide" }}
          />
        </div>
      </div>

      {/* Section 6 — pattern pages from the registry href */}
      <div>
        <ContentSections sections={sectionById("fancy-serials")} />
        <div className="mt-4">
          <RelatedPages title="Pattern guides" links={patternLinks} />
        </div>
      </div>

      {/* Section 7 */}
      <div>
        <ContentSections sections={sectionById("how-we-estimate")} />
        <LastUpdated className="mt-3 text-sm text-zinc-500" />
      </div>

      {/* Section 8 — FAQ */}
      <ContentSections sections={sectionById("faq")} />

      <RelatedPages links={content.related} />

      <ArticleSchema
        headline={content.meta.h1}
        description={content.meta.description}
        path={content.meta.path}
      />
    </article>
  );
}
