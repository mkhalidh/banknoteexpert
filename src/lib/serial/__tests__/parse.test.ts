import { describe, it, expect } from "vitest";
import { parseSerial } from "@/lib/serial/parse";

describe("parseSerial — valid input", () => {
  it("accepts bare 8 digits (primary input)", () => {
    const r = parseSerial("12345678");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.digits).toBe("12345678");
      expect(r.prefix).toBe("");
      expect(r.suffix).toBe("");
      expect(r.isStar).toBe(false);
      expect(r.normalized).toBe("12345678");
    }
  });

  it("parses a full prefix+digits+suffix form", () => {
    const r = parseSerial("A12345678B");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.prefix).toBe("A");
      expect(r.digits).toBe("12345678");
      expect(r.suffix).toBe("B");
      expect(r.isStar).toBe(false);
    }
  });

  it("parses a two-letter prefix with a star suffix", () => {
    const r = parseSerial("AB01234567*");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.prefix).toBe("AB");
      expect(r.digits).toBe("01234567");
      expect(r.isStar).toBe(true);
      expect(r.suffix).toBe("");
      expect(r.normalized).toBe("AB01234567*");
    }
  });

  it("parses a star note with a single-letter prefix", () => {
    const r = parseSerial("L00088892*");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.prefix).toBe("L");
      expect(r.digits).toBe("00088892");
      expect(r.isStar).toBe(true);
    }
  });

  it("preserves leading zeros in the digit string", () => {
    const r = parseSerial("00000005");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.digits).toBe("00000005");
  });

  it("accepts all zeros as a syntactically valid serial", () => {
    const r = parseSerial("00000000");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.digits).toBe("00000000");
  });

  it("lower-cases input and strips surrounding whitespace", () => {
    const r = parseSerial("  a12345678b  ");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.prefix).toBe("A");
      expect(r.suffix).toBe("B");
    }
  });

  it("strips hyphens inside the input", () => {
    const r = parseSerial("A-1234-5678-B");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.normalized).toBe("A12345678B");
  });
});

describe("parseSerial — invalid input", () => {
  it("rejects an empty string", () => {
    const r = parseSerial("");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("EMPTY");
  });

  it("rejects whitespace-only input as empty", () => {
    const r = parseSerial("   ");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("EMPTY");
  });

  it("rejects 7 digits", () => {
    const r = parseSerial("1234567");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("WRONG_DIGIT_COUNT");
  });

  it("rejects 9 digits", () => {
    const r = parseSerial("123456789");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("WRONG_DIGIT_COUNT");
  });

  it("rejects letters only", () => {
    const r = parseSerial("ABCDEFGH");
    expect(r.ok).toBe(false);
  });

  it("rejects a star with no digits", () => {
    const r = parseSerial("*");
    expect(r.ok).toBe(false);
  });

  it("rejects a prefix and star with no digits", () => {
    const r = parseSerial("A*");
    expect(r.ok).toBe(false);
  });

  it("rejects illegal characters", () => {
    const r = parseSerial("12345@78");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("INVALID_CHARS");
  });

  it("rejects a three-letter prefix", () => {
    const r = parseSerial("ABC12345678");
    expect(r.ok).toBe(false);
  });

  it("returns a human-readable error message", () => {
    const r = parseSerial("1234567");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error.length).toBeGreaterThan(0);
  });
});
