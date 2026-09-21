<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Saved codebase map

- For architecture and file-relationship questions, consult `graphify-out/GRAPH_REPORT.md` and query `graphify-out/graph.json` before scanning the whole repository.
- Run queries with `python -m graphify query "<matching symbol or topic>" --budget 1500` from the project root. Use terms present in graph node labels; the search does not translate Roman Urdu automatically.
- The graph is navigation context, not authoritative source code or conversation memory. Read the relevant current files before edits, and distinguish design proposals under `Redesign/` from implemented behavior.
- After source changes, refresh with `python -m graphify update .`. For changed documentation, use the Graphify skill's semantic update workflow as well.
- The graph excludes image content, generated dependencies/build output, and environment files. CSS is not structurally indexed by Graphify; inspect styles directly when working on UI.
- In Windows PowerShell, set `$env:PYTHONIOENCODING='utf-8'` if graphify's Unicode output causes encoding errors.
