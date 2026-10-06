import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { TwoDollarSerialLookup } from "@/components/tools/TwoDollarSerialLookup";
import { Comments } from "@/components/comments/Comments";
import { TWO_DOLLAR_VALUES } from "@/data/two-dollar-values";
import { content } from "@/content/1976-two-dollar-value";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const money = (n: number) => `$${Math.round(n)}`;
const v1976 = TWO_DOLLAR_VALUES.find((v) => v.series === "1976");

const conditionRows: string[][] = v1976
  ? [
      [
        "Circulated (ordinary)",
        `Face value, about ${money(v1976.circulatedLow ?? 2)} to ${money(v1976.circulatedHigh ?? 7)}`,
      ],
      [
        "Uncirculated",
        `About ${money(v1976.uncirculatedLow ?? 6)} to ${money(v1976.uncirculatedHigh ?? 25)}`,
      ],
    ]
  : [];

const premiumRows: string[][] = [
  ["Star note", "$15 to $70; Minneapolis and Kansas City districts more"],
  ["Low serial (under 100)", "Hundreds of dollars; serial 1 far more"],
  ["Radar or fancy serial", "$30 to $140 and up"],
  ["Solid serial (one repeated digit)", "Up to several thousand in top grade"],
  ["Printing error (e.g. mismatched serial)", "$500 to $2,000 and up"],
  ["First-day 1976 postmark", "A small premium over face value"],
];

const sectionById = (id: string) =>
  content.sections.filter((section) => section.id === id);

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "$2 Bills", path: "/2-dollar-bill-value/" },
          { name: "1976 $2 Bill", path: content.meta.path },
        ]}
      />

      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
      </header>

      <KeyTakeaways items={content.takeaways} />

      <ContentSections sections={sectionById("answer")} />

      {/* Value tables: ordinary note by condition, then the features that add value */}
      <div>
        <ContentSections sections={sectionById("value-chart")} />
        <div className="mt-4 flex flex-col gap-6">
          <ComparisonTable
            caption="1976 $2 note value by condition (ordinary note)"
            columns={["Condition", "Typical value"]}
            rows={conditionRows}
          />
          <ComparisonTable
            caption="What lifts a 1976 $2 note above face value (ranges from sold records)"
            columns={["Feature", "Rough range"]}
            rows={premiumRows}
          />
        </div>
      </div>

      <ContentSections sections={sectionById("why-common")} />
      <ContentSections sections={sectionById("design")} />
      <ContentSections sections={sectionById("star-notes")} />
      <ContentSections sections={sectionById("first-day")} />
      <ContentSections sections={sectionById("serials")} />
      <ContentSections sections={sectionById("errors")} />

      {/* Interactive checker, defaults to the 1976 series */}
      <div>
        <ContentSections sections={sectionById("check-your-note")} />
        <div className="mt-4">
          <TwoDollarSerialLookup />
        </div>
      </div>

      <ContentSections sections={sectionById("how-we-estimate")} />
      <ContentSections sections={sectionById("faq")} />

      <RelatedPages links={content.related} />

      <Comments path={content.meta.path} />

      <ArticleSchema
        headline={content.meta.h1}
        description={content.meta.description}
        path={content.meta.path}
      />
    </article>
  );
}
