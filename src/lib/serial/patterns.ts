/**
 * Typed registry of fancy-serial-number patterns and their pure detectors.
 *
 * Every detector takes the 8-digit string (as produced by parseSerial) and
 * returns a boolean. Detectors are pure: no fetch, no DOM, no Date.
 *
 * `href` routing rule (only four patterns have their own page):
 *   radar, super radar     -> /fancy-serial-numbers/radar/
 *   ladder, broken ladder  -> /fancy-serial-numbers/ladder/
 *   low serial (all tiers) -> /fancy-serial-numbers/low-serial-number/
 *   birthday note          -> /fancy-serial-numbers/birthday-note/
 *   everything else        -> /fancy-serial-numbers/#<slug>
 */

export interface PatternDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  example: string;
  detect(digits: string): boolean;
  rarityOdds: string;
  baseScore: number;
  href: string;
}

const RADAR_HREF = "/fancy-serial-numbers/radar/";
const LADDER_HREF = "/fancy-serial-numbers/ladder/";
const LOW_HREF = "/fancy-serial-numbers/low-serial-number/";
const BIRTHDAY_HREF = "/fancy-serial-numbers/birthday-note/";
const hub = (slug: string): string => `/fancy-serial-numbers/#${slug}`;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

/** Number of distinct digit characters. */
function distinctCount(digits: string): number {
  return new Set(digits).size;
}

/** Highest count of any single repeated digit. */
function maxRepeat(digits: string): number {
  const counts = new Map<string, number>();
  for (const d of digits) {
    counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  let best = 0;
  for (const n of counts.values()) {
    if (n > best) best = n;
  }
  return best;
}

/** Length of the longest run of strictly +1 or strictly -1 consecutive digits. */
function longestSequentialRun(digits: string): number {
  let best = 1;
  let asc = 1;
  let desc = 1;
  for (let i = 1; i < digits.length; i += 1) {
    const step = Number(digits[i]) - Number(digits[i - 1]);
    if (step === 1) {
      asc += 1;
      desc = 1;
    } else if (step === -1) {
      desc += 1;
      asc = 1;
    } else {
      asc = 1;
      desc = 1;
    }
    best = Math.max(best, asc, desc);
  }
  return best;
}

function isFullLadder(digits: string): boolean {
  return digits === "12345678" || digits === "87654321";
}

function numericValue(digits: string): number {
  return Number(digits);
}

const STROBO: Record<string, string> = {
  "0": "0",
  "1": "1",
  "6": "9",
  "8": "8",
  "9": "6",
};

/** True when the string reads the same rotated 180 degrees. */
function isStrobogrammatic(digits: string): boolean {
  const n = digits.length;
  for (let i = 0; i < n; i += 1) {
    const mapped = STROBO[digits[i]];
    if (mapped === undefined) return false;
    if (mapped !== digits[n - 1 - i]) return false;
  }
  return true;
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** True when 8 digits form a valid MMDDYYYY date (years 1900-2099). */
function isBirthday(digits: string): boolean {
  const month = Number(digits.slice(0, 2));
  const day = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));
  if (year < 1900 || year > 2099) return false;
  if (month < 1 || month > 12) return false;
  let maxDay = DAYS_IN_MONTH[month - 1];
  if (month === 2 && isLeapYear(year)) maxDay = 29;
  return day >= 1 && day <= maxDay;
}

// ---------------------------------------------------------------------------
// Pattern registry
// ---------------------------------------------------------------------------

