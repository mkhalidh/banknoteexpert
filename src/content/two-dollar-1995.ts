import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/1995/",
    title: "1995 $2 Bill Value: Prices and Star Notes",
    description:
      "What a 1995 $2 bill is worth. Ordinary notes are face value; the premium sits in star notes, fancy serials and uncirculated grade.",
    h1: "1995 $2 Bill Value: How Much Is It Worth?",
    primaryKeyword: "1995 $2 bill value",
    lead:
      "A 1995 $2 bill is almost always worth exactly $2. It is a modern green seal Federal Reserve Note, printed in ordinary quantities, so a circulated example is common currency. A 1995 note is worth more only when it is a star note, carries a low or fancy serial, or is in crisp uncirculated condition.",
  },
  takeaways: [
    "Ordinary circulated 1995 $2 bills are worth face value; the series is not rare.",
    "The 1995 is a green seal Federal Reserve Note, the first $2 after the 1976 series.",
    "Value comes from star notes, fancy or low serials, and uncirculated grade.",
    "Our BEP dataset has no 1995 $2 star run sizes, so we do not publish them.",
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
            "A 1995 $2 bill is a modern green seal Federal Reserve Note and, for almost everyone, it is worth its two-dollar face value. It was the first $2 series printed after the 1976 bicentennial note, following a long gap, but it was still produced in ordinary numbers, so a circulated 1995 note is common and trades at face.",
        },
        {
          kind: "paragraph",
          text:
            "The 1995 notes worth more than $2 are the exceptions: star notes, notes with a low or patterned serial, and crisp uncirculated examples. The chart below shows recorded ranges, and you can check your own serial with the tool further down.",
        },
      ],
    },
    {
      id: "value-chart",
      heading: "1995 $2 bill value chart",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The first chart is the ordinary 1995 note by condition, from the $2 series compilation. The second would show star notes, but we have no clean single-note 1995 star sales to publish, so those cells read no recorded sales rather than a guess. The figures are small because the series circulates at face value; the premium lives in the features below.",
        },
      ],
    },
    {
      id: "identify",
      heading: "Identifying your 1995 $2 note",
      blocks: [
        {
          kind: "list",
          items: [
            "Seal colour: green (a Federal Reserve Note, not a red seal United States Note).",
            "Series: 1995.",
            "Front: Thomas Jefferson. Back: the signing of the Declaration of Independence.",
            "A star at the end of the serial marks a scarcer replacement note.",
          ],
        },
      ],
    },
    {
      id: "star-notes",
      heading: "1995 $2 star notes",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star notes are the most reliable way for a 1995 $2 to carry a premium, because replacements were printed in smaller numbers than regular notes. Our BEP production dataset does not include 1995 $2 star run sizes, so we do not publish run figures for this series; the table below reflects that.",
        },
        {
          kind: "richtext",
          segments: [
            "If your note ends in a star, you can ",
            { href: "/star-note-lookup/", label: "look up a 1995 star note" },
            " to read its run where data exists.",
          ],
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "Fancy and low serials on a 1995 $2",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A collectible serial is the other route to a premium. A very low number, a radar, a repeater or a solid all add demand. ",
            { href: "/", label: "Run your 1995 serial" },
            " to flag any pattern or low number in seconds.",
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
            "Unless your 1995 $2 is a star note, has a low or fancy serial, or is crisp uncirculated, it is ordinary currency worth two dollars, and there is no harm in spending it. Keep one as a memento if you like, but check the serial first so you do not spend a genuinely collectible note by mistake.",
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a 1995 $2 bill worth?" },
        {
          kind: "paragraph",
          text:
            "For almost every note, exactly $2. A 1995 $2 is a common green seal Federal Reserve Note, so a circulated example is worth face value. Star notes, low or fancy serials and crisp uncirculated notes are the ones worth more.",
        },
        { kind: "subheading", text: "Is a 1995 $2 bill rare?" },
        {
          kind: "paragraph",
          text:
            "No. The 1995 series was printed in ordinary numbers and is common. It feels unusual only because $2 notes circulate lightly and people set them aside, not because it is scarce.",
        },
        { kind: "subheading", text: "What is a 1995 $2 star note worth?" },
        {
          kind: "paragraph",
          text:
            "A 1995 star note carries a premium over face because replacements were printed in smaller numbers. We do not have 1995 $2 star run sizes in our BEP dataset, so condition and the specific note decide the figure; compare recent sales for the same grade.",
        },
        { kind: "subheading", text: "Should I spend a 1995 $2 bill?" },
        {
          kind: "paragraph",
          text:
            "If it is an ordinary circulated note with no star and a plain serial, spending it is fine. If it is uncirculated, a star, or has a low or patterned serial, keep it and check its value first.",
        },
      ],
    },
  ],
  related: [
    { href: "/2-dollar-bill-value/", label: "$2 bill value guide", description: "Values for every $2 series and seal colour." },
    { href: "/2-dollar-bill-value/star-notes/", label: "$2 star note value", description: "What $2 star notes are worth and how rarity works." },
    { href: "/2-dollar-bill-value/2003/", label: "2003 $2 bill value", description: "The next modern series, 2003 and 2003A." },
    { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 serial number lookup", description: "Check your 1995 serial for patterns." },
    { href: "/methodology/", label: "How we estimate value", description: "Our sources, confidence levels and limits." },
  ],
};
