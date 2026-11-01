import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/2003/",
    title: "2003 $2 Bill Value: 2003 vs 2003A and Star Notes",
    description:
      "What a 2003 or 2003A $2 bill is worth, how the two differ, and the star note print runs that drive the real premiums.",
    h1: "2003 $2 Bill Value: How Much Is It Worth?",
    primaryKeyword: "2003 $2 bill value",
    lead:
      "A 2003 $2 bill is almost always worth exactly $2. It is a modern green seal Federal Reserve Note, issued in two sub-series, 2003 and 2003A. The premium sits in star notes, low or fancy serials and uncirculated grade, and some 2003 and 2003A star runs are genuinely scarce.",
  },
  takeaways: [
    "Ordinary circulated 2003 and 2003A $2 bills are worth face value.",
    "There are two sub-series: 2003 and 2003A, which differ by signatures and printing.",
    "Star notes drive the premium; the 2003A Atlanta star run is very small in our data.",
    "Low or fancy serials and uncirculated grade also lift a 2003 note above face.",
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
            "A 2003 $2 bill is a modern green seal Federal Reserve Note, and an ordinary circulated example is worth its two-dollar face value. The series comes in two sub-series, 2003 and 2003A, both common in regular notes. What lifts a 2003 note above face is a star note, a low or patterned serial, or crisp uncirculated condition.",
        },
        {
          kind: "paragraph",
          text:
            "Star notes are where it gets interesting: some 2003 and 2003A star runs were small. The charts below show recorded value ranges and the star print runs by district, and you can check your own serial with the tool further down.",
        },
      ],
    },
    {
      id: "value-chart",
      heading: "2003 and 2003A $2 bill value chart",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The first chart is regular 2003 and 2003A notes by condition, from the $2 series compilation. The second would show star notes, but we have no clean single-note 2003 star sales to publish, so those cells read no recorded sales. The value lives in scarce star runs and special serials rather than the ordinary note.",
        },
      ],
    },
    {
      id: "vs-2003a",
      heading: "2003 vs 2003A: what is the difference?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The 2003 and 2003A are the same design in two printings. The letter A marks a later production run with a different Treasury signature combination. Both circulate at face value in ordinary condition, so the sub-series letter matters mainly for collectors chasing specific star notes or serials rather than for the value of a plain note.",
        },
      ],
    },
    {
      id: "star-runs",
      heading: "2003 and 2003A $2 star note print runs",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star value tracks run size: a standard full run is 3,200,000 notes, a run at or below 640,000 is scarce, and one at or below 320,000 is very rare. The tables below give the star runs by district from our BEP dataset. One caveat: the smallest 2003 figures are reported as early partial monthly production, so treat those very small runs as provisional rather than final totals.",
        },
      ],
    },
    {
      id: "fancy-serials",
      heading: "Fancy and low serials on a 2003 $2",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A collectible serial lifts a common 2003 note. A very low number, a radar, a repeater or a solid all add demand. ",
            { href: "/", label: "Run your 2003 serial" },
            " to flag any pattern or low number.",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "If the note ends in a star, ",
            { href: "/star-note-lookup/", label: "look up a 2003 star note" },
            " to read its print run and rarity tier.",
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
            "An ordinary circulated 2003 or 2003A $2 is worth face value and can be spent. Keep it only if it is a star note, has a low or fancy serial, or is crisp uncirculated. Check the serial first, because a scarce 2003A star is worth setting aside rather than spending.",
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a 2003 $2 bill worth?" },
        {
          kind: "paragraph",
          text:
            "For almost every note, exactly $2. A 2003 or 2003A $2 is a common green seal Federal Reserve Note, so a circulated example is face value. Star notes, low or fancy serials and uncirculated notes are worth more.",
        },
        { kind: "subheading", text: "What is the difference between a 2003 and 2003A $2 bill?" },
        {
          kind: "paragraph",
          text:
            "They are the same design in two printings; the A marks a later run with a different signature combination. For an ordinary note the difference does not change the face value, but it matters to collectors chasing specific star notes or serials.",
        },
        { kind: "subheading", text: "What is a 2003 $2 star note worth?" },
        {
          kind: "paragraph",
          text:
            "It depends on the run size and condition. Some 2003 and 2003A star runs were small, including a very small 2003A Atlanta run in our data, which makes those stars scarcer. Use the star note lookup to read your note's run, then compare recent sales.",
        },
        { kind: "subheading", text: "Are 2003 $2 bills worth keeping?" },
        {
          kind: "paragraph",
          text:
            "Only if the note is a star, has a special serial, or is uncirculated. A plain circulated 2003 or 2003A note is ordinary currency worth two dollars.",
        },
      ],
    },
  ],
  related: [
    { href: "/2-dollar-bill-value/", label: "$2 bill value guide", description: "Values for every $2 series and seal colour." },
    { href: "/2-dollar-bill-value/star-notes/", label: "$2 star note value", description: "What $2 star notes are worth and how rarity works." },
    { href: "/2-dollar-bill-value/2009/", label: "2009 $2 bill value", description: "The next modern green seal series." },
    { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 serial number lookup", description: "Check your 2003 serial for patterns." },
    { href: "/methodology/", label: "How we estimate value", description: "Our sources, confidence levels and limits." },
  ],
};
