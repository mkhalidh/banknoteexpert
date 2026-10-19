# Graph Report - banknoteexpert  (2026-10-19)

## Corpus Check
- 193 files · ~110,260 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 9, .css 2, .ico 1)

## Summary
- 926 nodes · 1998 edges · 73 communities (72 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a7d999b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- value.ts
- low-serial-number/page.tsx
- fancy-serial-numbers/page.tsx
- patterns.ts
- seo.ts
- audit-links.ts
- StarNoteLookup.tsx
- RelatedPages.tsx
- AI Fix Plan: banknoteexpert.com SEO issues
- validate-phase1.mjs
- compilerOptions
- Banknote Expert README: architecture and setup (some claims conflict with later documentation)
- package.json
- 2-dollar-bill-value/page.tsx
- FancySerialChecker.tsx
- scripts
- check-data.ts
- pages.ts
- devDependencies
- socialImage
- capture-phase1-baseline.mjs
- icons.tsx
- collect-waline-deps.cjs
- [...all].ts
- buildMetadata
- Waline comment moderation implementation guide
- 2-dollar-bill-serial-number-lookup/page.tsx
- TwoDollarValueChart.tsx
- 1976-2-dollar-bill-value/page.tsx
- audit-seo.mjs
- index.ts
- Fixplan SEO implementation report
- security-headers.mjs
- dependencies
- Banknote Expert
- next
- birthday-note/page.tsx
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
- site.ts
- low-serial-number/opengraph-image.tsx
- SEO implementation report with production acceptance pending
- fancy-serial-numbers/opengraph-image.tsx
- radar/opengraph-image.tsx
- methodology/opengraph-image.tsx
- privacy/opengraph-image.tsx
- star-note-lookup/opengraph-image.tsx
- terms/opengraph-image.tsx
- tools/opengraph-image.tsx
- where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx
- routes.ts
- Next.js agent rules and saved Graphify map guidance
- postcss.config.mjs
- scoreSerial
- star-note-lookup/page.tsx
- ValueResultPanel.tsx
- Breadcrumbs.tsx
- ref_node_fs
- fancy-serial-number-value/page.tsx
- Design System: Banknote Expert
- binary/page.tsx
- broken-ladder/page.tsx
- seo-render.test.ts
- app/opengraph-image.tsx
- broken-ladder/opengraph-image.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 48 edges
2. `socialImage()` - 47 edges
3. `getRoute()` - 38 edges
4. `buildMetadata()` - 25 edges
5. `Breadcrumbs()` - 22 edges
6. `scoreSerial()` - 21 edges
7. `ContentSections()` - 18 edges
8. `PageContent` - 18 edges
9. `RelatedPages()` - 17 edges
10. `KeyTakeaways()` - 16 edges

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

## Communities (73 total, 1 thin omitted)

### Community 0 - "value.ts"
Cohesion: 0.16
Nodes (21): SoldSamples(), Page(), Cell(), formatUsd(), maxHigh(), patternLabel(), ValueRangeTable(), NoteCondition (+13 more)

### Community 1 - "low-serial-number/page.tsx"
Cohesion: 0.47
Nodes (3): metadata, comparison, content

### Community 2 - "fancy-serial-numbers/page.tsx"
Cohesion: 0.07
Nodes (36): metadata, page, anchorItems, metadata, anchorItems, metadata, AnchorNav(), AnchorNavItem (+28 more)

### Community 3 - "patterns.ts"
Cohesion: 0.05
Nodes (31): blockIsRadar(), DAYS_IN_MONTH, distinctCount(), isBinaryRadar(), isBirthday(), isFourRepeat(), isFullLadder(), isLeapYear() (+23 more)

### Community 4 - "seo.ts"
Cohesion: 0.24
Nodes (11): robots(), sitemap(), pageModified, pagePublished, routes, AUTHOR_SAME_AS, homeFaqs, pageContents (+3 more)

### Community 5 - "audit-links.ts"
Cohesion: 0.07
Nodes (33): adjacency, anchorByTarget, APP_DIR, broken, COMPONENTS_DIR, depth, extractLinks(), hardcoded (+25 more)

### Community 6 - "StarNoteLookup.tsx"
Cohesion: 0.15
Nodes (18): DEFAULT_DENOM, DENOMINATIONS, formatInt(), RARITY_STYLE, StarNoteLookup(), selectDenom(), STAR_NOTE_COVERAGE, STAR_NOTE_DATA_UPDATED (+10 more)

### Community 7 - "RelatedPages.tsx"
Cohesion: 0.20
Nodes (8): metadata, metadata, page, AuthorDetails(), RelatedPages(), AUTHOR_BIO, authorDetails, ContentLink

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
Cohesion: 0.18
Nodes (12): metadata, Page(), patternLinks, redVsGreenRows, sectionById(), GLOBAL_MIN, RUNS_2003, ScarcestStarCallout() (+4 more)

### Community 14 - "FancySerialChecker.tsx"
Cohesion: 0.18
Nodes (13): FancySerialChecker(), easeOut(), SCORE_TIER_STYLES, ScoreMeter(), TwoDollarSerialLookup(), AlertIcon(), CheckCircleIcon(), StarIcon() (+5 more)

### Community 15 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit:links, audit:seo, build, check:data, check:metadata, check:value-anomalies, dev (+6 more)

### Community 16 - "check-data.ts"
Cohesion: 0.15
Nodes (9): ref_node_path, ref_node_url, DATA_DIR, Finding, findings, REPLACEMENT, ROOT, walk() (+1 more)

### Community 17 - "pages.ts"
Cohesion: 0.19
Nodes (11): content, content, content, content, content, content, ContentBlock, ContentMeta (+3 more)

### Community 18 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, eslint-config-next, jsdom, lighthouse, playwright, tailwindcss, @tailwindcss/postcss (+5 more)

### Community 19 - "socialImage"
Cohesion: 0.16
Nodes (13): alt, contentType, Image(), size, alt, contentType, Image(), size (+5 more)

### Community 20 - "capture-phase1-baseline.mjs"
Cohesion: 0.20
Nodes (9): ref_chrome_launcher, lighthouse, playwright, headings, paths, requests, xml, report (+1 more)

### Community 21 - "icons.tsx"
Cohesion: 0.07
Nodes (24): react, src_app_globals, dynamic, geistMono, geistSans, metadata, serifDisplay, metadata (+16 more)

### Community 22 - "collect-waline-deps.cjs"
Cohesion: 0.20
Nodes (10): ref_fs, ref_path, collect(), fs, includePaths, path, projectRoot, resolvePkgDir() (+2 more)

### Community 23 - "[...all].ts"
Cohesion: 0.16
Nodes (12): i18n-iso-countries, ref_ip2region, ref_nunjucks, @waline/vercel, replyEmailTemplate, nunjucks, Application, config (+4 more)

### Community 24 - "buildMetadata"
Cohesion: 0.17
Nodes (8): metadata, TOOLS, metadata, metadata, ContentSections(), LastUpdated(), LAST_UPDATED, buildMetadata()

### Community 25 - "Waline comment moderation implementation guide"
Cohesion: 0.27
Nodes (10): Documented opt-in lazy comment widget on six high-traffic pages, Waline comment moderation implementation guide, No currency/serial keyword spam filter, Documented Waline guest comments: name required, email/link optional, text-only, Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres, Documented /api/ui admin dashboard and Akismet moderation; instant normal comment publishing, Waline integration requirements (original proposal), Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk (+2 more)

### Community 26 - "2-dollar-bill-serial-number-lookup/page.tsx"
Cohesion: 0.29
Nodes (8): metadata, Page(), patternLinks, sectionById(), seriesRows, content, patternLinkLabels, patternPageIds

### Community 27 - "TwoDollarValueChart.tsx"
Cohesion: 0.29
Nodes (6): money(), range(), TwoDollarValueChart(), TWO_DOLLAR_VALUES, TWO_DOLLAR_VALUES_UPDATED, TwoDollarValue

### Community 28 - "1976-2-dollar-bill-value/page.tsx"
Cohesion: 0.19
Nodes (9): metadata, Page(), premiumRows, sectionById(), v1976, anchorItems, metadata, Byline() (+1 more)

### Community 29 - "audit-seo.mjs"
Cohesion: 0.22
Nodes (7): jsdom, base, descriptions, documents, errors, metadataOnly, titles

### Community 30 - "index.ts"
Cohesion: 0.17
Nodes (18): fail(), ParsedSerial, ParseError, ParseErrorCode, ParseResult, parseSerial(), patterns, AXIS_OF (+10 more)

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

### Community 35 - "next"
Cohesion: 0.17
Nodes (11): next, metadata, structuredData, twoDollarLookup, twoDollarValue, whereIsSerial, AllToolsGrid(), TOOL_TYPES (+3 more)

### Community 36 - "birthday-note/page.tsx"
Cohesion: 0.19
Nodes (8): metadata, metadata, ComparisonTable(), ComparisonTableProps, comparison, content, comparison, content

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

### Community 47 - "site.ts"
Cohesion: 0.20
Nodes (10): SourcesBlock(), ArticleSchemaProps, JsonLd(), JsonLdProps, AUTHOR_NAME, LAST_UPDATED_ISO, ORG_LOGO_PATH, ORG_SAME_AS (+2 more)

### Community 48 - "low-serial-number/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 49 - "SEO implementation report with production acceptance pending"
Cohesion: 0.17
Nodes (12): Statically rendered public content and trust-page links, Banknote Expert LLM site description, Client-side serial checks; optional comments use a separate server-backed service, Serial checker, star lookup, $2 serial lookup and price guide, Recorded sold-price samples and BEP print-run data, SEO implementation report with production acceptance pending, True performance baseline requires original revision, Production acceptance incomplete (+4 more)

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

### Community 58 - "routes.ts"
Cohesion: 0.33
Nodes (8): Footer(), FOOTER_SILOS, ChangeFrequency, getRoute(), getRoutesBySilo(), RouteEntry, Silo, siloLabels

### Community 59 - "Next.js agent rules and saved Graphify map guidance"
Cohesion: 0.50
Nodes (4): Next.js agent rules and saved Graphify map guidance, Read installed Next.js guides before code changes, Graphify GRAPH_REPORT.md and graph.json query-first navigation, Claude instructions referencing AGENTS.md

### Community 61 - "scoreSerial"
Cohesion: 0.23
Nodes (11): vitest, clamp(), patternSatisfied(), scoreSerial(), tierFor(), detect(), ids(), primary() (+3 more)

### Community 62 - "star-note-lookup/page.tsx"
Cohesion: 0.27
Nodes (8): metadata, Page(), patternLinks, sectionById(), content, patternLinkLabels, patternPageIds, rarityTierRows

### Community 63 - "ValueResultPanel.tsx"
Cohesion: 0.38
Nodes (6): formatUsd(), patternLabel(), ValueResultPanel(), CONDITION_LABELS, VALUE_PATTERN_LABELS, ValueResult

### Community 64 - "Breadcrumbs.tsx"
Cohesion: 0.23
Nodes (8): metadata, BreadcrumbItem, Breadcrumbs(), BreadcrumbsProps, comparison, content, blockText(), pageGraph()

### Community 65 - "ref_node_fs"
Cohesion: 0.50
Nodes (3): ref_node_fs, anomalies, grades

### Community 66 - "fancy-serial-number-value/page.tsx"
Cohesion: 0.24
Nodes (6): @waline/client, anchorItems, metadata, Comments(), src_components_comments_comments_theme, WalineInstance

### Community 67 - "Design System: Banknote Expert"
Cohesion: 0.17
Nodes (10): Colors, Components, Design System: Banknote Expert, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes (+2 more)

### Community 68 - "binary/page.tsx"
Cohesion: 0.29
Nodes (7): faqs, metadata, money(), Page(), FaqItem(), content, examples

### Community 69 - "broken-ladder/page.tsx"
Cohesion: 0.33
Nodes (5): comparison, metadata, content, examples, path

### Community 70 - "seo-render.test.ts"
Cohesion: 0.29
Nodes (4): ref_node_module, react-dom, { JSDOM }, pages

### Community 71 - "app/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 72 - "broken-ladder/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

## Ambiguous Edges - Review These
- `README placeholder check:data gate warns but exits zero` → `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **290 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+285 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 376 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `README placeholder check:data gate warns but exits zero` and `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `low-serial-number/page.tsx`, `fancy-serial-numbers/page.tsx`, `seo.ts`, `StarNoteLookup.tsx`, `RelatedPages.tsx`, `package.json`, `2-dollar-bill-value/page.tsx`, `FancySerialChecker.tsx`, `pages.ts`, `socialImage`, `icons.tsx`, `[...all].ts`, `buildMetadata`, `2-dollar-bill-serial-number-lookup/page.tsx`, `1976-2-dollar-bill-value/page.tsx`, `security-headers.mjs`, `birthday-note/page.tsx`, `site.ts`, `routes.ts`, `star-note-lookup/page.tsx`, `Breadcrumbs.tsx`, `fancy-serial-number-value/page.tsx`, `binary/page.tsx`, `broken-ladder/page.tsx`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Why does `getRoute()` connect `routes.ts` to `fancy-serial-numbers/page.tsx`, `seo.ts`, `RelatedPages.tsx`, `socialImage`, `icons.tsx`, `next`, `1976-2-dollar-bill-value/opengraph-image.tsx`, `2-dollar-bill-serial-number-lookup/opengraph-image.tsx`, `2-dollar-bill-value/opengraph-image.tsx`, `about/opengraph-image.tsx`, `about-the-author/opengraph-image.tsx`, `blog/opengraph-image.tsx`, `fancy-serial-number-value/opengraph-image.tsx`, `birthday-note/opengraph-image.tsx`, `ladder/opengraph-image.tsx`, `low-serial-number/opengraph-image.tsx`, `fancy-serial-numbers/opengraph-image.tsx`, `radar/opengraph-image.tsx`, `methodology/opengraph-image.tsx`, `privacy/opengraph-image.tsx`, `star-note-lookup/opengraph-image.tsx`, `terms/opengraph-image.tsx`, `tools/opengraph-image.tsx`, `where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx`, `Breadcrumbs.tsx`, `broken-ladder/page.tsx`, `broken-ladder/opengraph-image.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `SEO implementation report with production acceptance pending` connect `SEO implementation report with production acceptance pending` to `ref_node_fs`, `seo.ts`, `site.ts`, `capture-phase1-baseline.mjs`, `audit-seo.mjs`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _290 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `fancy-serial-numbers/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07215686274509804 - nodes in this community are weakly interconnected._
- **Should `patterns.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053061224489795916 - nodes in this community are weakly interconnected._