import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/content/Byline";
import { ContentSections } from "@/components/content/ContentSections";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { RelatedPages } from "@/components/content/RelatedPages";
import { FancySerialChecker } from "@/components/tools/FancySerialChecker";
import { content, comparison } from "@/content/radar";

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: content.meta.path,
});

export default function Page() {
  return (
    <article className="flex flex-col gap-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
          { name: "Radar", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">{content.meta.h1}</h1>
        <Byline path={content.meta.path} className="mt-3 text-sm text-zinc-500" />
        <p className="mt-3 max-w-2xl text-lead">{content.meta.lead}</p>
        <div className="mt-6">
          <FancySerialChecker />
        </div>
      <figure className="article-cover mt-5"><Image src="/images/patterns/radar.svg" alt="Radar serial number: 12344321. The second half mirrors the first." width={1200} height={640} sizes="(max-width: 800px) 100vw, 1000px" preload /></figure>
      </header>
      <KeyTakeaways items={content.takeaways} />
      <ContentSections sections={content.sections} />
      <section aria-label="Radar versus super radar" className="scroll-mt-24">
        <ComparisonTable caption={comparison.caption} columns={comparison.columns} rows={comparison.rows} />
      </section>
      <RelatedPages links={content.related} />
    </article>
  );
}
