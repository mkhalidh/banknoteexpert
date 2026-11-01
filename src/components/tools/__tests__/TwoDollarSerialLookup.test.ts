/// <reference types="vite/client" />
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { TwoDollarSerialLookup } from "@/components/tools/TwoDollarSerialLookup";

const { JSDOM } = createRequire(import.meta.url)("jsdom") as {
  JSDOM: new (html: string) => { window: { document: Document } };
};

function selectedSeries(defaultSeries?: string) {
  const html = renderToStaticMarkup(
    React.createElement(TwoDollarSerialLookup, {
      defaultSeries,
      syncUrl: false,
    }),
  );
  const doc = new JSDOM(html).window.document;
  return (doc.querySelector("select") as HTMLSelectElement).value;
}

describe("TwoDollarSerialLookup", () => {
  it("starts on the series requested by an embedded value page", () => {
    expect(selectedSeries("1953")).toBe("1953");
    expect(selectedSeries("2017A")).toBe("2017A");
  });

  it("falls back to 1976 when the requested series is unknown", () => {
    expect(selectedSeries("1901")).toBe("1976");
  });
});
