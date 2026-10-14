import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/content/Byline";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { valueCell } from "@/lib/serial/value";
import { content, examples } from "@/content/broken-ladder";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const comparison = {
  caption: "True, broken and loosely named scattered ladder serials",
  columns: ["Term", "Rule", "Count and odds"],
  rows: [
    ["True ladder", "All eight digits in an ascending or descending run, no wrap", "6 of 100,000,000; about 1 in 16,666,667"],
    ["Broken ladder", "Six or seven digits in one run, excluding full ladders", "2,834 of 100,000,000; about 1 in 35,286"],
    ["Digits 1–8 in any order, excluding the two full 1–8 ladders", "A broad permutation set that overlaps broken ladders", "40,318 of 100,000,000; about 1 in 2,480"],
  ],
};

function SoldSamples() {
  const conditions = [{ id: "vf" as const, label: "Very Fine" }, { id: "unc" as const, label: "Uncirculated" }];
  const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[30rem] border-collapse text-sm">
    <caption className="sr-only">Broken ladder recorded sale ranges from the shared value dataset</caption>
    <thead><tr className="border-b border-[var(--border-soft)] text-left"><th scope="col" className="py-2 pr-4">Condition</th><th scope="col" className="py-2 pr-4">Recorded range</th><th scope="col" className="py-2 pr-4">Sample</th></tr></thead>
    <tbody>{conditions.map(({ id, label }) => {
      const cell = valueCell("ladder-partial", id);
      return <tr key={id} className="border-b border-[var(--border-soft)]"><th scope="row" className="py-2 pr-4 text-left font-medium">{label}</th><td className="py-2 pr-4">{cell.status === "ok" ? `${money(cell.band.low)}–${money(cell.band.high)}` : "No recorded sales yet"}</td><td className="py-2 pr-4">{cell.status === "ok" ? `${cell.band.sampleSize} sales · ${cell.band.confidence}` : "—"}</td></tr>;
    })}</tbody>
  </table></div>;
}

export default function Page() {
  return <article className="editorial-page flex flex-col gap-10">
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" }, { name: "Broken Ladder", path: content.meta.path }]} />
    <header>
      <h1 className="text-display">{content.meta.h1}</h1>
      <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
      <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
    </header>
    <KeyTakeaways items={content.takeaways} />
    <FancySerialChecker />
    {content.sections.map(section => <div key={section.id}>
      <ContentSections sections={[section]} />
      {section.id === "examples" && <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[38rem] border-collapse text-sm">
        <caption className="sr-only">Checked broken ladder and lookalike examples</caption>
        <thead><tr className="border-b border-[var(--border-soft)] text-left"><th scope="col" className="py-2 pr-4">Serial</th><th scope="col" className="py-2 pr-4">Longest run</th><th scope="col" className="py-2 pr-4">Verdict</th></tr></thead>
        <tbody>{examples.map(example => <tr key={example.serial} className="border-b border-[var(--border-soft)]"><th scope="row" className="py-2 pr-4 text-left font-mono">{example.serial}</th><td className="py-2 pr-4">{example.run}</td><td className="py-2 pr-4">{example.verdict}</td></tr>)}</tbody>
      </table></div>}
      {section.id === "comparison" && <div className="mt-4"><ComparisonTable {...comparison} /></div>}
      {section.id === "value" && <SoldSamples />}
    </div>)}
    <RelatedPages title="Related guides" links={content.related} />
  </article>;
}
