import { describe, it, expect } from "vitest";
import { scoreSerial, patternSatisfied, STAR_BONUS } from "@/lib/serial/score";

const ids = (serial: string): string[] =>
  scoreSerial(serial).matches.map((m) => m.id);

const primary = (serial: string): string | undefined =>
  scoreSerial(serial).matches[0]?.id;

describe("scoreSerial — required acceptance cases", () => {
  it("12345678 is a ladder", () => {
    expect(primary("12345678")).toBe("ladder");
  });

  it("12344321 is a radar", () => {
    expect(primary("12344321")).toBe("radar");
    expect(ids("12344321")).toContain("radar");
  });

  it("77777777 is solid and NOT binary, repeater or super-repeater", () => {
    const matched = ids("77777777");
    expect(matched).toContain("solid");
    expect(matched).not.toContain("binary");
    expect(matched).not.toContain("repeater");
    expect(matched).not.toContain("super-repeater");
  });

  it("51837462 has no pattern and a low score", () => {
    const result = scoreSerial("51837462");
    expect(result.matches).toHaveLength(0);
    expect(result.score).toBe(0);
    expect(result.tier).toBe("Common");
  });

  it("01011990 is a birthday note", () => {
    expect(primary("01011990")).toBe("birthday-note");
  });
});

describe("scoreSerial — radar is not a broken ladder (Task A regression)", () => {
  it("12344321 is a radar only", () => {
    expect(ids("12344321")).toEqual(["radar"]);
  });

  it("87655678 is a radar only", () => {
    expect(ids("87655678")).toEqual(["radar"]);
  });

  it("12345687 is a genuine broken ladder", () => {
    const matched = ids("12345687");
    expect(matched).toContain("broken-ladder");
    expect(matched).not.toContain("radar");
  });

  it("12345678 is a ladder, not a broken ladder", () => {
    const matched = ids("12345678");
    expect(matched).toContain("ladder");
    expect(matched).not.toContain("broken-ladder");
  });
});

describe("scoreSerial — same-axis supersession hides ONLY weaker same-axis forms", () => {
  it("super-repeater hides repeater (same axis) but shows cross-axis binary", () => {
    const matched = ids("12121212");
    expect(matched).toContain("super-repeater");
    expect(matched).toContain("binary"); // FIX 1: cross-axis, must show
    expect(matched).not.toContain("repeater"); // same-axis weaker form, hidden
  });

  it("super-radar hides radar (same axis) but shows cross-axis binary", () => {
    const matched = ids("71111117");
    expect(matched).toContain("super-radar");
    expect(matched).toContain("binary"); // FIX 1
    expect(matched).not.toContain("radar");
  });

  it("the tightest low-serial tier hides looser tiers (same axis)", () => {
    const matched = ids("00000001");
    expect(matched).toContain("low-serial-10");
    expect(matched).not.toContain("low-serial-100");
    expect(matched).not.toContain("low-serial-1000");
  });
});

describe("scoreSerial — FIX 1: cross-axis patterns are no longer suppressed", () => {
  it("77777477 shows Seven of a Kind AND Binary", () => {
    const matched = ids("77777477");
    expect(matched).toContain("seven-of-a-kind");
    expect(matched).toContain("binary");
    expect(primary("77777477")).toBe("seven-of-a-kind"); // higher baseScore
  });

  it("double-quad shows cross-axis Binary too (11112222)", () => {
    const matched = ids("11112222");
    expect(matched).toContain("double-quad");
    expect(matched).toContain("binary");
  });

  it("80000008 shows Super Radar + Flipper + Binary; a radar claim is satisfied", () => {
    const matched = ids("80000008");
    expect(matched).toContain("super-radar");
    expect(matched).toContain("flipper");
    expect(matched).toContain("binary");
    expect(matched).not.toContain("radar"); // hidden under super-radar...
    expect(patternSatisfied(scoreSerial("80000008"), "radar")).toBe(true); // ...but implied
  });

  it("a super-repeater satisfies a 'repeater' claim via IMPLIES", () => {
    expect(patternSatisfied(scoreSerial("12121212"), "repeater")).toBe(true);
  });

  it("combination bonus only counts different-axis tags and is capped", () => {
    // 77777477: primary seven-of-a-kind (80) + binary on a different axis (+5)
    expect(scoreSerial("77777477").score).toBe(85);
  });
});

describe("scoreSerial — FIX 2: any full 8-digit run is a ladder", () => {
  for (const serial of ["12345678", "23456789", "01234567", "98765432", "76543210"]) {
    it(`${serial} is a ladder, not a broken ladder`, () => {
      const matched = ids(serial);
      expect(matched).toContain("ladder");
      expect(matched).not.toContain("broken-ladder");
    });
  }

  it("12345670 (run of 7) is a broken ladder", () => {
    const matched = ids("12345670");
    expect(matched).toContain("broken-ladder");
    expect(matched).not.toContain("ladder");
  });
});

describe("scoreSerial — FIX 3: multi-format birthday", () => {
  it("16101964 is a birthday (DDMMYYYY)", () => {
    expect(ids("16101964")).toContain("birthday-note");
  });
  it("19970802 is a birthday (YYYYMMDD)", () => {
    expect(ids("19970802")).toContain("birthday-note");
  });
  it("19991345 is not a birthday in any order", () => {
    expect(ids("19991345")).not.toContain("birthday-note");
  });
});

describe("scoreSerial — scoring behaviour", () => {
  it("produces deterministic scores for the same input", () => {
    expect(scoreSerial("12345678").score).toBe(scoreSerial("12345678").score);
  });

  it("assigns the Exceptional tier to a solid serial", () => {
    expect(scoreSerial("77777777").tier).toBe("Exceptional");
  });

  it("records every contribution in the breakdown", () => {
    const result = scoreSerial("12344321");
    const total = result.breakdown.reduce((sum, line) => sum + line.points, 0);
    expect(total).toBe(result.score);
  });

  it("adds the documented star bonus", () => {
    const plain = scoreSerial("A12344321B");
    const star = scoreSerial("A12344321*");
    expect(star.isStar).toBe(true);
    expect(star.score).toBe(plain.score + STAR_BONUS);
    expect(star.breakdown.some((l) => l.label === "Star note")).toBe(true);
  });

  it("returns a zero score with an explanation for invalid input", () => {
    const result = scoreSerial("nonsense");
    expect(result.score).toBe(0);
    expect(result.matches).toHaveLength(0);
    expect(result.breakdown[0].label).toBe("Invalid serial number");
  });
});
