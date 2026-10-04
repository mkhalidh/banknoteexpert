// Node module resolve hook: maps the project's "@/..." alias to ./src/...
// so plain-node scripts (run with --experimental-strip-types) can import the
// TypeScript serial library the same way the app does. Dev tooling only.
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("src");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    for (const ext of ["", ".ts", ".tsx", ".mjs", "/index.ts"]) {
      if (existsSync(base + ext)) {
        return { url: pathToFileURL(base + ext).href, shortCircuit: true };
      }
    }
  }
  return nextResolve(specifier, context);
}
