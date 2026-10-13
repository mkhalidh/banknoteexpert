/// <reference types="vite/client" />
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRequire } from "node:module";
const { JSDOM } = createRequire(import.meta.url)("jsdom") as { JSDOM: new (html: string) => { window: { document: Document } } };
import { describe, expect, it, vi } from "vitest";

// Verify server content without browser-only checker/widget initialization.
vi.mock("@/components/tools/FancySerialChecker", () => ({ FancySerialChecker: () => null }));
vi.mock("@/components/tools/StarNoteLookup", () => ({ StarNoteLookup: () => null }));
vi.mock("@/components/tools/TwoDollarSerialLookup", () => ({ TwoDollarSerialLookup: () => null }));
vi.mock("@/components/comments/Comments", () => ({ Comments: () => null }));
vi.mock("next/image", () => ({ default: (props: { src: string; alt: string }) => React.createElement("img", { src: props.src, alt: props.alt }) }));
vi.stubGlobal("React", React);

const pages = import.meta.glob("../../app/**/page.tsx") as Record<string, () => Promise<{ default: React.ComponentType; metadata: { title: string; description: string } }>>;
const normalize = (text: string | null) => (text ?? "").replace(/\s+/g, " ").trim();

describe("rendered SEO content (browser tools excluded)", () => {
  it("renders one H1 and graph per page, with matching visible FAQ and article dates", async () => {
    expect(Object.keys(pages)).toHaveLength(19);
    const titles = new Set();
    for (const [file, load] of Object.entries(pages)) {
      const page = await load();
      const doc = new JSDOM(renderToStaticMarkup(React.createElement(page.default))).window.document;
      expect(doc.querySelectorAll("h1"), file).toHaveLength(1);
      expect(page.metadata.title.length, file).toBeLessThanOrEqual(60);
      expect(page.metadata.description.length, file).toBeLessThanOrEqual(160);
      expect(titles.has(page.metadata.title), file).toBe(false);
      titles.add(page.metadata.title);
      const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts, file).toHaveLength(1);
      const graph = JSON.parse(scripts[0].textContent!)["@graph"];
      const body = normalize(doc.body.textContent);
      for (const node of graph) {
        if (node["@type"] === "FAQPage") for (const faq of node.mainEntity) {
          expect(body, file).toContain(normalize(faq.name));
          expect(body, file).toContain(normalize(faq.acceptedAnswer.text));
        }
        if (node["@type"] === "Article") {
          expect(normalize(doc.querySelector("h1")?.textContent ?? ""), file).toBe(node.headline);
          expect(doc.querySelector(`time[datetime="${node.datePublished}"]`), file).not.toBeNull();
          expect(doc.querySelector(`time[datetime="${node.dateModified}"]`), file).not.toBeNull();
        }
      }
      expect(doc.querySelectorAll("img:not([alt])"), file).toHaveLength(0);
    }
  }, 30000);

  it("resolves homepage hub links and collapses duplicate cards and empty value rows", async () => {
    const Home = (await pages["../../app/page.tsx"]()).default;
    const Hub = (await pages["../../app/fancy-serial-numbers/page.tsx"]()).default;
    const home = new JSDOM(renderToStaticMarkup(React.createElement(Home))).window.document;
    const hub = new JSDOM(renderToStaticMarkup(React.createElement(Hub))).window.document;
    for (const link of home.querySelectorAll('a[href^="/fancy-serial-numbers/#"]')) {
      const id = link.getAttribute("href")!.split("#")[1];
      expect(hub.getElementById(id), id).not.toBeNull();
    }
    const names = [...home.querySelectorAll(".pattern-card a")].map(node => node.textContent);
    expect(names).not.toContain("Palindrome Radar");
    expect(names).not.toContain("Super Repeater");
    expect(names).toContain("Radar");
    for (const row of home.querySelectorAll("table tbody tr")) {
      const cells = [...row.querySelectorAll("td")];
      expect(cells.some(cell => !cell.textContent?.includes("no recorded sales"))).toBe(true);
    }
    expect(home.body.textContent).toContain("No recorded sales yet for:");
  });
});
