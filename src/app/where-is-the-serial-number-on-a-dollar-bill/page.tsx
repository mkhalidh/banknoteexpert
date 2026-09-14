import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import {
  content,
  denomIntro,
  denominations,
  closing,
} from "@/content/where-is-serial";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = [
  ...content.sections.map((section) => ({
    id: section.id,
    heading: section.heading,
  })),
  { id: "denominations", heading: "Where to look on each denomination" },
  { id: closing.id, heading: closing.heading },
];

/** Labelled inline SVG of a note showing the two serial positions. */
function NoteDiagram({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={`${label} note showing the serial number in the upper-right and lower-left corners`}
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
      <text x="28" y="30" fontSize="16" fontWeight="700" fill="#334155">
        {label}
      </text>
      <text x="292" y="130" fontSize="16" fontWeight="700" fill="#334155" textAnchor="end">
        {label}
      </text>
      {/* Serial numbers in green ink, upper-right and lower-left */}
      <text
        x="270"
        y="34"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fontWeight="700"
        fill="#1a7f37"
      >
        L00088892*
      </text>
      <text
        x="70"
        y="122"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fontWeight="700"
        fill="#1a7f37"
      >
        L00088892*
      </text>
    </svg>
  );
}

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Where Is the Serial Number", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {content.meta.lead}
        </p>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />
      <ContentSections sections={content.sections} />

      <section
        id="denominations"
        aria-labelledby="denominations-heading"
        className="scroll-mt-24"
      >
        <h2
          id="denominations-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Where to look on each denomination
        </h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">{denomIntro}</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {denominations.map((denom) => (
            <figure
              key={denom.id}
              id={denom.id}
              className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {denom.heading}
              </h3>
              <div className="mt-2">
                <NoteDiagram label={denom.label} />
              </div>
              <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {denom.note}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ContentSections sections={[closing]} />

      <RelatedPages links={content.related} />

      <ArticleSchema
        headline={content.meta.h1}
        description={content.meta.description}
        path={content.meta.path}
      />
    </article>
  );
}
