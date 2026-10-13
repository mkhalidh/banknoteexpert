import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { Byline } from "@/components/content/Byline";
import { TwoDollarSerialLookup } from "@/components/tools/TwoDollarSerialLookup";
import { Comments } from "@/components/comments/Comments";
import { twoDollarSeries } from "@/data/two-dollar-series";
import { patternsById } from "@/lib/serial/patterns";
import {
  content,
  patternPageIds,
  patternLinkLabels,
} from "@/content/two-dollar-serial-lookup";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const seriesRows = twoDollarSeries.map((entry) => [
  entry.series,
  entry.sealColor === "red" ? "Red" : "Green",
  entry.noteType,
  entry.hasStarNotes ? "Yes" : "No",
]);

const patternLinks = patternPageIds.map((id) => ({
  href: patternsById[id].href,
  label: patternLinkLabels[id],
  description: patternsById[id].description,
}));

const sectionById = (id: string) =>
  content.sections.filter((section) => section.id === id);

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "$2 Bills", path: "/2-dollar-bill-value/" },
          { name: "Serial Number Lookup", path: content.meta.path },
        ]}
      />

      {/* Section 1, H1, subhead, tool (nothing above) */}
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
        <div className="mt-6">
          {/* Section 2, result panel lives inside the tool */}
          <TwoDollarSerialLookup />
        </div>
      </header>

      <KeyTakeaways items={content.takeaways} />

      {/* Section 3 */}
      <ContentSections sections={sectionById("what-serial-tells")} />

      {/* Section 4, series & seal table from the data file */}
      <div>
        <ContentSections sections={sectionById("series-seal")} />
        <div className="mt-4">
          <ComparisonTable
            caption="Every small-size $2 series, with seal colour and note type"
            columns={["Series", "Seal", "Note type", "Star notes"]}
            rows={seriesRows}
          />
        </div>
      </div>

      {/* Section 5 */}
      <ContentSections sections={sectionById("bicentennial-1976")} />

      {/* Section 6, pattern pages, linked from the registry href values */}
      <div>
        <ContentSections sections={sectionById("patterns")} />
        <div className="mt-4">
          <RelatedPages title="Pattern guides" links={patternLinks} />
        </div>
      </div>

      {/* Section 7 */}
      <div>
        <ContentSections sections={sectionById("how-we-estimate")} />
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
      </div>

      {/* Section 8, FAQ */}
      <ContentSections sections={sectionById("faq")} />

      <RelatedPages links={content.related} />

      <Comments path={content.meta.path} />
    </article>
  );
}
