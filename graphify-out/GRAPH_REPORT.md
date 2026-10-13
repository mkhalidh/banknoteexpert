# Graph Report - banknoteexpert  (2026-10-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 885 nodes · 1862 edges · 61 communities (60 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e9573fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.ts
- app/page.tsx
- fancy-serial-numbers/page.tsx
- patterns.ts
- next
- audit-links.ts
- StarNoteLookup.tsx
- star-note-lookup/page.tsx
- AI Fix Plan: banknoteexpert.com SEO issues
- validate-phase1.mjs
- compilerOptions
- Banknote Expert README: architecture and setup (some claims conflict with later documentation)
- package.json
- 2-dollar-bill-value/page.tsx
- 1976-2-dollar-bill-value/page.tsx
- scripts
- check-data.ts
- types.ts
- devDependencies
- socialImage
- ref_node_fs
- pages.ts
- collect-waline-deps.cjs
- [...all].ts
- Breadcrumbs.tsx
- Waline comment moderation implementation guide
- 2-dollar-bill-serial-number-lookup/page.tsx
- TwoDollarValueChart.tsx
- Design System: Banknote Expert
- audit-seo.mjs
- radar/page.tsx
- Fixplan SEO implementation report
- security-headers.mjs
- dependencies
- Banknote Expert
- seo-render.test.ts
- routes.ts
- UI redesign and SEO fixes
- 1976-2-dollar-bill-value/opengraph-image.tsx
- 2-dollar-bill-serial-number-lookup/opengraph-image.tsx
- 2-dollar-bill-value/opengraph-image.tsx
- about/opengraph-image.tsx
- about-the-author/opengraph-image.tsx
- blog/opengraph-image.tsx
- fancy-serial-number-value/opengraph-image.tsx
- birthday-note/opengraph-image.tsx
- ladder/opengraph-image.tsx
- ladder/page.tsx
- low-serial-number/opengraph-image.tsx
- low-serial-number/page.tsx
- fancy-serial-numbers/opengraph-image.tsx
- radar/opengraph-image.tsx
- methodology/opengraph-image.tsx
- privacy/opengraph-image.tsx
- star-note-lookup/opengraph-image.tsx
- terms/opengraph-image.tsx
- tools/opengraph-image.tsx
- where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx
- getRoute
- Next.js agent rules and saved Graphify map guidance
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 46 edges
2. `socialImage()` - 41 edges
3. `getRoute()` - 34 edges
4. `buildMetadata()` - 23 edges
5. `scoreSerial()` - 21 edges
6. `Breadcrumbs()` - 20 edges
7. `PageContent` - 16 edges
8. `ContentSections()` - 16 edges
9. `compilerOptions` - 16 edges
10. `parseSerial()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Components` --references--> `SerialDiagram()`  [INFERRED]
  DESIGN.md → src/components/content/SerialDiagram.tsx
- `src/config/routes.ts shared route registry` --semantically_similar_to--> `Documented navigation silos: fancy serials, star notes, $2 bills, trust/reference`  [INFERRED] [semantically similar]
  README.md → site-structure.md