export const patterns: PatternDefinition[] = [
  {
    id: "solid",
    name: "Solid",
    slug: "solid",
    description: "Every one of the eight digits is identical.",
    example: "77777777",
    detect: (d) => maxRepeat(d) === 8,
    rarityOdds: "1 in 11,111,111",
    baseScore: 92,
    href: hub("solid"),
  },
  {
    id: "seven-of-a-kind",
    name: "Seven of a Kind",
    slug: "seven-of-a-kind",
    description: "Exactly seven of the eight digits are identical.",
    example: "77777771",
    detect: (d) => maxRepeat(d) === 7,
    rarityOdds: "1 in 158,730",
    baseScore: 80,
    href: hub("seven-of-a-kind"),
  },
  {
    id: "super-radar",
    name: "Super Radar",
    slug: "super-radar",
    description: "A radar whose inner six digits are all identical.",
    example: "71111117",
    detect: (d) => {
      if (d !== d.split("").reverse().join("")) return false;
      const inner = d.slice(1, 7);
      return maxRepeat(inner) === inner.length;
    },
    rarityOdds: "1 in 1,000,000",
    baseScore: 88,
    href: RADAR_HREF,
  },
  {
    id: "radar",
    name: "Radar",
    slug: "radar",
    description: "Reads the same forwards and backwards (a palindrome).",
    example: "12344321",
    detect: (d) => d === d.split("").reverse().join(""),
    rarityOdds: "1 in 10,000",
    baseScore: 65,
    href: RADAR_HREF,
  },
  {
    id: "super-repeater",
    name: "Super Repeater",
    slug: "super-repeater",
    description: "A two-digit block repeats four times (ABABABAB).",
    example: "12121212",
    detect: (d) => {
      for (let i = 0; i < d.length; i += 1) {
        if (d[i] !== d[i % 2]) return false;
      }
      return true;
    },
    rarityOdds: "1 in 1,000,000",
    baseScore: 78,
    href: hub("super-repeater"),
  },
  {
    id: "repeater",
    name: "Repeater",
    slug: "repeater",
    description: "The first four digits repeat as the last four (ABCDABCD).",
    example: "12341234",
    detect: (d) => d.slice(0, 4) === d.slice(4, 8),
    rarityOdds: "1 in 10,000",
    baseScore: 62,
    href: hub("repeater"),
  },
  {
    id: "double-quad",
    name: "Double Quad",
    slug: "double-quad",
    description: "Four of one digit followed by four of another (AAAABBBB).",
    example: "11112222",
    detect: (d) => {
      const first = d.slice(0, 4);
      const last = d.slice(4, 8);
      return (
        maxRepeat(first) === 4 &&
        maxRepeat(last) === 4 &&
        first[0] !== last[0]
      );
    },
    rarityOdds: "1 in 1,000,000",
    baseScore: 72,
    href: hub("double-quad"),
  },
  {
    id: "ladder",
    name: "Ladder",
    slug: "ladder",
    description: "All eight digits ascend or descend in sequence.",
    example: "12345678",
    detect: (d) => isFullLadder(d),
    rarityOdds: "1 in 5,000,000",
    baseScore: 85,
    href: LADDER_HREF,
  },
  {
    id: "broken-ladder",
    name: "Broken Ladder",
    slug: "broken-ladder",
    description:
      "Contains a run of six or more sequential digits without being a full ladder.",
    example: "12345687",
    detect: (d) => {
      if (isFullLadder(d)) return false;
      return longestSequentialRun(d) >= 6;
    },
    rarityOdds: "1 in 1,000",
    baseScore: 45,
    href: LADDER_HREF,
  },
  {
    id: "binary",
    name: "Binary",
    slug: "binary",
    description: "Built from exactly two different digits.",
    example: "10101100",
    detect: (d) => distinctCount(d) === 2,
    rarityOdds: "1 in 1,500",
    baseScore: 55,
    href: hub("binary"),
  },
  {
    id: "trinary",
    name: "Trinary",
    slug: "trinary",
    description: "Built from exactly three different digits.",
    example: "12312312",
    detect: (d) => distinctCount(d) === 3,
    rarityOdds: "1 in 400",
    baseScore: 40,
    href: hub("trinary"),
  },
  {
    id: "low-serial-10",
    name: "Low Serial (under 10)",
    slug: "low-serial-10",
    description: "Serial value below 10 (00000001-00000009).",
    example: "00000007",
    detect: (d) => {
      const v = numericValue(d);
      return v >= 1 && v <= 9;
    },
    rarityOdds: "1 in ~11,000,000",
    baseScore: 82,
    href: LOW_HREF,
  },
  {
    id: "low-serial-100",
    name: "Low Serial (under 100)",
    slug: "low-serial-100",
    description: "Serial value below 100.",
    example: "00000042",
    detect: (d) => {
      const v = numericValue(d);
      return v >= 1 && v <= 99;
    },
    rarityOdds: "1 in ~1,100,000",
    baseScore: 66,
    href: LOW_HREF,
  },
  {
    id: "low-serial-1000",
    name: "Low Serial (under 1000)",
    slug: "low-serial-1000",
    description: "Serial value below 1000.",
    example: "00000500",
    detect: (d) => {
      const v = numericValue(d);
      return v >= 1 && v <= 999;
    },
    rarityOdds: "1 in ~111,000",
    baseScore: 50,
    href: LOW_HREF,
  },
  {
    id: "high-serial",
    name: "High Serial",
    slug: "high-serial",
    description: "Serial value of 99999900 or above.",
    example: "99999999",
    detect: (d) => numericValue(d) >= 99999900,
    rarityOdds: "1 in ~111,000",
    baseScore: 55,
    href: hub("high-serial"),
  },
  {
    id: "birthday-note",
    name: "Birthday Note",
    slug: "birthday-note",
    description: "The digits form a valid MMDDYYYY calendar date.",
    example: "01011990",
    detect: (d) => isBirthday(d),
    rarityOdds: "1 in ~275",
    baseScore: 45,
    href: BIRTHDAY_HREF,
  },
  {
    id: "flipper",
    name: "Flipper",
    slug: "flipper",
    description:
      "Reads the same rotated 180 degrees; only digits 0, 1, 6, 8, 9 qualify.",
    example: "60000009",
    detect: (d) => isStrobogrammatic(d),
    rarityOdds: "1 in ~15,000",
    baseScore: 60,
    href: hub("flipper"),
  },
];

/** Registry indexed by pattern id. */
export const patternsById: Record<string, PatternDefinition> = Object.fromEntries(
  patterns.map((p) => [p.id, p]),
);
