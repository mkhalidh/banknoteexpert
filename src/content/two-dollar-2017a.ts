import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/2017a/",
    title: "2017A $2 Bill Value: Prices and Star Notes",
    description:
      "What a 2017 and 2017A $2 bill is worth, with star note print runs by district and the serials that add a premium.",
    h1: "2017A $2 Bill Value: How Much Is It Worth?",
    primaryKeyword: "2017A $2 bill value",
    lead:
      "A 2017A $2 bill is almost always worth exactly $2. It is a current green seal Federal Reserve Note, so ordinary notes are common. The premium sits in star notes, low or fancy serials and uncirculated grade, and several 2017A star runs by district are genuinely small.",
  },
  takeaways: [
    "Ordinary circulated 2017 and 2017A $2 bills are worth face value.",
    "Searchers use 2017 and 2017A for the same recent green seal issue.",
    "Star notes are the clearest premium; several 2017A district runs are small.",
    "Low or fancy serials and uncirculated grade also lift a 2017A note above face.",
    "Check your serial for a star, a low number or a pattern before pricing it.",
  ],
  sections: [
    {
      id: "answer",
      heading: "The short answer",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A 2017A $2 bill is a current green seal Federal Reserve Note, and an ordinary circulated example is worth its two-dollar face value. People search both 2017 and 2017A for this recent issue; the design is the same. Because these notes are recent and common, the plain note trades at face.",
        },
        {
          kind: "paragraph",
          text:
            "The 2017A notes worth more are star notes, notes with a low or patterned serial, and crisp uncirculated examples. Star notes matter most here, because several 2017A district star runs were printed in small numbers. The charts below show value ranges and the star runs by district.",
        },
      ],
    },
    {
      id: "value-chart",
      heading: "2017A $2 bill value chart",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The first chart is the ordinary 2017A note by condition, from the $2 series compilation. The star cells read no recorded sales because we have no clean single-note 2017A star sales to publish. The ordinary figures are small; the value lives in scarce star runs and special serials.",
        },
      ],
    },
    {
      id: "identify",
      heading: "Identifying your 2017 or 2017A $2 note",
      blocks: [
        {
          kind: "list",
          items: [
            "Seal colour: green (a Federal Reserve Note).",
            "Series: 2017 or 2017A, printed as recent issues.",
            "Front: Thomas Jefferson. Back: the signing of the Declaration of Independence.",
            "A star at the end of the serial marks a scarcer replacement note.",
          ],
        },
      ],
    },
    {
      id: "star-runs",
      heading: "2017A $2 star note print runs",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star value tracks run size: a full run is 3,200,000 notes, a run at or below 640,000 is scarce, and one at or below 320,000 is very rare. The table below lists the 2017A star runs by district from our BEP dataset. Several of these district runs are small, which is why a 2017A star can carry a real premium while an ordinary 2017A note stays at face value.",
        },
        {
          kind: "richtext",
          segments: [
            "If your note ends in a star, ",
            { href: "/star-note-lookup/", label: "look up a 2017A star note" },
            " to read its print run and rarity tier.",
          ],
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "Fancy and low serials on a 2017A $2",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A collectible serial lifts a common 2017A note. A very low number, a radar, a repeater or a solid all add demand. ",
            { href: "/", label: "Run your 2017A serial" },
            " to flag any pattern or low number.",
          ],
        },
      ],
    },
    {
      id: "keep-sell",
      heading: "Should you keep or spend it?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "An ordinary circulated 2017 or 2017A $2 is worth face value and can be spent. Keep it only if it is a star note, has a low or fancy serial, or is crisp uncirculated. With several small 2017A star runs, checking the serial first is worth the minute it takes.",
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a 2017A $2 bill worth?" },
        {
          kind: "paragraph",
          text:
            "For almost every note, exactly $2. A 2017 or 2017A $2 is a common green seal Federal Reserve Note, so a circulated example is face value. Star notes, low or fancy serials and uncirculated notes are worth more.",
        },
        { kind: "subheading", text: "What is the difference between 2017 and 2017A $2 bills?" },
        {
          kind: "paragraph",
          text:
            "They are the same recent design in two printings; the A marks a later run. For an ordinary note the difference does not change the face value, and searchers use the two labels interchangeably.",
        },
        { kind: "subheading", text: "Is a 2017A $2 star note worth anything?" },
        {
          kind: "paragraph",
          text:
            "Yes, more than an ordinary note, because several 2017A district star runs were small. How much depends on the exact run and condition; use the star note lookup to read your note's run, then compare recent sales.",
        },
      ],
    },
  ],
  related: [
    { href: "/2-dollar-bill-value/", label: "$2 bill value guide", description: "Values for every $2 series and seal colour." },
    { href: "/2-dollar-bill-value/star-notes/", label: "$2 star note value", description: "What $2 star notes are worth and how rarity works." },
    { href: "/2-dollar-bill-value/2013/", label: "2013 $2 bill value", description: "The previous modern green seal series." },
    { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 serial number lookup", description: "Check your 2017A serial for patterns." },
    { href: "/methodology/", label: "How we estimate value", description: "Our sources, confidence levels and limits." },
  ],
};
