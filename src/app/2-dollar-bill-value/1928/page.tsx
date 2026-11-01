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
import { Comments } from "@/components/comments/Comments";
import { content } from "@/content/two-dollar-1928";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const SERIES = ["1928", "1928A", "1928B", "1928C", "1928D", "1928E", "1928F", "1928G"];

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
          { name: "1928", path: content.meta.path },
        ]}
      />

      <TwoDollarValueIntro content={content} />

      <div>
        <ContentSections sections={sectionById("value-chart")} />
        <div className="mt-4">
          <TwoDollarYearCharts seriesList={SERIES} />
        </div>
      </div>

      <ContentSections sections={sectionById("identify")} />
      <ContentSections sections={sectionById("star-notes")} />
      <ContentSections sections={sectionById("fancy-serials")} />
      <ContentSections sections={sectionById("what-makes-valuable")} />
      <ContentSections sections={sectionById("keep-sell")} />
      <ContentSections sections={sectionById("common-question")} />

      <div className="card p-5">
        <h2 className="text-h3">Check your serial on Banknote Expert</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          Enter your 1928 note&rsquo;s eight digits to flag a star, a low serial or a
          fancy pattern and see an honest value range.
        </p>
        <p className="mt-3">
          <Link href="/" className="link-accent font-semibold">
            Open the fancy serial checker
          </Link>
        </p>
      </div>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <h2 id="faq-heading" className="text-h2">
          1928 $2 bill FAQs
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
