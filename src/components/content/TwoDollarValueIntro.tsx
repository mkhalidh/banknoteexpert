import { Byline } from "@/components/content/Byline";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { TwoDollarSerialLookup } from "@/components/tools/TwoDollarSerialLookup";
import type { PageContent } from "@/content/types";

/**
 * Shared above-the-fold structure for the $2 value cluster.
 * The checker stays first, followed by a direct verdict and identification visual.
 */
export function TwoDollarValueIntro({ content }: { content: PageContent }) {
  const intro = content.valueIntro;
  if (!intro) throw new Error(`Missing valueIntro for ${content.meta.path}`);

  const accent =
    intro.identification.accent === "red"
      ? "#b91c1c"
      : intro.identification.accent === "green"
        ? "#166534"
        : "#854d0e";
  const titleId = `note-identification-${content.meta.path.replace(/\W/g, "-")}`;

  return (
    <>
      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
        <div className="mt-6">
          <TwoDollarSerialLookup
            defaultSeries={intro.defaultSeries}
            syncUrl={false}
          />
        </div>
      </header>

      <aside
        id="quick-value-verdict"
        aria-labelledby="quick-value-verdict-heading"
        className="card border-l-4 border-l-[var(--accent)] p-5"
      >
        <h2 id="quick-value-verdict-heading" className="text-h3">
          Quick value verdict
        </h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">{intro.verdict}</p>
      </aside>

      <figure className="article-cover">
        <svg
          viewBox="0 0 1200 620"
          role="img"
          aria-labelledby={titleId}
          className="h-auto w-full"
        >
          <title id={titleId}>{intro.identification.title}</title>
          <rect width="1200" height="620" rx="28" fill="#f7f2df" />
          <rect x="70" y="70" width="1060" height="480" rx="24" fill="#fffdf5" stroke="#3f3f46" strokeWidth="8" />
          <rect x="105" y="105" width="990" height="410" rx="18" fill="none" stroke="#a1a1aa" strokeWidth="3" />
          <text x="600" y="155" textAnchor="middle" fontSize="34" fontWeight="700" fill="#27272a">
            UNITED STATES TWO DOLLAR NOTE
          </text>
          <text x="150" y="255" fontSize="112" fontWeight="800" fill={accent}>2</text>
          <text x="1050" y="255" textAnchor="end" fontSize="112" fontWeight="800" fill={accent}>2</text>
          <circle cx="600" cy="305" r="105" fill="#e4e4e7" stroke="#71717a" strokeWidth="4" />
          <text x="600" y="296" textAnchor="middle" fontSize="30" fontWeight="700" fill="#3f3f46">THOMAS</text>
          <text x="600" y="334" textAnchor="middle" fontSize="30" fontWeight="700" fill="#3f3f46">JEFFERSON</text>
          <text x="185" y="410" fontSize="28" fontFamily="monospace" fontWeight="700" fill="#18181b">
            {intro.identification.marker}
          </text>
          <circle cx="930" cy="410" r="52" fill="none" stroke={accent} strokeWidth="10" />
          <text x="930" y="420" textAnchor="middle" fontSize="28" fontWeight="800" fill={accent}>SEAL</text>
          <line x1="185" y1="430" x2="185" y2="525" stroke="#52525b" strokeWidth="3" />
          <line x1="930" y1="465" x2="930" y2="525" stroke="#52525b" strokeWidth="3" />
          <text x="185" y="580" textAnchor="middle" fontSize="25" fontWeight="700" fill="#27272a">{intro.identification.series}</text>
          <text x="600" y="580" textAnchor="middle" fontSize="25" fontWeight="700" fill="#27272a">{intro.identification.noteType}</text>
          <text x="930" y="580" textAnchor="middle" fontSize="25" fontWeight="700" fill={accent}>{intro.identification.seal}</text>
        </svg>
        <figcaption className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Identification diagram: {intro.identification.title}. Check the printed
          series, seal, note type and serial marker on your note.
        </figcaption>
      </figure>

      <KeyTakeaways items={content.takeaways} />
    </>
  );
}
