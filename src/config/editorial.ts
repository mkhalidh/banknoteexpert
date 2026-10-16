import { pageModified, pagePublished } from "@/config/page-dates";
import { getRoute, routes } from "@/config/routes";
import { toolLinks } from "@/config/navigation";
import { PUBLISHED_ISO } from "@/config/site";
import { content as fancy, patternCopy } from "@/content/fancy-serial-numbers";
import { content as brokenLadder } from "@/content/broken-ladder";
import { content as value } from "@/content/fancy-serial-number-value";
import { content as serial, denominations, denomIntro, closing, sources } from "@/content/where-is-serial";

function prose(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(prose).join(" ");
  if (value && typeof value === "object") return Object.entries(value).filter(([key]) => !["id", "href", "path", "kind", "primaryKeyword"].includes(key)).map(([, child]) => prose(child)).join(" ");
  return "";
}

const entries = [
  { content: fancy, extra: patternCopy, image: "serial-patterns-detail", alt: "Illustrative close-up of banknote serial digits", popularOrder: 2 },
  { content: value, extra: [], image: "banknote-inspection-detail", alt: "Illustrative banknote inspection scene", popularOrder: 1 },
  { content: serial, extra: [denominations, denomIntro, closing, sources], image: "banknote-collecting-detail", alt: "Illustrative view of banknotes on a collector's desk", popularOrder: 3 },
  { content: brokenLadder, extra: [], image: "serial-patterns-detail", alt: "Illustrative close-up of banknote serial digits", popularOrder: 4 },
];

/** Dates already recorded by the site; override here when a new article is published. */
export const articles = entries.map(({ content, extra, image, alt, popularOrder }) => ({
  ...getRoute(content.meta.path),
  category: "Fancy Serial Numbers",
  categoryId: "fancy-serial-numbers",
  published: pagePublished[content.meta.path] ?? PUBLISHED_ISO,
  readingMinutes: Math.max(1, Math.ceil(prose([content.meta.h1, content.meta.lead, content.takeaways, content.sections, extra]).trim().split(/\s+/).length / 200)),
  image: `/images/editorial/${image}.webp`,
  imageAlt: alt,
  // Editorial selection requested by the owner, not fabricated traffic statistics.
  popularOrder,
}));

export type EditorialArticle = (typeof articles)[number];
export const patternIllustrations: Record<string, string> = {
  "/fancy-serial-numbers/radar/": "/images/patterns/radar.svg",
  "/fancy-serial-numbers/ladder/": "/images/patterns/ladder.svg",
  "/fancy-serial-numbers/broken-ladder/": "/images/patterns/ladder.svg",
  "/fancy-serial-numbers/low-serial-number/": "/images/patterns/low-serial-number.svg",
  "/fancy-serial-numbers/birthday-note/": "/birthdaynote.jfif",
};
/** All existing content pages, including tools and company/legal pages. */
export const directoryPages = routes.filter(route => route.pageType !== "article-index").map((route, index) => {
  const article = articles.find(item => item.path === route.path);
  const categoryId = route.path.includes("2-dollar") ? "two-dollar-bills" : route.silo === "star-notes" ? "star-notes" : route.silo === "trust" ? "company" : "fancy-serial-numbers";
  const category = categoryId === "two-dollar-bills" ? "$2 Bills" : categoryId === "star-notes" ? "Star Notes" : categoryId === "company" ? "Company" : "Fancy Serial Numbers";
  return {
    ...route, categoryId, category,
    published: "", modified: pageModified[route.path], readingMinutes: 0,
    image: patternIllustrations[route.path] ?? `/images/editorial/${categoryId === "fancy-serial-numbers" ? "serial-patterns" : "banknote-collecting"}-detail.webp`,
    imageAlt: route.path === "/fancy-serial-numbers/birthday-note/"
      ? "US $20 bill with birthday-style serial number 04011941."
      : "Illustrative banknote artwork",
    popularOrder: index + 10,
    ...article,
    isTool: toolLinks.some(tool => tool.path === route.path),
    hasByline: Boolean(article),
  };
});
directoryPages.sort((a, b) => b.modified.localeCompare(a.modified) || a.title.localeCompare(b.title));
export type DirectoryPage = (typeof directoryPages)[number];
export function getArticle(path: string) {
  const article = articles.find(item => item.path === path);
  if (!article) throw new Error(`Missing article metadata: ${path}`);
  return article;
}
