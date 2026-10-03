import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-number-value/",
    title: "Fancy Serial Number Price Guide: Value Chart by Pattern",
    description:
      "A fancy serial number price guide: estimated value ranges by pattern and condition for radars, solids, ladders, low serials and more, with sources.",
    h1: "Fancy Serial Number Price Guide",
    primaryKeyword: "fancy serial number price guide",
    lead:
      "A fancy serial number price guide estimates what a patterned banknote is worth by pattern and condition. Because paper-money prices swing with grade and demand, every figure here is a range rather than a fixed number, and each row is labelled with how confident the estimate is.",
  },
  takeaways: [
    "Value is a range, never a single number, because condition and demand move it constantly.",
    "The chart groups patterns by rarity tier and splits each across three grades.",
    "Sample sizes and confidence labels show how much recorded sold data supports each range.",
    "Condition, denomination, pattern rarity and star status are the four main price drivers.",
    "Verify any figure against recent sold listings before you buy or sell.",
  ],
  sections: [
    {
      id: "how-to-use",
      heading: "How to use this price guide",
      blocks: [
        {
          kind: "paragraph",
          text:
            "This page leads with numbers. The chart above sets out an estimated value range for every pattern the checker detects, split across three conditions (circulated, very fine and uncirculated) and grouped by rarity tier so the scarcest patterns sit at the top. Read across a row to see how much condition changes the outcome for one pattern, and down a tier to compare patterns of similar scarcity.",
        },
        {
          kind: "paragraph",
          text:
            "Treat the ranges as a fancy serial number chart for orientation, not a quote. Two notes with the same pattern can sell for very different sums depending on eye appeal, grading and who happens to be bidding that day.",
        },
        {
          kind: "richtext",
          segments: [
            "If you need to identify the pattern on a specific note before you price it, run the serial through the ",
            { href: "/", label: "fancy serial number value checker on our homepage" },
            ", then come back to the matching row here.",
          ],
        },
      ],
    },
    {
      id: "confidence",
      heading: "What estimate and indicative mean",
      blocks: [
        {
          kind: "paragraph",
          text:
            'Every available range is based on recorded sold prices. "Estimate" means the sample contains at least eight sales and the range covers the middle half of those prices, reducing the effect of outliers. "Indicative" means fewer than eight sales support the range, which shows the full observed minimum and maximum: evidence of what has been paid, not a reliable market range.',
        },
        {
          kind: "paragraph",
          text:
            'The chart shows the number of sales behind each available range and marks small samples as "indicative". Combinations with no recorded sales read "no recorded sales" rather than receiving a guessed value. Nothing here is invented to fill a gap; where the data is thin, the label says so plainly.',
        },
      ],
    },
    {
      id: "drivers",
      heading: "What drives fancy serial number value",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Four forces set the price of a patterned note, and the pattern itself is only one of them. Weigh all four before you settle on a figure.",
        },
        {
          kind: "list",
          items: [
            "Condition. A crisp, uncirculated note can be worth several times the same note after years in a wallet, which is why the chart splits every pattern by grade.",
            "Denomination. A pattern on a $100 note starts from a higher base than the same pattern on a $1 note.",
            "Rarity of the pattern. A solid or a true ladder is far scarcer than a radar or a birthday date, and scarcity sets the ceiling.",
            "Demand. Some patterns are simply more wanted than others, and collector fashion shifts over time.",
          ],
        },
        {
          kind: "paragraph",
          text:
            "Star notes add a further premium because replacement notes are printed in smaller numbers. The checker flags a star automatically and factors it into the score, so a starred note usually sits above the plain range shown here.",
        },
      ],
    },
    {
      id: "by-tier",
      heading: "How the tiers break down",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The chart sorts patterns into rarity tiers so you can see the shape of the market at a glance. Exceptional patterns such as solids and true ladders are the trophies, changing hands infrequently and commanding the widest ranges. Very rare patterns like super radars and single-digit low serials follow close behind.",
        },
        {
          kind: "paragraph",
          text:
            "Below them, radars, repeaters and mid-tier low serials are the workhorses of the hobby: genuinely collectible, widely traded and far more affordable. Birthday dates and trinaries fill the common tier, where the appeal is often personal rather than financial. Use this fancy serial number list of tiers to set your expectations before you look at a single price.",
        },
      ],
    },
    {
      id: "reading-the-market",
      heading: "How to read the market yourself",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The most reliable way to value a note is to look at what comparable notes have actually sold for. Search completed sold listings for the same pattern, denomination and grade, and ignore optimistic asking prices that never closed. Recent auction results range widely, so gather several data points rather than anchoring on one.",
        },
        {
          kind: "paragraph",
          text:
            "For anything genuinely scarce, third-party grading from a recognised service makes a note easier to sell and usually lifts the price, because buyers trust an independent grade. Start from the ranges here, then confirm against live sales before money changes hands.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-numbers/",
      label: "What is a fancy serial number?",
      description: "The full taxonomy of patterns, explained on the hub page.",
    },
    {
      href: "/fancy-serial-numbers/low-serial-number/",
      label: "Low serial number values",
      description: "How the three low-serial tiers are priced.",
    },
    {
      href: "/fancy-serial-numbers/radar/",
      label: "Radar and super radar prices",
      description: "What palindrome serials tend to fetch.",
    },
  ],
};
