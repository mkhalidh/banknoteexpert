import { describe, expect, it } from "vitest";
import { replyEmailTemplate } from "../email-template";

// Waline uses this same renderer for notification templates.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nunjucks = require("nunjucks");

describe("reply email template", () => {
  const data = {
    site: {
      name: "Banknote Expert",
      url: "https://www.banknoteexpert.com",
      postUrl: "https://www.banknoteexpert.com/fancy-serial-numbers/#123",
    },
    parent: { nick: "Khalid", comment: "Testing" },
    self: { nick: "Expert", comment: "Here is your answer" },
  };

  it("links both reply actions to the exact comment", () => {
    const html = nunjucks.renderString(replyEmailTemplate, data) as string;
    expect(html.match(/href="https:\/\/www\.banknoteexpert\.com\/fancy-serial-numbers\/#123"/g)).toHaveLength(2);
    expect(html).toContain("Read the reply");
  });

  it("does not turn commenter content into email HTML", () => {
    const html = nunjucks.renderString(replyEmailTemplate, {
      ...data,
      parent: { nick: '<img src=x onerror=alert(1)>', comment: '<script>alert(1)</script>Testing' },
      self: { nick: "Expert", comment: '<a href="https://evil.example">Click</a> answer' },
    }) as string;
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("https://evil.example");
    expect(html).toContain("Testing");
    expect(html).toContain("Click answer");
  });
});
