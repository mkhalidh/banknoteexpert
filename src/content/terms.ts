import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/terms/",
    title: "Terms of Service",
    description: "The terms that govern use of Banknote Expert's free tools.",
    h1: "Terms of Service",
    primaryKeyword: "terms of service",
    lead:
      "Banknote Expert is a free set of research tools provided as-is. The serial number tools run entirely in your browser and store nothing. The value estimates on this site are research guidance, not appraisals, and must not be relied on as a guarantee of what any note is worth.",
  },
  takeaways: [],
  sections: [
    {
      id: "acceptance",
      heading: "Acceptance of these terms",
      blocks: [
        {
          kind: "paragraph",
          text:
            "By using this site you agree to these terms. If you do not agree, please do not use the tools. The site is intended for general informational and hobbyist use.",
        },
      ],
    },
    {
      id: "use",
      heading: "Use of the tools",
      blocks: [
        {
          kind: "paragraph",
          text:
            "You may use the checkers and guides freely for personal, non-commercial research. The tools process the serial numbers you enter locally in your browser and do not transmit or store them.",
        },
      ],
    },
    {
      id: "no-warranty",
      heading: "Estimates, not appraisals",
      blocks: [
        {
          kind: "paragraph",
          text:
            "Rarity scores and value ranges are estimates based on public sale data and pattern mathematics. They are provided without warranty of accuracy or completeness, and they are not a professional appraisal, an offer to buy or sell, or financial advice. Always confirm a note's value with a qualified dealer or grading service before buying or selling.",
        },
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      blocks: [
        {
          kind: "paragraph",
          text:
            "To the fullest extent permitted by law, Banknote Expert is not liable for any loss arising from reliance on the information or estimates provided here. You use the site and act on its output at your own risk.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The site's text, tools and design are the property of Banknote Expert unless otherwise noted. Series facts, seal colours and similar reference data are public information cited to their sources.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        {
          kind: "paragraph",
          text:
            "These terms may be updated from time to time. The current version will always be posted on this page, and continued use of the site means you accept any revisions.",
        },
      ],
    },
  ],
  related: [],
};
