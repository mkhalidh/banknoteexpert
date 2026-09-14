/**
 * Internal link audit. Runs against the production build output in .next and the
 * route registry. Reports orphans, depth-from-home, broken links, thin outbound
 * link counts, anchor-text over-concentration, and hardcoded pattern URLs that
 * bypass the patterns registry. Exits non-zero when any issue is found.
 *
 * Run: npm run audit:links  (requires `next build` to have run first)
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../src/config/routes.ts";
import { patterns } from "../src/lib/serial/patterns.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next", "server", "app");
const COMPONENTS_DIR = join(ROOT, "src", "components");

const ANCHOR_MIN_INBOUND = 4; // below this, a 60% share is statistical noise
const ANCHOR_MAX_SHARE = 0.6;
const MIN_OUTBOUND = 3;
const MAX_DEPTH = 3;

const validRoutes = new Set(routes.map((r) => r.path));
const indexable = routes.filter((r) => r.indexable).map((r) => r.path);

function routeToHtml(path: string): string {
  if (path === "/") return join(APP_DIR, "index.html");
  const clean = path.replace(/^\/|\/$/g, "");
  return join(APP_DIR, `${clean}.html`);
}

interface Link {
  target: string; // base route, fragment/query stripped
  anchor: string;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function extractLinks(html: string): Link[] {
  const out: Link[] = [];
  const re = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (!href.startsWith("/")) continue; // external / mailto / #frag
    const base = href.split("#")[0].split("?")[0];
    if (base === "") continue; // pure fragment link
    out.push({ target: base, anchor: stripTags(m[2]) });
  }
  return out;
}

function mainSlice(html: string): string {
  const start = html.indexOf("<main");
  const end = html.indexOf("</main>");
  if (start === -1 || end === -1) return html;
  return html.slice(start, end);
}

// ---- Load every registered page's HTML ----
interface Page {
  route: string;
  allLinks: Link[];
  mainLinks: Link[];
  missing: boolean;
}

const pages: Page[] = routes.map((r) => {
  const file = routeToHtml(r.path);
  if (!existsSync(file)) {
    return { route: r.path, allLinks: [], mainLinks: [], missing: true };
  }
  const html = readFileSync(file, "utf8");
  return {
    route: r.path,
    allLinks: extractLinks(html),
    mainLinks: extractLinks(mainSlice(html)),
    missing: false,
  };
});

const problems: string[] = [];

// ---- Missing built pages ----
const missing = pages.filter((p) => p.missing);
if (missing.length) {
  problems.push(
    `Missing built HTML for: ${missing.map((p) => p.route).join(", ")} (run \`next build\`).`,
  );
}

// ---- Broken internal links ----
const broken: string[] = [];
for (const p of pages) {
  for (const l of p.allLinks) {
    if (!validRoutes.has(l.target)) {
      broken.push(`${p.route} -> ${l.target} (unregistered)`);
    }
  }
}
if (broken.length) problems.push(`Broken internal links:\n  ${broken.join("\n  ")}`);

// ---- Inbound graph (from all links, excluding self) ----
const inbound = new Map<string, { from: string; anchor: string }[]>();
for (const r of routes) inbound.set(r.path, []);
for (const p of pages) {
  const seenFromThisPage = new Set<string>();
  for (const l of p.allLinks) {
    if (l.target === p.route) continue;
    if (!validRoutes.has(l.target)) continue;
    const key = `${p.route}=>${l.target}`;
    if (seenFromThisPage.has(key)) continue; // count one edge per (from,to)
    seenFromThisPage.add(key);
    inbound.get(l.target)!.push({ from: p.route, anchor: l.anchor });
  }
}

// ---- Orphans (indexable, non-home, zero inbound) ----
const orphans = indexable.filter(
  (path) => path !== "/" && (inbound.get(path)?.length ?? 0) === 0,
);
if (orphans.length) problems.push(`Orphan pages (no inbound links): ${orphans.join(", ")}`);

// ---- Depth from homepage (BFS over all links) ----
const adjacency = new Map<string, Set<string>>();
for (const p of pages) {
  const set = new Set<string>();
  for (const l of p.allLinks) {
    if (validRoutes.has(l.target) && l.target !== p.route) set.add(l.target);
  }
  adjacency.set(p.route, set);
}
const depth = new Map<string, number>();
depth.set("/", 0);
const queue: string[] = ["/"];
while (queue.length) {
  const cur = queue.shift()!;
  const d = depth.get(cur)!;
  for (const next of adjacency.get(cur) ?? []) {
    if (!depth.has(next)) {
      depth.set(next, d + 1);
      queue.push(next);
    }
  }
}
const tooDeep = indexable.filter((path) => (depth.get(path) ?? Infinity) > MAX_DEPTH);
if (tooDeep.length) {
  problems.push(
    `Pages deeper than ${MAX_DEPTH} clicks (or unreachable): ${tooDeep
      .map((p) => `${p} (depth ${depth.get(p) ?? "unreachable"})`)
      .join(", ")}`,
  );
}

// ---- Thin outbound (fewer than MIN_OUTBOUND unique internal links in <main>) ----
// SEO concern: applies to indexable pages only. noindex legal pages are exempt.
const thin: string[] = [];
for (const p of pages) {
  if (p.missing) continue;
  if (!indexable.includes(p.route)) continue;
  const targets = new Set(
    p.mainLinks.map((l) => l.target).filter((t) => t !== p.route && validRoutes.has(t)),
  );
  if (targets.size < MIN_OUTBOUND) {
    thin.push(`${p.route} (${targets.size} outbound)`);
  }
}
if (thin.length) problems.push(`Indexable pages with fewer than ${MIN_OUTBOUND} outbound internal links:\n  ${thin.join("\n  ")}`);

// ---- Required links that MUST exist (verify, do not assume) ----
const linkSet = new Map<string, Set<string>>();
for (const p of pages) linkSet.set(p.route, new Set(p.allLinks.map((l) => l.target)));
const has = (from: string, to: string) => linkSet.get(from)?.has(to) ?? false;

const requiredEdges: [string, string][] = [
  ["/", "/star-note-lookup/"],
  ["/", "/2-dollar-bill-serial-number-lookup/"],
  ["/", "/fancy-serial-numbers/"],
  ["/", "/2-dollar-bill-value/"],
  ["/2-dollar-bill-value/", "/star-note-lookup/"],
  ["/2-dollar-bill-value/", "/2-dollar-bill-serial-number-lookup/"],
  ["/2-dollar-bill-value/", "/methodology/"],
  ["/star-note-lookup/", "/2-dollar-bill-value/"],
  ["/star-note-lookup/", "/methodology/"],
  ["/2-dollar-bill-serial-number-lookup/", "/2-dollar-bill-value/"],
  ["/2-dollar-bill-serial-number-lookup/", "/star-note-lookup/"],
];
const missingEdges = requiredEdges.filter(([from, to]) => !has(from, to));

const patternSpokes = [
  "/fancy-serial-numbers/radar/",
  "/fancy-serial-numbers/ladder/",
  "/fancy-serial-numbers/low-serial-number/",
  "/fancy-serial-numbers/birthday-note/",
];
// Every Silo 1 pattern spoke -> hub + homepage checker
for (const spoke of patternSpokes) {
  if (!has(spoke, "/fancy-serial-numbers/")) missingEdges.push([spoke, "/fancy-serial-numbers/"]);
  if (!has(spoke, "/")) missingEdges.push([spoke, "/"]);
}
// Star note -> 2+ pattern spokes
const starPatternLinks = patternSpokes.filter((s) => has("/star-note-lookup/", s)).length;
if (starPatternLinks < 2) {
  problems.push(`/star-note-lookup/ links only ${starPatternLinks} Silo 1 pattern pages (need 2+).`);
}
// Every page showing a value figure -> /methodology/
const valueFigurePages = [
  "/",
  "/fancy-serial-number-value/",
  "/2-dollar-bill-serial-number-lookup/",
  "/star-note-lookup/",
  "/2-dollar-bill-value/",
];
for (const vp of valueFigurePages) {
  if (!has(vp, "/methodology/")) missingEdges.push([vp, "/methodology/"]);
}
if (missingEdges.length) {
  problems.push(
    `Required internal links missing:\n  ${missingEdges.map(([f, t]) => `${f} -> ${t}`).join("\n  ")}`,
  );
}

// ---- Anchor-text concentration (content links only) ----
const anchorByTarget = new Map<string, Map<string, number>>();
for (const p of pages) {
  for (const l of p.mainLinks) {
    if (!validRoutes.has(l.target) || l.target === p.route) continue;
    if (!anchorByTarget.has(l.target)) anchorByTarget.set(l.target, new Map());
    const counts = anchorByTarget.get(l.target)!;
    counts.set(l.anchor, (counts.get(l.anchor) ?? 0) + 1);
  }
}
const overConcentrated: string[] = [];
for (const [target, counts] of anchorByTarget) {
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total < ANCHOR_MIN_INBOUND) continue;
  const max = Math.max(...counts.values());
  if (max / total > ANCHOR_MAX_SHARE) {
    const dominant = [...counts.entries()].find(([, n]) => n === max)![0];
    overConcentrated.push(
      `${target}: "${dominant}" is ${max}/${total} (${Math.round((max / total) * 100)}%)`,
    );
  }
}
if (overConcentrated.length)
  problems.push(`Anchor text over-concentrated (>60%):\n  ${overConcentrated.join("\n  ")}`);

// ---- Hardcoded pattern URLs in components (should use registry href) ----
function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith(".tsx") ? [full] : [];
  });
}
const patternHrefs = [...new Set(patterns.map((p) => p.href))];
const hardcoded: string[] = [];
for (const file of walk(COMPONENTS_DIR)) {
  const src = readFileSync(file, "utf8");
  for (const href of patternHrefs) {
    if (src.includes(`"${href}"`)) {
      hardcoded.push(`${file.replace(ROOT, "")} contains literal ${href}`);
    }
  }
}
if (hardcoded.length)
  problems.push(`Hardcoded pattern URLs bypassing the registry:\n  ${hardcoded.join("\n  ")}`);

// ---- Report ----
console.log("Internal link audit");
console.log("===================");
console.log(`Registered routes: ${routes.length} (indexable: ${indexable.length})`);
console.log(`Pages analysed:    ${pages.filter((p) => !p.missing).length}`);
console.log("");

if (problems.length === 0) {
  console.log("PASS — no issues found.");
  process.exit(0);
} else {
  console.log(`FAIL — ${problems.length} issue group(s):\n`);
  for (const p of problems) console.log("• " + p + "\n");
  process.exit(1);
}
