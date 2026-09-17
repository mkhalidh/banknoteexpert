import { describe, expect, it } from "vitest";
import { getRoute, getRoutesBySilo } from "@/config/routes";

describe("route registry", () => {
  it("includes the hub landing page for category navigation", () => {
    const hub = getRoute("/hub/");
    expect(hub.title).toContain("Banknote");
    expect(getRoutesBySilo("home").some((route) => route.path === "/hub/")).toBe(true);
  });
});
