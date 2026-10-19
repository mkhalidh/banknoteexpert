import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/fancy-serial-numbers/super-radar/",
    title: "Super Radar Serial Number on a Dollar Bill: What It Is, Rarity & Value | Banknote Expert",
    description: "What is a super radar serial number on a dollar bill? Learn the definition, see examples, check the rarity odds, and find what super radar notes actually sold for.",
    h1: "Super Radar Serial Number",
    primaryKeyword: "super radar serial number",
    lead: "A super radar serial number is an eight-digit palindrome whose inner six digits are identical, such as 17777771. Banknote Expert checks the digits between the serial letters; a matching outer pair surrounds one repeated digit in the middle.",
  },
  takeaways: [
    "A super radar has the ABBBBBBA shape and reads identically in both directions.",
    "A regular radar needs only a mirror; a super radar also needs all six middle digits to match.",
    "The raw detector matches 100 eight-digit strings, including 10 solids. The non-solid pattern has 90 strings, about 1 in 1,111,111.",
    "Recorded sale bands exist for Circulated, Very Fine, and Uncirculated notes, but none predicts one note's sale price.",
  ],
  sections: [
    {
      id: "definition",
      heading: "What is a super radar serial number?",
      blocks: [
        { kind: "paragraph", text: "A super radar note has an eight-digit serial that reads the same forward and backward, with all six inner digits identical. The dollar bill serial 17777771 has matching outer 1s around six 7s. This makes it a perfect palindrome with the more restrictive ABBBBBBA shape." },
        { kind: "paragraph", text: "Only the eight digits determine the pattern. Keep any leading zeros when reading them; the prefix letter and final letter or star do not change the digit test." },
      ],
    },
    {
      id: "comparison",
      heading: "Super radar vs radar: what makes it super?",
      blocks: [
        { kind: "paragraph", text: "Every super radar is a radar, but an ordinary radar can have several different digits in its mirrored halves. For example, 12344321 reads the same in reverse, yet its inner six digits are not identical. The extra requirement is the continuous six-digit center, not merely the matching ends." },
        { kind: "richtext", segments: ["The ", { href: "/fancy-serial-numbers/radar/", label: "radar serial number guide" }, " explains the broader palindrome family. A ", { href: "/fancy-serial-numbers/radar-repeater/", label: "radar repeater" }, " also repeats a block, which is a different extra rule."] },
      ],
    },
    {
      id: "examples",
      heading: "Super radar examples and non-examples",
      blocks: [
        { kind: "paragraph", text: "Read each entry as an eight-character string, including any zero at the start. The table separates the raw detector's solid edge case from the Super Radar label shown in checker results." },
      ],
    },
    {
      id: "rarity",
      heading: "How rare is a super radar?",
      blocks: [
        { kind: "paragraph", text: "The detector checks a palindrome with six matching inner digits. Choose the outer digit in 10 ways and the inner digit in 10 ways: 100 strings out of 100,000,000 eight-digit strings match the raw rule, or 1 in 1,000,000. This is the figure previously shown on the pattern directory." },
        { kind: "paragraph", text: "Ten of those strings are solids, where outer and inner digits are the same. Excluding solids leaves 10 choices for the outer digit and 9 for a different inner digit, or 90 strings. That is about 1 in 1,111,111, often shortened to 1.1 million. Two of those 90 use only 0 and 1, so the checker displays its more specific True Binary Radar label for them. The two commonly quoted rarity odds count different sets; they are not conflicting print-run data." },
        { kind: "paragraph", text: "These are theoretical eight-digit string odds. Actual production, survival, and collector supply vary, and the digit calculation alone cannot establish a note's market value." },
      ],
    },
    {
      id: "value",
      heading: "How much is a super radar worth?",
      blocks: [
        { kind: "paragraph", text: "Super radar note value depends on the bill, its condition, and the buyers who see it. The table shows only the site's existing recorded sold-price bands, with each band's sample size and confidence. These samples include de-confounded super radar eBay sold records, but they are not a quote for your note or proof of a star-note premium." },
        { kind: "richtext", segments: ["For a broader explanation of radar serial number value and comparable sales, use the ", { href: "/fancy-serial-number-value/", label: "fancy serial number value guide" }, "."] },
      ],
    },
    {
      id: "drivers",
      heading: "What moves the value?",
      blocks: [
        { kind: "list", items: [
          "A star suffix may draw interest, but the recorded Super Radar bands do not isolate a super radar star note value. Check the star's print run and compare like-for-like sales.",
          "Denomination sets the face-value floor and can change the pool of comparable notes. Compare the same denomination when possible.",
          "Some collectors prefer digits such as 7 or 8, while others like zeros. A preferred digit may affect bids, but no fixed premium follows from the digit alone.",
          "Condition and grade can change the sale result. Folds, stains, and wear reduce eye appeal; a clean, uncirculated example may attract more interest.",
          "A binary radar also uses exactly two digits. Non-solid super radars have that overlap, but the sale table does not add a separate binary premium.",
        ] },
        { kind: "richtext", segments: ["Check the ", { href: "/star-note-lookup/", label: "star note lookup" }, " and the ", { href: "/fancy-serial-numbers/binary/", label: "binary serial number guide" }, " before comparing notes with overlapping traits."] },
      ],
    },
    {
      id: "grade-or-sell",
      heading: "Should you grade or sell it?",
      blocks: [
        { kind: "paragraph", text: "Keep it if the pattern appeals to you. Before selling, compare completed sales for the same denomination and likely grade, then account for fees, postage, and the time involved. An asking price is not a sold price." },
        { kind: "paragraph", text: "Professional grading may make sense when the note is unusually clean or has another strong feature and comparable sales support the cost. A worn bill with only a partial pattern is often better spent than graded. The Super Radar label by itself does not guarantee that grading will pay off." },
      ],
    },
    {
      id: "check",
      heading: "How to check your serial",
      blocks: [
        { kind: "paragraph", text: "Copy all eight digits between the letters, preserving leading zeros. Check that the first and last digits match, then that positions two through seven all show the same digit. If the outer digit also matches the center, you have a solid serial instead of a separately scored super radar." },
        { kind: "richtext", segments: ["Run the complete serial through the ", { href: "/", label: "fancy serial number checker" }, " to see the scored result and any overlapping patterns."] },
      ],
    },
    {
      id: "faq",
      heading: "Super radar serial number FAQs",
      blocks: [
        { kind: "subheading", text: "What is a super radar note?" },
        { kind: "paragraph", text: "A note whose eight-digit serial is a palindrome with six identical middle digits, such as 17777771. In checker results, a solid is shown as Solid instead." },
        { kind: "subheading", text: "What is a radar note?" },
        { kind: "paragraph", text: "A radar note has an eight-digit serial that reads the same from either end. Its middle digits do not all need to match." },
        { kind: "subheading", text: "How much is a super radar worth?" },
        { kind: "paragraph", text: "Recorded bands are $38.00 to $500.00 for Circulated (5 sales), $43.00 to $118.68 for Very Fine (5 sales), and $264.00 to $1,020.00 for Uncirculated (9 sales). A particular note can sell differently." },
        { kind: "subheading", text: "How rare are super radars?" },
        { kind: "paragraph", text: "The raw detector matches 100 of 100,000,000 eight-digit strings, or 1 in 1,000,000. Excluding 10 solids leaves 90 non-solid super radar shapes, about 1 in 1,111,111. The checker labels two of those True Binary Radar." },
        { kind: "subheading", text: "How do I know if my serial number is valuable?" },
        { kind: "paragraph", text: "Confirm the complete pattern, then compare completed sales of notes with the same condition, denomination, and any star or other special feature. A matching shape alone does not set a price." },
        { kind: "subheading", text: "Should I spend bills with partial patterns?" },
        { kind: "paragraph", text: "Often yes, if the note does not match a recognized pattern and comparable sold notes show no premium. Keep it if you personally enjoy it." },
        { kind: "subheading", text: "Do different letter prefixes matter?" },
        { kind: "paragraph", text: "The letters do not affect the eight-digit radar test. They can matter when identifying the note and finding truly comparable sales." },
        { kind: "subheading", text: "Is my super radar worth grading?" },
        { kind: "paragraph", text: "Possibly if it is clean enough and comparable sold prices exceed grading, shipping, and selling costs. A worn example may not justify those expenses." },
        { kind: "subheading", text: "How do condition and denomination affect radar value?" },
        { kind: "paragraph", text: "Condition affects eye appeal and demand, while denomination affects the face-value floor and comparable market. Compare like notes rather than applying one band to every bill." },
        { kind: "subheading", text: "Where can I sell fancy serial bills?" },
        { kind: "paragraph", text: "Completed online marketplaces, currency dealers, and specialist auctions can help you judge demand and choose a sale venue. Compare fees and the actual sold results before listing." },
        { kind: "subheading", text: "What is the difference between a super radar and a radar?" },
        { kind: "paragraph", text: "Both are palindromes. A super radar also has six identical inner digits; an ordinary radar has no such middle-run requirement." },
      ],
    },
  ],
  related: [
    { href: "/fancy-serial-numbers/radar/", label: "Radar serial numbers", description: "Compare the broader palindrome family." },
    { href: "/fancy-serial-numbers/radar-repeater/", label: "Radar repeaters", description: "See the different repeater overlap." },
    { href: "/fancy-serial-numbers/binary/", label: "Binary serial numbers", description: "Why non-solid super radars also use two distinct digits." },
    { href: "/fancy-serial-numbers/", label: "All fancy serial patterns", description: "Browse the full pattern directory." },
  ],
};

export const examples = [
  ["17777771", "Super Radar: matching 1s around six 7s"],
  ["01111110", "Super Radar shape with leading zero; checker labels it True Binary Radar"],
  ["14444441", "Super Radar and Binary: two distinct digits"],
  ["10000001", "Super Radar shape with zero center; checker labels it True Binary Radar"],
  ["77777777", "Solid: raw Super Radar detector matches, but the checker shows Solid"],
  ["12344321", "Radar only: the inner six digits differ"],
  ["17777772", "Neither radar nor super radar: outer digits differ"],
] as const;
