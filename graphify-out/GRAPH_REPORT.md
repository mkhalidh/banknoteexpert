# Graph Report - banknoteexpert  (2026-11-08)

## Corpus Check
- 275 files · ~316,775 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 9, .css 2, .ico 1)

## Summary
- 1332 nodes · 3026 edges · 111 communities (110 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `896ba4ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- value.ts
- buildMetadata
- fancy-serial-numbers/page.tsx
- patterns.ts
- seo.ts
- audit-links.ts
- getRoute
- RelatedPages.tsx
- AI Fix Plan: banknoteexpert.com SEO issues
- validate-phase1.mjs
- compilerOptions
- Banknote Expert README: architecture and setup (some claims conflict with later documentation)
- package.json
- 2-dollar-bill-value/page.tsx
- email-template.test.ts
- scripts
- check-data.ts
- pages.ts
- devDependencies
- socialImage
- ref_node_fs
- routes.ts
- collect-waline-deps.cjs
- [...all].ts
- Breadcrumbs.tsx
- Waline comment moderation implementation guide
- 2-dollar-bill-serial-number-lookup/page.tsx
- terms/page.tsx
- star-note-lookup/page.tsx
- audit-seo.mjs
- binary/page.tsx
- Fixplan SEO implementation report
- star-notes/page.tsx
- dependencies
- Banknote Expert
- app/page.tsx
- retest.mjs
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
- page-schema.ts
- fancy-serial-numbers/opengraph-image.tsx
- radar/opengraph-image.tsx
- methodology/opengraph-image.tsx
- privacy/opengraph-image.tsx
- star-note-lookup/opengraph-image.tsx
- terms/opengraph-image.tsx
- tools/opengraph-image.tsx
- where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx
- scoreSerial
- Next.js agent rules and saved Graphify map guidance
- postcss.config.mjs
- SEO implementation report with production acceptance pending
- super-radar/page.tsx
- birthday-note/page.tsx
- security-headers.mjs
- two-dollar-print-runs.ts
- 1976-2-dollar-bill-value/page.tsx
- next
- app/opengraph-image.tsx
- broken-ladder/page.tsx
- TwoDollarValueChart.tsx
- ladder/page.tsx
- broken-ladder/opengraph-image.tsx
- binary-radar/opengraph-image.tsx
- binary/twitter-image.tsx
- bookends/opengraph-image.tsx
- bookends/twitter-image.tsx
- five-of-a-kind/opengraph-image.tsx
- radar-repeater/opengraph-image.tsx
- valueCell
- seven-of-a-kind/twitter-image.tsx
- social-image.tsx
- six-of-a-kind/twitter-image.tsx
- solid/opengraph-image.tsx
- super-radar/opengraph-image.tsx
- trinary/twitter-image.tsx
- 1976-postage-stamp/page.tsx
- about/page.tsx
- radar-repeater/page.tsx
- ValueResultPanel.tsx
- 1928/twitter-image.tsx
- 1953/opengraph-image.tsx
- 1963-red-seal/opengraph-image.tsx
- 1976-postage-stamp/opengraph-image.tsx
- 1976-postage-stamp/twitter-image.tsx
- 1995/opengraph-image.tsx
- 2003/twitter-image.tsx
- 2009/twitter-image.tsx
- 2013/opengraph-image.tsx
- 2013/twitter-image.tsx
- 2017a/opengraph-image.tsx
- 2017a/twitter-image.tsx
- star-notes/opengraph-image.tsx
- binary-radar/twitter-image.tsx
- five-of-a-kind/twitter-image.tsx
- four-pairs/twitter-image.tsx
- radar-repeater/twitter-image.tsx
- solid/twitter-image.tsx
- super-radar/twitter-image.tsx
- trinary/opengraph-image.tsx
- two-dollar-facts.ts

## God Nodes (most connected - your core abstractions)
1. `socialImage()` - 127 edges
2. `getRoute()` - 80 edges
3. `next` - 72 edges
4. `buildMetadata()` - 45 edges
5. `Breadcrumbs()` - 35 edges
6. `PageContent` - 33 edges
7. `ContentSections()` - 31 edges
8. `RelatedPages()` - 30 edges
9. `scoreSerial()` - 22 edges
10. `valueCell` - 21 edges

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

## Communities (111 total, 1 thin omitted)

### Community 0 - "value.ts"
Cohesion: 0.24
Nodes (13): NoteCondition, PATTERN_VALUE_BANDS, PATTERN_VALUE_GAPS, PATTERN_VALUES_UPDATED, PatternValueBand, ValueConfidence, PatternMatch, bandsForPattern() (+5 more)

### Community 1 - "buildMetadata"
Cohesion: 0.08
Nodes (24): metadata, metadata, metadata, metadata, metadata, metadata, metadata, metadata (+16 more)

### Community 2 - "fancy-serial-numbers/page.tsx"
Cohesion: 0.07
Nodes (39): anchorItems, metadata, anchorItems, metadata, Page(), anchorItems, metadata, AnchorNav() (+31 more)

### Community 3 - "patterns.ts"
Cohesion: 0.06
Nodes (23): FEATURED_PATTERN_IDS, featuredPatternIds, featuredPatterns, HIDDEN_PATTERN_IDS, PatternGrid(), remainingPatterns, visiblePatterns, blockIsRadar() (+15 more)

### Community 4 - "seo.ts"
Cohesion: 0.35
Nodes (6): robots(), sitemap(), routes, homeFaqs, BuildMetadataParams, SITE_URL

### Community 5 - "audit-links.ts"
Cohesion: 0.07
Nodes (33): adjacency, anchorByTarget, APP_DIR, broken, COMPONENTS_DIR, depth, extractLinks(), hardcoded (+25 more)

### Community 6 - "getRoute"
Cohesion: 0.14
Nodes (12): alt, contentType, Image(), size, alt, contentType, Image(), size (+4 more)

### Community 7 - "RelatedPages.tsx"
Cohesion: 0.07
Nodes (45): @waline/client, faqs, metadata, Page(), sectionById(), SERIES, faqs, metadata (+37 more)

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
Cohesion: 0.29
Nodes (8): metadata, Page(), patternLinks, redVsGreenRows, sectionById(), content, patternLinkLabels, patternPageIds

### Community 14 - "email-template.test.ts"
Cohesion: 0.50
Nodes (3): ref_nunjucks, replyEmailTemplate, nunjucks

### Community 15 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit:links, audit:seo, build, check:data, check:metadata, check:value-anomalies, dev (+6 more)

### Community 16 - "check-data.ts"
Cohesion: 0.15
Nodes (9): ref_node_path, ref_node_url, DATA_DIR, Finding, findings, REPLACEMENT, ROOT, walk() (+1 more)

### Community 17 - "pages.ts"
Cohesion: 0.11
Nodes (19): content, content, pageContents, siloAGuides, content, content, content, content (+11 more)

### Community 18 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, eslint-config-next, jsdom, lighthouse, playwright, tailwindcss, @tailwindcss/postcss (+5 more)

### Community 19 - "socialImage"
Cohesion: 0.08
Nodes (25): alt, contentType, Image(), size, alt, contentType, Image(), size (+17 more)

### Community 20 - "ref_node_fs"
Cohesion: 0.15
Nodes (12): ref_chrome_launcher, lighthouse, ref_node_fs, playwright, headings, paths, requests, xml (+4 more)

### Community 21 - "routes.ts"
Cohesion: 0.19
Nodes (11): alt, contentType, Image(), size, Footer(), FOOTER_SILOS, ChangeFrequency, getRoutesBySilo() (+3 more)

### Community 22 - "collect-waline-deps.cjs"
Cohesion: 0.20
Nodes (10): ref_fs, ref_path, collect(), fs, includePaths, path, projectRoot, resolvePkgDir() (+2 more)

### Community 23 - "[...all].ts"
Cohesion: 0.22
Nodes (9): i18n-iso-countries, ref_ip2region, @waline/vercel, Application, config, handler(), ip2regionInstance, isoCountries (+1 more)

### Community 24 - "Breadcrumbs.tsx"
Cohesion: 0.13
Nodes (13): faqs, metadata, Page(), sectionById(), metadata, page, metadata, ContentSections() (+5 more)

### Community 25 - "Waline comment moderation implementation guide"
Cohesion: 0.27
Nodes (10): Documented opt-in lazy comment widget on six high-traffic pages, Waline comment moderation implementation guide, No currency/serial keyword spam filter, Documented Waline guest comments: name required, email/link optional, text-only, Documented same-app Waline API src/pages/api/[...all].ts with Neon Postgres, Documented /api/ui admin dashboard and Akismet moderation; instant normal comment publishing, Waline integration requirements (original proposal), Proposed IntersectionObserver/dynamic loading with stable placeholder and separate async chunk (+2 more)

### Community 26 - "2-dollar-bill-serial-number-lookup/page.tsx"
Cohesion: 0.29
Nodes (8): metadata, Page(), patternLinks, sectionById(), seriesRows, content, patternLinkLabels, patternPageIds

### Community 27 - "terms/page.tsx"
Cohesion: 0.40
Nodes (3): metadata, LastUpdated(), content

### Community 28 - "star-note-lookup/page.tsx"
Cohesion: 0.09
Nodes (30): metadata, Page(), patternLinks, rarestGroups, sectionById(), GLOBAL_MIN, RUNS_2003, ScarcestStarCallout() (+22 more)

### Community 29 - "audit-seo.mjs"
Cohesion: 0.22
Nodes (7): jsdom, base, descriptions, documents, errors, metadataOnly, titles

### Community 30 - "binary/page.tsx"
Cohesion: 0.36
Nodes (6): faqs, metadata, money(), Page(), content, examples

### Community 31 - "Fixplan SEO implementation report"
Cohesion: 0.25
Nodes (7): Files changed, Fixplan SEO implementation report, Remaining verification commands, Shared illustrations, Task outcomes, TODO(human), Validation

### Community 32 - "star-notes/page.tsx"
Cohesion: 0.13
Nodes (19): CONDITIONS, faqs, metadata, money(), Page(), runs1976, sectionById(), starSeries (+11 more)

### Community 33 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, i18n-iso-countries, next, react, react-dom, @waline/client, @waline/vercel

### Community 34 - "Banknote Expert"
Cohesion: 0.29
Nodes (6): Banknote Expert, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Platform, Product Purpose

### Community 35 - "app/page.tsx"
Cohesion: 0.06
Nodes (30): Colors, Components, Design System: Banknote Expert, Do's and Don'ts, Elevation & Depth, Layout, Overview, Shapes (+22 more)

### Community 36 - "retest.mjs"
Cohesion: 0.14
Nodes (16): patterns, patternSatisfied(), BUILTIN, byPattern, data, DAYS, LABEL_TO_IDS, leap() (+8 more)

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
Cohesion: 0.20
Nodes (14): fail(), ParsedSerial, ParseError, ParseErrorCode, ParseResult, AXIS_OF, COMBO_BONUS, COMBO_CAP (+6 more)

### Community 48 - "low-serial-number/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 49 - "page-schema.ts"
Cohesion: 0.21
Nodes (13): ArticleSchemaProps, pageModified, pagePublished, AUTHOR_NAME, AUTHOR_SAME_AS, LAST_UPDATED, LAST_UPDATED_ISO, ORG_LOGO_PATH (+5 more)

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

### Community 58 - "scoreSerial"
Cohesion: 0.17
Nodes (12): vitest, patternsById, clamp(), scoreSerial(), STAR_BONUS, tierFor(), detect(), ids() (+4 more)

### Community 59 - "Next.js agent rules and saved Graphify map guidance"
Cohesion: 0.50
Nodes (4): Next.js agent rules and saved Graphify map guidance, Read installed Next.js guides before code changes, Graphify GRAPH_REPORT.md and graph.json query-first navigation, Claude instructions referencing AGENTS.md

### Community 61 - "SEO implementation report with production acceptance pending"
Cohesion: 0.17
Nodes (12): Statically rendered public content and trust-page links, Banknote Expert LLM site description, Client-side serial checks; optional comments use a separate server-backed service, Serial checker, star lookup, $2 serial lookup and price guide, Recorded sold-price samples and BEP print-run data, SEO implementation report with production acceptance pending, True performance baseline requires original revision, Production acceptance incomplete (+4 more)

### Community 62 - "super-radar/page.tsx"
Cohesion: 0.36
Nodes (6): faqs, metadata, money(), Page(), content, examples

### Community 63 - "birthday-note/page.tsx"
Cohesion: 0.11
Nodes (15): metadata, metadata, metadata, anchorItems, metadata, Byline(), KeyTakeaways(), FancySerialChecker() (+7 more)

### Community 64 - "security-headers.mjs"
Cohesion: 0.33
Nodes (5): nextConfig, contentSecurityPolicy, cspHeaderName, enforceCsp, securityHeaders

### Community 65 - "two-dollar-print-runs.ts"
Cohesion: 0.17
Nodes (11): STAR_RUN_FULL, STAR_RUN_SCARCE_MAX, STAR_RUN_VERY_RARE_MAX, STAR_RUNS_1963, STAR_RUNS_1963A, STAR_RUNS_1976, TWO_DOLLAR_PRINT_RUNS_UPDATED, TWO_DOLLAR_PRODUCTION (+3 more)

### Community 66 - "1976-2-dollar-bill-value/page.tsx"
Cohesion: 0.16
Nodes (13): districtRows, metadata, Page(), premiumRows, runs1976, sectionById(), v1976, districtRows (+5 more)

### Community 67 - "next"
Cohesion: 0.06
Nodes (37): next, ref_node_module, react, react-dom, src_app_globals, dynamic, geistMono, geistSans (+29 more)

### Community 68 - "app/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 69 - "broken-ladder/page.tsx"
Cohesion: 0.29
Nodes (6): comparison, metadata, SoldSamples(), content, examples, path

### Community 70 - "TwoDollarValueChart.tsx"
Cohesion: 0.25
Nodes (7): money(), range(), SERIES_PAGE, TwoDollarValueChart(), TWO_DOLLAR_VALUES, TWO_DOLLAR_VALUES_UPDATED, TwoDollarValue

### Community 71 - "ladder/page.tsx"
Cohesion: 0.24
Nodes (8): cell(), faqs, ladderValueRows, metadata, money(), nonFaqSections, comparison, content

### Community 72 - "broken-ladder/opengraph-image.tsx"
Cohesion: 0.53
Nodes (4): alt, contentType, Image(), size

### Community 73 - "binary-radar/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 74 - "binary/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 75 - "bookends/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 76 - "bookends/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 77 - "five-of-a-kind/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 78 - "radar-repeater/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 79 - "valueCell"
Cohesion: 0.33
Nodes (9): Cell(), formatUsd(), maxHigh(), patternLabel(), ValueRangeTable(), ALL_CONDITIONS, VALUE_UPDATED, valueCell (+1 more)

### Community 80 - "seven-of-a-kind/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 81 - "social-image.tsx"
Cohesion: 0.12
Nodes (13): alt, contentType, Image(), size, alt, contentType, Image(), size (+5 more)

### Community 82 - "six-of-a-kind/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 83 - "solid/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 84 - "super-radar/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 85 - "trinary/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 86 - "1976-postage-stamp/page.tsx"
Cohesion: 0.32
Nodes (6): faqs, metadata, Page(), sectionById(), typeRows, content

### Community 87 - "about/page.tsx"
Cohesion: 0.32
Nodes (4): metadata, AuthorDetails(), authorDetails, content

### Community 88 - "radar-repeater/page.tsx"
Cohesion: 0.36
Nodes (6): faqs, metadata, money(), Page(), content, examples

### Community 89 - "ValueResultPanel.tsx"
Cohesion: 0.32
Nodes (6): formatUsd(), patternLabel(), ValueResultPanel(), CONDITION_LABELS, VALUE_PATTERN_LABELS, ValueResult

### Community 90 - "1928/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 91 - "1953/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 92 - "1963-red-seal/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 93 - "1976-postage-stamp/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 94 - "1976-postage-stamp/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 95 - "1995/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 96 - "2003/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 97 - "2009/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 98 - "2013/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 99 - "2013/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 100 - "2017a/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 101 - "2017a/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 102 - "star-notes/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 103 - "binary-radar/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 104 - "five-of-a-kind/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 105 - "four-pairs/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 106 - "radar-repeater/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 107 - "solid/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 108 - "super-radar/twitter-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 109 - "trinary/opengraph-image.tsx"
Cohesion: 0.40
Nodes (4): alt, contentType, Image(), size

### Community 110 - "two-dollar-facts.ts"
Cohesion: 0.40
Nodes (4): TWO_DOLLAR_FACTS, TWO_DOLLAR_FACTS_UPDATED, TWO_DOLLAR_REFUTED_CLAIMS, TwoDollarFact

## Ambiguous Edges - Review These
- `README placeholder check:data gate warns but exits zero` → `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **496 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+491 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 594 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `README placeholder check:data gate warns but exits zero` and `Documented real BEP dataset: 438 runs, seven denominations, 15 series, extracted 2026-09-12`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `buildMetadata`, `fancy-serial-numbers/page.tsx`, `patterns.ts`, `seo.ts`, `getRoute`, `RelatedPages.tsx`, `package.json`, `2-dollar-bill-value/page.tsx`, `pages.ts`, `routes.ts`, `[...all].ts`, `Breadcrumbs.tsx`, `2-dollar-bill-serial-number-lookup/page.tsx`, `terms/page.tsx`, `star-note-lookup/page.tsx`, `binary/page.tsx`, `star-notes/page.tsx`, `app/page.tsx`, `page-schema.ts`, `super-radar/page.tsx`, `birthday-note/page.tsx`, `security-headers.mjs`, `1976-2-dollar-bill-value/page.tsx`, `broken-ladder/page.tsx`, `TwoDollarValueChart.tsx`, `ladder/page.tsx`, `social-image.tsx`, `1976-postage-stamp/page.tsx`, `about/page.tsx`, `radar-repeater/page.tsx`, `ValueResultPanel.tsx`?**
  _High betweenness centrality (0.215) - this node is a cross-community bridge._
- **Why does `getRoute()` connect `getRoute` to `fancy-serial-numbers/page.tsx`, `RelatedPages.tsx`, `socialImage`, `routes.ts`, `Breadcrumbs.tsx`, `app/page.tsx`, `1976-2-dollar-bill-value/opengraph-image.tsx`, `2-dollar-bill-serial-number-lookup/opengraph-image.tsx`, `2-dollar-bill-value/opengraph-image.tsx`, `about/opengraph-image.tsx`, `about-the-author/opengraph-image.tsx`, `blog/opengraph-image.tsx`, `fancy-serial-number-value/opengraph-image.tsx`, `birthday-note/opengraph-image.tsx`, `ladder/opengraph-image.tsx`, `low-serial-number/opengraph-image.tsx`, `page-schema.ts`, `fancy-serial-numbers/opengraph-image.tsx`, `radar/opengraph-image.tsx`, `methodology/opengraph-image.tsx`, `privacy/opengraph-image.tsx`, `star-note-lookup/opengraph-image.tsx`, `terms/opengraph-image.tsx`, `tools/opengraph-image.tsx`, `where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx`, `next`, `broken-ladder/page.tsx`, `broken-ladder/opengraph-image.tsx`, `binary-radar/opengraph-image.tsx`, `binary/twitter-image.tsx`, `bookends/opengraph-image.tsx`, `bookends/twitter-image.tsx`, `five-of-a-kind/opengraph-image.tsx`, `radar-repeater/opengraph-image.tsx`, `seven-of-a-kind/twitter-image.tsx`, `social-image.tsx`, `six-of-a-kind/twitter-image.tsx`, `solid/opengraph-image.tsx`, `super-radar/opengraph-image.tsx`, `trinary/twitter-image.tsx`, `1928/twitter-image.tsx`, `1953/opengraph-image.tsx`, `1963-red-seal/opengraph-image.tsx`, `1976-postage-stamp/opengraph-image.tsx`, `1976-postage-stamp/twitter-image.tsx`, `1995/opengraph-image.tsx`, `2003/twitter-image.tsx`, `2009/twitter-image.tsx`, `2013/opengraph-image.tsx`, `2013/twitter-image.tsx`, `2017a/opengraph-image.tsx`, `2017a/twitter-image.tsx`, `star-notes/opengraph-image.tsx`, `binary-radar/twitter-image.tsx`, `five-of-a-kind/twitter-image.tsx`, `four-pairs/twitter-image.tsx`, `radar-repeater/twitter-image.tsx`, `solid/twitter-image.tsx`, `super-radar/twitter-image.tsx`, `trinary/opengraph-image.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `socialImage()` connect `socialImage` to `getRoute`, `routes.ts`, `1976-2-dollar-bill-value/opengraph-image.tsx`, `2-dollar-bill-serial-number-lookup/opengraph-image.tsx`, `2-dollar-bill-value/opengraph-image.tsx`, `about/opengraph-image.tsx`, `about-the-author/opengraph-image.tsx`, `blog/opengraph-image.tsx`, `fancy-serial-number-value/opengraph-image.tsx`, `birthday-note/opengraph-image.tsx`, `ladder/opengraph-image.tsx`, `low-serial-number/opengraph-image.tsx`, `fancy-serial-numbers/opengraph-image.tsx`, `radar/opengraph-image.tsx`, `methodology/opengraph-image.tsx`, `privacy/opengraph-image.tsx`, `star-note-lookup/opengraph-image.tsx`, `terms/opengraph-image.tsx`, `tools/opengraph-image.tsx`, `where-is-the-serial-number-on-a-dollar-bill/opengraph-image.tsx`, `app/opengraph-image.tsx`, `broken-ladder/opengraph-image.tsx`, `binary-radar/opengraph-image.tsx`, `binary/twitter-image.tsx`, `bookends/opengraph-image.tsx`, `bookends/twitter-image.tsx`, `five-of-a-kind/opengraph-image.tsx`, `radar-repeater/opengraph-image.tsx`, `seven-of-a-kind/twitter-image.tsx`, `social-image.tsx`, `six-of-a-kind/twitter-image.tsx`, `solid/opengraph-image.tsx`, `super-radar/opengraph-image.tsx`, `trinary/twitter-image.tsx`, `1928/twitter-image.tsx`, `1953/opengraph-image.tsx`, `1963-red-seal/opengraph-image.tsx`, `1976-postage-stamp/opengraph-image.tsx`, `1976-postage-stamp/twitter-image.tsx`, `1995/opengraph-image.tsx`, `2003/twitter-image.tsx`, `2009/twitter-image.tsx`, `2013/opengraph-image.tsx`, `2013/twitter-image.tsx`, `2017a/opengraph-image.tsx`, `2017a/twitter-image.tsx`, `star-notes/opengraph-image.tsx`, `binary-radar/twitter-image.tsx`, `five-of-a-kind/twitter-image.tsx`, `four-pairs/twitter-image.tsx`, `radar-repeater/twitter-image.tsx`, `solid/twitter-image.tsx`, `super-radar/twitter-image.tsx`, `trinary/opengraph-image.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _496 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `buildMetadata` be split into smaller, more focused modules?**
  _Cohesion score 0.07822410147991543 - nodes in this community are weakly interconnected._
- **Should `fancy-serial-numbers/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06623376623376623 - nodes in this community are weakly interconnected._