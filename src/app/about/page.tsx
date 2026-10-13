import { AuthorDetails } from "@/components/content/AuthorDetails";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { KeyTakeaways } from "@/components/content/KeyTakeaways";
import { ContentSections } from "@/components/content/ContentSections";
import { RelatedPages } from "@/components/content/RelatedPages";
import { content } from "@/content/about";

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
          { name: "About", path: content.meta.path },
        ]}
      />
      <header>
        <h1 className="text-display">
          {content.meta.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-lead">
          {content.meta.lead}
        </p>
      </header>

      <KeyTakeaways items={content.takeaways} />
      <ContentSections sections={content.sections} />
      <AuthorDetails />
      <RelatedPages links={content.related} />
    </article>
  );
}
