import type { PageContent, ContentSection } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/where-is-the-serial-number-on-a-dollar-bill/",
    title: "Where Is the Serial Number on a Dollar Bill? $1-$100 Guide",
    description:
      "Find serial numbers on $1, $2, $20 and $100 bills. See where they appear on the front, what the letters and star mean, and how to check the eight digits.",
    h1: "Where Is the Serial Number on a Dollar Bill?",
    primaryKeyword: "where is the serial number on a dollar bill",
    lead:
      "Look on the front of a U.S. bill for the green serial printed twice. On $1 and $2 notes, it sits at the upper right and lower left. On newer $5, $10, $20, $50 and $100 notes, look at the upper left and lower right. Both copies show the same number.",
  },
  takeaways: [
    "The green serial appears twice on the front of a Federal Reserve note.",
    "Both printings are identical, so either one gives you the full number.",
    "$1 and $2: upper right and lower left. Newer $5-$100: upper left and lower right.",
    "$1 and $2 bills have one prefix letter; newer $5-$100 bills have two.",
    "Read all eight digits, including leading zeros; a star replaces the final letter on a replacement note.",
  ],
  sections: [
    {
      id: "positions",
      heading: "Where is the serial number on a dollar bill?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Hold the bill with the portrait facing you. On a $1 or $2 note, find the green serial near the upper-right corner and again near the lower-left. On redesigned $5 through $100 notes, the matching serials are near the upper-left and lower-right. The number is on the front, not the back.",
        },
        {
          kind: "paragraph",
          text:
            "The diagram below each denomination marks both positions. It is a simplified illustration, so use your bill's own printed characters when entering a number into a lookup tool.",
        },
      ],
    },
    {
      id: "structure",
      heading: "What does a dollar bill serial number look like?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A modern Federal Reserve note's serial has a letter prefix, eight digits, and a final letter or star. On $1 and $2 bills, the prefix is one letter identifying the Federal Reserve Bank. On newer $5, $10, $20, $50 and $100 notes, the first prefix letter identifies the series and the second identifies the Federal Reserve Bank.",
        },
        {
          kind: "list",
          items: [
            "$1 or $2 example: A12345678B (one prefix letter).",
            "$5-$100 example: AB12345678C (two prefix letters on newer series).",
            "Star note example: A12345678* (the star takes the suffix letter's place).",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "For a fancy digit pattern, enter the eight digits, including any zeros at the start, into the ",
            { href: "/", label: "fancy serial number checker" },
            ". Keep the letters and star in mind when identifying the note: a star also matters for replacement-note research.",
          ],
        },
      ],
    },
    {
      id: "variations",
      heading: "Is the series year or another printed number the serial number?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "No. The series year is a small label such as Series 2017A; it identifies a design or signature change, not your bill's unique serial. The large corner numerals show the denomination. A separate Federal Reserve indicator and tiny plate numbers are also different from the green serial printed twice on the front.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/2-dollar-bill-serial-number-lookup/",
      label: "$2 bill serial number lookup",
      description: "Check a two-dollar bill's serial pattern and series.",
    },
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
  "The location changes with the design: $1 and $2 use upper right and lower left; newer $5 through $100 notes use upper left and lower right. The illustrations use example serials, not numbers from actual bills.";

export interface DenominationInfo {
  id: string;
  /** Short label drawn on the diagram, e.g. "$1". */
  label: string;
  heading: string;
  note: string;
  exampleSerial: string;
  topSerialSide: "left" | "right";
}

export const denominations: DenominationInfo[] = [
  {
    id: "one-dollar",
    label: "$1",
    heading: "$1 bill serial number",
    note: "On the front of a $1 bill, look above and to the right of Washington's portrait, then below and to the left. The one-letter prefix comes before the eight digits.",
    exampleSerial: "A12345678B",
    topSerialSide: "right",
  },
  {
    id: "two-dollar",
    label: "$2",
    heading: "Where is the serial number on a $2 bill?",
    note: "On a $2 bill, find the green serial above-right and below-left of Jefferson's portrait. It has one prefix letter, eight digits and a final letter or star. Both printed copies match.",
    exampleSerial: "A12345678B",
    topSerialSide: "right",
  },
  {
    id: "five-dollar",
    label: "$5",
    heading: "$5 bill serial number",
    note: "On the front of a redesigned $5 bill, the green serial appears at the upper left and lower right. Newer $5 notes have two prefix letters.",
    exampleSerial: "AB12345678C",
    topSerialSide: "left",
  },
  {
    id: "ten-dollar",
    label: "$10",
    heading: "$10 bill serial number",
    note: "On the front of a redesigned $10 bill, check the upper left and lower right. The serial is the repeated green letter-and-digit string, not the large 10.",
    exampleSerial: "AB12345678C",
    topSerialSide: "left",
  },
  {
    id: "twenty-dollar",
    label: "$20",
    heading: "Where is the serial number on a $20 bill?",
    note: "On a redesigned $20 bill, find the green serial at the upper left and lower right. Read either copy; the small Federal Reserve indicator and plate numbers are separate markings.",
    exampleSerial: "AB12345678C",
    topSerialSide: "left",
  },
  {
    id: "fifty-dollar",
    label: "$50",
    heading: "$50 bill serial number",
    note: "On the front of a redesigned $50 bill, the green serial is near the upper-left and lower-right corners, around Grant's portrait.",
    exampleSerial: "AB12345678C",
    topSerialSide: "left",
  },
  {
    id: "hundred-dollar",
    label: "$100",
    heading: "Where is the serial number on a $100 bill?",
    note: "On a redesigned $100 bill, the green serial appears at the upper left and lower right. The blue security ribbon and large 100 are not part of the serial number.",
    exampleSerial: "AB12345678C",
    topSerialSide: "left",
  },
];

export const closing: ContentSection = {
  id: "check-your-note",
  heading: "Read the digits, then check them",
  blocks: [
    {
      kind: "paragraph",
      text:
        "Once you have located the serial from either corner, copy its eight digits in order. Keep leading zeros: 00000045 is a different eight-digit pattern from 00004500. Also note any star at the end if you want to research the replacement note.",
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

export const sources: ContentSection = {
  id: "sources",
  heading: "Sources for serial-number identification",
  blocks: [
    { kind: "richtext", segments: [
      "The ", { href: "https://www.bep.gov/currency/serial-numbers", label: "Bureau of Engraving and Printing's serial-number guide" },
      " explains prefix letters, eight digits and star replacements. The ",
      { href: "https://www.uscurrency.gov/denominations/bank-note-identifiers", label: "U.S. Currency Education Program's banknote identifiers" },
      " distinguish the serial from the series year, Federal Reserve indicator and plate numbers. Its ",
      { href: "https://www.uscurrency.gov/sites/default/files/downloadable-materials/files/en/dollars-in-detail-guide-en-2022.pdf", label: "Dollars in Detail guide" },
      " labels the serial positions on redesigned $5-$100 notes.",
    ] },
  ],
};
