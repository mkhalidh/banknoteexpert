import type { PageContent } from "@/content/types";

export const content: PageContent = {
  meta: {
    path: "/privacy/",
    title: "Privacy Policy",
    description: "How Banknote Expert handles data: it does not.",
    h1: "Privacy Policy",
    primaryKeyword: "privacy policy",
    lead:
      "Serial numbers you enter into the tools on this site are processed entirely in your browser. They are never transmitted to a server, never stored, and never logged. Because the site is static and has no accounts, there is very little data to have a policy about — but here is the full picture.",
  },
  takeaways: [],
  sections: [
    {
      id: "tool-data",
      heading: "Data you enter into the tools",
      blocks: [
        {
          kind: "paragraph",
          text:
            "All serial number analysis runs client-side in JavaScript on your own device. Nothing you type into a checker or lookup is sent anywhere. If you share a result link, the serial is contained in that link's address, which only travels wherever you choose to paste it.",
        },
      ],
    },
    {
      id: "accounts",
      heading: "Accounts and personal data",
      blocks: [
        {
          kind: "paragraph",
          text:
            "There are no accounts, sign-ups or logins on this site, so we do not collect names, email addresses or any other personal information from you.",
        },
      ],
    },
    {
      id: "cookies-analytics",
      heading: "Cookies and analytics",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The tools do not require cookies to function. If privacy-respecting, aggregate analytics are added in future to understand overall traffic, they will not identify individual visitors or record the serial numbers checked. This page will be updated before any such change takes effect.",
        },
      ],
    },
    {
      id: "third-parties",
      heading: "Third parties and hosting",
      blocks: [
        {
          kind: "paragraph",
          text:
            "The site is served as static files by our hosting provider, which may keep standard server access logs (such as IP address and requested page) for security and operational purposes, as is normal for any website. We do not combine those logs with anything you enter into the tools, because that data never reaches the server.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          kind: "paragraph",
          text:
            "If this policy changes, the updated version will be posted here with a revised date. Continued use of the site after a change means you accept the updated policy.",
        },
      ],
    },
  ],
  related: [],
};
