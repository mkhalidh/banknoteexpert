import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AnchorNav } from "@/components/content/AnchorNav";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import { Byline } from "@/components/content/Byline";
import { content } from "@/content/methodology";
import { SOURCE_LINKS } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

const anchorItems = content.sections.map((section) => ({
  id: section.id,
  heading: section.heading,
}));

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Methodology", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
      </header>

      <KeyTakeaways items={content.takeaways} />
      <AnchorNav items={anchorItems} />
      <ContentSections sections={content.sections} />

      <section aria-labelledby="sources-heading" className="scroll-mt-24">
        <h2 id="sources-heading" className="text-h2">Sources</h2>
        <p className="mt-3 max-w-2xl">
          Value ranges, print runs and grading context are drawn from the
          following references:
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {SOURCE_LINKS.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="nofollow noopener noreferrer" className="underline underline-offset-2">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <RelatedPages links={content.related} />
    </article>
  );
}
