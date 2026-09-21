import type { PageContent } from "@/content/types";
import { AUTHOR_NAME, AUTHOR_BIO } from "@/config/site";

export const content: PageContent = {
  meta: {
    path: "/about/",
    title: "About Banknote Expert",
    description:
      "Who is behind Banknote Expert and why we built a set of honest, free, client-side US banknote serial number tools instead of another thin value lookup.",
    h1: "About Banknote Expert",
    primaryKeyword: "about banknote expert",
    lead:
      "Banknote Expert is a free set of tools for checking US banknote serial numbers for collectible patterns and estimating what a note might be worth. We built it because the existing tools in this niche are thin, ad-heavy, or simply dishonest about value, and collectors deserve better.",
  },
  takeaways: [
    "Free, client-side tools: your serial numbers never leave your browser.",
    "Honest about value: most notes are worth face value, and we say so.",
    "Every value figure is sourced and carries a confidence rating.",
  ],
  sections: [
    {
      id: "what-we-do",
      heading: "What the site does",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Banknote Expert checks the eight-digit serial number on a US note for the patterns collectors seek, including radars, solids, ladders, low serials, birthday dates and more, and returns a rarity score, the matched patterns, and an estimated value range by condition. It also identifies star notes and explains what each part of a serial means. Everything runs in your browser, and nothing is uploaded.",
        },
      ],
    },
    {
      id: "why-it-exists",
      heading: "Why it exists",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Search for the value of a serial number and you will mostly find scraped, automated pages that inflate every note into a supposed fortune. That is not how the market works, and it wastes people's time. We wanted a tool that does the actual pattern maths correctly, shows its working, and tells you the truth, including the common truth that a given note is worth exactly its face value.",
        },
      ],
    },
    {
      id: "how-we-differ",
      heading: "How we're different",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Three things set this site apart. First, honesty: we lead with the likely answer, and we never invent a price. Second, transparency: every value range names its sources and carries a confidence label, and the rarity score shows exactly how it was reached. Third, privacy and speed: the tools are static and run entirely on your device, so there are no accounts, no tracking of what you check, and no waiting on a server.",
        },
        {
          kind: "paragraph",
          text:
            "The value figures published today are based on recorded sold-price samples, with sample sizes and confidence labels. Small samples are marked indicative, and combinations with no recorded sales are left without an estimate.",
        },
      ],
    },
    {
      id: "who-runs-it",
      heading: "Who is behind it",
      blocks: [
        {
          kind: "paragraph",
          text: `The site is written and maintained by ${AUTHOR_NAME}, ${AUTHOR_BIO}, drawing on published auction records, grading standards and Bureau of Engraving and Printing data rather than guesswork. Our aim is a resource we would trust ourselves: accurate on the facts, careful with the numbers, and clear about what is known versus estimated.`,
        },
        {
          kind: "paragraph",
          text:
            "If you spot an error in a series fact or a value range, we want to hear about it. Accuracy in this niche is worth more than reach, and correcting the record quickly is part of how a reference earns trust.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/methodology/",
      label: "Our methodology",
      description: "Sources, confidence levels and limitations in full.",
    },
    {
      href: "/",
      label: "Try the serial number checker",
      description: "Score any US banknote serial in your browser.",
    },
    {
      href: "/fancy-serial-numbers/",
      label: "What makes a serial number fancy",
      description: "The full taxonomy of collectible patterns.",
    },
  ],
};
