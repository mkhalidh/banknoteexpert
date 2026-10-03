import { describe, it, expect } from "vitest";
import { scoreSerial } from "@/lib/serial/score";
import {
  estimateValue,
  valueCell,
  ENGINE_TO_VALUE_PATTERN,
} from "@/lib/serial/value";
import type { PatternMatch } from "@/lib/serial/score";

function match(id: string): PatternMatch {
  return {
    id,
    name: id,
    slug: id,
    href: `/fancy-serial-numbers/#${id}`,
    description: "",
    rarityOdds: "",
    points: 0,
  };
}

describe("ENGINE_TO_VALUE_PATTERN mapping", () => {
  it("maps genuine equivalents", () => {
    expect(ENGINE_TO_VALUE_PATTERN["solid"]).toBe("solid");
    expect(ENGINE_TO_VALUE_PATTERN["radar"]).toBe("radar");
    expect(ENGINE_TO_VALUE_PATTERN["super-radar"]).toBe("super-radar");
    expect(ENGINE_TO_VALUE_PATTERN["repeater"]).toBe("repeater");
    expect(ENGINE_TO_VALUE_PATTERN["binary"]).toBe("binary");
    expect(ENGINE_TO_VALUE_PATTERN["birthday-note"]).toBe("birthday-note");
    expect(ENGINE_TO_VALUE_PATTERN["ladder"]).toBe("ladder");
    expect(ENGINE_TO_VALUE_PATTERN["broken-ladder"]).toBe("ladder-partial");
    expect(ENGINE_TO_VALUE_PATTERN["low-serial-1000"]).toBe("low-serial-under-1000");
  });

  it("leaves genuinely different notes unmapped (null)", () => {
    for (const id of [
      "super-repeater",
      "trinary",
      "seven-of-a-kind",
      "double-quad",
      "flipper",
      "high-serial",
      "low-serial-10",
      "low-serial-100",
    ]) {
      expect(ENGINE_TO_VALUE_PATTERN[id]).toBeNull();
    }
  });
});

describe("estimateValue", () => {
  it("returns ok bands for a mapped pattern with data (radar)", () => {
    const result = estimateValue(scoreSerial("12344321").matches);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.pattern).toBe("radar");
      expect(result.bands.length).toBeGreaterThan(0);
      for (const band of result.bands) {
        expect(band.high).toBeGreaterThanOrEqual(band.low);
        expect(band.sampleSize).toBeGreaterThan(0);
      }
    }
  });

  it("returns 'unmapped' for a trinary (no value equivalent, not a binary)", () => {
    const result = estimateValue(scoreSerial("12312312").matches);
    expect(result.status).toBe("insufficient-data");
    if (result.status === "insufficient-data") expect(result.reason).toBe("unmapped");
  });

  it("returns 'unmapped' for an ordinary serial with no pattern", () => {
    const result = estimateValue(scoreSerial("51837462").matches);
    expect(result.status).toBe("insufficient-data");
    if (result.status === "insufficient-data") expect(result.reason).toBe("unmapped");
  });

  it("returns 'gap' when the only mapped pattern is entirely un-sampled (super radar)", () => {
    // Hand-built: in production 71111117 also surfaces Binary (see below).
    const result = estimateValue([match("super-radar")]);
    expect(result.status).toBe("insufficient-data");
    if (result.status === "insufficient-data") {
      expect(result.pattern).toBe("super-radar");
      expect(result.reason).toBe("gap");
    }
  });

  it("FIX 1 side-effect: double-quad/super-radar serials now surface a Binary value floor", () => {
    // 11112222 (Double Quad) and 71111117 (Super Radar) are strictly Binary too;
    // with Binary no longer suppressed they now get a real binary comp instead
    // of insufficient-data. This is an accuracy improvement, not a regression.
    for (const serial of ["11112222", "71111117"]) {
      const result = estimateValue(scoreSerial(serial).matches);
      expect(result.status).toBe("ok");
      if (result.status === "ok") expect(result.pattern).toBe("binary");
    }
  });

  it("picks the highest-value pattern when several map", () => {
    const result = estimateValue([match("radar"), match("solid")]);
    expect(result.status).toBe("ok");
    if (result.status === "ok") expect(result.pattern).toBe("solid");
  });

  it("never scales by denomination", () => {
    const a = estimateValue(scoreSerial("12344321").matches, 1);
    const b = estimateValue(scoreSerial("12344321").matches, 100);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

describe("valueCell — no substitution, explicit gaps", () => {
  it("returns a recorded band where one exists", () => {
    const cell = valueCell("radar", "unc");
    expect(cell.status).toBe("ok");
  });

  it("returns 'no-band' for a missing-but-not-gapped condition", () => {
    const cell = valueCell("radar", "circulated");
    expect(cell.status).toBe("insufficient-data");
    if (cell.status === "insufficient-data") expect(cell.reason).toBe("no-band");
  });

  it("returns 'gap' for an explicitly empty combination", () => {
    const cell = valueCell("solid", "circulated");
    expect(cell.status).toBe("insufficient-data");
    if (cell.status === "insufficient-data") expect(cell.reason).toBe("gap");
  });
});