- `Documented Waline guest comments: name required, email/link optional, text-only` --semantically_similar_to--> `Proposed guest text comments, required nickname, instant publication and currency-aware spam handling`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md
- `Documented opt-in lazy comment widget on six high-traffic pages` --semantically_similar_to--> `Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md
- `No currency/serial keyword spam filter` --semantically_similar_to--> `Proposed guest text comments, required nickname, instant publication and currency-aware spam handling`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md

## Import Cycles
- None detected.

## Communities (61 total, 1 thin omitted)

### Community 0 - "index.ts"
Cohesion: 0.06
Nodes (64): vitest, anomalies, grades, Page(), Cell(), formatUsd(), maxHigh(), patternLabel() (+56 more)

### Community 1 - "app/page.tsx"
Cohesion: 0.06
Nodes (44): Components, Statically rendered public content and trust-page links, Banknote Expert LLM site description, Client-side serial checks; optional comments use a separate server-backed service, Serial checker, star lookup, $2 serial lookup and price guide, Recorded sold-price samples and BEP print-run data, SEO implementation report with production acceptance pending, True performance baseline requires original revision (+36 more)

### Community 2 - "fancy-serial-numbers/page.tsx"
Cohesion: 0.06
Nodes (40): metadata, page, anchorItems, metadata, anchorItems, metadata, anchorItems, metadata (+32 more)

### Community 3 - "patterns.ts"
Cohesion: 0.05
Nodes (33): blockIsRadar(), DAYS_IN_MONTH, distinctCount(), isBinaryRadar(), isBirthday(), isFourRepeat(), isFullLadder(), isLeapYear() (+25 more)

### Community 4 - "next"
Cohesion: 0.06
Nodes (31): next, react, src_app_globals, dynamic, geistMono, geistSans, metadata, serifDisplay (+23 more)

### Community 5 - "audit-links.ts"
Cohesion: 0.07
Nodes (33): adjacency, anchorByTarget, APP_DIR, broken, COMPONENTS_DIR, depth, extractLinks(), hardcoded (+25 more)

### Community 6 - "StarNoteLookup.tsx"
Cohesion: 0.12
Nodes (22): GLOBAL_MIN, RUNS_2003, ScarcestStarCallout(), DEFAULT_DENOM, DENOMINATIONS, formatInt(), RARITY_STYLE, StarNoteLookup() (+14 more)

### Community 7 - "star-note-lookup/page.tsx"
Cohesion: 0.12
Nodes (16): metadata, metadata, page, metadata, Page(), patternLinks, sectionById(), AuthorDetails() (+8 more)

### Community 8 - "AI Fix Plan: banknoteexpert.com SEO issues"
Cohesion: 0.09
Nodes (21): AI Fix Plan: banknoteexpert.com SEO issues, Context (read first), Final report the AI must return, Final verification checklist (run after all tasks), PHASE 1: High priority, PHASE 2: Medium priority, PHASE 3: Authority and housekeeping, Task 10: Images and alt text (+13 more)

### Community 9 - "validate-phase1.mjs"
Cohesion: 0.09
Nodes (14): ref_node_assert, ref_node_child_process, args, authHeaders, base, baseline, browserRequests, documents (+6 more)

### Community 10 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Banknote Expert README: architecture and setup (some claims conflict with later documentation)"
Cohesion: 0.14
Nodes (17): Banknote Expert README: architecture and setup (some claims conflict with later documentation), README placeholder check:data gate warns but exits zero, npm run preflight: lint, tsc, Vitest, build, link audit and data check, src/config/routes.ts shared route registry, src/lib/serial shared pure parser, pattern detection, scoring and value engine, Documented stack: Next.js 16 App Router, TypeScript strict, Tailwind, Vitest, Vercel, src/lib/star-note pure run lookup and rarity classification, src/content typed PageContent modules and reusable server renderers (+9 more)

### Community 12 - "package.json"
Cohesion: 0.13
Nodes (14): eslintConfig, name, overrides, jsdom, private, version, eslint, eslint-config-next (+6 more)

### Community 13 - "2-dollar-bill-value/page.tsx"
Cohesion: 0.17
Nodes (12): metadata, Page(), patternLinks, redVsGreenRows, sectionById(), anchorItems, metadata, Byline() (+4 more)

### Community 14 - "1976-2-dollar-bill-value/page.tsx"
Cohesion: 0.17
Nodes (10): @waline/client, metadata, Page(), premiumRows, sectionById(), v1976, Comments(), src_components_comments_comments_theme (+2 more)

### Community 15 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit:links, audit:seo, build, check:data, check:metadata, check:value-anomalies, dev (+6 more)

### Community 16 - "check-data.ts"
Cohesion: 0.15
Nodes (9): ref_node_path, ref_node_url, DATA_DIR, Finding, findings, REPLACEMENT, ROOT, walk() (+1 more)

### Community 17 - "types.ts"
Cohesion: 0.20
Nodes (8): metadata, ContentSections(), content, ContentBlock, ContentLink, ContentMeta, ContentSection, InlineSegment

### Community 18 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, eslint-config-next, jsdom, lighthouse, playwright, tailwindcss, @tailwindcss/postcss (+5 more)

### Community 19 - "socialImage"
Cohesion: 0.24
Nodes (9): alt, contentType, Image(), size, alt, contentType, Image(), size (+1 more)

### Community 20 - "ref_node_fs"
Cohesion: 0.20
Nodes (10): ref_chrome_launcher, lighthouse, ref_node_fs, playwright, headings, paths, requests, xml (+2 more)

### Community 21 - "pages.ts"
Cohesion: 0.27
Nodes (6): metadata, content, comparison, content, content, PageContent

### Community 22 - "collect-waline-deps.cjs"
Cohesion: 0.20
Nodes (10): ref_fs, ref_path, collect(), fs, includePaths, path, projectRoot, resolvePkgDir() (+2 more)

### Community 23 - "[...all].ts"
Cohesion: 0.20
Nodes (10): i18n-iso-countries, ref_ip2region, @waline/vercel, Application, config, handler(), ip2regionInstance, isoCountries (+2 more)

### Community 24 - "Breadcrumbs.tsx"
Cohesion: 0.24
Nodes (7): metadata, BreadcrumbItem, Breadcrumbs(), BreadcrumbsProps, content, blockText(), pageGraph()

### Community 25 - "Waline comment moderation implementation guide"
Cohesion: 0.27
Nodes (10): Documented opt-in lazy comment widget on six high-traffic pages, Waline comment moderation implementation guide, No currency/serial keyword spam filter, Documented Waline guest comments: name required, email/link optional, text-only, Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres, Documented /api/ui admin dashboard and Akismet moderation; instant normal comment publishing, Waline integration requirements (original proposal), Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk (+2 more)

### Community 26 - "2-dollar-bill-serial-number-lookup/page.tsx"
Cohesion: 0.29
Nodes (8): metadata, Page(), patternLinks, sectionById(), seriesRows, content, patternLinkLabels, patternPageIds

### Community 27 - "TwoDollarValueChart.tsx"
Cohesion: 0.29
Nodes (6): money(), range(), TwoDollarValueChart(), TWO_DOLLAR_VALUES, TWO_DOLLAR_VALUES_UPDATED, TwoDollarValue

### Community 28 - "Design System: Banknote Expert"
Cohesion: 0.22
Nodes (8): Colors, Design System: Banknote Expert, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes, Typography

### Community 29 - "audit-seo.mjs"
Cohesion: 0.22
Nodes (7): jsdom, base, descriptions, documents, errors, metadataOnly, titles

### Community 30 - "radar/page.tsx"
Cohesion: 0.31
Nodes (5): metadata, ComparisonTable(), ComparisonTableProps, comparison, content

### Community 31 - "Fixplan SEO implementation report"
Cohesion: 0.25
Nodes (7): Files changed, Fixplan SEO implementation report, Remaining verification commands, Shared illustrations, Task outcomes, TODO(human), Validation

### Community 32 - "security-headers.mjs"
Cohesion: 0.33
Nodes (5): nextConfig, contentSecurityPolicy, cspHeaderName, enforceCsp, securityHeaders

### Community 33 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, i18n-iso-countries, next, react, react-dom, @waline/client, @waline/vercel

### Community 34 - "Banknote Expert"
Cohesion: 0.29
Nodes (6): Banknote Expert, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Platform, Product Purpose

### Community 35 - "seo-render.test.ts"
Cohesion: 0.29
Nodes (4): ref_node_module, react-dom, { JSDOM }, pages

### Community 36 - "routes.ts"
Cohesion: 0.38
Nodes (5): TOOL_TYPES, ChangeFrequency, PageType, RouteEntry, routes

### Community 37 - "UI redesign and SEO fixes"
Cohesion: 0.33
Nodes (5): Deployment, Final SEO fixes, UI and navigation, UI redesign and SEO fixes, Validation

### Community 38 - "1976-2-dollar-bill-value/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 39 - "2-dollar-bill-serial-number-lookup/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 40 - "2-dollar-bill-value/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 41 - "about/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 42 - "about-the-author/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 43 - "blog/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 44 - "fancy-serial-number-value/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 45 - "birthday-note/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 46 - "ladder/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 47 - "ladder/page.tsx"
Cohesion: 0.47
Nodes (3): metadata, comparison, content

### Community 48 - "low-serial-number/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 49 - "low-serial-number/page.tsx"
Cohesion: 0.47
Nodes (3): metadata, comparison, content

### Community 50 - "fancy-serial-numbers/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 51 - "radar/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 52 - "methodology/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 53 - "privacy/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 54 - "star-note-lookup/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 55 - "terms/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 56 - "tools/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 57 - "where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 58 - "getRoute"
Cohesion: 0.50
Nodes (4): metadata, page, ToolsPage(), getRoute()

### Community 59 - "Next.js agent rules and saved Graphify map guidance"
Cohesion: 0.50
Nodes (4): Next.js agent rules and saved Graphify map guidance, Read installed Next.js guides before code changes, Graphify GRAPH_REPORT.md and graph.json query-first navigation, Claude instructions referencing AGENTS.md

## Ambiguous Edges - Review These
- `README placeholder check:data gate warns but exits zero` → `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **279 isolated node(s):** `ArticleSchemaProps`, `JsonLdProps`, `BuildMetadataParams`, `WalineInstance`, `Finding` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 363 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `README placeholder check:data gate warns but exits zero` and `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `index.ts`, `app/page.tsx`, `fancy-serial-numbers/page.tsx`, `StarNoteLookup.tsx`, `star-note-lookup/page.tsx`, `package.json`, `2-dollar-bill-value/page.tsx`, `1976-2-dollar-bill-value/page.tsx`, `types.ts`, `socialImage`, `pages.ts`, `[...all].ts`, `Breadcrumbs.tsx`, `2-dollar-bill-serial-number-lookup/page.tsx`, `radar/page.tsx`, `security-headers.mjs`, `routes.ts`, `ladder/page.tsx`, `low-serial-number/page.tsx`, `getRoute`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Why does `getRoute()` connect `getRoute` to `app/page.tsx`, `fancy-serial-numbers/page.tsx`, `next`, `star-note-lookup/page.tsx`, `Breadcrumbs.tsx`, `routes.ts`, `1976-2-dollar-bill-value/opengraph-image.tsx`, `2-dollar-bill-serial-number-lookup/opengraph-image.tsx`, `2-dollar-bill-value/opengraph-image.tsx`, `about/opengraph-image.tsx`, `about-the-author/opengraph-image.tsx`, `blog/opengraph-image.tsx`, `fancy-serial-number-value/opengraph-image.tsx`, `birthday-note/opengraph-image.tsx`, `ladder/opengraph-image.tsx`, `low-serial-number/opengraph-image.tsx`, `fancy-serial-numbers/opengraph-image.tsx`, `radar/opengraph-image.tsx`, `methodology/opengraph-image.tsx`, `privacy/opengraph-image.tsx`, `star-note-lookup/opengraph-image.tsx`, `terms/opengraph-image.tsx`, `tools/opengraph-image.tsx`, `where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `SEO implementation report with production acceptance pending` connect `app/page.tsx` to `index.ts`, `ref_node_fs`, `audit-seo.mjs`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `ArticleSchemaProps`, `JsonLdProps`, `BuildMetadataParams` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058519793459552494 - nodes in this community are weakly interconnected._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05803571428571429 - nodes in this community are weakly interconnected._