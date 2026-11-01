import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/content/ContentSections";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FaqItem } from "@/components/content/FaqItem";
import { TwoDollarClusterNav } from "@/components/content/TwoDollarClusterNav";
import { TwoDollarValueIntro } from "@/components/content/TwoDollarValueIntro";
import { Comments } from "@/components/comments/Comments";
import {
  TWO_DOLLAR_STAR_VALUE_BANDS,
  type NoteCondition,
} from "@/data/two-dollar-star-values";
import { STAR_NOTE_RUNS } from "@/data/star-notes/runs";
import { rarityForRunSize } from "@/lib/star-note/lookup";
import { content } from "@/content/two-dollar-star-notes";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

const CONDITIONS: { key: NoteCondition; label: string }[] = [
  { key: "circulated", label: "Circulated" },
  { key: "vf", label: "Very Fine" },
  { key: "unc", label: "Uncirculated" },
];

const starSeries = [...new Set(TWO_DOLLAR_STAR_VALUE_BANDS.map((b) => b.series))];

const starValueRows = starSeries.map((series) => [
  `Series ${series}`,
  ...CONDITIONS.map(({ key }) => {
    const band = TWO_DOLLAR_STAR_VALUE_BANDS.find(
      (b) => b.series === series && b.condition === key,
    );
    return band
      ? `${money(band.low)} to ${money(band.high)} (${band.sampleSize} sales, ${band.confidence})`
      : "No recorded sales";
  }),
]);

const runs1976 = STAR_NOTE_RUNS.filter(
  (r) => r.denomination === 2 && r.series === "1976",
).sort((a, b) => a.runSize - b.runSize);

const districtRows = runs1976.map((r) => [
  `${r.frbLetter} ${r.frbName}`,
  r.runSize.toLocaleString("en-US"),
  rarityForRunSize(r.runSize),
]);

const sectionById = (id: string) =>
  content.sections.filter((section) => section.id === id);

const faqBlocks = content.sections.find((s) => s.id === "faq")!.blocks;
const faqs = faqBlocks.flatMap((block, index) => {
  const answer = faqBlocks[index + 1];
  return block.kind === "subheading" && answer?.kind === "paragraph"
    ? [{ question: block.text, answer: answer.text }]
    : [];
});

export default function Page() {
  return (
    <article className="editorial-page flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "$2 Bill Value", path: "/2-dollar-bill-value/" },
          { name: "Star Notes", path: content.meta.path },
        ]}
      />

      <TwoDollarValueIntro content={content} />

      {/* Value chart by series + condition, from our recorded sales */}
      <div>
        <ContentSections sections={sectionById("value-chart")} />
        <div className="mt-4">
          <ComparisonTable
            caption="Recorded $2 star note sale ranges by series and condition (single notes)"
            columns={["Series", "Circulated", "Very Fine", "Uncirculated"]}
            rows={starValueRows}
          />
        </div>
      </div>

      <ContentSections sections={sectionById("what-is")} />

      {/* Print run thresholds + 1976 by-district table */}
      <div>
        <ContentSections sections={sectionById("print-run")} />
        <div className="mt-4">
          <ComparisonTable
            caption="1976 $2 star notes printed by Federal Reserve district"
            columns={["District", "Star notes printed", "Rarity tier"]}
            rows={districtRows}
          />
        </div>
      </div>

      <ContentSections sections={sectionById("nineteen-seventy-six")} />
      <ContentSections sections={sectionById("fancy-serial-stars")} />
      <ContentSections sections={sectionById("how-to-look-up")} />

      {/* Branded checker CTA */}
      <div className="card p-5">
        <h2 className="text-h3">Check your serial on Banknote Expert</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          Enter your $2 star note&rsquo;s details to see its print run and rarity, or
          run the eight digits for any fancy pattern.
        </p>
        <p className="mt-3 flex flex-wrap gap-4">
          <Link href="/star-note-lookup/" className="link-accent font-semibold">
            Open the star note lookup
          </Link>
          <Link href="/" className="link-accent font-semibold">
            Open the fancy serial checker
          </Link>
        </p>
      </div>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <h2 id="faq-heading" className="text-h2">
          $2 star note FAQs
        </h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question}>
              {faq.answer}
            </FaqItem>
          ))}
        </div>
      </section>

      <TwoDollarClusterNav currentPath={content.meta.path} />

      <RelatedPages links={content.related} />

      <Comments path={content.meta.path} />
    </article>
  );
}
