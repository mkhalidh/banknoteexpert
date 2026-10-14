import { describe, expect, it } from "vitest";
import { content, examples } from "@/content/broken-ladder";
import { patternsById } from "@/lib/serial/patterns";
import { pageGraph } from "@/lib/page-schema";
import { getRoute, routes } from "@/config/routes";

describe("broken ladder guide", () => {
  it("keeps metadata within the site limits and registers an indexable route", () => {
    expect(content.meta.title.length).toBeLessThanOrEqual(60);
    expect(content.meta.description.length).toBeLessThanOrEqual(160);
    expect(getRoute(content.meta.path).indexable).toBe(true);
    expect(routes.filter(route => route.path === content.meta.path)).toHaveLength(1);
  });

  it("uses the checker's actual verdict for every example", () => {
    for (const { serial, pattern } of examples) {
      expect(patternsById.ladder.detect(serial), serial).toBe(pattern === "ladder");
      expect(patternsById["broken-ladder"].detect(serial), serial).toBe(pattern === "broken-ladder");
      if (pattern === "radar" || pattern === "repeater") expect(patternsById[pattern].detect(serial), serial).toBe(true);
    }
  });

  it("publishes an Article and breadcrumbs without FAQPage schema", () => {
    const schema = pageGraph(content.meta.path, [
      { name: "Home", path: "/" },
      { name: "Fancy Serial Numbers", path: "/fancy-serial-numbers/" },
      { name: "Broken Ladder", path: content.meta.path },
    ]);
    const graph = schema["@graph"] as Array<Record<string, unknown>>;
    expect(graph.find(node => node["@type"] === "Article")).toMatchObject({
      datePublished: "2026-10-14",
      dateModified: "2026-10-14",
      mainEntityOfPage: "https://www.banknoteexpert.com/fancy-serial-numbers/broken-ladder/",
    });
    expect(graph.some(node => node["@type"] === "BreadcrumbList")).toBe(true);
    expect(graph.some(node => node["@type"] === "FAQPage")).toBe(false);
  });
});
