import { describe, it, expect } from "vitest";
import { getTwoDollarSeries, twoDollarSeries } from "@/data/two-dollar-series";
import { parseSerial } from "@/lib/serial/parse";
import { scoreSerial, patternSatisfied } from "@/lib/serial/score";

describe("two-dollar series lookup", () => {
  it("resolves 1976 as a green-seal Federal Reserve Note", () => {
    const row = getTwoDollarSeries("1976");
    expect(row?.sealColor).toBe("green");
    expect(row?.noteType).toBe("Federal Reserve Note");
  });

  it("resolves 1928 as a red-seal Legal Tender Note", () => {
    const row = getTwoDollarSeries("1928");
    expect(row?.sealColor).toBe("red");
    expect(row?.noteType).toBe("Legal Tender Note");
  });

  it("resolves a lettered red-seal variety (1963A)", () => {
    const row = getTwoDollarSeries("1963A");
    expect(row?.sealColor).toBe("red");
    expect(row?.noteType).toBe("Legal Tender Note");
  });

  it("resolves a modern green-seal series (2017A)", () => {
    const row = getTwoDollarSeries("2017A");
    expect(row?.sealColor).toBe("green");
    expect(row?.noteType).toBe("Federal Reserve Note");
  });

  it("returns undefined for an unknown series", () => {
    expect(getTwoDollarSeries("1999")).toBeUndefined();
  });

  it("marks the switch from red to green seals at 1976", () => {
    expect(getTwoDollarSeries("1963A")?.sealColor).toBe("red");
    expect(getTwoDollarSeries("1976")?.sealColor).toBe("green");
  });

  it("carries a non-empty source on every row and no dollar figures", () => {
    for (const row of twoDollarSeries) {
      expect(row.source.length).toBeGreaterThan(0);
      expect(row.source).not.toMatch(/\$\d/);
    }
  });
});

describe("two-dollar serial engine reuse", () => {
  it("detects a star note on a $2 serial", () => {
    const parsed = parseSerial("A12345678*");
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.isStar).toBe(true);
  });

  it("flags the 1976 repeater 12121212 as a bookends repeater", () => {
    const result = scoreSerial("12121212");
    expect(result.matches[0]?.id).toBe("bookends-repeater");
    // The repeater claim is still satisfied for lookup/value purposes.
    expect(patternSatisfied(result, "repeater")).toBe(true);
  });

  it("flags the repeating block 12341234 as a ladder repeater", () => {
    const result = scoreSerial("12341234");
    expect(result.matches[0]?.id).toBe("ladder-repeater");
    expect(patternSatisfied(result, "repeater")).toBe(true);
  });

  it("flags a low serial number on a $2 note", () => {
    expect(scoreSerial("00000045").matches.map((m) => m.id)).toContain(
      "low-serial-100",
    );
  });

  it("returns a parse error for an invalid serial, never a blank", () => {
    const parsed = parseSerial("12");
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) expect(parsed.error.length).toBeGreaterThan(0);
  });
});
