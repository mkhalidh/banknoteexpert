/// <reference types="vite/client" />
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRequire } from "node:module";
const { JSDOM } = createRequire(import.meta.url)("jsdom") as { JSDOM: new (html: string) => { window: { document: Document } } };
import { describe, expect, it, vi } from "vitest";
import { routes } from "@/config/routes";
import { fancyArticles } from "@/config/navigation";
import { Footer } from "@/components/layout/Footer";
import { scoreSerial } from "@/lib/serial/score";
import { patternsById } from "@/lib/serial/patterns";
import { siloAGuides } from "@/content/silo-a-guides";
import { existsSync } from "node:fs";

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
  it("shows a real note photo with a matching serial on each pattern guide", async () => {
    const guides = [
      ["binary", "77555775", "binary"],
      ["super-radar", "10000001", "true-binary-radar"],
      ["radar-repeater", "12211221", "radar-repeater"],
    ] as const;
    for (const [slug, serial, pattern] of guides) {
      const page = await pages[`../../app/fancy-serial-numbers/${slug}/page.tsx`]();
      const doc = new JSDOM(renderToStaticMarkup(React.createElement(page.default))).window.document;
      const note = doc.querySelector("figure.article-cover img");
      expect(note?.getAttribute("src")).toBe(`/images/patterns/${slug}-real-note.jpg`);
      expect(note?.getAttribute("alt")).toContain(serial);
      expect(doc.querySelector("figure.article-cover figcaption")?.textContent).toContain(serial);
      expect(scoreSerial(serial).matches[0]?.id).toBe(pattern);
    }
  });

  it("renders the eight new guide photos with detector-matching serials and plain-text credits", async () => {
    const detectorByPath: Record<string, string> = {
      "/fancy-serial-numbers/solid/": "solid",
      "/fancy-serial-numbers/trinary/": "trinary",
      "/fancy-serial-numbers/seven-of-a-kind/": "seven-of-a-kind",
      "/fancy-serial-numbers/six-of-a-kind/": "six-of-a-kind",
      "/fancy-serial-numbers/five-of-a-kind/": "five-of-a-kind",
      "/fancy-serial-numbers/binary-radar/": "binary-radar",
      "/fancy-serial-numbers/bookends/": "bookends",
      "/fancy-serial-numbers/four-pairs/": "four-pairs",
    };
    for (const content of siloAGuides) {
      const serial = content.image.alt.match(/\b\d{8}\b/)?.[0];
      expect(serial, content.meta.path).toBeDefined();
      expect(patternsById[detectorByPath[content.meta.path]].detect(serial!), content.meta.path).toBe(true);
      expect(existsSync(`public${content.image.src}`), content.meta.path).toBe(true);
      const page = await pages[`../../app${content.meta.path.slice(0, -1)}/page.tsx`]();
      const doc = new JSDOM(renderToStaticMarkup(React.createElement(page.default))).window.document;
      expect(doc.querySelector("figure.article-cover img")?.getAttribute("alt")).toContain(serial);
      expect(doc.querySelector("figure.article-cover figcaption")?.textContent).toMatch(/^Image: eBay listing \d+$/);
      expect(doc.querySelector("figure.article-cover figcaption a")).toBeNull();
      expect(doc.querySelectorAll("#faq .card")).toHaveLength(content.sections.find(section => section.id === "faq")!.blocks.filter(block => block.kind === "subheading").length);
      expect(content.meta.title).not.toContain(String.fromCharCode(0x2014));
      expect(content.meta.description).not.toContain(String.fromCharCode(0x2014));
      for (const [example] of content.examples) expect(example).toMatch(/^\d{8}$/);
    }
  });

  it("renders one H1 and graph per page, with matching visible FAQ and article dates", async () => {
    expect(Object.keys(pages)).toHaveLength(routes.length);
    const titles = new Set();
    for (const [file, load] of Object.entries(pages)) {
      const page = await load();
      const doc = new JSDOM(renderToStaticMarkup(React.createElement(page.default))).window.document;
      expect(doc.querySelectorAll("h1"), file).toHaveLength(1);
      const externalAnchors = [...doc.querySelectorAll("a[href]")].filter(anchor => {
        const url = new URL(anchor.getAttribute("href")!, "https://www.banknoteexpert.com/");
        return /^https?:$/.test(url.protocol) && !/^(www\.)?banknoteexpert\.com$/.test(url.hostname) && url.hostname !== "fazier.com" && url.hostname !== "viesearch.com";
      });
      const fazierAnchor = [...doc.querySelectorAll('a[href="https://fazier.com/"]')];
      expect(fazierAnchor.length, file).toBe(file.endsWith("/app/page.tsx") ? 1 : 0);
      if (fazierAnchor.length) {
        expect(fazierAnchor[0].getAttribute("target")).toBe("_blank");
        expect(fazierAnchor[0].getAttribute("rel")?.split(/\s+/)).toEqual(expect.arrayContaining(["nofollow", "noopener"]));
        const expectedBadgeSrc = ["https://fazier.com/api/v1/", "/public/badges/", "launch_badges", ".svg?badge_type=featured&theme=light"].join("");
        expect(fazierAnchor[0].querySelector("img")?.getAttribute("src")).toBe(expectedBadgeSrc);
      }
      const viesearchAnchor = [...doc.querySelectorAll('a[href="https://viesearch.com/"]')];
      expect(viesearchAnchor.length, file).toBe(file.endsWith("/app/page.tsx") ? 1 : 0);
      if (viesearchAnchor.length) {
        expect(viesearchAnchor[0].getAttribute("target")).toBe("_blank");
        expect(viesearchAnchor[0].getAttribute("rel")?.split(/\s+/)).toEqual(expect.arrayContaining(["nofollow", "noopener"]));
        expect(viesearchAnchor[0].querySelector("img")?.getAttribute("alt")).toBe("Featured on Viesearch");
      }
      expect(externalAnchors, file).toHaveLength(0);
      if (file.endsWith("/fancy-serial-numbers/binary/page.tsx")) {
        expect(page.metadata.title).toBe("Binary Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert");
        expect(page.metadata.description).toBe("What is a binary serial number on a dollar bill? Learn the definition, see examples, check the 1 in 8,749 rarity odds, and find what binary notes actually sold for.");
      } else if (file.endsWith("/fancy-serial-numbers/super-radar/page.tsx")) {
        expect(page.metadata.title).toBe("Super Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert");
        expect(page.metadata.description).toBe("What is a super radar serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what super radar notes actually sold for.");
      } else if (file.endsWith("/fancy-serial-numbers/radar-repeater/page.tsx")) {
        expect(page.metadata.title).toBe("Radar Repeater Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert");
        expect(page.metadata.description).toBe("What is a radar repeater serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what radar repeater notes actually sold for.");
        expect(doc.querySelectorAll("#faq .card").length).toBe(7);
        const valueTable = [...doc.querySelectorAll("table")].find(table => table.querySelector("caption")?.textContent?.includes("Recorded Radar Repeater"));
        expect(valueTable).toBeDefined();
        expect(valueTable!.querySelectorAll("tbody tr").length).toBe(3);
        for (const row of valueTable!.querySelectorAll("tbody tr")) {
          expect(row.querySelectorAll("td")[0]?.textContent).toBe("");
          expect(row.querySelectorAll("td")[1]?.textContent).toBe("");
        }
      } else if (["solid", "trinary", "seven-of-a-kind", "six-of-a-kind", "five-of-a-kind", "binary-radar", "bookends", "four-pairs"].some(slug => file.endsWith(`/fancy-serial-numbers/${slug}/page.tsx`))) {
        expect(page.metadata.title).toContain("| Banknote Expert");
        expect(page.metadata.description.length, file).toBeLessThanOrEqual(160);
        expect(doc.querySelector("figure.article-cover figcaption")?.textContent).toContain("Image: eBay listing");
        expect(doc.querySelector("figure.article-cover img")?.getAttribute("alt")).toMatch(/serial/);
        expect(doc.querySelectorAll("#faq .card").length).toBeGreaterThan(0);
      } else {
        expect(page.metadata.title.length, file).toBeLessThanOrEqual(60);
        expect(page.metadata.description.length, file).toBeLessThanOrEqual(160);
      }
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
    const footer = new JSDOM(renderToStaticMarkup(React.createElement(Footer))).window.document;
    const binaryPath = "/fancy-serial-numbers/binary/";
    const binaryHref = binaryPath.slice(0, -1);
    expect(home.querySelectorAll(`a[href="${binaryHref}"]`).length).toBeGreaterThanOrEqual(2);
    expect(fancyArticles).toContainEqual({ path: binaryPath, label: "Binary serial numbers" });
    expect(footer.querySelector(`a[href="${binaryHref}"]`)).not.toBeNull();
    const superRadarPath = "/fancy-serial-numbers/super-radar/";
    const superRadarHref = superRadarPath.slice(0, -1);
    expect(home.querySelectorAll(`a[href="${superRadarHref}"]`).length).toBeGreaterThanOrEqual(2);
    expect(fancyArticles).toContainEqual({ path: superRadarPath, label: "Super radar serial numbers" });
    expect(footer.querySelector(`a[href="${superRadarHref}"]`)).not.toBeNull();
    const radarRepeaterPath = "/fancy-serial-numbers/radar-repeater/";
    const radarRepeaterHref = radarRepeaterPath.slice(0, -1);
    expect(home.querySelectorAll(`a[href="${radarRepeaterHref}"]`).length).toBeGreaterThanOrEqual(2);
    expect(fancyArticles).toContainEqual({ path: radarRepeaterPath, label: "Radar repeater serial numbers" });
    expect(footer.querySelector(`a[href="${radarRepeaterHref}"]`)).not.toBeNull();
    const newGuides = [
      ["solid", "Solid serial numbers"], ["trinary", "Trinary serial numbers"],
      ["seven-of-a-kind", "Seven of a Kind serial numbers"], ["six-of-a-kind", "Six of a Kind serial numbers"],
      ["five-of-a-kind", "Five of a Kind serial numbers"], ["binary-radar", "Binary Radar serial numbers"],
      ["bookends", "Bookends serial numbers"], ["four-pairs", "Quad Doubles serial numbers"],
    ] as const;
    for (const [slug, label] of newGuides) {
      const href = `/fancy-serial-numbers/${slug}`;
      expect(home.querySelector(`a[href="${href}"]`), href).not.toBeNull();
      expect(hub.querySelector(`a[href="${href}"]`), href).not.toBeNull();
      expect(footer.querySelector(`a[href="${href}"]`), href).not.toBeNull();
      expect(fancyArticles).toContainEqual({ path: `${href}/`, label });
    }
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
