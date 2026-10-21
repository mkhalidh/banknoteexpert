/**
 * Typed registry of fancy-serial-number patterns and their pure detectors.
 *
 * Every detector takes the 8-digit string (as produced by parseSerial) and
 * returns a boolean. Detectors are pure: no fetch, no DOM, no Date.
 *
 * ORDER IS SIGNIFICANT. The array below is listed rarest/most-specific first and
 * most-generic last. scoreSerial() picks the PRIMARY classification as the first
 * detected pattern in this order (after same-axis supersession), so a serial is
 * never reported as a generic pattern when a rarer one also matches. Many serials
 * match several patterns at once; the registry order is the single source of
 * truth for which one wins.
 *
 * `href` routing rule (named pattern families have their own pages):
 *   radar family           -> /fancy-serial-numbers/radar/
 *   ladder family          -> /fancy-serial-numbers/ladder/
 *   low serial (all tiers)  -> /fancy-serial-numbers/low-serial-number/
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

/** True when the string reads the same forwards and backwards. */
function isPalindrome(digits: string): boolean {
  return digits === digits.split("").reverse().join("");
}

/** True when the first four digits equal the last four (ABCDABCD shape). */
function isFourRepeat(digits: string): boolean {
  return digits.slice(0, 4) === digits.slice(4, 8);
}

/** Every digit is 0 or 1. */
function isAllBinaryDigits(digits: string): boolean {
  return /^[01]{8}$/.test(digits);
}

/** How many digits are something other than 0 or 1. */
function nonBinaryDigitCount(digits: string): number {
  let n = 0;
  for (const d of digits) if (d !== "0" && d !== "1") n += 1;
  return n;
}

/** A 4-char block is a radar (ABBA): first=last, middle pair equal. */
function blockIsRadar(b: string): boolean {
  return b[0] === b[3] && b[1] === b[2];
}

/** A 4-char block is AABB with A != B. */
function blockIsDoubleBinary(b: string): boolean {
  return b[0] === b[1] && b[2] === b[3] && b[0] !== b[2];
}

/** A 4-char block is ABCD, each digit exactly +1 (or exactly -1) from the last. */
function blockIsLadder(b: string): boolean {
  const steps = [
    Number(b[1]) - Number(b[0]),
    Number(b[2]) - Number(b[1]),
    Number(b[3]) - Number(b[2]),
  ];
  return steps.every((s) => s === 1) || steps.every((s) => s === -1);
}

/** ABCABCAB with A, B, C pairwise distinct (period-3 repeat). */
function isTrinaryRepeater(digits: string): boolean {
  for (let i = 0; i < digits.length; i += 1) {
    if (digits[i] !== digits[i % 3]) return false;
  }
  const a = digits[0];
  const b = digits[1];
  const c = digits[2];
  return a !== b && b !== c && a !== c;
}

/** ABABABAB with A != B (period-2 repeat, two distinct digits). */
function isBookendsRepeater(digits: string): boolean {
  for (let i = 0; i < digits.length; i += 1) {
    if (digits[i] !== digits[i % 2]) return false;
  }
  return digits[0] !== digits[1];
}

/** Four equal adjacent pairs: AABBCCDD (each of the four pairs is a double). */
function isFourPairs(digits: string): boolean {
  return (
    digits[0] === digits[1] &&
    digits[2] === digits[3] &&
    digits[4] === digits[5] &&
    digits[6] === digits[7]
  );
}

