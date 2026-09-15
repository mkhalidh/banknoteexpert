import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/methodology/",
    title: "Methodology: How We Value Fancy Serial Numbers",
    description:
      "Our sources, confidence levels, the 0–100 rarity score, grading standards and limitations: how Banknote Expert estimates US banknote serial number value, explained honestly.",
    h1: "Methodology",
    primaryKeyword: "methodology",
    lead:
      "We estimate a note's collectibility from two things: the pattern in its serial number and its condition. Value ranges are drawn from realised auction and sold-listing prices, never asking prices, and every figure is labelled with how confident we are. This page explains exactly how, and where the numbers come from.",
  },
  takeaways: [
    "Value ranges come from realised sale prices, not asking prices.",
    'Every figure carries a confidence label: "estimate" or "indicative".',
    "The 0–100 rarity score measures pattern rarity, not market price.",
    "These are research estimates, not appraisals.",
  ],
  sections: [
    {
      id: "value-sources",
      heading: "Where the value figures come from",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Different figures on the site come from different places, and we keep them separate rather than implying one source covers everything.",
        },
        {
          kind: "subheading",
          text: "Fancy pattern values",
        },
        {
          kind: "paragraph",
          text:
            "The pattern value bands are sampled directly by us from completed, sold listings on Heritage Auctions and eBay, gathered in September 2026. We record realised prices, not asking prices. Where a pattern and grade had eight or more sales we report the interquartile range, which resists single outliers; below eight sales we report the full observed low-to-high range. Every band discloses its sample size so you can judge how thin the evidence is.",
        },
        {
          kind: "subheading",
          text: "$2 note series values",
        },
        {
          kind: "paragraph",
          text:
            "The $2 value chart is not our own sampling. It is compiled from serialworth.com's published price guide, which itself aggregates eBay and Heritage Auctions sold data. We treat it as a secondary source and label it as such. A few rows were adjusted only where an uncirculated figure fell below the circulated one for the same series, which cannot be right; those are marked indicative.",
        },
      ],
    },
    {
      id: "production-data",
      heading: "Where star note print runs come from",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star note rarity rests on how many replacement notes were actually printed, which is a matter of public record. Those figures come from the Bureau of Engraving and Printing's monthly production reports at bep.gov: 287 monthly reports covering 1999 to 2025 were downloaded and parsed, and every run in our dataset carries a direct link to the exact report it was read from, so any figure the tool shows can be verified in one click.",
        },
        {
          kind: "paragraph",
          text:
            "Separately, the rarity odds shown for each pattern describe how often that arrangement occurs by chance in an eight-digit serial. That is a fixed mathematical property, not a market or production figure.",
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
            '"Estimate" means the band rests on a reasonable sample of eight or more recorded sales, reported as an interquartile range. "Indicative" means the sample is small, sometimes a single sale: it shows what has been paid, not a reliable market range, and should be read with caution.',
        },
        {
          kind: "paragraph",
          text:
            "Gaps are deliberate. A pattern and condition with no recorded sales is left blank and reported as insufficient data, never filled with a zero, a guess, or a neighbouring grade's figure. We would rather show less than show something we cannot stand behind.",
        },
      ],
    },
    {
      id: "rarity-score",
      heading: "What the 0–100 rarity score measures",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The rarity score rates how unusual a serial number's pattern is, from 0 for an ordinary number to 100 for the very rarest arrangements. It is deterministic and explainable: the same serial always produces the same score, and the breakdown shows exactly which pattern contributed which points. Where one pattern subsumes another (a solid is trivially also a binary), only the strongest is counted. A star note adds a small documented bonus.",
        },
        {
          kind: "paragraph",
          text:
            "It is just as important to say what the score does not measure. It is not a price, and it is not a grade. A high score means the pattern is scarce, not that the note is valuable: condition, denomination and demand decide the money. Read the score as a first filter for how interesting a serial is, then turn to the value ranges and, ultimately, the live market.",
        },
      ],
    },
    {
      id: "grading",
      heading: "Grading terminology",
      blocks: [
        {
          kind: "paragraph",
          text:
            "We report value across three broad condition bands. Circulated covers notes that have seen use, with folds, softness or wear. Very Fine describes a note with light handling but still firm and attractive. Uncirculated means a note with no wear at all, as issued. These bands map onto the more granular numeric scales used by the two main third-party graders, PMG and PCGS Banknote, whose standards define what each grade means.",
        },
        {
          kind: "paragraph",
          text:
            "Grade drives value more than most people expect: the same pattern can be worth several times more in uncirculated condition than in a worn state, which is why every range on the site is split by condition rather than quoted as one number.",
        },
      ],
    },
    {
      id: "refresh",
      heading: "How often the data is refreshed",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Value ranges are reviewed on a rolling basis as new auction and sold-listing results come in, and the date below records the last review. Series facts, seal colours and rarity odds change rarely, if ever, because they rest on fixed reference data; market ranges move more often and are the main focus of each refresh.",
        },
      ],
    },
    {
      id: "limitations",
      heading: "Limitations",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Everything here is a research estimate, not an appraisal. We are not buying or selling notes, and no figure on this site is an offer. Paper-money prices move with condition, demand and what happens to sell in a given month, so treat our ranges as orientation and confirm any note against recent comparable sales before you buy or sell.",
        },
        {
          kind: "paragraph",
          text:
            "For a firm valuation, or before committing real money to a scarce note, consult a professional currency dealer or submit the note to a recognised grading service. An independent grade both settles the condition question and makes a note far easier to sell.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-number-value/",
      label: "Fancy serial number price guide",
      description: "The value ranges this methodology produces.",
    },
    {
      href: "/",
      label: "Open the serial number checker",
      description: "Score any serial and see the breakdown.",
    },
    {
      href: "/about/",
      label: "About Banknote Expert",
      description: "Who is behind the site.",
    },
  ],
};
