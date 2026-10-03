import type { PageContent, ContentSection } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/where-is-the-serial-number-on-a-dollar-bill/",
    title: "Where Is the Serial Number on a Dollar Bill? All Denominations",
    description:
      "The serial number on a dollar bill is printed twice in green, upper-right and lower-left. See where to find it on $1, $2, $5, $10, $20 and $100 notes.",
    h1: "Where Is the Serial Number on a Dollar Bill?",
    primaryKeyword: "where is the serial number on a dollar bill",
    lead:
      "The serial number on a dollar bill is printed twice on the front in green ink, once in the upper-right and once in the lower-left. It is a short string of one or two letters, eight digits, and a final letter or star, and every US denomination follows the same layout.",
  },
  takeaways: [
    "The serial appears twice on the face: upper-right and lower-left, in green ink.",
    "Both printings are identical, so either one gives you the full number.",
    "The structure is prefix letter(s), eight digits, then a suffix letter or star.",
    "Only the eight digits form a collectible pattern; the letters give context.",
    "The layout is the same on $1 through $100, with only minor design differences.",
  ],
  sections: [
    {
      id: "positions",
      heading: "Two printings, both in green ink",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Turn any US note face-up and you will find the serial number printed in two places: the upper-right quadrant and the lower-left quadrant. Both are set in the same green ink as the Treasury seal, which sits between them near the portrait. The two printings always carry the same characters, so you only need to read one of them.",
        },
        {
          kind: "paragraph",
          text:
            "Printing the number twice is a long-standing anti-counterfeiting measure: the two impressions must match, and both must align with the rest of the note. For collectors, it simply means the serial is easy to find from either corner, whichever way the bill is sitting.",
        },
      ],
    },
    {
      id: "structure",
      heading: "Prefix, digits, suffix and star",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Read the serial left to right and it always follows the same structure. One or two prefix letters come first and identify the series year and the Federal Reserve district that issued the note. Then come exactly eight digits. After the digits sits a single suffix letter, or a star in place of that letter.",
        },
        {
          kind: "list",
          items: [
            "Prefix letter(s): the series and issuing district, which is context, not pattern.",
            "Eight digits: the part that forms a collectible pattern.",
            "Suffix letter or star: a star marks a replacement note, printed to swap out a spoiled one.",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "When you check a note, it is only those eight digits that matter. Type them into the ",
            { href: "/", label: "fancy serial number checker" },
            " and it will tell you whether they form a radar, a solid, a low serial or another collectible pattern.",
          ],
        },
      ],
    },
    {
      id: "variations",
      heading: "Small differences between series",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Newer redesigns moved the portrait and added security features, and the typeface of the serial has changed slightly over the years, but the two positions have stayed put. Whether you are holding an older small-portrait note or a modern redesign, look upper-right and lower-left and you will find the number. On very old large-size notes the layout differs, but every note you are likely to have in your wallet follows the modern pattern.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/fancy-serial-numbers/",
      label: "What makes a serial number fancy",
      description: "The full taxonomy of collectible patterns.",
    },
    {
      href: "/fancy-serial-number-value/",
      label: "Fancy serial number price guide",
      description: "What each pattern is worth by condition.",
    },
    {
      href: "/fancy-serial-numbers/low-serial-number/",
      label: "Low serial numbers",
      description: "Why small numbers like 00000001 are prized.",
    },
  ],
};

export const denomIntro =
  "The position is consistent across denominations, but here is exactly where to look on each of the notes you are most likely to check, along with any quirks worth knowing.";

export interface DenominationInfo {
  id: string;
  /** Short label drawn on the diagram, e.g. "$1". */
  label: string;
  heading: string;
  note: string;
}

export const denominations: DenominationInfo[] = [
  {
    id: "one-dollar",
    label: "$1",
    heading: "$1 bill",
    note: "The $1 note is the one most people check first. Washington sits in the centre, and the serial number is upper-right and lower-left in green ink. Because ones are printed in vast quantities, they are a great place to start hunting for patterns.",
  },
  {
    id: "two-dollar",
    label: "$2",
    heading: "$2 bill",
    note: "People often ask where is the serial number on a 2 dollar bill: it is in the same two corners as every other note, framing Jefferson's portrait. The layout on a two dollar bill is identical, so read the eight digits between the prefix and suffix just as you would on a $1.",
  },
  {
    id: "five-dollar",
    label: "$5",
    heading: "$5 bill",
    note: "The redesigned $5 added extra security printing and a large purple 5, but the serial number kept its place in the upper-right and lower-left. Lincoln's portrait sits between the two printings.",
  },
  {
    id: "ten-dollar",
    label: "$10",
    heading: "$10 bill",
    note: "On the $10 note, Hamilton's portrait is flanked by the same two serial positions. The colour-shifting ink and background tints do not move the number, which stays upper-right and lower-left.",
  },
  {
    id: "twenty-dollar",
    label: "$20",
    heading: "$20 bill",
    note: "For where is the serial number on a 20 dollar bill, the answer is unchanged: upper-right and lower-left, around Jackson's portrait. The larger portrait redesign shifted other elements but left the serial positions alone.",
  },
  {
    id: "hundred-dollar",
    label: "$100",
    heading: "$100 bill",
    note: "The $100 is the most rewarding note to check because a pattern on a high denomination carries more. Despite the 3-D security ribbon and colour-shifting features, the serial number is still printed upper-right and lower-left, around Franklin's portrait.",
  },
];

export const closing: ContentSection = {
  id: "check-your-note",
  heading: "Read the digits, then check them",
  blocks: [
    {
      kind: "paragraph",
      text:
        "Once you have located the serial from either corner, write down the eight digits in order, ignoring the prefix and suffix letters. Leading zeros count, so 00000045 is forty-five, not forty-five thousand.",
    },
    {
      kind: "richtext",
      segments: [
        "Then put those digits to work: ",
        { href: "/", label: "run them through the serial number checker" },
        " to see instantly whether your note is an ordinary bill or something a collector would want.",
      ],
    },
  ],
};
