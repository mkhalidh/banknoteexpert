import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/content/Byline";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FaqItem } from "@/components/content/FaqItem";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { ALL_CONDITIONS, valueCell } from "@/lib/serial/value";
import { content, comparison } from "@/content/ladder";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

const cell = (pattern: string, condition: (typeof ALL_CONDITIONS)[number]) => {
  const c = valueCell(pattern, condition);
  return c.status === "ok"
    ? `${money(c.band.low)} to ${money(c.band.high)} (${c.band.sampleSize} sales, ${c.band.confidence})`
    : "No recorded sales";
};

const ladderValueRows = [
  ["True ascending ladder (12345678)", ...ALL_CONDITIONS.map((c) => cell("ladder", c))],
  ["True descending ladder (87654321)", ...ALL_CONDITIONS.map((c) => cell("ladder", c))],
  ["Near ladder", ...ALL_CONDITIONS.map((c) => cell("ladder-partial", c))],
  ["Broken or scattered ladder", "No recorded sales", "No recorded sales", "No recorded sales"],
];

const nonFaqSections = content.sections.filter((s) => s.id !== "faq");
const faqBlocks = content.sections.find((s) => s.id === "faq")!.blocks;
const faqs = faqBlocks.flatMap((block, index) => {
  const answer = faqBlocks[index + 1];
  return block.kind === "subheading" && answer?.kind === "paragraph"
    ? [{ question: block.text, answer: answer.text }]
    : [];
});

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Ladder", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
        <div className="mt-6">
          <FancySerialChecker />
        </div>
        <figure className="article-cover mt-5">
          <Image src="/images/patterns/ladder.svg" alt="Ladder serial number: 12345678. Each digit increases by one." width={1200} height={640} sizes="(max-width: 800px) 100vw, 1000px" preload />
        </figure>
      </header>

      <KeyTakeaways items={content.takeaways} />

      {/* Ladder value chart, early, from the verified value-band dataset */}
      <section aria-label="Ladder value chart" className="scroll-mt-24">
        <h2 className="text-h2">Ladder serial number value chart</h2>
        <div className="mt-4">
          <ComparisonTable
            caption="Recorded ladder sale ranges by type and condition (single notes). Ascending and descending share the same recorded band; scattered ladders are not separately recorded."
            columns={["Ladder type", "Circulated", "Very Fine", "Uncirculated"]}
            rows={ladderValueRows}
          />
        </div>
      </section>

      <ContentSections sections={nonFaqSections} />

      <section aria-label="Types of ladder" className="scroll-mt-24">
        <ComparisonTable caption={comparison.caption} columns={comparison.columns} rows={comparison.rows} />
      </section>

      {/* Branded checker CTA */}
      <div className="card p-5">
        <h2 className="text-h3">Check your serial on Banknote Expert</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          Paste your note&rsquo;s eight digits to see whether it is a true ladder, a
          broken ladder, or another pattern, with an honest value range.
        </p>
        <p className="mt-3">
          <Link href="/" className="link-accent font-semibold">
            Open the ladder serial checker
          </Link>
        </p>
      </div>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <h2 id="faq-heading" className="text-h2">
          Ladder serial number FAQs
        </h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question}>
              {faq.answer}
            </FaqItem>
          ))}
        </div>
      </section>

      <RelatedPages links={content.related} />
    </article>
  );
}
