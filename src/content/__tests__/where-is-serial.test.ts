import { describe, expect, it } from "vitest";
import { content, denominations } from "@/content/where-is-serial";

describe("serial number location guide", () => {
  it("keeps the location diagram aligned with the documented note designs", () => {
    expect(denominations.map(({ label, topSerialSide }) => [label, topSerialSide])).toEqual([
      ["$1", "right"],
      ["$2", "right"],
      ["$5", "left"],
      ["$10", "left"],
      ["$20", "left"],
      ["$50", "left"],
      ["$100", "left"],
    ]);
  });

  it("keeps search metadata concise and focused on the location query", () => {
    expect(content.meta.title.length).toBeLessThanOrEqual(60);
    expect(content.meta.description.length).toBeLessThanOrEqual(160);
    expect(content.meta.h1).toBe("Where Is the Serial Number on a Dollar Bill?");
  });
});
