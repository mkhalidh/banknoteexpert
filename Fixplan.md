# AI Fix Plan: banknoteexpert.com SEO issues

**How to use this file:** Give it to an AI coding agent (Claude Code, Cursor, etc.) that has the site's source repo open. Each task has a goal, steps, and an acceptance check. Do tasks in order. After each task, run the site build and confirm the check passes.

## Context (read first)

- Site: https://www.banknoteexpert.com/ (canonical host is **www**, trailing slash on all URLs).
- Stack looks like **Next.js** (static pages, `_next/image`, per-route `opengraph-image` files). Confirm whether it uses the App Router (`app/`) or Pages Router (`pages/`) and adapt the snippets below.
- Tools run fully in the browser. Do not add server calls for serial checks.
- Rules for the agent:
  1. **Never invent data**: no made-up sale prices, credentials, dates, sources, or print runs. If a task needs real facts, leave a clearly marked `TODO(human)` and list it in the final report.
  2. Keep existing URLs unchanged (no renames, no new redirects) unless a task says so.
  3. Make one commit per task with a clear message.
  4. Do not touch the checker's pattern-detection logic except to *read* it as the source of truth.

Known live URLs (13 in the current sitemap + 6 missing):

```
/  /fancy-serial-numbers/  /fancy-serial-numbers/radar/  /fancy-serial-numbers/ladder/
/fancy-serial-numbers/low-serial-number/  /fancy-serial-numbers/birthday-note/
/fancy-serial-number-value/  /2-dollar-bill-serial-number-lookup/
/where-is-the-serial-number-on-a-dollar-bill/  /star-note-lookup/  /2-dollar-bill-value/
/methodology/  /about/
(missing from sitemap) /tools/  /blog/  /about-the-author/  /1976-2-dollar-bill-value/  /privacy/  /terms/
```

---

## PHASE 1: High priority

### Task 1: Fix sitemap host (www)
**Problem:** every `<loc>` is `https://banknoteexpert.com/...` but canonicals are `https://www.banknoteexpert.com/...`.
**Steps:**
1. Find where the sitemap is generated (`app/sitemap.ts`, `next-sitemap.config.js`, a build script, or a static `public/sitemap.xml`).
2. Set the base URL to `https://www.banknoteexpert.com` (prefer a single `SITE_URL` constant used by sitemap, canonicals, OG URLs, robots, and schema).
3. Every URL must end with `/`.
**Accept:** `grep -c "https://banknoteexpert.com" sitemap.xml` returns 0; every `<loc>` starts with `https://www.banknoteexpert.com/`.

### Task 2: Complete the sitemap and add real `lastmod`
**Steps:**
1. Add the 6 missing pages listed above.
2. Add `lastmod` per URL, derived from the page's real "Last updated" date (frontmatter/data file). If a page has no date, use the file's last git commit date for that page. Never use `new Date()` at build time for every page.
3. Remove `priority` and `changefreq` (Google ignores them).
4. Ensure no non-canonical or noindex URL is included.
**Example (App Router) `app/sitemap.ts`:**
```ts
import type { MetadataRoute } from 'next';
const SITE = 'https://www.banknoteexpert.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified: string }[] = [
    // TODO: fill lastModified from each page's real updated date
    { path: '/', lastModified: '2026-10-06' },
    { path: '/fancy-serial-numbers/', lastModified: '2026-09-08' },
    // ...all 19 URLs
  ];
  return pages.map(p => ({ url: `${SITE}${p.path}`, lastModified: p.lastModified }));
}
```
**Accept:** sitemap has 19 URLs, all `www`, all trailing slash, each with `lastmod`.

### Task 3: Fix homepage links to non-existent hub anchors
**Problem:** homepage pattern cards link to anchors on `/fancy-serial-numbers/` such as `#six-of-a-kind`, `#five-of-a-kind`, `#true-binary-radar`(goes to radar page, fine), `#true-binary-repeater`, `#near-true-binary`, `#true-binary`, `#double-binary-repeater`, `#trinary-repeater`, `#bookends-repeater`, `#binary-repeater`, `#binary-four-pairs`, `#ladder-four-pairs`, `#bookends-four-pairs`, `#four-pairs`, `#bookends-binary`, `#bookends`, `#near-radar-repeater`, `#near-binary-radar`, `#super-high-serial`. The hub only has sections for ~15 patterns.
**Steps:**
1. Write a script that extracts every `href` containing `/fancy-serial-numbers/#...` from the built homepage, and every `id` on the built hub page. List the anchors with no matching id.
2. For each missing anchor, **add a section to the hub** with `id` = the anchor and the same structure as existing sections: `<h3>` name, example code, 2-3 sentence definition, "Rough odds" line. Take the definition and odds **from the pattern data the checker already uses** (the same source that renders the homepage cards), so nothing is invented.
3. Do not write value claims for patterns with no recorded sales; say "no recorded sales yet".
**Accept:** the script reports 0 missing anchors.

