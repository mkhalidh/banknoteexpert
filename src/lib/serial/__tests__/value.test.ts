import { describe, it, expect } from "vitest";
import { scoreSerial } from "@/lib/serial/score";
import {
  estimateValue,
  valueCell,
  conditionForGrade,
  ENGINE_TO_VALUE_PATTERN,
} from "@/lib/serial/value";
import {
  PATTERN_VALUE_BANDS,
  PATTERN_VALUE_GAPS,
} from "@/data/value-ranges";
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
    expect(ENGINE_TO_VALUE_PATTERN["ladder"]).toBe("ladder");
    expect(ENGINE_TO_VALUE_PATTERN["broken-ladder"]).toBe("ladder-partial");
  });

  it("fixes the low-serial mapping defect (10 and 100 tiers now resolve)", () => {
    expect(ENGINE_TO_VALUE_PATTERN["low-serial-10"]).toBe("low-serial-under-100");
    expect(ENGINE_TO_VALUE_PATTERN["low-serial-100"]).toBe("low-serial-under-100");
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
    ]) {
      expect(ENGINE_TO_VALUE_PATTERN[id]).toBeNull();
    }
  });
});

describe("value bands lookup — every OK band resolves", () => {
  it.each(PATTERN_VALUE_BANDS)(
    "$pattern / $condition resolves to its recorded band",
    (band) => {
      const cell = valueCell(band.pattern, band.condition);
      expect(cell.status).toBe("ok");
      if (cell.status === "ok") {
        expect(cell.band.low).toBe(band.low);
        expect(cell.band.high).toBe(band.high);
        expect(cell.band.sampleSize).toBeGreaterThan(0);
        expect(cell.band.high).toBeGreaterThanOrEqual(cell.band.low);
      }
    },
  );
});

describe("value bands lookup — every gap stays blank", () => {
  it.each(PATTERN_VALUE_GAPS)(
    "$pattern / $condition is an explicit gap, never a figure",
    (gap) => {
      const cell = valueCell(gap.pattern, gap.condition);
      expect(cell.status).toBe("insufficient-data");
      if (cell.status === "insufficient-data") expect(cell.reason).toBe("gap");
    },
  );
});

describe("confounder exclusions produce de-confounded figures", () => {
  it("solid uncirculated is modern-note money, not the $90,000 silver certificate", () => {
    const cell = valueCell("solid", "unc");
    expect(cell.status).toBe("ok");
    if (cell.status === "ok") {
      expect(cell.band.high).toBe(27600);
      expect(cell.band.high).toBeLessThan(90000);
    }
  });

  it("low-serial-under-100 uncirculated drops the large-size and NBN highs", () => {
    const cell = valueCell("low-serial-under-100", "unc");
    expect(cell.status).toBe("ok");
    if (cell.status === "ok") {
      expect(cell.band.high).toBe(9400);
      expect(cell.band.high).toBeLessThan(66000);
    }
  });

  it("low-serial-under-1000 / unc publishes on modern $20 FRNs, not the 1918 large-size $2 notes", () => {
    const cell = valueCell("low-serial-under-1000", "unc");
    expect(cell.status).toBe("ok");
    if (cell.status === "ok") {
      expect(cell.band.high).toBe(69);
      expect(cell.band.high).toBeLessThan(2820); // the excluded 1918 large-size $2 floor
    }
  });

  it("new records publish the previously blank low-serial buckets", () => {
    for (const [p, c] of [
      ["low-serial-under-1000", "circulated"],
      ["low-serial-under-1000", "vf"],
      ["low-serial-under-1000", "unc"],
    ] as const) {
      expect(valueCell(p, c).status).toBe("ok");
    }
  });

  it("low-serial-under-100 / vf stays blank (serial 1 outlier excluded by owner decision)", () => {
    expect(valueCell("low-serial-under-100", "vf").status).toBe("insufficient-data");
  });
});

describe("estimateValue", () => {
  it("returns ok bands for a mapped pattern with data (radar)", () => {
    const result = estimateValue(scoreSerial("12344321").matches);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.pattern).toBe("radar");
      expect(result.bands.length).toBeGreaterThan(0);
    }
  });

  it("low-serial tiers now return a value (mapping defect fixed)", () => {
    const result = estimateValue(scoreSerial("00000005").matches); // low-serial-10
    expect(result.status).toBe("ok");
    if (result.status === "ok") expect(result.pattern).toBe("low-serial-under-100");
  });

  it("returns 'unmapped' for a trinary (no value equivalent)", () => {
    const result = estimateValue(scoreSerial("12312312").matches);
    expect(result.status).toBe("insufficient-data");
    if (result.status === "insufficient-data") expect(result.reason).toBe("unmapped");
  });

  it("returns 'unmapped' for an ordinary serial with no pattern", () => {
    const result = estimateValue(scoreSerial("51837462").matches);
    expect(result.status).toBe("insufficient-data");
    if (result.status === "insufficient-data") expect(result.reason).toBe("unmapped");
  });

  it("birthday-note now returns a value (new records pushed it over the threshold)", () => {
    const result = estimateValue([match("birthday-note")]);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.pattern).toBe("birthday-note");
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

describe("conditionForGrade — matches how the sheet bucketed records", () => {
  it("numeric grades", () => {
    expect(conditionForGrade(68)).toBe("unc");
    expect(conditionForGrade(60)).toBe("unc");
    expect(conditionForGrade(58)).toBe("vf");
    expect(conditionForGrade(40)).toBe("vf");
    expect(conditionForGrade(20)).toBe("vf");
    expect(conditionForGrade(12)).toBe("circulated");
  });

  it("grade strings with a number take the number", () => {
    expect(conditionForGrade("PMG Superb Gem Unc 68 EPQ")).toBe("unc");
    expect(conditionForGrade("PMG Choice Very Fine 35")).toBe("vf");
    expect(conditionForGrade("PMG About Uncirculated 55 EPQ")).toBe("vf");
    expect(conditionForGrade("PCGS Fine 12")).toBe("circulated");
  });

  it("term-only grades", () => {
    expect(conditionForGrade("Gem Crisp Uncirculated")).toBe("unc");
    expect(conditionForGrade("Extremely Fine")).toBe("vf");
    expect(conditionForGrade("About Uncirculated")).toBe("vf");
    expect(conditionForGrade("Very Good")).toBe("circulated");
  });
});

describe("valueCell — no substitution", () => {
  it("returns a recorded band where one exists", () => {
    expect(valueCell("radar", "unc").status).toBe("ok");
  });

  it("returns 'gap' for an explicitly empty combination", () => {
    const cell = valueCell("binary", "circulated");
    expect(cell.status).toBe("insufficient-data");
    if (cell.status === "insufficient-data") expect(cell.reason).toBe("gap");
  });

  it("returns 'no-band' for a pattern/condition that is neither listed nor gapped", () => {
    const cell = valueCell("not-a-value-pattern", "unc");
    expect(cell.status).toBe("insufficient-data");
    if (cell.status === "insufficient-data") expect(cell.reason).toBe("no-band");
  });
});
