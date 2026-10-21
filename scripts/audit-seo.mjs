import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { routes } from "../src/config/routes.ts";

const origin = "https://www.banknoteexpert.com";
const metadataOnly = process.argv.includes("--metadata-only");
const base = process.argv.find(arg => /^https?:/.test(arg));
const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };
const documents = new Map();
const titles = new Set();
const descriptions = new Set();
for (const route of routes) {
  const file = join(".next/server/app", route.path === "/" ? "index.html" : `${route.path.slice(1, -1)}.html`);
  if (!existsSync(file)) { errors.push(`Missing build output: ${file}`); continue; }
  const doc = new JSDOM(readFileSync(file, "utf8")).window.document;
  documents.set(route.path, doc);
  const title = doc.title;
  const description = doc.querySelector('meta[name="description"]')?.content;
  const requestedMetadata = {
    "/fancy-serial-numbers/binary/": {
      title: "Binary Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a binary serial number on a dollar bill? Learn the definition, see examples, check the 1 in 8,749 rarity odds, and find what binary notes actually sold for.",
    },
    "/fancy-serial-numbers/super-radar/": {
      title: "Super Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a super radar serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what super radar notes actually sold for.",
    },
    "/fancy-serial-numbers/radar-repeater/": {
      title: "Radar Repeater Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a radar repeater serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what radar repeater notes actually sold for.",
    },
    "/fancy-serial-numbers/solid/": {
      title: "Solid Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a solid serial number on a dollar bill? See real examples, detector-based odds, value factors and verified sold ranges by condition.",
    },
    "/fancy-serial-numbers/trinary/": {
      title: "Trinary Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a trinary serial number on a dollar bill? Learn the detector definition, compare true trinary and binary, see examples and check verified value data.",
    },
    "/fancy-serial-numbers/seven-of-a-kind/": {
      title: "Seven of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a seven of a kind serial number on a dollar bill? Compare seven in a row, see detector-based odds, examples and verified value data.",
    },
    "/fancy-serial-numbers/six-of-a-kind/": {
      title: "Six of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a six of a kind serial number? Learn how the detector defines it, compare near solid terms, see exact odds and check value data.",
    },
    "/fancy-serial-numbers/five-of-a-kind/": {
      title: "Five of a Kind Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a five of a kind serial number? See examples, compare five, six and seven repeats, check exact odds and review value factors.",
    },
    "/fancy-serial-numbers/binary-radar/": {
      title: "Binary Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a binary radar serial number? Learn the two-digit palindrome rule, examples, exact detector odds and honest value guidance.",
    },
    "/fancy-serial-numbers/bookends/": {
      title: "Bookends Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a bookends serial number? See the site's two-digit rule, compare three-digit bookends with radar and repeater patterns, and review value evidence.",
    },
    "/fancy-serial-numbers/four-pairs/": {
      title: "Quad Doubles (Four Pairs) Serial Number: What It Is, Rarity & Value | Banknote Expert",
      description: "What is a quad doubles serial number? Learn the AABBCCDD rule, compare it with double quad, see examples and check verified value data.",
    },
  }[route.path];
  check(title && (requestedMetadata ? title === requestedMetadata.title : title.length <= 60) && !titles.has(title), `${route.path}: missing, duplicate or long title (${title.length})`);
  check(description && (requestedMetadata ? description === requestedMetadata.description : description.length <= 160) && !descriptions.has(description), `${route.path}: missing, duplicate or long description (${description?.length})`);
  titles.add(title); descriptions.add(description);
}
if (!metadataOnly) {
  const text = value => (value ?? "").replace(/\s+/g, " ").trim();
  const images = new Set();
  for (const [path, doc] of documents) {
    check(doc.querySelector('link[rel="canonical"]')?.href === origin + path, `${path}: canonical mismatch`);
    check(doc.querySelectorAll("h1").length === 1, `${path}: expected one H1`);
    const route = routes.find(item => item.path === path);
    const robots = doc.querySelector('meta[name="robots"]')?.content ?? "";
    check(route?.indexable ? !/noindex/.test(robots) : /noindex/.test(robots), `${path}: incorrect robots index status`);
    check(!doc.querySelector("img:not([alt])"), `${path}: image missing alt attribute`);
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const image = doc.querySelector(selector)?.content;
      check(image?.startsWith(origin + "/"), `${path}: missing/noncanonical ${selector}`);
      if (image) images.add(image);
    }
    check(Boolean(doc.querySelector('meta[property="og:image:alt"]')?.content), `${path}: missing OG alt`);
    for (const link of doc.querySelectorAll("a[href]")) {
      const raw = link.getAttribute("href");
      const url = new URL(raw, origin + path);
      if (!/^(www\.)?banknoteexpert\.com$/.test(url.hostname)) {
        check(!/^https?:$/.test(url.protocol), `${path}: external link not allowed ${raw}`);
        continue;
      }
      check(url.origin === origin, `${path}: noncanonical host ${raw}`);
      if (/\.[a-z0-9]+$/i.test(url.pathname)) continue;
      check(url.pathname.endsWith("/"), `${path}: missing trailing slash ${raw}`);
      const target = documents.get(url.pathname);
      check(Boolean(target), `${path}: broken internal link ${raw}`);
      if (url.hash && target) check(Boolean(target.getElementById(decodeURIComponent(url.hash.slice(1)))), `${path}: missing anchor ${raw}`);
    }
    const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];
    check(scripts.length === 1, `${path}: expected one JSON-LD graph`);
    try {
      const schema = JSON.parse(scripts[0]?.textContent ?? "{}");
      const graph = schema["@graph"] ?? [];
      const types = graph.map(node => node["@type"]);
      check(schema["@context"] === "https://schema.org" && types.includes("Organization") && types.includes("WebSite"), `${path}: incomplete graph`);
      if (path !== "/") check(types.includes("BreadcrumbList"), `${path}: missing breadcrumbs`);
      const body = text(doc.querySelector("main")?.textContent);
      for (const node of graph) {
        if (node["@type"] === "FAQPage") for (const faq of node.mainEntity) {
          check(body.includes(text(faq.name)) && body.includes(text(faq.acceptedAnswer.text)), `${path}: FAQ differs from visible content: ${faq.name}`);
        }
        if (node["@type"] === "Article") {
          check(node.headline === text(doc.querySelector("h1")?.textContent), `${path}: Article headline mismatch`);
          for (const date of [node.datePublished, node.dateModified]) check(Boolean(doc.querySelector(`time[datetime="${date}"]`)), `${path}: schema date ${date} is not visible`);
        }
        if (node["@type"] === "BreadcrumbList") {
          const visible = [...doc.querySelectorAll('nav[aria-label="Breadcrumb"] ol li')].map(li => text(li.querySelector("a, [aria-current]")?.textContent));
          check(JSON.stringify(visible) === JSON.stringify(node.itemListElement.map(item => item.name)), `${path}: breadcrumb mismatch`);
        }
      }
    } catch (error) { errors.push(`${path}: invalid JSON-LD: ${error.message}`); }
  }
  const sitemapFile = ".next/server/app/sitemap.xml.body";
  if (existsSync(sitemapFile)) {
    const xml = new JSDOM(readFileSync(sitemapFile, "utf8"), { contentType: "text/xml" }).window.document;
    const urls = [...xml.querySelectorAll("url")];
    const expected = routes.filter(route => route.indexable).length;
    check(urls.length === expected, `Expected ${expected} sitemap URLs, got ${urls.length}`);
    for (const node of urls) {
      const loc = node.querySelector("loc")?.textContent;
      check(loc?.startsWith(origin + "/") && loc.endsWith("/") && documents.has(new URL(loc).pathname), `Invalid sitemap URL ${loc}`);
      check(/^\d{4}-\d{2}-\d{2}/.test(node.querySelector("lastmod")?.textContent ?? ""), `Missing lastmod ${loc}`);
    }
    check(!xml.querySelector("priority, changefreq"), "Obsolete sitemap hints present");
  } else errors.push("Missing built sitemap");
  if (base) {
    for (const image of images) {
      const url = new URL(image); url.host = new URL(base).host; url.protocol = new URL(base).protocol;
      const response = await fetch(url);
      check(response.ok && response.headers.get("content-type")?.startsWith("image/"), `Social image failed: ${image}`);
    }
    for (const path of ["/robots.txt", "/llms.txt"]) {
      const response = await fetch(new URL(path, base));
      check(response.ok, `${path}: HTTP ${response.status}`);
      if (path === "/robots.txt") { const robots = await response.text(); check(!/^Host:/mi.test(robots) && robots.includes(`${origin}/sitemap.xml`), "Incorrect robots.txt"); }
    }
  }
}
console.log(`${metadataOnly ? "Metadata" : "SEO"} audit: ${documents.size} pages; ${errors.length} errors.`);
errors.forEach(error => console.error(error));
if (errors.length) process.exitCode = 1;
