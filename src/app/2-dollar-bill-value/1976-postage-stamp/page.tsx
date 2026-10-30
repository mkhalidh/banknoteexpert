import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/content/Byline";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FaqItem } from "@/components/content/FaqItem";
import { TwoDollarClusterNav } from "@/components/content/TwoDollarClusterNav";
import { Comments } from "@/components/comments/Comments";
import { content } from "@/content/1976-postage-stamp";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

// Value-by-type: every cell is an honest blank because we have no clean recorded
// sales for postmarked 1976 notes by type. Shown per the spec rather than filled
// with a competitor figure or a guess.
const typeRows: string[][] = [
  ["Loose postmarked note", "No recorded sales in our data"],
  ["In original first-day envelope", "No recorded sales in our data"],
  ["Uncommon postmark town", "No recorded sales in our data"],
  ["Stamp errors", "No recorded sales in our data"],
];

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
          { name: "1976 Postage Stamp", path: content.meta.path },
        ]}
      />

      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
      </header>

      <KeyTakeaways items={content.takeaways} />

      <ContentSections sections={sectionById("answer")} />
      <ContentSections sections={sectionById("what-is")} />
      <ContentSections sections={sectionById("identify")} />

      {/* Value by type: honest blanks where we have no recorded sales */}
      <div>
        <ContentSections sections={sectionById("value-by-type")} />
        <div className="mt-4">
          <ComparisonTable
            caption="Postmarked 1976 $2 note value by type (our recorded sales only)"
            columns={["Type", "Recorded value"]}
            rows={typeRows}
          />
        </div>
      </div>

      <ContentSections sections={sectionById("what-adds")} />
      <ContentSections sections={sectionById("how-we-estimate")} />

      {/* Branded checker CTA */}
      <div className="card p-5">
        <h2 className="text-h3">Check your serial on Banknote Expert</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          The note under the stamp is an ordinary 1976 $2 bill, so its serial still
          matters. Run the eight digits to flag a star, a low serial or a fancy pattern.
        </p>
        <p className="mt-3">
          <Link href="/" className="link-accent font-semibold">
            Open the fancy serial checker
          </Link>
        </p>
      </div>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <h2 id="faq-heading" className="text-h2">
          1976 $2 postage-stamp FAQs
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
