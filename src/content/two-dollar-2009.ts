import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/2009/",
    title: "2009 $2 Bill Value and Serial Number Lookup",
    description:
      "Check 2009 $2 bill value and use the serial number lookup. Compare ordinary notes, star runs, fancy serials and uncirculated examples.",
    h1: "2009 $2 Bill Value and Serial Number Lookup",
    primaryKeyword: "2009 $2 bill value",
    lead:
      "A regular circulated 2009 $2 bill is usually worth $2. Use the 2009 $2 serial number lookup below to check the eight digits and final character. Star notes, low or fancy serials and crisp uncirculated grade can add a premium.",
  },
  valueIntro: {
    defaultSeries: "2009",
    verdict: "An ordinary circulated 2009 $2 bill is normally worth face value. Smaller star-note runs, a star serial, a low or fancy serial number, a genuine error or crisp uncirculated condition can make an example collectible.",
    identification: {
      title: "2009 green seal $2 Federal Reserve Note identification",
      series: "Series 2009",
      seal: "Green seal",
      noteType: "Federal Reserve Note",
      marker: "B01234567A",
      accent: "green",
    },
  },
  takeaways: [
    "Ordinary circulated 2009 $2 bills are worth face value.",
    "The 2009 is a modern green seal Federal Reserve Note.",
    "Star notes are the clearest premium; two 2009 district star runs are modest in size.",
    "Low or fancy serials and uncirculated grade also lift a 2009 note above face.",
    "Check your serial for a star, a low number or a pattern before pricing it.",
  ],
  sections: [
    {
      id: "common-question",
      heading: "Is a 2009 $2 bill rare or worth more than $2?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A 2009 $2 bill is a modern green seal Federal Reserve Note, and a circulated example is worth its two-dollar face value. It was printed in ordinary numbers, so the plain note is common. A 2009 note is worth more only as a star note, with a low or patterned serial, or in crisp uncirculated condition.",
        },
        {
          kind: "paragraph",
          text:
            "Star notes are the most dependable premium, and a couple of 2009 district star runs are on the smaller side. The charts above show recorded value ranges and star runs by district, and the tool at the top checks your own serial.",
        },
      ],
    },
    {
      id: "value-chart",
      heading: "2009 $2 bill value chart",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The first chart is the ordinary 2009 note by condition, from the $2 series compilation. The star cells read no recorded sales because we have no clean single-note 2009 star sales to publish. The figures are small because the series circulates at face value; the value lives in the features below.",
        },
      ],
    },
    {
      id: "identify",
      heading: "Identifying your 2009 $2 note",
      blocks: [
        {
          kind: "list",
          items: [
            "Seal colour: green (a Federal Reserve Note).",
            "Series: 2009.",
            "Front: Thomas Jefferson. Back: the signing of the Declaration of Independence.",
            "A star at the end of the serial marks a scarcer replacement note.",
          ],
        },
      ],
    },
    {
      id: "star-runs",
      heading: "2009 $2 star note print runs",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star value follows run size: a full run is 3,200,000 notes, a run at or below 640,000 is scarce, and one at or below 320,000 is very rare. The table below lists the 2009 star runs by district from our BEP dataset. The recorded 2009 star runs are modest, which is why a 2009 star carries a premium over an ordinary note.",
        },
        {
          kind: "richtext",
          segments: [
            "If your note ends in a star, ",
            { href: "/star-note-lookup/", label: "look up a 2009 star note" },
            " to read its print run and rarity tier.",
          ],
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "2009 $2 bill serial number lookup",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A collectible serial lifts a common 2009 note. A very low number, a radar, a repeater or a solid all add demand. ",
            { href: "/", label: "Run your 2009 serial" },
            " to flag any pattern or low number.",
          ],
        },
      ],
    },
    {
      id: "keep-sell",
      heading: "What increases or decreases 2009 $2 bill value?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Value increases with a smaller star-note run, a low or fancy serial, a genuine printing error and crisp uncirculated condition. Folds, stains, writing, tears and a common serial decrease collector interest. A plain circulated 2009 note remains worth face value.",
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a 2009 $2 bill worth?" },
        {
          kind: "paragraph",
          text:
            "For almost every note, exactly $2. A 2009 $2 is a common green seal Federal Reserve Note, so a circulated example is face value. Star notes, low or fancy serials and uncirculated notes are worth more.",
        },
        { kind: "subheading", text: "Is a 2009 $2 bill worth more than $2?" },
        {
          kind: "paragraph",
          text:
            "Usually not. It is worth more only when it is a star note, carries a low or patterned serial, or is crisp uncirculated. A plain circulated 2009 note is ordinary currency.",
        },
        { kind: "subheading", text: "What is a 2009 $2 star note worth?" },
        {
          kind: "paragraph",
          text:
            "A 2009 star note carries a premium because replacements were printed in smaller numbers, and the recorded 2009 district runs are modest. Use the star note lookup to read your note's run, then compare recent sales for the same grade.",
        },
      ],
    },
  ],
  related: [
    { href: "/2-dollar-bill-value/", label: "$2 bill value guide", description: "Values for every $2 series and seal colour." },
    { href: "/2-dollar-bill-value/star-notes/", label: "$2 star note value", description: "What $2 star notes are worth and how rarity works." },
    { href: "/2-dollar-bill-value/2013/", label: "2013 $2 bill value", description: "The next modern green seal series." },
    { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 serial number lookup", description: "Check your 2009 serial for patterns." },
    { href: "/methodology/", label: "How we estimate value", description: "Our sources, confidence levels and limits." },
  ],
};
