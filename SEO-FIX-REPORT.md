# Fixplan SEO implementation report

Source changes are implemented. Production acceptance remains incomplete because this environment could not launch build workers or Chrome reliably. No deployment or Search Console submission was performed.

## Task outcomes

| Task | Result |
| --- | --- |
| 1 | Shared www origin and trailing-slash routes were already correct. Verification recorded in commit 5e9573f. |
| 2 | Sitemap includes all 19 routes with recorded per-route dates. Privacy/Terms changed from noindex to indexable to satisfy the requested sitemap. Removed priority/changefreq. |
| 3 | Existing hub covered most sections. Added legacy super-repeater anchor. Rendered definitions/examples/odds come from checker data; patterns without sales say so. |
| 4 | High remains >=96,000,000; Super High >=99,000,000. Removed duplicate card aliases, corrected card copy, added 1976 Related guide. Empty value rows collapsed. Seven anomalies flagged without changing prices or detectors. |
| 5 | All 18 inner routes have OG/Twitter image handlers, using the existing 1200x630 generator and per-page titles/alt. HTTP delivery remains unverified. |
| 6 | Shortened homepage title and hub description. Metadata helper enforces length limits; postbuild audit checks lengths and uniqueness. |
| 7 | Renamed home navigation to Serial Number Checker, added Patterns, linked radar prose URL. Built-site audit checks destinations, fragments, host and slash consistency. |
| 8 | One graph per page: Organization/WebSite, three WebApplications, guide Articles, breadcrumbs, author profile and FAQs from visible data. Schema dates displayed; JSON-LD escaped. External validators remain pending. |
| 9 | Capped responsive widths at 1920; used Next 16 preload API. Comments remain intersection-loaded, with more reserved space and ugc/nofollow user links. Added Lighthouse runner; metrics blocked. |
| 10 | Added separate SVG diagrams for radar, ladder, low serial and birthday, including blog-card mapping. Meaningful alt for illustrations; duplicate decorative card images intentionally keep empty alt. |
| 11 | Cleaned About bio; optional credentials/memberships/reviewedBy data only renders when set. Added clearly labelled secondary and primary reference sources to $2 guide, using existing source domains. |
| 12 | Removed robots Host. Cleaned llms headings and added 1976/privacy/terms links; tools already listed. |
| 13 | Retained Viesearch badge: it already has nofollow/noopener/noreferrer, satisfying the plan's allowed minimum option. |
| 14 | Kept the existing blog index/intro; sorts and displays real recorded modification dates. No invented articles. |

## Validation

- Final suite: **289 tests passed across 9 files**, including 282 existing tests, SEO contracts and rendered-page checks. Run with the native config loader and a single reusable thread worker to avoid sandbox process limits.
- Final TypeScript, ESLint and data checks passed. git diff --check is clean.
- Rendered-content tests cover all 19 pages with browser-only tools/comments mocked. These do not replace production browser tests.
- Value audit: seven review items in value-anomalies.json. No sale prices changed.
- Production build: Turbopack stalled at compilation; webpack failed with spawn EPERM. A temporary in-process/worker-thread attempt also failed; temporary settings were restored.
- Lighthouse: Chrome failed to open its debugging port. perf-before.json and perf-after.json record blocked status with no fabricated metrics. LCP/TBT/CLS before, after and change are unavailable. INP is not claimed from a navigation-only lab run.
- Per-task builds could not be completed. Task-1 verification commit succeeded; subsequent Git writes failed with .git/index.lock: Permission denied. Source changes remain in the working tree.
- Code graph refreshed with python -m graphify update .; llms.txt and this report also have a semantic extraction merged into the saved graph.

## TODO(human)

1. Verify all seven source-sale anomalies: birthday VF max below circulated; broken ladder UNC min below VF; low-under-1000 VF below circulated, UNC $69-$69, UNC max below circulated and VF; super-radar VF max below circulated.
2. Supply genuine author credentials, memberships and reviewer identity in src/config/site.ts; leave empty when not applicable.
3. Add exact Heritage/Stack's Bowers lot URLs and BEP report/PDF citations supporting individual claims. Existing source homepages are reference links, not evidence for individual sale prices. Check the secondary SerialWorth compilation against original records.
4. Research future articles: solid/binary/repeater serials, $1 star-note value, $5/$10/$20/$100 serial lookup, error notes and an “is my bill worth anything” explainer.
5. Optional owner decision: remove Viesearch badge; current nofollow option is already implemented.
6. Complete production build, built HTML/image/link audit, browser scroll/CLS testing, Lighthouse and external structured-data validation where worker processes and Chrome can run.

## Shared illustrations

The four pattern spokes have unique diagrams. Blog cards for the other entries retain existing editorial art: homepage, fancy-serial hub, value guide, $2 serial lookup, serial-location guide, star-note lookup, $2 value, 1976 value, author, methodology, about, privacy and terms. OG/Twitter previews are separately titled per route.

## Remaining verification commands

```powershell
npm run build
npm run audit:links
npm run audit:seo
npm run start
# Second terminal after the server is ready:
npm run audit:seo -- http://localhost:3000
npm run perf:seo -- after http://localhost:3000
```

Capture a true before run from the original revision in a separate checkout before comparing performance. Running before on the modified tree is not a valid baseline.

After deploying, resubmit https://www.banknoteexpert.com/sitemap.xml to Google Search Console and Bing Webmaster Tools. Validate deployed pages in Schema.org Validator and Rich Results Test. No FAQ rich-result eligibility is promised: [Google limits FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes). Dates follow [Google's accurate lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Files changed

Main changes are in src/app page/image handlers, src/lib/seo.ts, src/lib/page-schema.ts, src/config/page-dates.ts, routes.ts, navigation.ts, editorial.ts and site.ts; shared breadcrumb/content/comment components; src/content page copy and home-faq.ts/pages.ts; next.config.ts, package.json and public/llms.txt. Added four SVGs under public/images/patterns, SEO tests, scripts/audit-seo.mjs, scripts/check-value-anomalies.ts and scripts/measure-seo-performance.mjs. Reports: value-anomalies.json, perf-before.json, perf-after.json and this file. Refreshed graphify-out artifacts. Full inventory is provided in seo-changed-files.json.
