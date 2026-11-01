import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/2017a/",
    title: "2017 and 2017A $2 Bill Value and Serial Lookup",
    description:
      "Check 2017 and 2017A $2 bill value, star note runs and serial numbers. Most notes are worth $2 unless condition or rarity adds a premium.",
    h1: "2017 and 2017A $2 Bill Value and Serial Lookup",
    primaryKeyword: "2017A $2 bill value",
    lead:
      "A regular circulated 2017A $2 bill is usually worth $2. Searchers often type 2017, although the printed series is 2017A. Use the serial lookup below to find a star or fancy number, then compare the district run and condition.",
  },
  valueIntro: {
    defaultSeries: "2017A",
    verdict: "Most circulated 2017 and 2017A $2 bills are worth face value. Several 2017A star-note runs are smaller, and low or fancy serial numbers, genuine errors and crisp uncirculated condition can add value.",
    identification: {
      title: "2017A green seal $2 Federal Reserve Note identification",
      series: "Printed series 2017A",
      seal: "Green seal",
      noteType: "Federal Reserve Note",
      marker: "B01234567A",
      accent: "green",
    },
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
      id: "common-question",
      heading: "Is it a 2017 or 2017A $2 bill?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A 2017A $2 bill is a current green seal Federal Reserve Note, and an ordinary circulated example is worth its two-dollar face value. People search both 2017 and 2017A for this recent issue; the design is the same. Because these notes are recent and common, the plain note trades at face.",
        },
        {
          kind: "paragraph",
          text:
            "The 2017A notes worth more are star notes, notes with a low or patterned serial, and crisp uncirculated examples. Star notes matter most because several district runs were printed in small numbers. The charts above show value ranges and star runs by district.",
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
      heading: "2017 and 2017A $2 bill serial number lookup",
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
      heading: "What increases or decreases 2017A $2 bill value?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Value increases with a small district star run, a low or fancy serial, a genuine printing error and crisp uncirculated condition. Folds, stains, writing, tears and a common serial decrease collector interest. A plain circulated 2017A note remains worth face value.",
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
