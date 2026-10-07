import { describe, it, expect } from "vitest";
import { patternsById } from "@/lib/serial/patterns";
import { scoreSerial } from "@/lib/serial/score";

/** The headline (primary) classification for a serial. */
const primary = (serial: string): string | undefined =>
  scoreSerial(serial).matches[0]?.id;

/** All shown tag ids for a serial. */
const ids = (serial: string): string[] =>
  scoreSerial(serial).matches.map((m) => m.id);

const detect = (id: string, digits: string): boolean =>
  patternsById[id].detect(digits);

// ---------------------------------------------------------------------------
// Detector unit tests — true and false cases for every NEW pattern
// ---------------------------------------------------------------------------

describe("new detectors — positive and negative", () => {
  it("six-of-a-kind requires exactly six and three distinct digits", () => {
    expect(detect("six-of-a-kind", "66666678")).toBe(true);
    expect(detect("six-of-a-kind", "66666677")).toBe(false); // two distinct
    expect(detect("six-of-a-kind", "00000011")).toBe(false); // two distinct
    expect(detect("six-of-a-kind", "66666667")).toBe(false); // seven of a kind
  });

  it("five-of-a-kind requires a max repeat of exactly five", () => {
    expect(detect("five-of-a-kind", "55555123")).toBe(true);
    expect(detect("five-of-a-kind", "55551234")).toBe(false); // max repeat four
    expect(detect("five-of-a-kind", "55555523")).toBe(false); // six of a kind
  });

  it("true-binary-radar: all 0/1 and a palindrome", () => {
    expect(detect("true-binary-radar", "11100111")).toBe(true);
    expect(detect("true-binary-radar", "11101110")).toBe(false); // not a palindrome
    expect(detect("true-binary-radar", "12344321")).toBe(false); // not all 0/1
  });

  it("true-binary-repeater: all 0/1 and first four = last four", () => {
    expect(detect("true-binary-repeater", "11101110")).toBe(true);
    expect(detect("true-binary-repeater", "11001100")).toBe(true);
    expect(detect("true-binary-repeater", "11100111")).toBe(false); // not a repeater
    expect(detect("true-binary-repeater", "12341234")).toBe(false); // not all 0/1
  });

  it("near-true-binary: exactly one non-binary digit", () => {
    expect(detect("near-true-binary", "10001102")).toBe(true);
    expect(detect("near-true-binary", "11001010")).toBe(false); // zero non-binary
    expect(detect("near-true-binary", "10002102")).toBe(false); // two non-binary
  });

  it("true-binary: every digit is 0 or 1", () => {
    expect(detect("true-binary", "11001010")).toBe(true);
    expect(detect("true-binary", "11001012")).toBe(false);
  });

  it("radar-repeater: ABBA block repeated", () => {
    expect(detect("radar-repeater", "12211221")).toBe(true);
    expect(detect("radar-repeater", "25522552")).toBe(true);
    expect(detect("radar-repeater", "11221122")).toBe(false); // AABB, not ABBA
    expect(detect("radar-repeater", "12341234")).toBe(false); // ladder block
  });

  it("double-binary-repeater: AABB block repeated", () => {
    expect(detect("double-binary-repeater", "11221122")).toBe(true);
    expect(detect("double-binary-repeater", "12211221")).toBe(false); // ABBA
    expect(detect("double-binary-repeater", "11111111")).toBe(false); // A==B
  });

  it("ladder-repeater: four-step ladder block repeated, up or down", () => {
    expect(detect("ladder-repeater", "12341234")).toBe(true);
    expect(detect("ladder-repeater", "43214321")).toBe(true);
    expect(detect("ladder-repeater", "12431243")).toBe(false); // not sequential
    expect(detect("ladder-repeater", "12211221")).toBe(false); // radar block
  });

  it("trinary-repeater: ABCABCAB with three distinct digits", () => {
    expect(detect("trinary-repeater", "12312312")).toBe(true);
    expect(detect("trinary-repeater", "12121212")).toBe(false); // only two digits
    expect(detect("trinary-repeater", "11211211")).toBe(false); // A==B
  });

  it("bookends-repeater: ABABABAB with two distinct digits", () => {
    expect(detect("bookends-repeater", "12121212")).toBe(true);
    expect(detect("bookends-repeater", "11111111")).toBe(false); // A==B (solid)
    expect(detect("bookends-repeater", "12312312")).toBe(false);
  });

  it("binary-repeater: two distinct digits and first four = last four", () => {
    expect(detect("binary-repeater", "12111211")).toBe(true);
    expect(detect("binary-repeater", "12131213")).toBe(false); // three distinct
    expect(detect("binary-repeater", "12121213")).toBe(false); // not a repeater
  });

  it("binary-radar: two-distinct palindrome", () => {
    expect(detect("binary-radar", "11222211")).toBe(true);
    expect(detect("binary-radar", "11233211")).toBe(false); // three distinct
    expect(detect("binary-radar", "11221122")).toBe(false); // not a palindrome
  });

  it("bookends-radar: palindrome opening on a repeated pair", () => {
    expect(detect("bookends-radar", "11233211")).toBe(true);
    expect(detect("bookends-radar", "12344321")).toBe(false); // opens 1,2
    expect(detect("bookends-radar", "11221121")).toBe(false); // not a palindrome
  });

  it("palindrome-radar: any 8-digit palindrome", () => {
    expect(detect("palindrome-radar", "12344321")).toBe(true);
    expect(detect("palindrome-radar", "12345678")).toBe(false);
  });

  it("binary-four-pairs: AABBCCDD using two distinct digits", () => {
    expect(detect("binary-four-pairs", "11331111")).toBe(true);
    expect(detect("binary-four-pairs", "11223344")).toBe(false); // four distinct
    expect(detect("binary-four-pairs", "11311111")).toBe(false); // not four pairs
  });

  it("ladder-four-pairs: AABBCCDD climbing by one", () => {
    expect(detect("ladder-four-pairs", "11223344")).toBe(true);
    expect(detect("ladder-four-pairs", "11335577")).toBe(false); // +2 steps
    expect(detect("ladder-four-pairs", "44332211")).toBe(false); // descending
  });

  it("bookends-four-pairs: AABBCCDD with first pair = last pair", () => {
    expect(detect("bookends-four-pairs", "11334411")).toBe(true);
    expect(detect("bookends-four-pairs", "11557744")).toBe(false); // 1 != 4
    expect(detect("bookends-four-pairs", "11223311")).toBe(true);
  });

  it("four-pairs: any AABBCCDD", () => {
    expect(detect("four-pairs", "11557744")).toBe(true);
    expect(detect("four-pairs", "11557745")).toBe(false); // last pair broken
  });

  it("bookends-binary: first two = last two AND two distinct digits", () => {
    expect(detect("bookends-binary", "79997779")).toBe(true);
    expect(detect("bookends-binary", "12456712")).toBe(false); // many digits
    expect(detect("bookends-binary", "79997770")).toBe(false); // ends 70 != 79
  });

  it("bookends: first two digits = last two digits", () => {
    expect(detect("bookends", "12456712")).toBe(true);
    expect(detect("bookends", "12456721")).toBe(false);
  });

  it("near-radar-repeater: one digit from a radar repeater", () => {
    expect(detect("near-radar-repeater", "15511557")).toBe(true);
    expect(detect("near-radar-repeater", "15511551")).toBe(false); // already one
  });

  it("near-binary-radar: one digit from a binary radar", () => {
    expect(detect("near-binary-radar", "32122121")).toBe(true);
    expect(detect("near-binary-radar", "12122121")).toBe(false); // already one
  });

  it("super-high-serial: value >= 99,000,000", () => {
    expect(detect("super-high-serial", "99000000")).toBe(true);
    expect(detect("super-high-serial", "99123457")).toBe(true);
    expect(detect("super-high-serial", "98999999")).toBe(false);
  });

  it("high-serial threshold stays at 96,000,000", () => {
    expect(detect("high-serial", "96000000")).toBe(true);
    expect(detect("high-serial", "95999999")).toBe(false);
    expect(detect("high-serial", "99200000")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Primary classification — each example resolves to EXACTLY its pattern
// ---------------------------------------------------------------------------

describe("primary classification — detection order, first match wins", () => {
  const cases: Array<[string, string]> = [
    ["66666678", "six-of-a-kind"],
    ["55555123", "five-of-a-kind"],
    ["11100111", "true-binary-radar"],
    ["11101110", "true-binary-repeater"],
    ["10001102", "near-true-binary"],
    ["11001010", "true-binary"],
    ["12211221", "radar-repeater"],
    ["25522552", "radar-repeater"],
    ["11221122", "double-binary-repeater"],
    ["12341234", "ladder-repeater"],
    ["43214321", "ladder-repeater"],
    ["12312312", "trinary-repeater"],
    ["12121212", "bookends-repeater"],
    ["12111211", "binary-repeater"],
    ["12871287", "repeater"],
    ["71111117", "super-radar"],
    ["11222211", "binary-radar"],
    ["11233211", "bookends-radar"],
    ["12344321", "palindrome-radar"],
    ["11112222", "double-quad"],
    ["11331111", "binary-four-pairs"],
    ["11223344", "ladder-four-pairs"],
    ["11334411", "bookends-four-pairs"],
    ["11557744", "four-pairs"],
    ["79997779", "bookends-binary"],
    ["12456712", "bookends"],
    ["15511557", "near-radar-repeater"],
    ["32122121", "near-binary-radar"],
    ["12345678", "ladder"],
    ["12345687", "broken-ladder"],
    ["29992922", "binary"],
    ["01011990", "trinary"],
    ["61800819", "flipper"],
    ["07041976", "birthday-note"],
    ["99123457", "super-high-serial"],
    ["96123457", "high-serial"],
  ];

  for (const [serial, id] of cases) {
    it(`${serial} -> ${id}`, () => {
      expect(primary(serial)).toBe(id);
    });
  }
});

// ---------------------------------------------------------------------------
// Deliberate classification decisions (must NOT be "fixed")
// ---------------------------------------------------------------------------

describe("deliberate classification decisions", () => {
  it("25522552 is a radar repeater (its block 2552 is a radar)", () => {
    expect(primary("25522552")).toBe("radar-repeater");
    expect(ids("25522552")).not.toContain("binary-repeater");
  });

  it("12211221 is a radar repeater, not a binary radar", () => {
    expect(primary("12211221")).toBe("radar-repeater");
    expect(ids("12211221")).not.toContain("binary-radar");
  });

  it("11111111 is Solid, never True Binary", () => {
    expect(primary("11111111")).toBe("solid");
    expect(ids("11111111")).not.toContain("true-binary");
    expect(ids("11111111")).not.toContain("true-binary-repeater");
  });

  it("12122012 is Bookends, not a Birthday note", () => {
    expect(primary("12122012")).toBe("bookends");
  });

  it("00000011 headlines as True Binary, not Low Serial", () => {
    // The headline is True Binary; the low-serial value tier may still ride along
    // as a secondary fact, but it is never the primary classification.
    expect(primary("00000011")).toBe("true-binary");
    expect(ids("00000011")[0]).not.toBe("low-serial-100");
  });
});

// ---------------------------------------------------------------------------
// Scores fit the existing score->label scale
// ---------------------------------------------------------------------------

describe("new pattern scores land on the right tier", () => {
  it("true-binary families are Exceptional", () => {
    expect(scoreSerial("11100111").tier).toBe("Exceptional"); // 99
    expect(scoreSerial("11101110").tier).toBe("Exceptional"); // 99
    expect(scoreSerial("11001010").tier).toBe("Exceptional"); // 98
    expect(scoreSerial("12341234").tier).toBe("Exceptional"); // ladder-repeater 95
  });

  it("near-true-binary scores its base of 55 as the primary", () => {
    const r = scoreSerial("10001102");
    expect(r.matches[0]?.id).toBe("near-true-binary");
    expect(r.matches[0]?.points).toBe(55);
  });

  it("super-high-serial outranks high-serial", () => {
    expect(scoreSerial("99123457").matches[0]?.points).toBe(45);
    expect(scoreSerial("96123457").matches[0]?.points).toBe(30);
  });

  it("bookends is a low-but-nonzero Rare note (40)", () => {
    expect(scoreSerial("12456712").matches[0]?.points).toBe(40);
  });
});
