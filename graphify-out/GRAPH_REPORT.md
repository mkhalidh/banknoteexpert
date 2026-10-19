# Graph Report - banknoteexpert  (2026-10-19)

## Corpus Check
- 202 files · ~115,860 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 9, .css 2, .ico 1)

## Summary
- 967 nodes · 2126 edges · 71 communities (68 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2ce1ecc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- value.ts
- 2-dollar-bill-value/page.tsx
- pages.ts
- patterns.ts
- next
- audit-links.ts
- TwoDollarSerialLookup.tsx
- about-the-author/page.tsx
- AI Fix Plan: banknoteexpert.com SEO issues
- validate-phase1.mjs
- compilerOptions
- Banknote Expert README: architecture and setup (some claims conflict with later documentation)
- package.json
- TwoDollarValueChart.tsx
- email-template.test.ts
- scripts
- check-data.ts
- blog/page.tsx
- devDependencies
- socialImage
- getRoute
- routes.ts
- collect-waline-deps.cjs
- [...all].ts
- star-note-lookup/page.tsx
- Waline comment moderation implementation guide
- 2-dollar-bill-serial-number-lookup/page.tsx
- scoreSerial
- StarNoteLookup.tsx
- audit-seo.mjs
- binary/page.tsx
- Fixplan SEO implementation report
- pages
- dependencies
- Banknote Expert
- app/page.tsx
- FancySerialChecker.tsx
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
- index.ts
- low-serial-number/opengraph-image.tsx
- site.ts
- fancy-serial-numbers/opengraph-image.tsx
- radar/opengraph-image.tsx
- methodology/opengraph-image.tsx
- privacy/opengraph-image.tsx
- star-note-lookup/opengraph-image.tsx
- terms/opengraph-image.tsx
- tools/opengraph-image.tsx
- where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx
- Design System: Banknote Expert
- Next.js agent rules and saved Graphify map guidance
- postcss.config.mjs
- SEO implementation report with production acceptance pending
- has
- buildMetadata
- fancy-serial-numbers/page.tsx
- ValueRangeTable.tsx
- 1976-2-dollar-bill-value/page.tsx
- walk
- app/opengraph-image.tsx
- page-schema.ts
- broken-ladder/opengraph-image.tsx

## God Nodes (most connected - your core abstractions)
1. `socialImage()` - 55 edges
2. `next` - 50 edges
3. `getRoute()` - 42 edges
4. `buildMetadata()` - 27 edges
5. `Breadcrumbs()` - 24 edges
6. `scoreSerial()` - 22 edges
7. `ContentSections()` - 20 edges
8. `PageContent` - 20 edges
9. `RelatedPages()` - 19 edges
10. `KeyTakeaways()` - 18 edges

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

## Communities (71 total, 3 thin omitted)

### Community 0 - "value.ts"
Cohesion: 0.18
Nodes (16): ref_node_fs, anomalies, grades, NoteCondition, PATTERN_VALUE_BANDS, PATTERN_VALUE_GAPS, PATTERN_VALUES_UPDATED, PatternValueBand (+8 more)

### Community 1 - "2-dollar-bill-value/page.tsx"
Cohesion: 0.15
Nodes (11): metadata, Page(), patternLinks, redVsGreenRows, sectionById(), metadata, anchorItems, metadata (+3 more)

### Community 2 - "pages.ts"
Cohesion: 0.05
Nodes (52): articles, EditorialArticle, entries, patternIllustrations, prose(), content, content, content (+44 more)

### Community 3 - "patterns.ts"
Cohesion: 0.05
Nodes (32): PatternGrid(), blockIsRadar(), DAYS_IN_MONTH, distinctCount(), isBinaryRadar(), isBirthday(), isFourRepeat(), isFullLadder() (+24 more)

### Community 4 - "next"
Cohesion: 0.35
Nodes (7): next, robots(), sitemap(), pageModified, pagePublished, BuildMetadataParams, SITE_URL

### Community 5 - "audit-links.ts"
Cohesion: 0.08
Nodes (25): adjacency, anchorByTarget, APP_DIR, broken, COMPONENTS_DIR, depth, hardcoded, inbound (+17 more)

### Community 6 - "TwoDollarSerialLookup.tsx"
Cohesion: 0.06
Nodes (34): ref_node_module, react, react-dom, src_app_globals, dynamic, geistMono, geistSans, metadata (+26 more)

### Community 7 - "about-the-author/page.tsx"
Cohesion: 0.25
Nodes (6): metadata, page, AuthorDetails(), AUTHOR_BIO, AUTHOR_NAME, authorDetails

### Community 8 - "AI Fix Plan: banknoteexpert.com SEO issues"
Cohesion: 0.09
Nodes (21): AI Fix Plan: banknoteexpert.com SEO issues, Context (read first), Final report the AI must return, Final verification checklist (run after all tasks), PHASE 1: High priority, PHASE 2: Medium priority, PHASE 3: Authority and housekeeping, Task 10: Images and alt text (+13 more)

### Community 9 - "validate-phase1.mjs"
Cohesion: 0.06
Nodes (28): nextConfig, ref_chrome_launcher, lighthouse, ref_node_assert, ref_node_child_process, playwright, headings, paths (+20 more)

### Community 10 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 11 - "Banknote Expert README: architecture and setup (some claims conflict with later documentation)"
Cohesion: 0.14
Nodes (17): Banknote Expert README: architecture and setup (some claims conflict with later documentation), README placeholder check:data gate warns but exits zero, npm run preflight: lint, tsc, Vitest, build, link audit and data check, src/config/routes.ts shared route registry, src/lib/serial shared pure parser, pattern detection, scoring and value engine, Documented stack: Next.js 16 App Router, TypeScript strict, Tailwind, Vitest, Vercel, src/lib/star-note pure run lookup and rarity classification, src/content typed PageContent modules and reusable server renderers (+9 more)

### Community 12 - "package.json"
Cohesion: 0.13
Nodes (14): eslintConfig, name, overrides, jsdom, private, version, eslint, eslint-config-next (+6 more)

### Community 13 - "TwoDollarValueChart.tsx"
Cohesion: 0.29
Nodes (6): money(), range(), TwoDollarValueChart(), TWO_DOLLAR_VALUES, TWO_DOLLAR_VALUES_UPDATED, TwoDollarValue

### Community 14 - "email-template.test.ts"
Cohesion: 0.50
Nodes (3): ref_nunjucks, replyEmailTemplate, nunjucks

### Community 15 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit:links, audit:seo, build, check:data, check:metadata, check:value-anomalies, dev (+6 more)

### Community 16 - "check-data.ts"
Cohesion: 0.17
Nodes (9): ref_node_path, ref_node_url, DATA_DIR, Finding, findings, REPLACEMENT, ROOT, walk() (+1 more)

### Community 17 - "blog/page.tsx"
Cohesion: 0.20
Nodes (10): metadata, page, ArticleByline(), ArticleDirectory(), categories, serverSnapshot(), snapshot(), subscribe() (+2 more)

### Community 18 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, eslint-config-next, jsdom, lighthouse, playwright, tailwindcss, @tailwindcss/postcss (+5 more)

### Community 19 - "socialImage"
Cohesion: 0.09
Nodes (25): alt, contentType, Image(), size, alt, contentType, Image(), size (+17 more)

### Community 20 - "getRoute"
Cohesion: 0.33
Nodes (7): metadata, page, ToolsPage(), companyLinks, links(), toolLinks, getRoute()

### Community 21 - "routes.ts"
Cohesion: 0.20
Nodes (9): alt, contentType, Image(), size, TOOL_TYPES, ChangeFrequency, PageType, RouteEntry (+1 more)

### Community 22 - "collect-waline-deps.cjs"
Cohesion: 0.20
Nodes (10): ref_fs, ref_path, collect(), fs, includePaths, path, projectRoot, resolvePkgDir() (+2 more)

### Community 23 - "[...all].ts"
Cohesion: 0.22
Nodes (9): i18n-iso-countries, ref_ip2region, @waline/vercel, Application, config, handler(), ip2regionInstance, isoCountries (+1 more)

### Community 24 - "star-note-lookup/page.tsx"
Cohesion: 0.15
Nodes (11): metadata, metadata, Page(), patternLinks, sectionById(), metadata, ContentSections(), LastUpdated() (+3 more)

### Community 25 - "Waline comment moderation implementation guide"
Cohesion: 0.27
Nodes (10): Documented opt-in lazy comment widget on six high-traffic pages, Waline comment moderation implementation guide, No currency/serial keyword spam filter, Documented Waline guest comments: name required, email/link optional, text-only, Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres, Documented /api/ui admin dashboard and Akismet moderation; instant normal comment publishing, Waline integration requirements (original proposal), Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk (+2 more)

### Community 26 - "2-dollar-bill-serial-number-lookup/page.tsx"
Cohesion: 0.33
Nodes (6): metadata, Page(), patternLinks, sectionById(), seriesRows, patternsById

### Community 27 - "scoreSerial"
Cohesion: 0.15
Nodes (15): vitest, TwoDollarSerialLookup(), getTwoDollarSeries(), twoDollarSeries, clamp(), patternSatisfied(), scoreSerial(), STAR_BONUS (+7 more)

### Community 28 - "StarNoteLookup.tsx"
Cohesion: 0.13
Nodes (20): GLOBAL_MIN, RUNS_2003, DEFAULT_DENOM, DENOMINATIONS, formatInt(), RARITY_STYLE, StarNoteLookup(), selectDenom() (+12 more)

### Community 29 - "audit-seo.mjs"
Cohesion: 0.22
Nodes (7): jsdom, base, descriptions, documents, errors, metadataOnly, titles

### Community 30 - "binary/page.tsx"
Cohesion: 0.25
Nodes (9): faqs, metadata, faqs, metadata, faqs, metadata, FaqItem(), PatternNote() (+1 more)

### Community 31 - "Fixplan SEO implementation report"
Cohesion: 0.25
Nodes (7): Files changed, Fixplan SEO implementation report, Remaining verification commands, Shared illustrations, Task outcomes, TODO(human), Validation

### Community 32 - "pages"
Cohesion: 0.40
Nodes (5): extractLinks(), mainSlice(), pages, routeToHtml(), stripTags()

### Community 33 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, i18n-iso-countries, next, react, react-dom, @waline/client, @waline/vercel

### Community 34 - "Banknote Expert"
Cohesion: 0.29
Nodes (6): Banknote Expert, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Platform, Product Purpose

### Community 35 - "app/page.tsx"
Cohesion: 0.12
Nodes (14): Components, binaryGuide, metadata, radarRepeaterGuide, structuredData, superRadarGuide, twoDollarLookup, twoDollarValue (+6 more)

### Community 36 - "FancySerialChecker.tsx"
Cohesion: 0.17
Nodes (11): metadata, comparison, metadata, metadata, metadata, metadata, Byline(), ComparisonTable() (+3 more)

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

### Community 47 - "index.ts"
Cohesion: 0.19
Nodes (15): fail(), ParsedSerial, ParseError, ParseErrorCode, ParseResult, parseSerial(), AXIS_OF, COMBO_BONUS (+7 more)

### Community 48 - "low-serial-number/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 49 - "site.ts"
Cohesion: 0.23
Nodes (8): SourcesBlock(), ArticleSchemaProps, LAST_UPDATED, LAST_UPDATED_ISO, ORG_SAME_AS, PUBLISHED_ISO, VALUE_SOURCES, SITE_NAME

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

### Community 58 - "Design System: Banknote Expert"
Cohesion: 0.22
Nodes (8): Colors, Design System: Banknote Expert, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes, Typography

### Community 59 - "Next.js agent rules and saved Graphify map guidance"
Cohesion: 0.50
Nodes (4): Next.js agent rules and saved Graphify map guidance, Read installed Next.js guides before code changes, Graphify GRAPH_REPORT.md and graph.json query-first navigation, Claude instructions referencing AGENTS.md

### Community 61 - "SEO implementation report with production acceptance pending"
Cohesion: 0.17
Nodes (12): Statically rendered public content and trust-page links, Banknote Expert LLM site description, Client-side serial checks; optional comments use a separate server-backed service, Serial checker, star lookup, $2 serial lookup and price guide, Recorded sold-price samples and BEP print-run data, SEO implementation report with production acceptance pending, True performance baseline requires original revision, Production acceptance incomplete (+4 more)

### Community 63 - "buildMetadata"
Cohesion: 0.40
Nodes (3): metadata, TOOLS, buildMetadata()

### Community 64 - "fancy-serial-numbers/page.tsx"
Cohesion: 0.14
Nodes (14): anchorItems, metadata, anchorItems, metadata, anchorItems, metadata, AnchorNav(), AnchorNavItem (+6 more)

### Community 65 - "ValueRangeTable.tsx"
Cohesion: 0.12
Nodes (22): money(), Page(), SoldSamples(), Page(), money(), Page(), money(), Page() (+14 more)

### Community 66 - "1976-2-dollar-bill-value/page.tsx"
Cohesion: 0.19
Nodes (9): @waline/client, metadata, Page(), premiumRows, sectionById(), v1976, Comments(), src_components_comments_comments_theme (+1 more)

### Community 68 - "app/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 69 - "page-schema.ts"
Cohesion: 0.28
Nodes (7): AUTHOR_SAME_AS, ORG_LOGO_PATH, homeFaqs, pageContents, ContentBlock, blockText(), pageGraph()

### Community 72 - "broken-ladder/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

## Ambiguous Edges - Review These
- `README placeholder check:data gate warns but exits zero` → `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **308 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+303 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 394 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `README placeholder check:data gate warns but exits zero` and `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `2-dollar-bill-value/page.tsx`, `patterns.ts`, `TwoDollarSerialLookup.tsx`, `validate-phase1.mjs`, `package.json`, `blog/page.tsx`, `socialImage`, `getRoute`, `routes.ts`, `[...all].ts`, `star-note-lookup/page.tsx`, `2-dollar-bill-serial-number-lookup/page.tsx`, `StarNoteLookup.tsx`, `binary/page.tsx`, `app/page.tsx`, `FancySerialChecker.tsx`, `site.ts`, `buildMetadata`, `fancy-serial-numbers/page.tsx`, `1976-2-dollar-bill-value/page.tsx`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `getRoute()` connect `getRoute` to `pages.ts`, `TwoDollarSerialLookup.tsx`, `about-the-author/page.tsx`, `blog/page.tsx`, `socialImage`, `routes.ts`, `app/page.tsx`, `1976-2-dollar-bill-value/opengraph-image.tsx`, `2-dollar-bill-serial-number-lookup/opengraph-image.tsx`, `2-dollar-bill-value/opengraph-image.tsx`, `about/opengraph-image.tsx`, `about-the-author/opengraph-image.tsx`, `blog/opengraph-image.tsx`, `fancy-serial-number-value/opengraph-image.tsx`, `birthday-note/opengraph-image.tsx`, `ladder/opengraph-image.tsx`, `low-serial-number/opengraph-image.tsx`, `fancy-serial-numbers/opengraph-image.tsx`, `radar/opengraph-image.tsx`, `methodology/opengraph-image.tsx`, `privacy/opengraph-image.tsx`, `star-note-lookup/opengraph-image.tsx`, `terms/opengraph-image.tsx`, `tools/opengraph-image.tsx`, `where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx`, `page-schema.ts`, `broken-ladder/opengraph-image.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `SEO implementation report with production acceptance pending` connect `SEO implementation report with production acceptance pending` to `value.ts`, `next`, `page-schema.ts`, `validate-phase1.mjs`, `site.ts`, `audit-seo.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _308 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pages.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05228070175438596 - nodes in this community are weakly interconnected._
- **Should `patterns.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05052790346907994 - nodes in this community are weakly interconnected._