// Pattern-accuracy re-test runner.
//
// Run:  node --experimental-strip-types --import ./tools/register.mjs tools/retest.mjs [path-to-csv]
//
// CSV format (header optional): serial,expected_pattern   e.g.  16101964,Birthday Note
// With no CSV it uses a BUILT-IN sample made of the real failing serials from
// the 851-listing test plus controls and seller-junk, so the before/after moves
// are visible out of the box. Pass your full 1305-row synthetic CSV for the
// authoritative numbers.
//
// "after" = the new branch logic (scoreSerial + patternSatisfied).
// "before" = the previous production logic (old 2-string ladder, MMDDYYYY-only
// birthday, and the old cross-axis SUPPRESSED_BY), reconstructed inline.

import fs from "node:fs";
import { scoreSerial, patternSatisfied } from "@/lib/serial/score";
import { patterns, patternsById } from "@/lib/serial/patterns";

// ---- expected-label -> acceptable engine ids -------------------------------
const LABEL_TO_IDS = {
  Solid: ["solid"],
  "Seven of a Kind": ["seven-of-a-kind"],
  "Super Radar": ["super-radar"],
  Radar: ["radar"],
  "Super Repeater": ["super-repeater"],
  Repeater: ["repeater"],
  "Double Quad": ["double-quad"],
  Ladder: ["ladder"],
  "Broken Ladder": ["broken-ladder"],
  Binary: ["binary"],
  Trinary: ["trinary"],
  "Low Serial": ["low-serial-10", "low-serial-100", "low-serial-1000"],
  "High Serial": ["high-serial"],
  "Birthday Note": ["birthday-note"],
  Flipper: ["flipper"],
  None: [],
};

// ---- OLD (pre-fix) logic, reconstructed ------------------------------------
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
function oldBirthday(d) {
  const m = +d.slice(0, 2), day = +d.slice(2, 4), y = +d.slice(4, 8);
  if (y < 1900 || y > 2099 || m < 1 || m > 12) return false;
  let md = DAYS[m - 1];
  if (m === 2 && leap(y)) md = 29;
  return day >= 1 && day <= md;
}
function longestRun(d) {
  let best = 1, asc = 1, desc = 1;
  for (let i = 1; i < d.length; i++) {
    const s = +d[i] - +d[i - 1];
    if (s === 1) { asc++; desc = 1; }
    else if (s === -1) { desc++; asc = 1; }
    else { asc = 1; desc = 1; }
    best = Math.max(best, asc, desc);
  }
  return best;
}
const OLD_FULL_LADDER = (d) => d === "12345678" || d === "87654321";
function oldDetect(id, d) {
  if (id === "ladder") return OLD_FULL_LADDER(d);
  if (id === "broken-ladder") return !OLD_FULL_LADDER(d) && longestRun(d) >= 6;
  if (id === "birthday-note") return oldBirthday(d);
  return patternsById[id].detect(d); // every other detector is unchanged
}
const OLD_SUPPRESSED_BY = {
  radar: ["solid", "super-radar"],
  "super-radar": ["solid"],
  repeater: ["solid", "super-repeater"],
  "super-repeater": ["solid"],
  "double-quad": ["solid"],
  binary: ["solid", "super-radar", "super-repeater", "double-quad", "seven-of-a-kind"],
  trinary: ["solid"],
  flipper: ["solid"],
  "broken-ladder": ["ladder", "radar", "super-radar"],
  "low-serial-100": ["low-serial-10"],
  "low-serial-1000": ["low-serial-10", "low-serial-100"],
};
function oldTags(digits) {
  const det = patterns.map((p) => p.id).filter((id) => oldDetect(id, digits));
  const set = new Set(det);
  return det.filter((id) => !(OLD_SUPPRESSED_BY[id] ?? []).some((k) => set.has(k)));
}
const oldPass = (digits, ids) => ids.some((id) => oldTags(digits).includes(id));
const newPass = (digits, ids) => {
  const r = scoreSerial(digits);
  return ids.some((id) => patternSatisfied(r, id));
};

