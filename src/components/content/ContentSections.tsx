import Link from "next/link";
import type { ContentBlock, ContentSection } from "@/content/types";

function Block({ block }: { block: ContentBlock }) {
  if (block.kind === "paragraph") {
    return (
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">{block.text}</p>
    );
  }
  if (block.kind === "richtext") {
    return (
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">
        {block.segments.map((segment, index) =>
          typeof segment === "string" ? (
            <span key={index}>{segment}</span>
          ) : (
            <Link key={index} href={segment.href} className="link-accent">
              {segment.label}
            </Link>
          ),
        )}
      </p>
    );
  }
  if (block.kind === "subheading") {
    return <h3 className="text-h3 mt-5">{block.text}</h3>;
  }
  const ListTag = block.ordered ? "ol" : "ul";
  return (
    <ListTag
      className={`mt-3 space-y-1 pl-5 text-zinc-700 dark:text-zinc-300 ${
        block.ordered ? "list-decimal" : "list-disc"
      }`}
    >
      {block.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListTag>
  );
}

/**
 * Renders an array of content sections as H2 sections with prose blocks.
 * Server Component. Prose lives in the content module, never inline here.
 */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="scroll-mt-24"
        >
          <h2 id={`${section.id}-heading`} className="text-h2">
            {section.heading}
          </h2>
          {section.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </section>
      ))}
    </>
  );
}
