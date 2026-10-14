import type { Metadata } from "next";
import { ArticleCategory, ArticleIntro } from "@/components/content/ArticleIntro";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import {
  content,
  denomIntro,
  denominations,
  closing,
  sources,
} from "@/content/where-is-serial";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = [
  ...content.sections.slice(0, 1).map((section) => ({
    id: section.id,
    heading: section.heading,
  })),
  { id: "denominations", heading: "Where to look on each denomination" },
  ...content.sections.slice(1).map((section) => ({
    id: section.id,
    heading: section.heading,
  })),
  { id: closing.id, heading: closing.heading },
  { id: sources.id, heading: sources.heading },
];

/** Labelled illustration of the two serial positions on a modern note. */
function NoteDiagram({ label, serial, topSerialSide }: { label: string; serial: string; topSerialSide: "left" | "right" }) {
  const topIsLeft = topSerialSide === "left";
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={`Illustration of a ${label} note with matching serial numbers in the upper-${topSerialSide} and lower-${topIsLeft ? "right" : "left"} corners`}
      className="h-auto w-full"
    >
      <rect
        x="4"
        y="4"
        width="312"
        height="142"
        rx="8"
        fill="#f0f4ef"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <ellipse cx="160" cy="75" rx="40" ry="48" fill="#dfe7dd" stroke="#94a3b8" />
      <text x="160" y="79" textAnchor="middle" fontSize="9" fill="#64748b">
        portrait
      </text>
      {/* Denomination corner labels */}
      <text x={topIsLeft ? 292 : 28} y="30" textAnchor={topIsLeft ? "end" : "start"} fontSize="16" fontWeight="700" fill="#334155">
        {label}
      </text>
      <text x={topIsLeft ? 28 : 292} y="130" fontSize="16" fontWeight="700" fill="#334155" textAnchor={topIsLeft ? "start" : "end"}>
        {label}
      </text>
      {/* Serial positions vary by denomination; both copies match. */}
      <text
        x={topIsLeft ? 70 : 270}
        y="34"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fontWeight="700"
        fill="#1a7f37"
      >
        {serial}
      </text>
      <text
        x={topIsLeft ? 270 : 70}
        y="122"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fontWeight="700"
        fill="#1a7f37"
      >
        {serial}
      </text>
    </svg>
  );
}

export default function Page() {
  return (
    <article className="editorial-page flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Where Is the Serial Number", path: content.meta.path },
        ]}
      />
      <header>
        <ArticleCategory path={content.meta.path} />
        <h1 className="text-display">{content.meta.h1}</h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
        <ArticleIntro path={content.meta.path} />
        <div className="mt-6" data-editorial-addition="true"><FancySerialChecker /></div>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />
      <ContentSections sections={content.sections.slice(0, 1)} />

      <section
        id="denominations"
        aria-labelledby="denominations-heading"
        className="scroll-mt-24"
      >
        <h2 id="denominations-heading" className="text-h2">
          Where to look on each denomination
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">{denomIntro}</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {denominations.map((denom) => (
            <figure key={denom.id} id={denom.id} className="card scroll-mt-24 p-4">
              <h3 className="text-h3">{denom.heading}</h3>
              <div className="mt-2">
                <NoteDiagram label={denom.label} serial={denom.exampleSerial} topSerialSide={denom.topSerialSide} />
              </div>
              <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {denom.note}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ContentSections sections={content.sections.slice(1)} />
      <ContentSections sections={[closing]} />
      <ContentSections sections={[sources]} />

      <RelatedPages links={content.related} />
    </article>
  );
}
