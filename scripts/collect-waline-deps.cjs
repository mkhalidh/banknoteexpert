/* eslint-disable @typescript-eslint/no-require-imports -- standalone CommonJS script, not part of the app bundle */
const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const rootModules = path.join(projectRoot, "node_modules");

// Every node_modules folder we end up needing to include, keyed by its path
// relative to node_modules/ (e.g. "think-model-mysql2/node_modules/mysql").
// A plain "walk package.json names against the root" approach misses this:
// npm nests a package's own private copy of a dependency (in <pkg>/node_modules/<dep>)
// whenever the root-hoisted version doesn't satisfy that package's version range.
// require() then resolves to the nested copy, not the root one, so the nested
// copy's own dependencies must be walked from ITS location, not the root.
const includePaths = new Set();

function resolvePkgDir(pkgName, searchFrom) {
  // Mirror Node's actual module resolution: look for a node_modules/<pkgName>
  // starting at searchFrom (a package's own directory, or the project root)
  // and walking up toward the filesystem root.
  let dir = searchFrom;
  for (;;) {
    const candidate = path.join(dir, "node_modules", pkgName);
    if (fs.existsSync(path.join(candidate, "package.json"))) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function collect(pkgName, searchFrom) {
  const pkgDir = resolvePkgDir(pkgName, searchFrom);
  if (!pkgDir) {
    console.error("MISSING:", pkgName, "(required from", path.relative(rootModules, searchFrom) || ".", ")");
    return;
  }
  const relPath = path.relative(rootModules, pkgDir).split(path.sep).join("/");
  if (includePaths.has(relPath)) return;
  includePaths.add(relPath);

  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const deps = { ...pkg.dependencies };
  for (const dep of Object.keys(deps)) {
    collect(dep, pkgDir);
  }

  // A package can also carry a nested node_modules with packages that never
  // appear in its own "dependencies" field (peer copies, bundled installs).
  // Include those too rather than assume package.json tells the whole story.
  const nestedModules = path.join(pkgDir, "node_modules");
  if (fs.existsSync(nestedModules)) {
    for (const entry of fs.readdirSync(nestedModules)) {
      if (entry.startsWith(".")) continue;
      if (entry.startsWith("@")) {
        for (const scoped of fs.readdirSync(path.join(nestedModules, entry))) {
          collect(`${entry}/${scoped}`, pkgDir);
        }
      } else {
        collect(entry, pkgDir);
      }
    }
  }
}

collect("@waline/vercel", projectRoot);

const sorted = [...includePaths].sort();
console.log(sorted.join("\n"));
console.error(`\nTotal include paths: ${sorted.length}`);