/** The four pair-digits of an AABBCCDD serial, e.g. "11334411" -> ["1","3","4","1"]. */
function pairDigits(digits: string): string[] {
  return [digits[0], digits[2], digits[4], digits[6]];
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

/**
 * A full ladder is any eight-digit strictly +1 or -1 run, regardless of start:
 * 01234567, 12345678, 23456789, 76543210, 87654321, 98765432, etc. This reuses
 * longestSequentialRun rather than hard-coding the two canonical strings, so
 * true ladders like 23456789 are no longer misreported as broken ladders.
 */
function isFullLadder(digits: string): boolean {
  return longestSequentialRun(digits) === 8;
}

/** A radar built from exactly two distinct digits (binary palindrome). */
function isBinaryRadar(digits: string): boolean {
  return distinctCount(digits) === 2 && isPalindrome(digits);
}

/** A repeater (ABCDABCD) whose 4-digit block is itself a radar (ABBA). */
function isRadarRepeater(digits: string): boolean {
  return isFourRepeat(digits) && blockIsRadar(digits.slice(0, 4));
}

/**
 * True when exactly one single-digit change turns `digits` into a string that
 * satisfies `target`, and `digits` does not already satisfy it. Brute force over
 * the 8 positions x 10 digits is pure and cheap, and keeps the "Hamming distance
 * exactly 1" definitions honest rather than approximated.
 */
function isHammingOneFrom(
  digits: string,
  target: (s: string) => boolean,
): boolean {
  if (target(digits)) return false;
  for (let i = 0; i < digits.length; i += 1) {
    for (let d = 0; d <= 9; d += 1) {
      const c = String(d);
      if (c === digits[i]) continue;
      const candidate = digits.slice(0, i) + c + digits.slice(i + 1);
      if (target(candidate)) return true;
    }
  }
  return false;
}

/** Min Hamming distance to SOME all-0/1 serial is nonBinaryDigitCount; ==1 here. */
function isNearTrueBinary(digits: string): boolean {
  return nonBinaryDigitCount(digits) === 1;
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

/** True when month/day/year form a real calendar date in 1900-2099. */
function validDate(month: number, day: number, year: number): boolean {
  if (year < 1900 || year > 2099) return false;
  if (month < 1 || month > 12) return false;
  let maxDay = DAYS_IN_MONTH[month - 1];
  if (month === 2 && isLeapYear(year)) maxDay = 29;
  return day >= 1 && day <= maxDay;
}

/**
 * True when the 8 digits spell a valid date in ANY of the three common
 * orderings: MMDDYYYY, DDMMYYYY or YYYYMMDD (year 1900-2099). Collectors write
 * birthdays in all three, so MMDDYYYY-only missed valid dates such as 16101964
 * (16 Oct 1964, DDMMYYYY) and 19970802 (2 Aug 1997, YYYYMMDD).
 */
function isBirthday(digits: string): boolean {
  const n = (a: number, b: number): number => Number(digits.slice(a, b));
  return (
    validDate(n(0, 2), n(2, 4), n(4, 8)) || // MMDDYYYY
    validDate(n(2, 4), n(0, 2), n(4, 8)) || // DDMMYYYY
    validDate(n(4, 6), n(6, 8), n(0, 4)) //   YYYYMMDD
  );
}

// ---------------------------------------------------------------------------
// Pattern registry (ORDER IS THE DETECTION PRIORITY — rarest/most specific first)
// ---------------------------------------------------------------------------

export const patterns: PatternDefinition[] = [
  // --- repetition: whole-serial repeats -------------------------------------
  {
    id: "solid",
    name: "Solid",
    slug: "solid",
    description: "Every one of the eight digits is identical.",
    example: "77777777",
    detect: (d) => maxRepeat(d) === 8,
    rarityOdds: "1 in 10,000,000",
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
    rarityOdds: "1 in 138,889",
    baseScore: 80,
    href: hub("seven-of-a-kind"),
  },
  {
    id: "six-of-a-kind",
    name: "Six of a Kind",
    slug: "six-of-a-kind",
    description:
      "Exactly one digit appears six times; the other two positions hold two further, different digits.",
    example: "66666678",
    // distinctCount === 3 keeps a two-distinct-digit serial such as 00000011
    // out of this bucket (that is True Binary, per the taxonomy), matching the
    // 66666678 example where the two leftovers are themselves different.
    detect: (d) => maxRepeat(d) === 6 && distinctCount(d) === 3,
    // 10 * C(8,6) * 9 * 8 / 10^8 = 20,160 / 10^8. The two leftover positions must
    // be two DIFFERENT digits (distinctCount === 3), which is stricter than the
    // task's looser 1-in-4,409 figure (that one allowed the pair to be equal and
    // so included serials like 00000011, which the taxonomy classes as True Binary).
    rarityOdds: "1 in 4,960",
    baseScore: 85,
    href: hub("six-of-a-kind"),
  },
  {
    id: "five-of-a-kind",
    name: "Five of a Kind",
    slug: "five-of-a-kind",
    description: "Exactly one digit appears five times across the serial.",
    example: "55555123",
    detect: (d) => maxRepeat(d) === 5,
    rarityOdds: "1 in 245",
    baseScore: 65,
    href: hub("five-of-a-kind"),
  },

  // --- true binary (every digit 0 or 1) -------------------------------------
  {
    id: "true-binary-radar",
    name: "True Binary Radar",
    slug: "true-binary-radar",
    description: "Every digit is 0 or 1 and the serial is a palindrome.",
    example: "11100111",
    detect: (d) => isAllBinaryDigits(d) && isPalindrome(d),
    rarityOdds: "1 in 7,100,000",
    baseScore: 99,
    href: RADAR_HREF,
  },
  {
    id: "true-binary-repeater",
    name: "True Binary Repeater",
    slug: "true-binary-repeater",
    description: "Every digit is 0 or 1 and the first four digits repeat as the last four.",
    example: "11101110",
    detect: (d) => isAllBinaryDigits(d) && isFourRepeat(d),
    rarityOdds: "1 in 7,100,000",
    baseScore: 99,
    href: hub("true-binary-repeater"),
  },
  {
    id: "near-true-binary",
    name: "Near True Binary",
    slug: "near-true-binary",
    description: "One digit away from an all-0/1 serial (a single non-binary digit).",
    example: "10001102",
    detect: (d) => isNearTrueBinary(d),
    rarityOdds: "1 in 5,500",
    baseScore: 55,
    href: hub("near-true-binary"),
  },
  {
    id: "true-binary",
    name: "True Binary",
    slug: "true-binary",
    description: "Every digit is 0 or 1.",
    example: "11001010",
    detect: (d) => isAllBinaryDigits(d),
    rarityOdds: "1 in 393,701",
    baseScore: 98,
    href: hub("true-binary"),
  },

  // --- repeater family (first four = last four) -----------------------------
  {
    id: "radar-repeater",
    name: "Radar Repeater",
    slug: "radar-repeater",
    description: "The first four digits repeat as the last four, and that block is a radar (ABBA).",
    example: "12211221",
    detect: (d) => isRadarRepeater(d),
    rarityOdds: "1 in 1,100,000",
    baseScore: 90,
    href: "/fancy-serial-numbers/radar-repeater/",
  },
  {
    id: "double-binary-repeater",
    name: "Double Binary Repeater",
    slug: "double-binary-repeater",
    description: "The first four digits repeat as the last four, and that block is AABB.",
    example: "11221122",
    detect: (d) => isFourRepeat(d) && blockIsDoubleBinary(d.slice(0, 4)),
    rarityOdds: "1 in 1,100,000",
    baseScore: 85,
    href: hub("double-binary-repeater"),
  },
  {
    id: "ladder-repeater",
    name: "Ladder Repeater",
    slug: "ladder-repeater",
    description: "The first four digits repeat as the last four, and that block is a four-step ladder.",
    example: "12341234",
    detect: (d) => isFourRepeat(d) && blockIsLadder(d.slice(0, 4)),
    rarityOdds: "1 in 7,100,000",
    baseScore: 95,
    href: LADDER_HREF,
  },
  {
    id: "trinary-repeater",
    name: "Trinary Repeater",
    slug: "trinary-repeater",
    description: "A three-digit cycle ABCABCAB using three distinct digits.",
    example: "12312312",
    detect: (d) => isTrinaryRepeater(d),
    rarityOdds: "1 in 138,889",
    baseScore: 75,
    href: hub("trinary-repeater"),
  },
  {
    id: "bookends-repeater",
    name: "Bookends Repeater",
    slug: "bookends-repeater",
    description: "A two-digit block repeats four times (ABABABAB) with two distinct digits.",
    example: "12121212",
    detect: (d) => isBookendsRepeater(d),
    rarityOdds: "1 in 1,100,000",
    baseScore: 85,
    href: hub("bookends-repeater"),
  },
  {
    id: "binary-repeater",
    name: "Binary Repeater",
    slug: "binary-repeater",
    description:
      "Exactly two distinct digits, with the first four digits repeating as the last four.",
    example: "10011001",
    detect: (d) => distinctCount(d) === 2 && isFourRepeat(d),
    rarityOdds: "1 in 140,000",
    baseScore: 70,
    href: hub("binary-repeater"),
  },
  {
    // Legacy id, kept for back-compat. ABABABAB; superseded by bookends-repeater.
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
    example: "24682468",
    detect: (d) => isFourRepeat(d),
    rarityOdds: "1 in 10,000",
    baseScore: 62,
    href: hub("repeater"),
  },

  // --- symmetry / radar family (palindromes) --------------------------------
  {
    id: "super-radar",
    name: "Super Radar",
    slug: "super-radar",
    description: "A radar whose inner six digits are all identical.",
    example: "71111117",
    detect: (d) => {
      if (!isPalindrome(d)) return false;
      const inner = d.slice(1, 7);
      return maxRepeat(inner) === inner.length;
    },
    rarityOdds: "1 in 1,111,111",
    baseScore: 88,
    href: "/fancy-serial-numbers/super-radar/",
  },
  {
    id: "binary-radar",
    name: "Binary Radar",
    slug: "binary-radar",
    description: "A palindrome built from exactly two distinct digits.",
    example: "11222211",
    detect: (d) => isBinaryRadar(d),
    rarityOdds: "1 in 158,730",
    baseScore: 75,
    href: RADAR_HREF,
  },
  {
    id: "bookends-radar",
    name: "Bookends Radar",
    slug: "bookends-radar",
    description: "A palindrome that opens and closes on a repeated pair (AABBCCAA shape).",
    example: "11233211",
    detect: (d) => isPalindrome(d) && d[0] === d[1],
    rarityOdds: "1 in 100,000",
    baseScore: 80,
    href: RADAR_HREF,
  },
  {
    id: "palindrome-radar",
    name: "Palindrome Radar",
    slug: "palindrome-radar",
    description: "Reads the same forwards and backwards (a palindrome).",
    example: "12344321",
    detect: (d) => isPalindrome(d),
    rarityOdds: "1 in 10,000",
    baseScore: 65,
    href: RADAR_HREF,
  },
  {
    id: "radar",
    name: "Radar",
    slug: "radar",
    description: "Reads the same forwards and backwards (a palindrome).",
    example: "12344321",
    detect: (d) => isPalindrome(d),
    rarityOdds: "1 in 10,000",
    baseScore: 65,
    href: RADAR_HREF,
  },

  // --- repeated-pair family (AABBCCDD) --------------------------------------
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
    id: "binary-four-pairs",
    name: "Binary Four Pairs",
    slug: "binary-four-pairs",
    description: "Four adjacent pairs (AABBCCDD) built from exactly two distinct digits.",
    example: "11331111",
    detect: (d) => isFourPairs(d) && distinctCount(d) === 2,
    rarityOdds: "1 in 140,000",
    baseScore: 70,
    href: hub("binary-four-pairs"),
  },
  {
    id: "ladder-four-pairs",
    name: "Ladder Four Pairs",
    slug: "ladder-four-pairs",
    description: "Four adjacent pairs that climb by one each time (AABBCCDD, B=A+1, C=B+1, D=C+1).",
    example: "11223344",
    detect: (d) => {
      if (!isFourPairs(d)) return false;
      const [a, b, c, e] = pairDigits(d).map(Number);
      return b === a + 1 && c === b + 1 && e === c + 1;
    },
    rarityOdds: "1 in 1,666,667",
    baseScore: 80,
    href: hub("ladder-four-pairs"),
  },
  {
    id: "four-pairs",
    name: "Four Pairs (Quad Doubles)",
    slug: "four-pairs",
    description: "Four adjacent repeated pairs (AABBCCDD), known to collectors as Quad Doubles.",
    example: "11557744",
    detect: (d) => isFourPairs(d),
    rarityOdds: "1 in 10,000",
    baseScore: 70,
    href: hub("four-pairs"),
  },

  // --- bookends (first two digits = last two) -------------------------------
  {
    id: "bookends-binary",
    name: "Bookends Binary",
    slug: "bookends-binary",
    description:
      "The first two digits match the last two, and the whole serial uses only two distinct digits.",
    example: "79997779",
    detect: (d) => d.slice(0, 2) === d.slice(6, 8) && distinctCount(d) === 2,
    rarityOdds: "1 in 5,000",
    baseScore: 45,
    href: hub("bookends-binary"),
  },
  {
    id: "bookends",
    name: "Bookends",
    slug: "bookends",
    description: "The first two digits match the last two.",
    example: "12456712",
    detect: (d) => d.slice(0, 2) === d.slice(6, 8),
    rarityOdds: "1 in 100",
    baseScore: 40,
    href: hub("bookends"),
  },

  // --- near-miss families (Hamming distance 1) ------------------------------
  // ORDER NOTE: the task's numbered list places Near Binary Radar before Near
  // Radar Repeater, but every radar repeater (ABBA|ABBA) is itself a two-distinct
  // palindrome — i.e. a binary radar — so a serial one step from a radar repeater
  // is always one step from a binary radar too. Under that literal order Near
  // Radar Repeater could never win. Its own governing rule (rarest/most specific
  // first) resolves the conflict: Near Radar Repeater (1 in 15,400) is rarer and
  // more specific than Near Binary Radar (1 in 1,900), so it is checked first and
  // both remain reachable.
  {
    id: "near-radar-repeater",
    name: "Near Radar Repeater",
    slug: "near-radar-repeater",
    description: "One digit away from a radar repeater.",
    example: "15511557",
    detect: (d) => isHammingOneFrom(d, isRadarRepeater),
    rarityOdds: "1 in 15,400",
    baseScore: 60,
    href: hub("near-radar-repeater"),
  },
  {
    id: "near-binary-radar",
    name: "Near Binary Radar",
    slug: "near-binary-radar",
    description: "One digit away from a binary radar.",
    example: "32122121",
    detect: (d) => isHammingOneFrom(d, isBinaryRadar),
    rarityOdds: "1 in 1,900",
    baseScore: 50,
    href: hub("near-binary-radar"),
  },

  // --- sequence family (ladders) --------------------------------------------
  {
    id: "ladder",
    name: "Ladder",
    slug: "ladder",
    description: "All eight digits ascend or descend in sequence.",
    example: "12345678",
    detect: (d) => isFullLadder(d),
    rarityOdds: "1 in 16,666,667",
    baseScore: 85,
    href: LADDER_HREF,
  },
  {
    // Glossary note: the market loosely calls any serial with eight unique
    // digits in scrambled order a "broken ladder". We intentionally do NOT
    // detect that (≈1.8% of all notes, not collectible); we reserve the term
    // for a genuine near-ladder (a 6-7 digit sequential run).
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
    rarityOdds: "1 in 35,286",
    baseScore: 45,
    href: "/fancy-serial-numbers/broken-ladder/",
  },

  // --- generic digit-count families -----------------------------------------
  {
    id: "binary",
    name: "Binary",
    slug: "binary",
    description: "Built from exactly two different digits.",
    example: "10101100",
    detect: (d) => distinctCount(d) === 2,
    rarityOdds: "1 in 8,749",
    baseScore: 55,
    href: "/fancy-serial-numbers/binary/",
  },
  {
    id: "trinary",
    name: "Trinary",
    slug: "trinary",
    description: "Built from exactly three different digits.",
    example: "11223312",
    detect: (d) => distinctCount(d) === 3,
    rarityOdds: "1 in 144",
    baseScore: 40,
    href: hub("trinary"),
  },
  {
    // Glossary note: sellers call any serial made only of 0/1/6/8/9 a "soft
    // flipper". We intentionally require strict 180-degree rotational symmetry
    // (strobogrammatic), so loose "flipper" claims correctly do not match.
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

  // --- date and value tiers (most generic) ----------------------------------
  {
    id: "birthday-note",
    name: "Birthday Note",
    slug: "birthday-note",
    description: "The digits form a valid MMDDYYYY, DDMMYYYY or YYYYMMDD calendar date.",
    example: "01011990",
    detect: (d) => isBirthday(d),
    rarityOdds: "1 in ~275",
    baseScore: 45,
    href: BIRTHDAY_HREF,
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
  // ORDER NOTE: the task lists Super High Serial last ("below" High Serial), but
  // since every super-high serial (>= 99,000,000) is also a high serial
  // (>= 96,000,000), a literal "High then Super-High" order would let High Serial
  // claim every note first and Super High could never win. The governing
  // rarest-first rule resolves it: Super High (1 in ~500, reachable only on the
  // $50/$100 blocks that run to 99,200,000) is checked before plain High Serial
  // (1 in 25). The High Serial threshold itself is unchanged at 96,000,000.
  {
    id: "super-high-serial",
    name: "Super High Serial",
    slug: "super-high-serial",
    description:
      "Serial value of 99,000,000 or above. Only $50 and $100 print blocks reach this high (they run to 99,200,000); $1 to $20 blocks top out at 96,000,000, so a note this high is a $50 or $100.",
    example: "99100000",
    detect: (d) => numericValue(d) >= 99000000,
    rarityOdds: "1 in ~500",
    baseScore: 45,
    href: hub("super-high-serial"),
  },
  {
    id: "high-serial",
    name: "High Serial",
    slug: "high-serial",
    description:
      "Serial value of 96,000,000 or above. That is the top of a modern $1 to $20 Federal Reserve print block; $50 and $100 blocks run a little higher, to 99,200,000.",
    example: "96500000",
    detect: (d) => numericValue(d) >= 96000000,
    rarityOdds: "1 in 25",
    baseScore: 30,
    href: hub("high-serial"),
  },
];

/** Registry indexed by pattern id. */
export const patternsById: Record<string, PatternDefinition> = Object.fromEntries(
  patterns.map((p) => [p.id, p]),
);
