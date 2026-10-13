import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { routes } from "@/config/routes";
import { pageContents } from "@/content/pages";
import { pageModified } from "@/config/page-dates";
import { patterns, patternsById } from "@/lib/serial/patterns";
import { patternOrder } from "@/content/fancy-serial-numbers";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { pageGraph } from "@/lib/page-schema";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { homeFaqs } from "@/content/home-faq";

describe("SEO publication contracts", () => {
  it("lists exactly the 19 canonical public pages with durable dates", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(19);
    expect(new Set(entries.map(entry => entry.url)).size).toBe(19);
    for (const entry of entries) {
      const path = new URL(entry.url).pathname;
      expect(entry.url).toBe(`${SITE_URL}${path}`);
      expect(path.endsWith("/")).toBe(true);
      expect(entry.lastModified).toBe(pageModified[path]);
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry).not.toHaveProperty("priority");
      expect(entry).not.toHaveProperty("changeFrequency");
    }
    expect(robots()).not.toHaveProperty("host");
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("keeps every homepage hub anchor available, including legacy links", () => {
    const ids = new Set(patternOrder.map(id => patternsById[id].slug).concat("super-repeater"));
    const missing = patterns.filter(pattern => pattern.href.startsWith("/fancy-serial-numbers/#") && !ids.has(pattern.href.split("#")[1]));
    expect(missing.map(pattern => pattern.href)).toEqual([]);
    expect(patternsById["high-serial"].detect("95999999")).toBe(false);
    expect(patternsById["high-serial"].detect("96000000")).toBe(true);
    expect(patternsById["super-high-serial"].detect("98999999")).toBe(false);
    expect(patternsById["super-high-serial"].detect("99000000")).toBe(true);
  });

  it("rejects metadata outside the requested length limits", () => {
    expect(() => buildMetadata({ path: "/", title: "x".repeat(61), description: "Description" })).toThrow();
    expect(() => buildMetadata({ path: "/", title: "Title", description: "x".repeat(161) })).toThrow();
  });

  it("has unique valid metadata and social image handlers for all routes", () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const route of routes) {
      const meta = pageContents.find(page => page.meta.path === route.path)?.meta ?? route;
      expect(() => buildMetadata(meta)).not.toThrow();
      expect(titles.has(meta.title)).toBe(false);
      expect(descriptions.has(meta.description)).toBe(false);
      titles.add(meta.title); descriptions.add(meta.description);
      if (route.path !== "/") for (const name of ["opengraph-image.tsx", "twitter-image.tsx"]) expect(existsSync(join("src/app", route.path.slice(1), name))).toBe(true);
      const graph = pageGraph(route.path, route.path === "/" ? [] : [{ name: "Home", path: "/" }, { name: route.title, path: route.path }])["@graph"];
      const types = graph.map(node => node["@type"]);
      expect(types.filter(type => type === "Organization")).toHaveLength(1);
      expect(types.filter(type => type === "WebSite")).toHaveLength(1);
      if (route.path !== "/") expect(types).toContain("BreadcrumbList");
      expect(types).not.toContain("Product");
      expect(types).not.toContain("AggregateRating");
      JSON.parse(JSON.stringify(graph));
    }
  });

  it("generates FAQs only from the visible question/answer source", () => {
    const faq = pageGraph("/", [])["@graph"].find(node => node["@type"] === "FAQPage");
    expect(faq?.mainEntity).toEqual(homeFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })));
    for (const path of ["/2-dollar-bill-value/", "/1976-2-dollar-bill-value/", "/star-note-lookup/", "/2-dollar-bill-serial-number-lookup/"]) {
      const questions = pageContents.find(page => page.meta.path === path)!.sections.find(section => section.id === "faq")!.blocks.filter(block => block.kind === "subheading");
      const node = pageGraph(path, [])["@graph"].find(node => node["@type"] === "FAQPage");
      expect(node?.mainEntity).toHaveLength(questions.length);
    }
  });

});
