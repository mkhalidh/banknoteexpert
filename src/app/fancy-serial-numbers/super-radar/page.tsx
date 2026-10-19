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
import { PatternNote } from "@/components/content/PatternNote";
import { ALL_CONDITIONS, CONDITION_LABELS, valueCell } from "@/lib/serial/value";
import { content, examples } from "@/content/super-radar";

export const metadata: Metadata = buildMetadata({ ...content.meta, allowLongMetadata: true });

const money = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const faqBlocks = content.sections.find(section => section.id === "faq")!.blocks;
const faqs = faqBlocks.flatMap((block, index) => {
  const answer = faqBlocks[index + 1];
  return block.kind === "subheading" && answer?.kind === "paragraph"
    ? [{ question: block.text, answer: answer.text }]
    : [];
});

export default function Page() {
  return <article className="editorial-page flex flex-col gap-10">
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" }, { name: "Super Radar", path: content.meta.path }]} />
    <header>
      <h1 className="text-display">{content.meta.h1}</h1>
      <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
      <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
      <div className="mt-6"><FancySerialChecker /></div>
      <figure className="article-cover mt-5">
        <PatternNote serial="17777771" pattern="Super Radar" detail="Six 7s sit between matching outer 1s." />
        <figcaption className="mt-2 text-sm text-zinc-500">Illustrated note showing a super radar serial with six 7s between matching 1s. Original diagram created for this guide.</figcaption>
      </figure>
    </header>
    <KeyTakeaways items={content.takeaways} />
    {content.sections.filter(section => section.id !== "faq").map(section => <div key={section.id}>
      <ContentSections sections={[section]} />
      {section.id === "comparison" && <div className="mt-4"><ComparisonTable caption="Radar versus super radar" columns={["Feature", "Radar", "Super Radar"]} rows={[
        ["Digit shape", "Any eight-digit palindrome", "ABBBBBBA with a six-digit center"],
        ["Example", "12344321", "17777771"],
        ["Middle digits", "May differ", "All six are identical"],
        ["Checker label", "Radar when no more specific radar applies", "Super Radar, unless the stricter True Binary Radar applies"],
      ]} /></div>}
      {section.id === "examples" && <div className="mt-4"><ComparisonTable caption="Eight-digit super radar examples and edge cases" columns={["Serial", "Result"]} rows={examples.map(([serial, result]) => [serial, result])} /></div>}
      {section.id === "value" && <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[30rem] border-collapse text-sm">
        <caption className="mb-2 text-left text-sm text-zinc-500">Recorded Super Radar sale bands by condition</caption>
        <thead><tr className="border-b border-[var(--border-soft)] text-left"><th scope="col" className="py-2 pr-4">Condition</th><th scope="col" className="py-2 pr-4">Recorded range</th><th scope="col" className="py-2 pr-4">Sample</th></tr></thead>
        <tbody>{ALL_CONDITIONS.map(condition => {
          const cell = valueCell("super-radar", condition);
          return <tr key={condition} className="border-b border-[var(--border-soft)]"><th scope="row" className="py-2 pr-4 text-left font-medium">{CONDITION_LABELS[condition]}</th><td className="py-2 pr-4">{cell.status === "ok" ? `${money(cell.band.low)} to ${money(cell.band.high)}` : ""}</td><td className="py-2 pr-4">{cell.status === "ok" ? `${cell.band.sampleSize} sales, ${cell.band.confidence}` : ""}</td></tr>;
        })}</tbody>
      </table></div>}
      {section.id === "check" && <div className="card mt-6 p-5">
        <h3 className="text-h3">Check your serial on Banknote Expert</h3>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">Enter all eight digits, including leading zeros, to see Super Radar and any overlapping patterns.</p>
        <Link href="/" className="link-accent mt-3 inline-block font-semibold">Open the fancy serial checker</Link>
      </div>}
    </div>)}
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
      <h2 id="faq-heading" className="text-h2">Super radar serial number FAQs</h2>
      <div className="mt-4 space-y-3">{faqs.map(faq => <FaqItem key={faq.question} question={faq.question}>{faq.answer}</FaqItem>)}</div>
    </section>
    <RelatedPages links={content.related} />
  </article>;
}