### Task 4: Reconcile content inconsistencies (content pass)
Use the **checker's logic/data as the single source of truth**, then make pages match.
1. **High serial threshold:** homepage says 96,000,000+; hub says 99,999,900+. Read the checker code, find the real threshold(s), and make homepage, hub and any FAQ say the same thing. If the code supports two tiers (High 96M+, Super High 99M+), say so on both pages.
2. **Duplicate cards:** "Radar" and "Palindrome Radar" have identical example and definition; "Super Repeater" and "Bookends Repeater" both use `12121212`. If both are separate patterns in the code, give each a distinct example and definition from code; if one is an alias, merge into one card.
3. **Card copy:** homepage says each card shows "a typical value range" but they show only rarity. Change the sentence to match (or add ranges only where recorded sales exist).
4. **Stale text:** `/2-dollar-bill-value/` says the 1976 series "will get its own dedicated page"; the page `/1976-2-dollar-bill-value/` exists. Replace with a link to it in both the 1976 section and the Related guides list.
5. **Value table anomalies (homepage + value guide):** Super radar Very Fine ($43-$119) < Circulated max ($500); Broken ladder Uncirculated min $15 < VF min $129; "Low serial (under 1000) Uncirculated $69-$69". **Do not edit numbers.** Add a code check that flags rows where a higher grade has a lower min/max than a lower grade, output the list, and add a `TODO(human)` note for the owner to verify against source sales. Optionally add a footnote: "Ranges reflect small samples; a higher grade can show a lower range when few sales exist."
6. Collapse all-"no recorded sales" rows into one line under the table: "No recorded sales yet for: Six of a kind, Five of a kind, ..." (generate the list from data).
**Accept:** grep shows one consistent high-serial threshold; no duplicate cards; 0 mentions of "will get its own dedicated page"; the table renders only rows with data.

---

## PHASE 2: Medium priority

### Task 5: OG/Twitter images on every page
**Problem:** only `/` and `/star-note-lookup/` define images; other pages declare `summary_large_image` without an image.
**Steps (App Router):** add `opengraph-image.tsx` (and `twitter-image.tsx`, or re-export) next to each route's `page.tsx` for: hub, radar, ladder, low-serial, birthday, value guide, $2 lookup, $2 value, 1976, where-is-serial, about, about-the-author, methodology, blog, tools. Reuse the same generator the homepage uses; 1200x630; include the page title and site name. Add `alt` text.
**Accept:** every page's HTML has `og:image`, `og:image:alt`, `twitter:image` pointing to an absolute `https://www...` URL that returns 200.

### Task 6: Meta length cleanup
1. Hub meta description is ~193 chars. Rewrite to <=155, e.g.: "What is a fancy serial number? See every type of collectible banknote pattern (solid, radar, ladder, binary, repeater) with odds and value drivers." (check length).
2. Homepage title is 62 chars; shorten to <=60, e.g. "Fancy Serial Number Checker: Free US Dollar Bill Lookup".
3. Add a check script that fails the build if any title >60 or description >160 chars.
**Accept:** script passes.

### Task 7: Internal link and nav fixes
1. On `/fancy-serial-numbers/radar/`, turn the plain-text `/fancy-serial-number-value/` mention into a real link ("fancy serial number value guide").
2. Nav: rename the first item currently labelled "Fancy Serial Numbers" (points to `/`) to "Serial Number Checker". Add a separate "Patterns" item pointing to `/fancy-serial-numbers/`. Keep the footer groups as they are.
3. Run a link checker over the built site: no broken internal links, no links to non-canonical (non-www or missing trailing slash) URLs.
**Accept:** link checker clean.

### Task 8: Structured data (JSON-LD)
First check what exists: `curl -s URL | grep -o 'application/ld+json'` per page. Add or fix, keeping one `@graph` per page:
- **Sitewide:** `Organization` (name "Banknote Expert", url, logo; leave `sameAs` empty unless real profiles exist) and `WebSite`.
- **Tool pages** (`/`, `/star-note-lookup/`, `/2-dollar-bill-serial-number-lookup/`): `WebApplication` with `name`, `url`, `applicationCategory: "UtilitiesApplication"`, `operatingSystem: "Any"`, `offers: {price: "0", priceCurrency: "USD"}`.
- **All inner pages:** `BreadcrumbList` matching the visible breadcrumbs.
- **Guides:** `Article` with `headline`, `author` (`Person`, url = `/about-the-author/`), `datePublished`, `dateModified` (use the real dates shown on the page), `mainEntityOfPage`, `publisher`.
- **Pages with an FAQ section:** `FAQPage`, with Q&A text identical to what is visible.
- Do **not** add `Product`, `Review`, `AggregateRating`, or `Offer` for notes.
Example:
```json
{"@context":"https://schema.org","@graph":[
 {"@type":"WebApplication","@id":"https://www.banknoteexpert.com/#app","name":"Fancy Serial Number Checker",
  "url":"https://www.banknoteexpert.com/","applicationCategory":"UtilitiesApplication","operatingSystem":"Any",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}},
 {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.banknoteexpert.com/"}]}
]}
```
**Accept:** every page validates in the Schema.org validator / Rich Results Test with 0 errors; JSON-LD content matches visible content.

