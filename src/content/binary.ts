import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/binary/",
    title: "Binary Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a binary serial number on a dollar bill? Learn the definition, see examples, check the 1 in 8,749 rarity odds, and find what binary notes actually sold for.",
    h1: "Binary Serial Number",
    primaryKeyword: "binary serial number",
    lead: "A binary serial number uses exactly two different digits across all eight positions, such as 00110011. Banknote Expert checks the eight digits as a string, so the leading zeros count. Any pair of digits can qualify.",
  },
  takeaways: [
    "Binary means exactly two distinct digits in an eight-digit serial; the pair need not be 0 and 1.",
    "True Binary is the separate all-0/1 detector. A mixed 0/1 serial matches both rules.",
    "There are 11,430 binary strings among 100,000,000 eight-digit strings, or about 1 in 8,749.",
    "Recorded binary sale bands exist for Very Fine and Uncirculated notes; the circulated band has no publishable data.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What is a binary serial number?",
      blocks: [
        { kind: "paragraph", text: "A binary serial number is an eight-digit banknote serial built from exactly two distinct digits. In 00110011, the only digits are 0 and 1. The leading zeros are part of the serial, so keep all eight positions when checking a note." },
        { kind: "paragraph", text: "The prefix letter and the final letter or star are separate from the digit pattern. A binary note can use any two decimal digits, including 2 and 7, provided both appear at least once and no third digit appears." },
      ],
    },
    {
      id: "true-binary",
      heading: "Binary vs true binary",
      blocks: [
        { kind: "paragraph", text: "The checker calls a serial Binary when it has exactly two distinct digits. Its separate True Binary rule checks that every position is 0 or 1. Thus 00110011 matches both rules, while 27272727 is Binary but not True Binary. A solid 00000000 satisfies the all-0/1 test itself, but the scoring system treats solids separately; it does not satisfy the exactly-two-digits Binary rule." },
        { kind: "paragraph", text: "A trinary has exactly three distinct digits. That is the practical binary vs trinary serial number split; compare the trinary entry in the pattern directory for its own examples." },
        { kind: "richtext", segments: ["For the neighboring category, see the ", { href: "/fancy-serial-numbers/#trinary", label: "trinary pattern guide" }, "."] },
      ],
    },
    {
      id: "examples",
      heading: "Binary examples and non-examples",
      blocks: [
        { kind: "paragraph", text: "Check the full eight-character digit string, including leading zeros. These examples show why a two-digit alphabet, rather than a specific pair or arrangement, determines the basic label." },
      ],
    },
    {
      id: "rarity",
      heading: "How rare is a binary note?",
      blocks: [
        { kind: "paragraph", text: "For eight positions with leading zeros allowed, choose the two digits in 45 ways (10 choose 2). Each pair can fill eight positions in 256 ways (2 to the eighth power), but two of those use only one digit. That leaves 254 strings per pair, or 45 × 254 = 11,430 qualifying binary strings among 100,000,000 possible eight-digit strings. The resulting odds are about 1 in 8,749." },
        { kind: "paragraph", text: "These are mathematical string odds under the checker's exactly-two-digits rule. They are not a claim about how many notes were printed, survived, or are offered for sale." },
      ],
    },
    {
      id: "value",
      heading: "How much is a binary note worth?",
      blocks: [
        { kind: "paragraph", text: "Binary dollar bill value depends on the note as well as the digits. The table below reads the site's verified sold-price bands for the Binary pattern by condition. These are recorded ranges from the available sample, not offers, guarantees, or a valuation of your particular note. The circulated cell remains blank because no publishable band is recorded." },
        { kind: "richtext", segments: ["For how to compare grade, denomination, and overlapping patterns, read the ", { href: "/fancy-serial-number-value/", label: "fancy serial number value guide" }, "."] },
      ],
    },
    {
      id: "drivers",
      heading: "What raises or lowers the value?",
      blocks: [
        { kind: "list", items: [
          "True Binary uses only 0 and 1, a more specific feature than an arbitrary two-digit pair.",
          "A binary repeater repeats its first four digits; a binary radar reads the same in both directions. Overlap can attract more interest, but this table does not assign an extra premium.",
          "A star suffix can change demand, but the Binary sold-price bands exclude star notes. Research that combination separately.",
          "Denomination affects the minimum value of the bill and the market for comparable notes.",
          "Grade and eye appeal matter. Folds, stains, and damage can hold a note back; a crisp uncirculated example may draw stronger bids.",
        ] },
        { kind: "richtext", segments: ["Compare the ", { href: "/fancy-serial-numbers/#binary-repeater", label: "binary repeater" }, ", ", { href: "/fancy-serial-numbers/radar/", label: "radar guide" }, ", and ", { href: "/star-note-lookup/", label: "star note lookup" }, " before treating a combination as valuable."] },
      ],
    },
    {
      id: "keep-sell-grade",
      heading: "Should you keep, sell, or grade it?",
      blocks: [
        { kind: "paragraph", text: "Keep a binary if you like the pattern or can find comparable sold notes in the same condition and denomination that support a premium. If it is worn, visually ordinary, or would cost more to ship or grade than a realistic sale could return, spending it may be sensible. A binary label alone is not a reason to pay grading fees." },
        { kind: "paragraph", text: "Consider grading only after checking recent comparable sales for a note with the same grade potential and any stronger overlapping features. A seller's asking price is not proof of market value." },
      ],
    },
    {
      id: "check",
      heading: "How to check your serial",
      blocks: [
        { kind: "paragraph", text: "Read the eight digits between the prefix and suffix, keep leading zeros, and count the distinct digits. Exactly two means Binary. Then check whether the digits are specifically 0 and 1, and look for any repeating or mirrored arrangement." },
        { kind: "richtext", segments: ["Enter the eight digits in the ", { href: "/", label: "fancy serial number checker" }, " to see every pattern the note matches."] },
      ],
    },
    {
      id: "faq",
      heading: "Binary serial number FAQs",
      blocks: [
        { kind: "subheading", text: "What is a binary serial number?" },
        { kind: "paragraph", text: "An eight-digit serial containing exactly two distinct digits, such as 00110011." },
        { kind: "subheading", text: "Do the two digits have to be 0 and 1?" },
        { kind: "paragraph", text: "No. Any two distinct decimal digits qualify for Binary. A serial using only 0 and 1 also meets the True Binary rule." },
        { kind: "subheading", text: "What is a \"true binary\" note?" },
        { kind: "paragraph", text: "Its eight digits are all 0 or 1 under the separate True Binary detector. If both digits appear, it also matches Binary." },
        { kind: "subheading", text: "Is a binary serial number rare?" },
        { kind: "paragraph", text: "There are 11,430 qualifying eight-digit strings out of 100,000,000 possible strings, about 1 in 8,749 under the exactly-two-digits rule." },
        { kind: "subheading", text: "How much is a binary dollar bill worth?" },
        { kind: "paragraph", text: "The recorded Binary bands are $135.13 to $336.00 for Very Fine (4 sales) and $366.00 to $1,920.00 for Uncirculated (11 sales). There is no publishable circulated band. Those samples do not guarantee a similar result for another note." },
        { kind: "subheading", text: "Are binary serial numbers worth more than trinary?" },
        { kind: "paragraph", text: "A binary is mathematically more restrictive than a trinary, but that alone does not establish a price premium. Compare sold notes in the same condition and denomination." },
        { kind: "subheading", text: "Are binaries more valuable in uncirculated condition?" },
        { kind: "paragraph", text: "The site's Uncirculated Binary sample has a higher recorded band than its Very Fine sample. The samples differ, so that does not prove how much grade alone changes one note's price." },
        { kind: "subheading", text: "Should I keep or sell my binary note?" },
        { kind: "paragraph", text: "Keep it if you enjoy it or comparable sold results support a premium. Consider selling when that premium covers the effort and fees; spending a worn ordinary example is also reasonable." },
        { kind: "subheading", text: "Can I get a binary note graded?" },
        { kind: "paragraph", text: "Yes, but first compare likely sale proceeds with grading, shipping, and selling costs. A binary label by itself does not make grading economical." },
        { kind: "subheading", text: "Is a binary star note worth more?" },
        { kind: "paragraph", text: "Possibly, depending on the star note and its condition. The Binary sold-price bands exclude star notes, so they cannot establish a star-note premium." },
      ],
    },
  ],
  related: [
    { href: "/fancy-serial-numbers/", label: "All fancy serial patterns", description: "Compare Binary with the full pattern directory." },
    { href: "/fancy-serial-numbers/#trinary", label: "Trinary serial numbers", description: "Compare three-digit and two-digit serials." },
    { href: "/fancy-serial-numbers/ladder/", label: "Ladder serial numbers", description: "Explore eight-digit sequences." },
    { href: "/fancy-serial-numbers/radar/", label: "Radar serial numbers", description: "See mirrored serials, including binary radars." },
    { href: "/fancy-serial-numbers/#repeater", label: "Repeater serial numbers", description: "Learn how four-digit blocks can repeat." },
  ],
};

export const examples = [
  ["00110011", "Binary and True Binary; first four digits repeat"],
  ["27272727", "Binary; the two digits are 2 and 7"],
  ["11222211", "Binary radar; reads the same in reverse"],
  ["00000000", "Not Binary; only one distinct digit"],
  ["00110211", "Not Binary; contains 0, 1, and 2"],
  ["12345678", "Not Binary; eight distinct digits"],
] as const;
