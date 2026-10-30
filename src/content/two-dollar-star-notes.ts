import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/2-dollar-bill-value/star-notes/",
    title: "$2 Star Note Value: Prices by Series and Print Run",
    description:
      "What a $2 star note is worth by series, which are rarest, and how print run size drives value. See recorded prices and check your own $2 star note.",
    h1: "$2 Star Note Value: How Much Is a $2 Star Note Worth?",
    primaryKeyword: "$2 star note value",
    lead:
      "A $2 star note is worth more than face value only when its print run was small or its grade is high. Common green-seal star runs sell for a few dollars over face, while scarce red-seal stars and short runs reach the hundreds. Print run size, not the star alone, decides the price.",
  },
  takeaways: [
    "A star replaces the suffix letter and marks a replacement note, printed in smaller numbers.",
    "Run size drives value: under 640,000 is scarce and under 320,000 is very rare in our data.",
    "Red-seal $2 stars (1928 to 1963A) carry the strongest premiums, mostly in uncirculated grade.",
    "Modern green-seal $2 stars are common and usually sell only a little above face value.",
    "Check your series, district and run with the Banknote Expert star note lookup before pricing it.",
  ],
  sections: [
    {
      id: "what-is",
      heading: "What is a $2 star note?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "A star note is a replacement note. When the Bureau of Engraving and Printing spoils a note during production, it prints a fresh one with a star in place of the suffix letter rather than repeating the original serial. Because replacements are printed in much smaller quantities than regular notes, a star is scarcer than a standard note from the same series, and that scarcity is what gives it a premium.",
        },
        {
          kind: "richtext",
          segments: [
            "The star sits at the very end of the serial, where a letter would normally be. If your $2 note ends in a star, it is a replacement, and the next question is how small its print run was. You can read the exact run for your series, district and serial with the ",
            { href: "/star-note-lookup/", label: "star note lookup tool" },
            " on Banknote Expert.",
          ],
        },
      ],
    },
    {
      id: "value-chart",
      heading: "$2 star note value chart by series",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The chart below shows recorded single-note sale ranges for $2 star notes by series and condition. Every figure comes from Banknote Expert recorded sales (Heritage Auctions realized prices), counting individual notes only, not packs, uncut sheets, district sets, low-serial pieces or error notes. Where fewer than three clean single-note sales exist for a series and condition, the cell reads no recorded sales rather than a guessed figure.",
        },
        {
          kind: "paragraph",
          text:
            "The red-seal series dominate the recorded data because those stars survive and sell as collectible single notes. Modern green-seal $2 stars (1976, 1995, 2003, 2009 and 2017A) trade overwhelmingly in original packs, uncut sheets and complete district sets, so there is no reliable single-note price to publish for them; their value is read from print run size instead, covered in the next section.",
        },
      ],
    },
    {
      id: "print-run",
      heading: "What run size counts as rare?",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Star value tracks print run size. A standard full star run is 3,200,000 notes. In our print run data a run at or below 640,000 notes is scarce, and a run at or below 320,000 notes is very rare. The smaller the run behind a star, the stronger its premium, with condition deciding the rest.",
        },
        {
          kind: "paragraph",
          text:
            "The clearest modern example is the 1976 series. Most districts printed more than one star run, but Richmond, Minneapolis and Kansas City each printed a single 640,000-note run, which is why those three districts are the scarce keys of the 1976 star set. The table below lists the 1976 star production by district from our print run data.",
        },
        {
          kind: "paragraph",
          text:
            "Source: BEP production records (via uspapermoney.info) for the 1976 series, and BEP monthly production reports for the modern series in our star note dataset.",
        },
      ],
    },
    {
      id: "nineteen-seventy-six",
      heading: "1976 $2 star notes by district",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "The 1976 bicentennial series is the most searched $2 star. Ordinary 1976 stars from the large districts are common and carry a modest premium, but the Richmond, Minneapolis and Kansas City stars, each from a single 640,000-note run, are the ones collectors pay the most for. For the full 1976 picture, including condition, first-day postmarks and errors, see the ",
            { href: "/1976-2-dollar-bill-value/", label: "complete 1976 $2 bill guide" },
            ".",
          ],
        },
      ],
    },
    {
      id: "fancy-serial-stars",
      heading: "Fancy serial numbers on $2 star notes",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "A star and a fancy serial together are worth more than either alone. A scarce-run star that is also a radar, a repeater, a solid, a ladder or a very low serial appeals to two sets of collectors at once. Read the eight digits on your note and run them through the ",
            { href: "/", label: "fancy serial number checker" },
            ", or use the ",
            { href: "/2-dollar-bill-serial-number-lookup/", label: "$2 bill serial number lookup" },
            " for a check tuned to two-dollar notes. The ",
            { href: "/fancy-serial-numbers/low-serial-number/", label: "low serial number guide" },
            " and the ",
            { href: "/fancy-serial-numbers/radar/", label: "radar serial number guide" },
            " explain which patterns add the most.",
          ],
        },
      ],
    },
    {
      id: "how-to-look-up",
      heading: "How to look up your $2 star note",
      blocks: [
        {
          kind: "richtext",
          segments: [
            "To value a $2 star note, you need its series, its Federal Reserve district and its print run. The ",
            { href: "/star-note-lookup/", label: "star note lookup" },
            " does this for you: choose the denomination and series, enter the serial with its star, and it returns the matching print run and a rarity tier from the BEP data. Combine that run size with the recorded prices above and the note's condition to reach an honest value.",
          ],
        },
        {
          kind: "richtext",
          segments: [
            "Every figure here comes from our own datasets, and our ",
            { href: "/methodology/", label: "methodology" },
            " explains how we estimate value, what the confidence labels mean and where each figure comes from.",
          ],
        },
      ],
    },
    {
      id: "faq",
      heading: "Common questions",
      blocks: [
        { kind: "subheading", text: "How much is a $2 star note worth?" },
        {
          kind: "paragraph",
          text:
            "It depends on the series, the print run and the condition. Common modern green-seal $2 stars sell for only a little over face value, while scarce red-seal stars from 1928 to 1963A can reach the hundreds of dollars in uncirculated grade. The smaller the print run behind the star, the higher the premium.",
        },
        { kind: "subheading", text: "Which $2 star note is the rarest?" },
        {
          kind: "paragraph",
          text:
            "Among notes with recorded sales, the early red-seal stars are the most valuable, led by the 1928 series. For scarcity by run size, the 1976 Richmond, Minneapolis and Kansas City stars stand out, each printed in a single 640,000-note run, the smallest of that popular series.",
        },
        { kind: "subheading", text: "How do I know if my $2 star note is from a small print run?" },
        {
          kind: "paragraph",
          text:
            "Use the star note lookup. Enter the denomination, series and the serial with its star, and it returns the matching print run from the BEP data along with a rarity tier. A run at or below 640,000 notes is scarce and one at or below 320,000 is very rare.",
        },
        { kind: "subheading", text: "Is a 1976 $2 star note worth anything?" },
        {
          kind: "paragraph",
          text:
            "Yes, a little above face for most districts, and more for the scarce ones. Stars from Richmond, Minneapolis and Kansas City came from single 640,000-note runs and are the keys of the 1976 star set, while stars from the larger districts are common and carry only a modest premium that rises with condition.",
        },
      ],
    },
  ],
  related: [
    {
      href: "/star-note-lookup/",
      label: "Star note lookup",
      description: "Find the print run and rarity tier for your star note.",
    },
    {
      href: "/2-dollar-bill-value/",
      label: "$2 bill value guide",
      description: "Values for every $2 series, seal colour and condition.",
    },
    {
      href: "/1976-2-dollar-bill-value/",
      label: "1976 $2 bill value",
      description: "The bicentennial series, including star notes by district.",
    },
    {
      href: "/2-dollar-bill-serial-number-lookup/",
      label: "$2 serial number lookup",
      description: "Check any $2 serial for patterns and value.",
    },
  ],
};
