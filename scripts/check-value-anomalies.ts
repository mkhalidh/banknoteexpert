import { PATTERN_VALUE_BANDS } from "../src/data/value-ranges.ts";
import { writeFileSync } from "node:fs";

// TODO(human): Verify these sample inversions against source sales. Never auto-correct prices.
const grades = ["circulated", "vf", "unc"];
const anomalies: Record<string, unknown>[] = [];
for (const band of PATTERN_VALUE_BANDS) {
  if (band.low === band.high) anomalies.push({ pattern: band.pattern, condition: band.condition, reason: "Single-price range", band });
  for (const lower of PATTERN_VALUE_BANDS) {
    if (lower.pattern !== band.pattern || grades.indexOf(lower.condition) >= grades.indexOf(band.condition)) continue;
    if (band.low < lower.low || band.high < lower.high) anomalies.push({ pattern: band.pattern, reason: "Higher-grade sample has a lower minimum or maximum", lower, higher: band });
  }
}
writeFileSync("value-anomalies.json", JSON.stringify(anomalies, null, 2) + "\n");
console.log(`TODO(human): ${anomalies.length} value anomalies require source-sale review; see value-anomalies.json.`);
