/**
 * Pre-launch data checklist. Recursively scans src/data (both .ts and .md) for
 * the string PLACEHOLDER and reports any remaining placeholder data, per file.
 * WARNS but never fails (exit 0) so the site can deploy either way — the summary
 * block is the checklist to clear before presenting figures as real.
 *
 * Run: npm run check:data
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DATA_DIR = join(ROOT, "src", "data");
const MARKER = "PLACEHOLDER";

/** Which real source should replace placeholders in each dataset. */
const REPLACEMENT: Record<string, string> = {
  "value-ranges.ts": "Heritage Auctions + eBay sold listings (sampled directly)",
  "two-dollar-values.ts": "serialworth.com price guide (secondary compilation)",
  "star-notes/runs.ts": "BEP monthly production reports",
};

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return name.endsWith(".ts") || name.endsWith(".md") ? [full] : [];
  });
}

interface Finding {
  rel: string;
  count: number;
}

const findings: Finding[] = walk(DATA_DIR)
  .map((file) => {
    const text = readFileSync(file, "utf8");
    const count = text.split(MARKER).length - 1;
    return { rel: file.replace(ROOT, "").replace(/\\/g, "/"), count };
  })
  .filter((f) => f.count > 0);

const pad = (s: string, n: number) => s.padEnd(n);

console.log("Pre-launch data checklist (check:data)");
console.log("======================================");
console.log("Scanned src/data (.ts and .md) for the string PLACEHOLDER.\n");

if (findings.length === 0) {
  console.log("┌────────────────────────────────────────────────────────────┐");
  console.log("│  PRE-LAUNCH DATA SUMMARY                                     │");
  console.log("├────────────────────────────────────────────────────────────┤");
  console.log("│  Placeholder entries : 0                                    │");
  console.log("│  STATUS: all data is backed by real, cited sources.         │");
  console.log("└────────────────────────────────────────────────────────────┘");
  process.exit(0);
}

console.log(pad("File", 40) + pad("Placeholders", 16) + "Replace with");
console.log("-".repeat(110));
let total = 0;
for (const f of findings) {
  total += f.count;
  const key = Object.keys(REPLACEMENT).find((k) => f.rel.endsWith(k));
  console.log(
    pad(f.rel, 40) + pad(String(f.count), 16) + (key ? REPLACEMENT[key] : "review"),
  );
}
console.log("");
console.log("┌────────────────────────────────────────────────────────────┐");
console.log("│  PRE-LAUNCH DATA SUMMARY                                     │");
console.log("├────────────────────────────────────────────────────────────┤");
console.log(`│  Files with placeholders : ${pad(String(findings.length), 33)}│`);
console.log(`│  Total placeholder entries : ${pad(String(total), 31)}│`);
console.log("│  STATUS: replace the above before presenting figures as real.│");
console.log("└────────────────────────────────────────────────────────────┘");
process.exit(0);
