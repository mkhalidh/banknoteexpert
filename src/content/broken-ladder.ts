import type { PageContent } from "@/content/types";

export const path = "/fancy-serial-numbers/broken-ladder/";

/** Checked against the pure ladder detectors in patterns.ts. */
export const examples = [
  { serial: "12345687", run: "123456 (6, ascending)", verdict: "Broken ladder", pattern: "broken-ladder" },
  { serial: "01234569", run: "0123456 (7, ascending)", verdict: "Broken ladder", pattern: "broken-ladder" },
  { serial: "98765421", run: "987654 (6, descending)", verdict: "Broken ladder", pattern: "broken-ladder" },
  { serial: "81234567", run: "1234567 (7, ascending)", verdict: "Broken ladder", pattern: "broken-ladder" },
  { serial: "12345670", run: "1234567 (7, ascending)", verdict: "Broken ladder; sometimes called near-ladder", pattern: "broken-ladder" },
  { serial: "12345678", run: "12345678 (8, ascending)", verdict: "True ladder", pattern: "ladder" },
  { serial: "13245768", run: "Maximum 2", verdict: "No ladder; digits 1–8 scrambled", pattern: "none" },
  { serial: "12344321", run: "Maximum 4", verdict: "Radar, not a ladder", pattern: "radar" },
  { serial: "12341234", run: "Maximum 4", verdict: "Repeater, not a ladder", pattern: "repeater" },
  { serial: "56789012", run: "Maximum 5", verdict: "No ladder without wrap-around", pattern: "none" },
  { serial: "00734321", run: "Maximum 4", verdict: "No ladder", pattern: "none" },
] as const;

