const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "node_modules");
const seen = new Set();

function collect(pkgName) {
  if (seen.has(pkgName)) return;
  const pkgJsonPath = path.join(root, pkgName, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.error("MISSING:", pkgName);
    return;
  }
  seen.add(pkgName);
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  const deps = { ...pkg.dependencies };
  for (const dep of Object.keys(deps)) {
    collect(dep);
  }
}

collect("@waline/vercel");

const sorted = [...seen].sort();
console.log(sorted.join("\n"));
console.error(`\nTotal packages: ${sorted.length}`);
