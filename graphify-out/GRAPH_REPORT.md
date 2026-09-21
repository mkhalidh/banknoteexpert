# Graph Report - banknoteexpert  (2026-09-21)

## Corpus Check
- 118 files · ~133,956 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 7, .css 2)

## Summary
- 622 nodes · 1291 edges · 39 communities (35 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8d641b3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.ts
- 2-dollar-bill-value/page.tsx
- audit-links.ts
- app/page.tsx
- StarNoteLookup.tsx
- next
- Banknote Expert README: architecture and setup (some claims conflict with later documentation)
- star-note-lookup/page.tsx
- compilerOptions
- 2-dollar-bill-serial-number-lookup/page.tsx
- ArticleSchema.tsx
- types.ts
- methodology/page.tsx
- radar/page.tsx
- Waline comment moderation implementation guide
- package.json
- collect-waline-deps.cjs
- [...all].ts
- devDependencies
- patterns.ts
- birthday-note/page.tsx
- seo.ts
- scripts
- dependencies
- Next.js agent rules and saved Graphify map guidance
- eslint.config.mjs
- Design proposal: desktop valuation intelligence workstation
- Design proposal: mobile $396k Solid 8 article (unverified specimen claims)
- Design proposal: mobile star note lookup
- Design proposal: mobile valuation methodology
- Captured website text: star note lookup
- Treasury Heritage proposed design system
- Captured website text: homepage checker
- postcss.config.mjs
- Design proposal: fancy serial taxonomy guide
- Design proposal: numismatic research journal and blog
- Captured website text: fancy serial guide
- routes.ts
- Banknote Expert

## God Nodes (most connected - your core abstractions)
1. `next` - 43 edges
2. `buildMetadata()` - 21 edges
3. `Breadcrumbs()` - 18 edges
4. `scoreSerial()` - 16 edges
5. `compilerOptions` - 16 edges
6. `ContentSections()` - 15 edges
7. `PageContent` - 15 edges
8. `parseSerial()` - 15 edges
9. `RelatedPages()` - 14 edges
10. `KeyTakeaways()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Components` --references--> `SerialDiagram()`  [INFERRED]
  DESIGN.md → src/components/content/SerialDiagram.tsx
- `Documented Waline guest comments: name required, email/link optional, text-only` --semantically_similar_to--> `Proposed guest text comments, required nickname, instant publication and currency-aware spam handling`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md
- `Documented opt-in lazy comment widget on six high-traffic pages` --semantically_similar_to--> `Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md
- `No currency/serial keyword spam filter` --semantically_similar_to--> `Proposed guest text comments, required nickname, instant publication and currency-aware spam handling`  [INFERRED] [semantically similar]
  docs/comment-moderation-guide.md → waline-integration-prompt__1_.md
- `src/config/routes.ts shared route registry` --semantically_similar_to--> `Documented navigation silos: fancy serials, star notes, $2 bills, trust/reference`  [INFERRED] [semantically similar]
  README.md → site-structure.md

## Import Cycles
- None detected.

## Communities (39 total, 4 thin omitted)

### Community 0 - "index.ts"
Cohesion: 0.07
Nodes (50): ref_node_url, vitest, Cell(), formatUsd(), maxHigh(), patternLabel(), ValueRangeTable(), FancySerialChecker() (+42 more)

### Community 1 - "2-dollar-bill-value/page.tsx"
Cohesion: 0.12
Nodes (17): metadata, Page(), patternLinks, redVsGreenRows, sectionById(), GLOBAL_MIN, RUNS_2003, ScarcestStarCallout() (+9 more)

### Community 2 - "audit-links.ts"
Cohesion: 0.05
Nodes (41): ref_node_fs, ref_node_path, adjacency, anchorByTarget, APP_DIR, broken, COMPONENTS_DIR, depth (+33 more)

### Community 3 - "app/page.tsx"
Cohesion: 0.07
Nodes (24): Colors, Components, Design System: Banknote Expert, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes (+16 more)

### Community 4 - "StarNoteLookup.tsx"
Cohesion: 0.07
Nodes (33): react, NavItem, Theme, ThemeToggle(), easeOut(), SCORE_TIER_STYLES, ScoreMeter(), DEFAULT_DENOM (+25 more)

### Community 5 - "next"
Cohesion: 0.07
Nodes (38): nextConfig, next, anchorItems, metadata, anchorItems, metadata, anchorItems, metadata (+30 more)

### Community 6 - "Banknote Expert README: architecture and setup (some claims conflict with later documentation)"
Cohesion: 0.10
Nodes (22): Banknote Expert README: architecture and setup (some claims conflict with later documentation), README placeholder check:data gate warns but exits zero, npm run preflight: lint, tsc, Vitest, build, link audit and data check, src/config/routes.ts shared route registry, src/lib/serial shared pure parser, pattern detection, scoring and value engine, Documented stack: Next.js 16 App Router, TypeScript strict, Tailwind, Vitest, Vercel, src/lib/star-note pure run lookup and rarity classification, src/content typed PageContent modules and reusable server renderers (+14 more)

### Community 7 - "star-note-lookup/page.tsx"
Cohesion: 0.27
Nodes (8): metadata, Page(), patternLinks, sectionById(), content, patternLinkLabels, patternPageIds, rarityTierRows

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "2-dollar-bill-serial-number-lookup/page.tsx"
Cohesion: 0.29
Nodes (8): metadata, Page(), patternLinks, sectionById(), seriesRows, content, patternLinkLabels, patternPageIds

### Community 10 - "ArticleSchema.tsx"
Cohesion: 0.23
Nodes (10): metadata, personSchema, ArticleSchemaProps, AUTHOR_BIO, AUTHOR_NAME, AUTHOR_SAME_AS, LAST_UPDATED, LAST_UPDATED_ISO (+2 more)

### Community 11 - "types.ts"
Cohesion: 0.16
Nodes (10): metadata, metadata, ContentSections(), LastUpdated(), content, content, ContentBlock, ContentMeta (+2 more)

### Community 12 - "methodology/page.tsx"
Cohesion: 0.29
Nodes (5): anchorItems, metadata, ArticleSchema(), content, PageContent

### Community 13 - "radar/page.tsx"
Cohesion: 0.47
Nodes (3): metadata, comparison, content

### Community 14 - "Waline comment moderation implementation guide"
Cohesion: 0.19
Nodes (13): Documented opt-in lazy comment widget on six high-traffic pages, Waline comment moderation implementation guide, No currency/serial keyword spam filter, Documented Waline guest comments: name required, email/link optional, text-only, Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres, Documented /api/ui admin dashboard and Akismet moderation; instant normal comment publishing, LLM site description (static-only and placeholder claims may be stale), LLM index claims no backend or user-generated content (+5 more)

### Community 15 - "package.json"
Cohesion: 0.15
Nodes (12): name, overrides, jsdom, private, version, react-dom, tailwindcss, @tailwindcss/postcss (+4 more)

### Community 17 - "collect-waline-deps.cjs"
Cohesion: 0.20
Nodes (10): ref_fs, ref_path, collect(), fs, includePaths, path, projectRoot, resolvePkgDir() (+2 more)

### Community 18 - "[...all].ts"
Cohesion: 0.20
Nodes (10): i18n-iso-countries, ref_ip2region, @waline/vercel, Application, config, handler(), ip2regionInstance, isoCountries (+2 more)

### Community 20 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+2 more)

### Community 21 - "patterns.ts"
Cohesion: 0.12
Nodes (9): PatternGrid(), DAYS_IN_MONTH, isBirthday(), isLeapYear(), PatternDefinition, patterns, patternsById, STROBO (+1 more)

### Community 22 - "birthday-note/page.tsx"
Cohesion: 0.14
Nodes (14): metadata, metadata, metadata, ComparisonTable(), ComparisonTableProps, KeyTakeaways(), RelatedPages(), comparison (+6 more)

### Community 23 - "seo.ts"
Cohesion: 0.13
Nodes (15): metadata, page, metadata, page, metadata, TOOLS, BreadcrumbItem, Breadcrumbs() (+7 more)

### Community 24 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit:links, build, check:data, dev, lint, preflight, start (+1 more)

### Community 25 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, i18n-iso-countries, next, react, react-dom, @waline/client, @waline/vercel

### Community 26 - "Next.js agent rules and saved Graphify map guidance"
Cohesion: 0.50
Nodes (4): Next.js agent rules and saved Graphify map guidance, Read installed Next.js guides before code changes, Graphify GRAPH_REPORT.md and graph.json query-first navigation, Claude instructions referencing AGENTS.md

### Community 27 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 28 - "Design proposal: desktop valuation intelligence workstation"
Cohesion: 0.50
Nodes (4): Design proposal: desktop valuation intelligence workstation, Proposed appraisal certificate, pattern matrix and auction archive, Design proposal: redesigned mobile checker, Proposed mobile serial checker, appraisal slip and bottom navigation

### Community 29 - "Design proposal: mobile $396k Solid 8 article (unverified specimen claims)"
Cohesion: 0.50
Nodes (4): Design proposal: mobile $396k Solid 8 article (unverified specimen claims), Proposed provenance article, benchmark chart and collector remarks, Design proposal: $396k Solid 8 research monograph (unverified specimen claims), Proposed auction monograph, citations, print/bookmark and comments

### Community 30 - "Design proposal: mobile star note lookup"
Cohesion: 0.50
Nodes (4): Design proposal: mobile star note lookup, Proposed mobile run lookup, rarity tiers and inquiry desk, Proposed desktop run certificate, BEP links and rarity tiers, Design proposal: desktop star note print-run tool

### Community 31 - "Design proposal: mobile valuation methodology"
Cohesion: 0.50
Nodes (4): Design proposal: mobile valuation methodology, Proposed mobile sources, confidence labels, scarcity index and grading, Proposed methodology, IQR illustration and correction form, Design proposal: valuation and scarcity methodology

### Community 32 - "Captured website text: star note lookup"
Cohesion: 0.50
Nodes (4): Captured website text: star note lookup, Captured star lookup has both updated coverage and older sample-dataset prose, Captured lookup matches denomination, series and serial to BEP run and source PDF, Captured lookup tiers: Very Rare <=320000; Rare <=640000; Uncommon <=1600000; Common above 1600000

### Community 33 - "Treasury Heritage proposed design system"
Cohesion: 0.50
Nodes (4): Treasury Heritage proposed design system, Proposed type roles: Playfair Display headings, Plus Jakarta Sans copy, JetBrains Mono serials, Proposed mobile-first paper-layer surfaces and dense verification cards, Proposed Treasury Heritage palette: parchment, Treasury green and rarity gold

### Community 34 - "Captured website text: homepage checker"
Cohesion: 0.67
Nodes (3): Captured homepage: browser-only serial checks, score, pattern matches and shareable URLs, Captured homepage still labels value figures placeholders, Captured website text: homepage checker

### Community 42 - "routes.ts"
Cohesion: 0.08
Nodes (28): src_app_globals, dynamic, geistMono, geistSans, metadata, serifDisplay, metadata, page (+20 more)

### Community 44 - "Banknote Expert"
Cohesion: 0.29
Nodes (6): Banknote Expert, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Platform, Product Purpose

## Ambiguous Edges - Review These
- `Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres` → `LLM index claims no backend or user-generated content`  [AMBIGUOUS]
  public/llms.txt · relation: conceptually_related_to
- `README placeholder check:data gate warns but exits zero` → `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **217 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+212 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 278 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres` and `LLM index claims no backend or user-generated content`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `README placeholder check:data gate warns but exits zero` and `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `index.ts`, `2-dollar-bill-value/page.tsx`, `app/page.tsx`, `StarNoteLookup.tsx`, `star-note-lookup/page.tsx`, `2-dollar-bill-serial-number-lookup/page.tsx`, `ArticleSchema.tsx`, `routes.ts`, `methodology/page.tsx`, `radar/page.tsx`, `types.ts`, `package.json`, `[...all].ts`, `patterns.ts`, `birthday-note/page.tsx`, `seo.ts`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `react` connect `StarNoteLookup.tsx` to `index.ts`, `app/page.tsx`, `next`, `package.json`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _217 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07372229760289462 - nodes in this community are weakly interconnected._
- **Should `2-dollar-bill-value/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11956521739130435 - nodes in this community are weakly interconnected._