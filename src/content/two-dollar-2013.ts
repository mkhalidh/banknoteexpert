import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/2013/",
    title: "2013 $2 Bill Value: Prices and Star Notes",
    description:
      "What a 2013 $2 bill is worth. Most are face value; the value lives in star notes, fancy serials and crisp uncirculated notes.",
    h1: "2013 $2 Bill Value: How Much Is It Worth?",
    primaryKeyword: "2013 $2 bill value",
    lead:
      "A 2013 $2 bill is almost always worth exactly $2. It is one of the most searched modern $2 notes, but it is a common green seal Federal Reserve Note. A 2013 note is worth more only as a star note, with a low or fancy serial, or in crisp uncirculated condition.",
  },
  takeaways: [
    "Ordinary circulated 2013 $2 bills are worth face value.",
    "The 2013 is a common modern green seal Federal Reserve Note.",
    "Value comes from star notes, fancy or low serials, and uncirculated grade.",
    "Our BEP dataset has no 2013 $2 star run sizes, so we do not publish them.",
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
            "A 2013 $2 bill is a modern green seal Federal Reserve Note, and a circulated example is worth its two-dollar face value. It is one of the most asked-about modern $2 notes, but being asked about is not the same as being rare: the 2013 series was printed in ordinary numbers and the plain note is common.",
        },
        {
          kind: "paragraph",
          text:
            "A 2013 note climbs above face only when it is a star note, carries a low or patterned serial, or is crisp uncirculated. The chart below shows the recorded range, and you can check your own serial with the tool further down.",
        },
      ],
    },
    {
      id: "value-chart",
      heading: "2013 $2 bill value chart",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The chart is the ordinary 2013 note by condition, from the $2 series compilation. We have no clean single-note 2013 star sales to publish, so those cells read no recorded sales. The figures are small because the series circulates at face value; the premium lives in the features below.",
        },
      ],
    },
    {
      id: "identify",
      heading: "Identifying your 2013 $2 note",
      blocks: [
        {
          kind: "list",
          items: [
            "Seal colour: green (a Federal Reserve Note).",
            "Series: 2013.",
            "Front: Thomas Jefferson. Back: the signing of the Declaration of Independence.",
            "A star at the end of the serial marks a scarcer replacement note.",
          ],
        },
      ],
    },
    {
      id: "star-notes",
      heading: "2013 $2 star notes",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star notes are the most reliable premium on a 2013 $2, because replacements were printed in smaller numbers. Our BEP production dataset does not include 2013 $2 star run sizes, so we do not publish run figures for this series; the note below reflects that.",
        },
        {
          kind: "richtext",
          segments: [
            "If your note ends in a star, ",
            { href: "/star-note-lookup/", label: "look up a 2013 star note" },
            " to read its run where data exists.",
          ],
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "Fancy and low serials on a 2013 $2",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A collectible serial is the other route to a premium on this common series. A very low number, a radar, a repeater or a solid all add demand. ",
            { href: "/", label: "Run your 2013 serial" },
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
            "An ordinary circulated 2013 $2 is worth face value and can be spent. Keep it only if it is a star note, has a low or fancy serial, or is crisp uncirculated. Checking the serial takes under a minute and tells you which it is.",
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a 2013 $2 bill worth?" },
        {
          kind: "paragraph",
          text:
            "For almost every note, exactly $2. A 2013 $2 is a common green seal Federal Reserve Note, so a circulated example is face value. Star notes, low or fancy serials and uncirculated notes are the ones worth more.",
        },
        { kind: "subheading", text: "Are 2013 $2 bills rare?" },
        {
          kind: "paragraph",
          text:
            "No. The 2013 series was printed in ordinary numbers and is common. It is searched a lot, but high search interest is not the same as scarcity.",
        },
        { kind: "subheading", text: "What is a 2013 $2 star note worth?" },
        {
          kind: "paragraph",
          text:
            "A 2013 star note carries a premium over face because replacements were printed in smaller numbers. We do not have 2013 $2 star run sizes in our BEP dataset, so condition and the specific note decide the figure; compare recent sales for the same grade.",
        },
        { kind: "subheading", text: "Should I keep a 2013 $2 bill?" },
        {
          kind: "paragraph",
          text:
            "Keep it if it is a star, has a low or fancy serial, or is uncirculated. Otherwise it is ordinary currency worth two dollars, and spending it is fine.",
        },
      ],
    },
  ],
  related: [
    { href: "/2-dollar-bill-value/", label: "$2 bill value guide", description: "Values for every $2 series and seal colour." },
    { href: "/2-dollar-bill-value/star-notes/", label: "$2 star note value", description: "What $2 star notes are worth and how rarity works." },
    { href: "/2-dollar-bill-value/2017a/", label: "2017A $2 bill value", description: "The next modern green seal series." },
    { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 serial number lookup", description: "Check your 2013 serial for patterns." },
    { href: "/methodology/", label: "How we estimate value", description: "Our sources, confidence levels and limits." },
  ],
};