### Task 9: Performance and image sizing
1. Run Lighthouse (mobile) via CLI on `/`, `/fancy-serial-numbers/`, `/blog/` and save LCP, INP/TBT, CLS to `perf-before.json`.
2. Find `next/image` usages on blog/guide cards that produce `w=3840` URLs. Set `sizes` (e.g. `(max-width: 768px) 100vw, 400px`) and a sensible `deviceSizes`/`imageSizes` in `next.config`. Hero image gets `priority`; below-the-fold images lazy load.
3. Make sure the comments widget loads on scroll/idle, reserves its height (no layout shift), and its links use `rel="ugc nofollow"`.
4. Re-run Lighthouse to `perf-after.json`; report the change.
**Accept:** CLS < 0.1, LCP < 2.5 s on mobile lab test (or report why not).

### Task 10: Images and alt text
1. Add meaningful `alt` text to any non-decorative image. Blog-card images that sit inside a link with heading text can use `alt=""` intentionally; keep that and note it.
2. The same 3 stock images repeat on all pages. Create a mapping so each pattern guide gets its own illustration (SVG diagrams of the pattern are ideal, generated from the pattern example); list pages still on shared images in the final report.
**Accept:** no `<img>` without an `alt` attribute.

---

## PHASE 3: Authority and housekeeping

### Task 11: Author/E-E-A-T scaffolding (needs human input)
1. Fix the garbled sentence on `/about/` ("Web developer with a strong focus on researching, analyzing, and building practical solutions around real-world problems., drawing on...") so it reads cleanly. Keep the meaning; do not add credentials.
2. Add data-driven fields for `credentials`, `memberships`, `reviewedBy` to the author data, render them only when set. Put `TODO(human)` for the owner to fill real details (e.g. PMG/PCGS/ANA membership, years collecting).
3. Add a visible "Sources" list at the bottom of the $2 value guide, and where possible cite **primary** sources (Heritage Auctions, Stack's Bowers, BEP production-report PDFs) alongside the secondary aggregator already used. Only add sources that already appear in the data.
**Accept:** About bio reads correctly; author component supports credentials; TODOs listed in the report.

### Task 12: robots.txt and llms.txt cleanup
1. `robots.txt` target:
```
User-agent: *
Allow: /

Sitemap: https://www.banknoteexpert.com/sitemap.xml
```
(remove the `Host:` line).
2. `llms.txt`: remove the "(Silo 1)" label, fix "The four tools" to match the list (3 tools plus a price guide: say "Tools and guides"), add `/1976-2-dollar-bill-value/`, `/tools/`, `/privacy/`, `/terms/` where relevant, keep all URLs `https://www...`.
**Accept:** both files served at 200 with the above content.

### Task 13: Directory badge
Review the "Featured on Viesearch" badge in the footer. Low-quality directory; recommend removing it (or `rel="nofollow"` at minimum). Ask the owner before deleting.

### Task 14: Blog index
`/blog/` currently lists all 16 pages. Keep it as an index, but:
- Sort by real `dateModified`, show the date, and add a short intro sentence.
- Do not fabricate articles. List `TODO(human)` content ideas in the report (solid serials, binary serials, repeater serials, $1 star note value, $5/$10/$20/$100 serial lookup, error notes, "is my bill worth anything" explainer).

---

## Final verification checklist (run after all tasks)

```
[ ] sitemap: 19 URLs, all https://www..., trailing slash, lastmod present
[ ] robots.txt: no Host line, sitemap line present
[ ] every page: self-canonical (www), 1 H1, unique title <=60, description <=160
[ ] every page: og:image + twitter:image return 200
[ ] 0 broken internal links; 0 missing hub anchors
[ ] JSON-LD valid on every page and matches visible content
[ ] Lighthouse mobile: CLS < 0.1, LCP < 2.5 s (or documented)
[ ] one consistent High Serial threshold across site
[ ] no duplicate pattern cards; no "will get its own dedicated page" text
[ ] TODO(human) list delivered: value table anomalies, author credentials, primary sources, new article ideas
```

## Final report the AI must return

1. Tasks done / skipped (with reason).
2. Files changed.
3. Lighthouse before/after numbers.
4. The `TODO(human)` list (things the AI deliberately did not invent).
5. After deploying: resubmit `https://www.banknoteexpert.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.