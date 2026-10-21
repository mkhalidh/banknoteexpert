import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/content/Byline";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FaqItem } from "@/components/content/FaqItem";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { ALL_CONDITIONS, CONDITION_LABELS, valueCell } from "@/lib/serial/value";
import type { PageContent } from "@/content/types";

type GuideProps = PageContent & { examples: readonly (readonly [string, string])[]; image: { src: string; alt: string; caption: string; width: number; height: number }; comparison: { caption: string; columns: string[]; rows: string[][] } };
const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export function PatternGuidePage({ content }: { content: GuideProps }) {
  const { meta, sections } = content;
  const faqBlocks = sections.find(section => section.id === "faq")!.blocks;
  const faqs = faqBlocks.flatMap((block, index) => {
    const answer = faqBlocks[index + 1];
    return block.kind === "subheading" && answer?.kind === "paragraph" ? [{ question: block.text, answer: answer.text }] : [];
  });
  const name = meta.h1.replace(" Serial Number", "");
  return <article className="editorial-page flex flex-col gap-10">
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" }, { name, path: meta.path }]} />
    <header>
      <h1 className="text-display">{meta.h1}</h1>
      <Byline path={meta.path} className="mt-3 text-sm text-zinc-500" />
      <p className="mt-3 max-w-2xl text-lead">{meta.lead}</p>
      <div className="mt-6"><FancySerialChecker /></div>
      <figure className="article-cover mt-5">
        <Image src={content.image.src} alt={content.image.alt} width={content.image.width} height={content.image.height} sizes="(max-width: 800px) 100vw, 1000px" preload />
        <figcaption className="mt-2 text-sm text-zinc-500">{content.image.caption}</figcaption>
      </figure>
    </header>
    <KeyTakeaways items={content.takeaways} />
    {sections.filter(section => section.id !== "faq").map(section => <div key={section.id}>
      <ContentSections sections={[section]} />
      {section.id === "comparison" && <div className="mt-4"><ComparisonTable {...content.comparison} /></div>}
      {section.id === "examples" && <div className="mt-4"><ComparisonTable caption={`Eight-digit ${name} examples and non-examples`} columns={["Serial", "Result"]} rows={content.examples.map(([serial, result]) => [serial, result])} /></div>}
      {section.id === "value" && <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[30rem] border-collapse text-sm">
        <caption className="mb-2 text-left text-sm text-zinc-500">Recorded {name} sold bands by condition</caption>
        <thead><tr className="border-b border-[var(--border-soft)] text-left"><th scope="col" className="py-2 pr-4">Condition</th><th scope="col" className="py-2 pr-4">Recorded range</th><th scope="col" className="py-2 pr-4">Sample</th></tr></thead>
        <tbody>{ALL_CONDITIONS.map(condition => {
          const cell = valueCell(meta.path.endsWith("solid/") ? "solid" : meta.path.endsWith("four-pairs/") ? "four-pairs" : meta.path.split("/").filter(Boolean).at(-1)!, condition);
          return <tr key={condition} className="border-b border-[var(--border-soft)]"><th scope="row" className="py-2 pr-4 text-left font-medium">{CONDITION_LABELS[condition]}</th><td className="py-2 pr-4">{cell.status === "ok" ? `${money(cell.band.low)} to ${money(cell.band.high)}` : ""}</td><td className="py-2 pr-4">{cell.status === "ok" ? `${cell.band.sampleSize} sales, ${cell.band.confidence}` : ""}</td></tr>;
        })}</tbody>
      </table></div>}
      {section.id === "check" && <div className="card mt-6 p-5">
        <h3 className="text-h3">Check your serial on Banknote Expert</h3>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">Enter all eight digits, including leading zeros, to see {name} and any overlapping patterns.</p>
        <Link href="/" className="link-accent mt-3 inline-block font-semibold">Open the fancy serial checker</Link>
      </div>}
    </div>)}
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
      <h2 id="faq-heading" className="text-h2">{name} serial number FAQs</h2>
      <div className="mt-4 space-y-3">{faqs.map(faq => <FaqItem key={faq.question} question={faq.question}>{faq.answer}</FaqItem>)}</div>
    </section>
    <RelatedPages links={content.related} />
  </article>;
}
