import { describe, it, expect } from "vitest";
import {
  lookupStarNote,
  rarityForRunSize,
  coveredDenominations,
  seriesForDenomination,
} from "@/lib/star-note/lookup";

describe("rarityForRunSize — tier thresholds", () => {
  it("classifies each tier at and around its boundary", () => {
    expect(rarityForRunSize(320_000)).toBe("Very Rare");
    expect(rarityForRunSize(320_001)).toBe("Rare");
    expect(rarityForRunSize(640_000)).toBe("Rare");
    expect(rarityForRunSize(640_001)).toBe("Uncommon");
    expect(rarityForRunSize(1_600_000)).toBe("Uncommon");
    expect(rarityForRunSize(1_600_001)).toBe("Common");
  });
});

describe("coverage", () => {
  it("covers all seven denominations", () => {
    expect(coveredDenominations()).toEqual([1, 2, 5, 10, 20, 50, 100]);
  });

  it("lists $2 series including 2003", () => {
    expect(seriesForDenomination(2)).toContain("2003");
  });

  it("returns an empty list for an unknown denomination", () => {
    expect(seriesForDenomination(3)).toEqual([]);
  });
});

describe("lookupStarNote — real data", () => {
  it("finds the scarce $2 series 2003 8,000-note run", () => {
    const r = lookupStarNote(2, "2003", "00000500*");
    expect(r.found).toBe(true);
    expect(r.rarityTier).toBe("Very Rare");
    const scarce = r.runs.find((run) => run.runSize === 8000);
    expect(scarce).toBeDefined();
    expect(scarce?.sourcePdfUrl).toMatch(/^https:\/\/www\.bep\.gov/);
  });

  it("every matched run carries a BEP source URL", () => {
    const r = lookupStarNote(2, "2003", "00000500*");
    expect(r.runs.length).toBeGreaterThan(0);
    for (const run of r.runs) {
      expect(run.sourcePdfUrl).toMatch(/^https:\/\/www\.bep\.gov/);
    }
  });

  it("rejects an out-of-coverage denomination + series", () => {
    const r = lookupStarNote(2, "1999", "00000500*");
    expect(r.status).toBe("series-unsupported");
    expect(r.message).toContain("2003");
  });

  it("rejects a denomination with no data at all", () => {
    const r = lookupStarNote(3, "2003", "00000500*");
    expect(r.status).toBe("series-unsupported");
  });

  it("rejects a non-star serial", () => {
    const r = lookupStarNote(2, "2003", "00000500");
    expect(r.status).toBe("not-star");
  });

  it("rejects an invalid serial", () => {
    const r = lookupStarNote(2, "2003", "12");
    expect(r.status).toBe("invalid-serial");
  });

  it("returns no-match for a star serial outside every recorded run", () => {
    const r = lookupStarNote(2, "2003", "99999999*");
    expect(r.status).toBe("no-match");
    expect(r.found).toBe(false);
  });
});
