import { writeFileSync } from "node:fs";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const [stage = "after", base = "http://localhost:3000"] = process.argv.slice(2);
if (!["before", "after"].includes(stage)) throw new Error("Stage must be before or after");
const report = { stage, base, status: "pending", pages: [], note: "Mobile lab LCP/TBT/CLS; INP requires field or interaction measurements." };
let chrome;
try {
  chrome = await launch({ chromePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe", chromeFlags: ["--headless", "--no-sandbox"] });
  for (const path of ["/", "/fancy-serial-numbers/", "/blog/"]) {
    const { lhr } = await lighthouse(new URL(path, base).href, { port: chrome.port, logLevel: "error", onlyCategories: ["performance"], formFactor: "mobile" });
    if (lhr.runtimeError) throw new Error(lhr.runtimeError.message);
    report.pages.push({ path, lcpMs: lhr.audits["largest-contentful-paint"].numericValue, tbtMs: lhr.audits["total-blocking-time"].numericValue, cls: lhr.audits["cumulative-layout-shift"].numericValue });
  }
  report.status = "measured";
} catch (error) {
  report.status = "blocked";
  report.error = error.message;
  process.exitCode = 1;
} finally {
  if (chrome) await chrome.kill();
  writeFileSync(`perf-${stage}.json`, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
}