export const content: PageContent = {
  meta: {
    path,
    title: "Broken Ladder Serial Number: Meaning, Odds and Value",
    description: "A broken ladder has six or more digits in sequence but not all eight. See examples, odds (about 1 in 35,000), value ranges and how to check yours.",
    h1: "Broken Ladder Serial Number: Meaning, Odds and Value",
    primaryKeyword: "broken ladder serial number",
    lead: "A broken ladder serial number has six or seven consecutive digits rising or falling by one, but the full eight-digit serial does not form a ladder. The checker does not join 9 to 0. A long run is uncommon, yet condition and actual sold results matter more than a seller's label when you value a note.",
  },
  takeaways: [
    "A broken ladder has a six- or seven-digit ascending or descending run but is not a full eight-digit ladder.",
    "The site's rule treats 0 as the lowest digit and does not wrap from 9 to 0.",
    "There are 2,834 broken ladders among 100,000,000 possible eight-digit serials: about 1 in 35,286.",
    "A four-digit run, a radar and digits 1–8 merely shuffled do not by themselves qualify.",
    "Most circulated finds need comparable sold results before any premium can be claimed.",
  ],
  sections: [
    {
      id: "definition", heading: "What is a broken ladder on a dollar bill?", blocks: [
        { kind: "paragraph", text: "A broken ladder on a dollar bill is an eight-digit serial containing at least six consecutive digits that change by one at each step, all ascending or all descending, without all eight digits completing the run. For example, 12345687 starts with 123456. Under this site's checker, 0 is below 1 and 9 does not roll over to 0." },
        { kind: "paragraph", text: "Read only the eight digits between the prefix letter and suffix letter or star; those letters do not extend a ladder. The same test applies across denominations. A run can start in the middle: 81234567 contains 1234567, so it qualifies." },
      ],
    },
    {
      id: "examples", heading: "Broken ladder examples", blocks: [
        { kind: "paragraph", text: "The examples below show the longest uninterrupted run and the checker's result. Trace adjacent digits from left to right; a new run starts whenever the direction changes or a digit skips. A seven-digit run still belongs to the broken category when the eighth digit prevents a complete ladder." },
        { kind: "paragraph", text: "The serial 12345670 is sometimes marketed as a near-ladder, but its seven-digit run makes it a broken ladder here." },
      ],
    },
    {
      id: "comparison", heading: "Broken vs true vs scattered ladders", blocks: [
        { kind: "paragraph", text: "A true ladder runs through all eight positions; a broken ladder stops after six or seven. “Scattered,” “mixed,” “scrambled” and “partial” ladder are seller terms used inconsistently. This site reserves broken ladder for the measurable run rule. A shuffled set of digits 1 through 8, such as 13245768, is not enough." },
        { kind: "paragraph", text: "The 8! permutations of digits 1–8 total 40,320. Removing the two full 1–8 ladders leaves 40,318, about 1 in 2,480. This broad set overlaps some broken ladders, so those are not odds for an exclusive scrambled category. Classify by longest run first." },
      ],
    },
    {
      id: "rarity", heading: "How rare is a broken ladder?", blocks: [
        { kind: "paragraph", text: "Exactly 2,834 of the 100,000,000 possible eight-digit serials meet this no-wrap broken-ladder rule, giving odds of 1 in 35,286. That count excludes the six complete eight-digit ladders. It splits evenly into 1,417 ascending and 1,417 descending cases; 2,686 have a longest run of six digits and 148 have a run of seven." },
        { kind: "paragraph", text: "A seven-digit run alone appears in 148 serials, about 1 in 675,676 across the full number space. That is a different question from the general broken-ladder odds: 01234569 is a seven-run example, but the headline 1 in 35,286 covers both six- and seven-run examples. The six full ladders are about 1 in 16,666,667. These are mathematical counts of possible serials, not the odds of finding one in a particular print run, denomination or stack of surviving notes." },
        { kind: "paragraph", text: "For this count, each adjacent pair must differ by +1 throughout an ascending run or −1 throughout a descending run. Zero is the lowest digit: 01234569 qualifies. A 9→0 jump ends the run, so 56789012 reaches only five consecutive digits without wrap-around. Changing that rule would change every count above; the checker uses the no-wrap rule." },
      ],
    },
    {
      id: "value", heading: "What is a broken ladder worth?", blocks: [
        { kind: "paragraph", text: "Most circulated notes should be treated as worth face value until comparable completed sales show a premium. The pattern alone is not a price. Grade, paper quality, denomination, series, star status and the look of the run can all affect a buyer's interest. An asking price is only a seller's request; a completed sale provides stronger evidence." },
        { kind: "paragraph", text: "The site's de-confounded sold-price samples are shown directly below from the same dataset as the homepage and price guide. Their wide ranges are a reason to compare like with like, not a promise that an ordinary note will bring those amounts. TODO(human): verify the underlying broken-ladder sales records and resolve the older three-sale snapshot before treating this dataset as a definitive market benchmark." },
        { kind: "richtext", segments: ["Check the shared ", { href: "/fancy-serial-number-value/", label: "fancy serial number price guide" }, " for current samples. Search eBay sold listings, Heritage Auctions and Stack's Bowers for comparable completed sales. PMG or PCGS grades help compare condition. Forum claims that loosely labelled ‘scattered ladders’ sell near face value are opinions, not sold-price samples."] },
      ],
    },
    {
      id: "check", heading: "How to check your serial in 3 steps", blocks: [
        { kind: "paragraph", text: "Copy the eight digits, find the longest one-direction run, then separate full and partial ladders. Keep leading zeroes; dropping one changes the test." },
        { kind: "list", ordered: true, items: [
          "Find the eight digits between the prefix letter and the suffix letter or star. If you need help, use the guide to locating a bill's serial number linked below.",
          "Read adjacent digits from left to right. Count a run only while each step is +1 or each step is −1. End it at a skip, repeat, direction change or 9-to-0 jump.",
          "If the longest run is eight, call it a true ladder. If it is six or seven, call it a broken ladder. Otherwise, check for a different pattern and compare sold notes before assigning a value.",
        ] },
        { kind: "richtext", segments: ["You can enter the digits in the ", { href: "/", label: "fancy serial number checker" }, " for a quick classification. For the full eight-digit rule and the six possible perfect runs, see the ", { href: "/fancy-serial-numbers/ladder/", label: "ladder serial numbers guide" }, "."] },
      ],
    },
    {
      id: "mistakes", heading: "Common mistakes", blocks: [
        { kind: "paragraph", text: "A four-digit run is not a broken ladder. The radar 12344321 climbs through 1234, then reverses; the repeater 12341234 repeats a four-digit block. Both stop short of the required six consecutive steps. A mirrored radar is a separate pattern, even when part of it looks sequential." },
        { kind: "paragraph", text: "Digits 1–8 are not automatically a ladder. The shuffled 13245768 has no long run, while 81234567 does. The serial 00734321 has only four descending digits despite ‘broken scattered ladder’ listing labels. The 9-to-0 jump also disqualifies 56789012." },
        { kind: "richtext", segments: ["If a note has a star suffix, check it separately with the ", { href: "/star-note-lookup/", label: "star note lookup" }, ". To identify the eight digits correctly, use our ", { href: "/where-is-the-serial-number-on-a-dollar-bill/", label: "serial number location guide" }, ". For the palindrome test, read the ", { href: "/fancy-serial-numbers/radar/", label: "radar guide" }, "."] },
      ],
    },
    {
      id: "faq", heading: "FAQ", blocks: [
        { kind: "subheading", text: "What is a broken ladder on a dollar bill?" },
        { kind: "paragraph", text: "It is an eight-digit serial with at least six ascending or descending consecutive digits, but not eight. The sequence must stay in one direction without skipping or wrapping from 9 to 0." },
        { kind: "subheading", text: "What is a scattered ladder note?" },
        { kind: "paragraph", text: "Scattered ladder is a loose seller label, often applied to digits that look ladder-like but do not form a long run. It has no single numerical definition here; use the six-digit test instead of the listing title." },
        { kind: "subheading", text: "What is the difference between a true ladder and a broken ladder?" },
        { kind: "paragraph", text: "A true ladder has eight consecutive digits in one direction; a broken ladder has six or seven. The full eight-digit category is much rarer under the same no-wrap rule." },
        { kind: "subheading", text: "How many digits make a broken ladder?" },
        { kind: "paragraph", text: "At least six consecutive digits must rise or fall by one without a gap. A four- or five-digit stretch does not meet this site's rule." },
        { kind: "subheading", text: "How rare is a broken ladder?" },
        { kind: "paragraph", text: "The checker rule matches 2,834 of 100,000,000 possible eight-digit serials, about 1 in 35,286. Only 148 of these have a seven-digit run." },
        { kind: "subheading", text: "Is a broken ladder worth anything?" },
        { kind: "paragraph", text: "It may attract a premium, but many circulated notes should be treated as face value until comparable completed sales support more. Condition and denomination matter, and a small sold sample is not a guarantee for your note." },
        { kind: "subheading", text: "Does 9 to 0 count as a ladder?" },
        { kind: "paragraph", text: "No. The checker treats 0 as the lowest digit, so 9 followed by 0 ends an ascending run rather than continuing it. This is why 56789012 does not qualify." },
        { kind: "subheading", text: "Is a mixed or scrambled ladder the same as a broken ladder?" },
        { kind: "paragraph", text: "Not necessarily. Sellers use mixed and scrambled inconsistently; digits 1–8 in any order can even contain a broken-ladder run. Measure the longest run first, then use the informal label only as a description." },
      ],
    },
    {
      id: "sources", heading: "Sources and method", blocks: [
        { kind: "paragraph", text: "The rarity figures come from enumerating every eight-digit number from 00000000 through 99999999 and applying the same +1/−1, no-wrap rule as the checker. The sample price ranges come from this site's recorded, de-confounded sold listings and retain their condition labels and sample sizes. They are descriptive ranges, not appraisals or a forecast." },
        { kind: "richtext", segments: ["Read the ", { href: "/methodology/", label: "methodology and limitations" }, " for the sale-screening approach. Heritage Auctions, Stack's Bowers and eBay sold listings are places to seek comparable realized prices; exact broken-ladder lot links remain TODO(human). PMG and PCGS can supply grading context, but this page does not claim that either service defines a ‘broken ladder’ category. TODO(human): verify primary-source lot URLs and whether any grading or issuing authority defines the term."] },
      ],
    },
  ],
  related: [
    { href: "/fancy-serial-numbers/ladder/", label: "Ladder serial numbers", description: "The full eight-digit pattern and its other lookalikes." },
    { href: "/fancy-serial-numbers/", label: "All fancy serial number types", description: "Browse the complete pattern guide." },
    { href: "/fancy-serial-number-value/", label: "Fancy serial number price guide", description: "Compare recorded sale ranges by condition." },
    { href: "/fancy-serial-numbers/radar/", label: "Radar serial numbers", description: "How a palindrome differs from a sequence." },
  ],
};
