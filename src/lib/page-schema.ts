import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME, AUTHOR_BIO, AUTHOR_SAME_AS, ORG_LOGO_PATH, PUBLISHED_ISO } from "@/config/site";
import { getRoute } from "@/config/routes";
import { pageModified, pagePublished } from "@/config/page-dates";
import { pageContents } from "@/content/pages";
import { homeFaqs } from "@/content/home-faq";
import type { ContentBlock } from "@/content/types";

function blockText(block: ContentBlock): string {
  if (block.kind === "richtext") return block.segments.map(segment => typeof segment === "string" ? segment : segment.label).join("");
  if (block.kind === "list") return block.items.join(" ");
  return block.text;
}

/** One graph per page; breadcrumbs and FAQs use the same data as visible copy. */
export function pageGraph(path: string, crumbs: { name: string; path: string }[]) {
  const route = getRoute(path);
  const content = pageContents.find(page => page.meta.path === path);
  const url = `${SITE_URL}${path}`;
  const person = { "@type": "Person", "@id": `${SITE_URL}/about-the-author/#person`, name: AUTHOR_NAME, url: `${SITE_URL}/about-the-author/`, description: AUTHOR_BIO, sameAs: AUTHOR_SAME_AS };
  const graph: Record<string, unknown>[] = [
    { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}${ORG_LOGO_PATH}` },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, publisher: { "@id": `${SITE_URL}/#org` } },
  ];
  if (crumbs.length) graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` })) });
  if (["/", "/star-note-lookup/", "/2-dollar-bill-serial-number-lookup/"].includes(path)) graph.push({ "@type": "WebApplication", "@id": `${url}#app`, name: path === "/" ? "Fancy Serial Number Checker" : route.title, url, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@id": `${SITE_URL}/#org` } });
  if (content && !["/privacy/", "/terms/", "/about/"].includes(path)) graph.push({ "@type": "Article", headline: content.meta.h1, description: content.meta.description, datePublished: pagePublished[path] ?? PUBLISHED_ISO, dateModified: pageModified[path], mainEntityOfPage: url, author: person, publisher: { "@id": `${SITE_URL}/#org` }, image: `${url}opengraph-image/` });
  if (path === "/about-the-author/") graph.push({ "@type": "ProfilePage", mainEntity: person });
  if (path === "/about/") graph.push(person);
  if (path === "/blog/" || path === "/tools/") graph.push({ "@type": "CollectionPage", name: route.title, description: route.description, url });
  const faqs = path === "/" ? homeFaqs.map(faq => ({ ...faq })) : [];
  for (const section of content?.sections ?? []) {
    if (section.id !== "faq") continue;
    for (const block of section.blocks) {
      if (block.kind === "subheading") faqs.push({ question: block.text, answer: "" });
      else if (faqs.length) faqs[faqs.length - 1].answer += `${faqs[faqs.length - 1].answer ? " " : ""}${blockText(block)}`;
    }
  }
  if (faqs.length && path !== "/fancy-serial-numbers/broken-ladder/") graph.push({ "@type": "FAQPage", mainEntity: faqs.filter(faq => faq.answer).map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) });
  return { "@context": "https://schema.org", "@graph": graph };
}
