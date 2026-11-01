import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/content/ContentSections";
import { TwoDollarValueIntro } from "@/components/content/TwoDollarValueIntro";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FaqItem } from "@/components/content/FaqItem";
import { TwoDollarClusterNav } from "@/components/content/TwoDollarClusterNav";
import { TwoDollarYearCharts } from "@/components/content/TwoDollarYearCharts";
import { TwoDollarStarRunTable } from "@/components/content/TwoDollarStarRunTable";
import { Comments } from "@/components/comments/Comments";
import { content } from "@/content/two-dollar-2003";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const sectionById = (id: string) => content.sections.filter((s) => s.id === id);
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
          { name: "2003", path: content.meta.path },
        ]}
      />

      <TwoDollarValueIntro content={content} />

      <div>
        <ContentSections sections={sectionById("value-chart")} />
        <div className="mt-4">
          <TwoDollarYearCharts seriesList={["2003", "2003A"]} />
        </div>
      </div>

      <ContentSections sections={sectionById("vs-2003a")} />

      <div>
        <ContentSections sections={sectionById("star-runs")} />
        <div className="mt-4 flex flex-col gap-6">
          <TwoDollarStarRunTable series="2003" />
          <TwoDollarStarRunTable series="2003A" />
        </div>
      </div>

      <ContentSections sections={sectionById("fancy-serials")} />
      <ContentSections sections={sectionById("keep-sell")} />
      <ContentSections sections={sectionById("common-question")} />

      <div className="card p-5">
        <h2 className="text-h3">Check your serial on Banknote Expert</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          Enter your 2003 or 2003A note&rsquo;s eight digits to flag a star, a low
          serial or a fancy pattern and see an honest value range.
        </p>
        <p className="mt-3">
          <Link href="/" className="link-accent font-semibold">
            Open the checker for your 2003 note
          </Link>
        </p>
      </div>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <h2 id="faq-heading" className="text-h2">
          2003 $2 bill FAQs
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
