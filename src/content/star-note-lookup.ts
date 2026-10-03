import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/star-note-lookup/",
    title: "Star Note Lookup: Check a Star Note's Value by Serial",
    description:
      "Free star note lookup: enter denomination, series and serial to find the print run, rarity tier and any fancy pattern, with a BEP report link to verify.",
    h1: "Star Note Lookup",
    primaryKeyword: "star note lookup",
    lead:
      "A star note lookup checks a replacement note's serial against Bureau of Engraving and Printing print-run data to tell you how scarce it is. Enter the denomination, series and serial above and this free tool reports the run size, the rarity tier, and any collectible pattern hidden in the number.",
  },
  takeaways: [
    "A star note is a replacement, marked by a star (*) at the end of its serial.",
    "Print-run size is what decides rarity: a small run is what makes a star scarce.",
    "Most star notes carry only a modest premium; a few small runs are genuinely rare.",
    "A star note that is also a fancy serial is desirable on both counts.",
    "Every matched run links to the BEP report so you can verify it independently.",
  ],
  sections: [
    {
      id: "how-to-read",
      heading: "How to read your star note",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A star note is easy to spot once you know where to look. On an ordinary note the serial ends in a suffix letter; on a star note that final letter is replaced by a star. So the string reads as one or two prefix letters, eight digits, and then a star instead of the closing letter. The diagram below shows exactly where the star sits.",
        },
        {
          kind: "paragraph",
          text:
            "The star is the Bureau's way of marking a replacement note, printed to swap out a note spoiled during production. Everything else about the serial works the same way, and the eight digits are still scored for patterns just as they are on any other note.",
        },
        {
          kind: "richtext",
          segments: [
            "If you only want to check the digits for a pattern rather than the print run, the ",
            { href: "/", label: "home page serial number checker" },
            " does exactly that; this page adds the star-specific run and rarity data on top.",
          ],
        },
      ],
    },
    {
      id: "what-makes-valuable",
      heading: "What makes a star note valuable",
      blocks: [
        {
          kind: "paragraph",
          text:
            "One factor dominates all the others: the size of the print run. Star notes are printed in batches, and when a batch is small, far fewer of those replacement notes exist, which is what makes them scarce and sought-after. A star from a run of a few hundred thousand is a genuinely different proposition from one out of a run of millions, even if the two notes look identical in your hand.",
        },
        {
          kind: "subheading",
          text: "The other factors, in order",
        },
        {
          kind: "list",
          items: [
            "Condition. As with any note, a crisp, uncirculated example is worth more than a worn one, and grade can multiply value several times over.",
            "Series and denomination. Older series and higher face values start from a higher base, though run size still leads.",
            "Fancy serial. A star note whose digits also form a pattern, such as a radar or a low number, carries a premium on both counts.",
          ],
        },
        {
          kind: "paragraph",
          text:
            "The point worth repeating is that run size comes first. A common, large-run star in average condition is usually worth only a small premium over face value, and this tool will tell you that plainly rather than inflating it. Many collectors also pursue star notes by Federal Reserve district, assembling a full set of the twelve banks, and a star from a district that printed few replacements in a given series is the one that completes a run and carries the premium.",
        },
      ],
    },
    {
      id: "rarity-tiers",
      heading: "Star note rarity tiers",
      blocks: [
        {
          kind: "paragraph",
          text:
            "We group star notes into four tiers by the size of their print run. The smaller the run, the rarer the note. The table below shows the thresholds this tool uses and what each tier means in practice, from the everyday large runs to the small runs collectors actively chase.",
        },
        {
          kind: "paragraph",
          text:
            "These thresholds are a guide, not a hard grade. A run near the boundary between two tiers behaves much like either side, and demand for a particular series or district can push a note above what its tier alone would suggest. Use the tier to set expectations, then let the run size and comparable sales settle the final figure.",
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "Star notes with fancy serial numbers",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A star note is collectible for its run; a fancy serial is collectible for its pattern. Put the two together and you have a note that appeals to two sets of collectors at once, which is where the strongest premiums appear. The patterns most worth watching for on a star note are low serials, radars, ladders and birthday dates, each of which has a full guide.",
        },
        {
          kind: "paragraph",
          text:
            "The tool above checks for these automatically: when you enter a star serial, it flags any pattern in the same digits alongside the print-run result, so you can see at a glance whether your note is interesting for one reason, both, or neither. A low serial on a small-run star is the kind of note that justifies a closer look and, potentially, professional grading.",
        },
      ],
    },
    {
      id: "how-we-estimate",
      heading: "How we estimate value",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Run sizes and serial ranges come from the Bureau of Engraving and Printing's monthly production reports, and every matched run links straight to the source PDF so you can confirm it yourself. Value ranges are drawn from realised auction and sold-listing prices and carry a confidence label: \"estimate\" while the data is thin, \"indicative\" once it rests on a solid sample. We never invent a run figure or a price.",
        },
        {
          kind: "paragraph",
          text:
            "Linking each result to its source report is deliberate. Star note data is unusually verifiable, since the print runs are public record, so there is no reason to ask you to take a number on trust. If a run is not yet in our dataset, the tool says so rather than guessing, and you can find the figure in the same reports we draw from.",
        },
        {
          kind: "richtext",
          segments: [
            "The print-run dataset is currently a small labelled sample while we transcribe the reports; the ",
            { href: "/methodology/", label: "methodology page" },
            " explains the sources, the confidence levels and the limitations in full.",
          ],
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "What is a star note?" },
        {
          kind: "paragraph",
          text:
            "A star note is a replacement note. When a sheet of currency is spoiled during printing, the Bureau prints a replacement and marks it with a star at the end of the serial instead of the usual suffix letter. Because they are printed in smaller numbers, star notes are collectible in their own right.",
        },
        { kind: "subheading", text: "How do I know if I have a star note?" },
        {
          kind: "paragraph",
          text:
            "Look at the very end of the serial number. If it finishes with a star symbol rather than a letter, you have a star note. Both printings of the serial, upper-right and lower-left, will show the same star.",
        },
        { kind: "subheading", text: "Are all star notes valuable?" },
        {
          kind: "paragraph",
          text:
            "No, and it is important to be honest about that. Many star notes come from large print runs and carry only a small premium over face value. It is the notes from small runs, or in top condition, or with a fancy serial, that command real money. A star note checker like this one exists precisely to tell the two apart.",
        },
        { kind: "subheading", text: "What is a star note worth?" },
        {
          kind: "paragraph",
          text:
            "It depends first on run size, then on condition and series. Recent auction results range widely, from a small premium for a common large-run star to substantial sums for scarce small runs in high grade. Rather than quote a single number, we show a range and point you to comparable sold listings.",
        },
        { kind: "subheading", text: "How do I look up a star note value by serial number?" },
        {
          kind: "paragraph",
          text:
            "Enter the denomination, series and full serial into the tool above. It performs a star note value by serial number check: it finds the print run your serial falls in, classifies its rarity, and flags any fancy pattern. Think of it as a star note value checker and a fancy serial checker in one.",
        },
        { kind: "subheading", text: "What makes a star note rare?" },
        {
          kind: "paragraph",
          text:
            "A small print run. Rarity tracks how many replacement notes were printed in that batch, so a run of a few hundred thousand is far scarcer than a run of several million. Everything else being equal, run size is the single strongest signal.",
        },
        { kind: "subheading", text: "Where does the print-run data come from?" },
        {
          kind: "paragraph",
          text:
            "From the Bureau of Engraving and Printing's monthly production reports, which publish the star note runs for each denomination, series and district. The dataset here is a clearly labelled sample for now, expanding as we transcribe more reports, and every entry links back to its source.",
        },
        { kind: "subheading", text: "Can a star note also be a fancy serial number?" },
        {
          kind: "paragraph",
          text:
            "Yes, and those are the most desirable of all. A star note whose eight digits also form a pattern, such as a low serial, a radar or a repeater, appeals to star collectors and pattern collectors at once, so it can carry a premium well beyond either feature alone.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/2-dollar-bill-value/",
      label: "$2 bill value guide",
      description: "What $2 notes, including star notes, are actually worth.",
    },
    {
      href: "/fancy-serial-numbers/low-serial-number/",
      label: "Low serial numbers",
      description: "A low serial on a star note stacks two premiums.",
    },
    {
      href: "/",
      label: "Check any serial for patterns",
      description: "The full fancy serial number checker.",
    },
  ],
};

/** Rarity-tier rows for the ComparisonTable (thresholds mirror the engine). */
export const rarityTierRows: string[][] = [
  ["Very Rare", "320,000 or fewer", "Small runs collectors actively chase; the strongest premiums."],
  ["Rare", "320,001 – 640,000", "Genuinely scarce; a clear step above a common star."],
  ["Uncommon", "640,001 – 1,600,000", "Mid-sized runs; a modest premium, more in high grade."],
  ["Common", "Above 1,600,000", "Large runs; usually a small premium over face value."],
];

/** Silo 1 pattern pages most relevant to a star note. */
export const patternPageIds = ["low-serial-10", "radar", "ladder", "birthday-note"];

export const patternLinkLabels: Record<string, string> = {
  "low-serial-10": "Low serial numbers",
  radar: "Radar serial numbers",
  ladder: "Ladder serial numbers",
  "birthday-note": "Birthday notes",
};
