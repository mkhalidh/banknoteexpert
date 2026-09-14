# Banknote Expert

A static, SEO-first tool site for checking US banknote serial numbers — fancy
patterns, star notes and collectible value. Everything runs client-side; there
is no database, no backend, and no user data is transmitted or stored.

- **Framework:** Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS
- **Runtime:** Node.js 20.9+ (developed and built on Node 24)
- **Deploy target:** Vercel (static output)
- **Tests:** Vitest

## Local setup

```bash
node -v            # must be >= 20.9.0
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run lint         # eslint (next build does NOT lint)
npm run test         # vitest
npm run audit:links  # internal-link audit against the built output
npm run check:data   # pre-launch data checklist (see below)
npm run preflight    # lint + tsc + vitest + build + audit:links + check:data
```

Run `npm run preflight` before every deploy. It must pass end to end.

## Where content lives

- **`src/config/routes.ts`** — the single source of truth for every URL. Sitemap,
  header nav and footer all read from it. Never hardcode a URL that lives here.
- **`src/config/site.ts`** — shared constants: `LAST_UPDATED`, `AUTHOR_NAME`, etc.
- **`src/content/*.ts`** — one typed content module per page (`{ meta, takeaways,
  sections, related }`). Page prose lives here, never inline in the page.
- **`src/components/content/`** — reusable server components that render content
  (ContentSections, ComparisonTable, ValueRangeTable, RelatedPages, …).
- **`src/components/tools/`** — the three client-side tools (fancy serial checker,
  star note lookup, $2 serial lookup).
- **`src/lib/serial/`** — the pure serial-number engine (parse, patterns, score,
  value). Reuse it; do not write a second parser or scorer.
- **`src/lib/star-note/`** — pure star-note run lookup and rarity classification.
- **`src/data/`** — typed static datasets (see the data checklist below).

## How to add a new page

1. **Register the route** in `src/config/routes.ts` (`path`, `title`,
   `description`, `silo`, `pageType`, `priority`, `changeFrequency`, `indexable`).
2. **Add a content module** in `src/content/<slug>.ts` exporting a `PageContent`
   object (and any page-specific data such as comparison rows).
3. **Add the page** in `src/app/<path>/page.tsx` — render the content module,
   `buildMetadata` (self-canonical), `Breadcrumbs`, and `ArticleSchema` for guides.
4. **Add internal links** — link up to the silo hub, out to 2–3 siblings, and to
   the homepage checker from body copy. Vary the anchor text.
5. **Re-run the audit:** `npm run build && npm run audit:links` until it is clean
   (zero orphans, zero broken links, nothing beyond depth 3, no anchor-text
   over-concentration).

Pattern URLs must come from the patterns registry `href` field
(`src/lib/serial/patterns.ts`) — never hardcode them in a component. The audit
flags violations.

## Replacing the placeholder data

Value and print-run figures ship as clearly-labelled placeholders. Every
placeholder row's `source` field starts with `PLACEHOLDER`. Run
`npm run check:data` to see the outstanding rows. Replace as follows:

- **`src/data/star-notes/runs.ts`** — star note print runs. Source: BEP monthly
  production reports (<https://www.bep.gov/currency/production-figures/monthly-production-reports>),
  "Star Notes Printed" table. Full column mapping and step-by-step instructions
  are in `src/data/star-notes/README.md`. Replace the sample rows, set real
  `sourcePdfUrl` and `source`, and remove the illustrative samples.
- **`src/data/value-ranges.ts`** — fancy-pattern value ranges by condition.
  Source: Heritage Auctions, Stack's Bowers and eBay sold-listing prices. Replace
  each row's numbers and set a real `source`; move `confidence` to `indicative`
  once a row rests on a solid sample.
- **`src/data/two-dollar-values.ts`** — $2 note value guidance by series. Source:
  Heritage Auctions / eBay sold $2 data. Replace the qualitative ranges with
  sourced figures and update `source`. Series metadata is joined from
  `src/data/two-dollar-series.ts` — do not duplicate it here.

### `npm run check:data`

The pre-launch data gate. It scans `src/data` for `PLACEHOLDER` sources and
prints, per file, how many rows still need real data and which source replaces
them. It **warns but never fails** (exit 0), so the site can deploy with
placeholders — but the summary block is the checklist to clear before presenting
any figure as real.

## Deployment

Deploy to Vercel; the framework is auto-detected. `next.config.ts` sets
`trailingSlash: true` and the image formats. No `vercel.json` is required and none
is included. No environment variables are needed (see `.env.example`).