// ---- built-in sample: real bug serials + controls + junk -------------------
const BUILTIN = [
  // Binary suppressed under Seven of a Kind / Super Radar / Double Quad / Super Repeater (BUG -> fixed)
  ...["47444444","33303333","00006000","55525555","56666666","11811111","00000100","11111110","23333332","44441111","77777477","77777177","33331111","00003333","12121212","34343434"].map(s => [s,"Binary"]),
  ["14141414","Repeater"],              // repeater hidden under super-repeater (BUG -> fixed)
  ["80000008","Radar"], ["73333337","Radar"], // radar hidden under super-radar (BUG -> fixed via IMPLIES)
  // Birthday format misses (BUG -> fixed)
  ["16101964","Birthday Note"], ["19970802","Birthday Note"], ["13011990","Birthday Note"],
  // Ladder (BUG -> fixed)
  ["23456789","Ladder"], ["98765432","Ladder"], ["01234567","Ladder"],
  // Controls that must PASS both (no regression)
  ["12345678","Ladder"], ["12344321","Radar"], ["88888888","Solid"], ["77777771","Seven of a Kind"],
  ["12341234","Repeater"], ["11112222","Double Quad"], ["12312312","Trinary"], ["00000007","Low Serial"],
  ["71111117","Super Radar"], ["99999999","High Serial"], ["60000009","Flipper"], ["01011990","Birthday Note"],
  // Seller junk that must FAIL both (correct rejection)
  ["19902411","Birthday Note"], ["51837462","Radar"], ["24222224","Repeater"], ["09066099","Flipper"],
];

// ---- load CSV or use built-in ----------------------------------------------
function load(pathArg) {
  if (pathArg && fs.existsSync(pathArg)) {
    const rows = fs.readFileSync(pathArg, "utf8").trim().split(/\r?\n/).map((l) => l.split(","));
    const start = /serial/i.test(rows[0]?.[0] ?? "") ? 1 : 0;
    return rows.slice(start).map((r) => [r[0].trim(), r[1]?.trim()]).filter((r) => r[0] && r[1]);
  }
  console.log("No CSV supplied — using the built-in sample (real bug serials + controls + junk).\n");
  return BUILTIN;
}

const data = load(process.argv[2]);

// ---- score every row -------------------------------------------------------
const byPattern = new Map();
let bOverall = 0, aOverall = 0;
for (const [serial, label] of data) {
  const digits = (serial.match(/\d{8}/) ?? [serial])[0];
  const ids = LABEL_TO_IDS[label];
  if (!ids) { console.warn(`! unknown expected label: "${label}" (serial ${serial})`); continue; }
  const b = oldPass(digits, ids) ? 1 : 0;
  const a = newPass(digits, ids) ? 1 : 0;
  bOverall += b; aOverall += a;
  const row = byPattern.get(label) ?? { n: 0, before: 0, after: 0 };
  row.n++; row.before += b; row.after += a;
  byPattern.set(label, row);
}

// ---- report ----------------------------------------------------------------
const pct = (x, n) => (n ? ((100 * x) / n).toFixed(0) + "%" : "-");
const pad = (s, w) => String(s).padEnd(w);
console.log(pad("Pattern", 18) + pad("N", 5) + pad("Before", 9) + pad("After", 9) + "Delta");
console.log("-".repeat(50));
for (const [label, r] of [...byPattern.entries()].sort()) {
  const delta = r.after - r.before;
  console.log(
    pad(label, 18) + pad(r.n, 5) + pad(pct(r.before, r.n), 9) + pad(pct(r.after, r.n), 9) +
    (delta > 0 ? `+${delta}` : `${delta}`),
  );
}
console.log("-".repeat(50));
console.log(pad("OVERALL", 18) + pad(data.length, 5) + pad(pct(bOverall, data.length), 9) + pad(pct(aOverall, data.length), 9) + `+${aOverall - bOverall}`);
