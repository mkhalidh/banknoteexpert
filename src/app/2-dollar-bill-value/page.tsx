import { Byline } from "@/components/content/Byline";
import { SOURCE_LINKS } from "@/config/site";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { TwoDollarValueChart } from "@/components/content/TwoDollarValueChart";
import { ScarcestStarCallout } from "@/components/content/ScarcestStarCallout";
import { Comments } from "@/components/comments/Comments";
import { twoDollarSeries } from "@/data/two-dollar-series";
import { patternsById } from "@/lib/serial/patterns";
import {
  content,
  patternPageIds,
  patternLinkLabels,
} from "@/content/two-dollar-value";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const redCount = twoDollarSeries.filter((s) => s.sealColor === "red").length;
const greenCount = twoDollarSeries.filter((s) => s.sealColor === "green").length;

const redVsGreenRows = [
  ["Note type", "Legal Tender Note", "Federal Reserve Note"],
  ["Series years", "1928–1963 (incl. letter varieties)", "1976 onward"],
  ["Varieties in our dataset", String(redCount), String(greenCount)],
  ["Typical value", "Often a premium, most in high grade", "Usually face value"],
];

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
          { name: "$2 Bills", path: content.meta.path },
        ]}
      />

      {/* Section 1, H1 + direct answer */}
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
      <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
      </header>

      {/* Section 2 */}
      <KeyTakeaways items={content.takeaways} />

      {/* Section 3, value chart grouped by seal colour */}
      <div>
        <ContentSections sections={sectionById("value-chart")} />
        <div className="mt-4">
          <TwoDollarValueChart />
        </div>
      </div>

      {/* Section 4 */}
      <ContentSections sections={sectionById("are-they-rare")} />

      {/* Short history */}
      <ContentSections sections={sectionById("history")} />

      {/* Section 5, what makes it valuable + pattern links */}
      <div>
        <ContentSections sections={sectionById("what-makes-valuable")} />
        <div className="mt-4">
          <ScarcestStarCallout
            cta={{ href: "/star-note-lookup/", label: "Look up a $2 star note" }}
          />
        </div>
        <div className="mt-4">
          <RelatedPages title="Fancy pattern guides" links={patternLinks} />
        </div>
      </div>

      {/* Section 6, red vs green table */}
      <div>
        <ContentSections sections={sectionById("red-vs-green")} />
        <div className="mt-4">
          <ComparisonTable
            caption="Red seal versus green seal $2 notes"
            columns={["Feature", "Red seal", "Green seal"]}
            rows={redVsGreenRows}
          />
        </div>
      </div>

      {/* Red-seal series detail, then the silver-certificate clarification */}
      <ContentSections sections={sectionById("red-seal-years")} />
      <ContentSections sections={sectionById("silver-certificate")} />

      {/* Section 7 */}
      <ContentSections sections={sectionById("bicentennial")} />

      {/* Older large-size $2 notes, before the small-size chart era */}
      <ContentSections sections={sectionById("large-size")} />

      {/* Section 8 */}
      <ContentSections sections={sectionById("check-your-bill")} />

      {/* Section 9 */}
      <ContentSections sections={sectionById("how-we-estimate")} />

      {/* Section 10, FAQ */}
      <ContentSections sections={sectionById("faq")} />

      {/* Section 11 */}
      <RelatedPages links={content.related} />

      <section aria-labelledby="sources"><h2 id="sources" className="text-h2">Sources</h2>
        <p>The series chart uses the secondary compilation at serialworth.com. Primary reference sites below are already listed in our source data; they are not individual sale citations.</p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            <a href="https://serialworth.com/" rel="nofollow noopener noreferrer" className="link-accent">
              SerialWorth price guide (secondary compilation)
            </a>
          </li>
          {SOURCE_LINKS.filter(source => /Heritage|Stack|Engraving/.test(source.name)).map(source => (
            <li key={source.url}>
              <a href={source.url} rel="nofollow noopener noreferrer" className="link-accent">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
        {/* TODO(human): Add exact primary lot/report URLs for each supported price or production claim. */}
      </section>
      <Comments path={content.meta.path} />
    </article>
  );
}
