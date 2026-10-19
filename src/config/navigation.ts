import { getRoute } from "@/config/routes";

const links = (paths: string[]) => paths.map(path => { const route = getRoute(path); return { path, label: route.title }; });
export const fancyArticles = links(["/fancy-serial-numbers/", "/fancy-serial-number-value/", "/where-is-the-serial-number-on-a-dollar-bill/", "/fancy-serial-numbers/binary/", "/fancy-serial-numbers/radar/", "/fancy-serial-numbers/super-radar/", "/fancy-serial-numbers/ladder/", "/fancy-serial-numbers/broken-ladder/", "/fancy-serial-numbers/low-serial-number/", "/fancy-serial-numbers/birthday-note/"])
  .map(link => link.path === "/fancy-serial-numbers/binary/" ? { ...link, label: "Binary serial numbers" } : link.path === "/fancy-serial-numbers/super-radar/" ? { ...link, label: "Super radar serial numbers" } : link);
export const toolLinks = links(["/", "/fancy-serial-numbers/radar/", "/fancy-serial-numbers/ladder/", "/fancy-serial-numbers/low-serial-number/", "/fancy-serial-numbers/birthday-note/", "/star-note-lookup/", "/2-dollar-bill-serial-number-lookup/", "/2-dollar-bill-value/"]);
export const companyLinks = links(["/methodology/", "/privacy/", "/about/", "/about-the-author/", "/terms/"]);
export const navigation = [
  { label: "Serial Number Checker", path: "/", columns: [{ label: "Fancy Serial Numbers", path: "/", links: toolLinks.slice(0, 5) }, { label: "Related guides", path: "/blog/#fancy-serial-numbers", links: fancyArticles }] },
  { label: "Patterns", path: "/fancy-serial-numbers/", columns: [{ label: "Pattern guides", path: "/fancy-serial-numbers/", links: fancyArticles }] },
  { label: "Star Note Lookup", path: "/star-note-lookup/", columns: [{ label: "Star Note Lookup", path: "/star-note-lookup/", links: links(["/star-note-lookup/"]) }] },
  { label: "$2 Bills", path: "/2-dollar-bill-serial-number-lookup/", columns: [{ label: "$2 Bills", path: "/2-dollar-bill-serial-number-lookup/", links: links(["/2-dollar-bill-serial-number-lookup/", "/2-dollar-bill-value/", "/1976-2-dollar-bill-value/"]) }] },
  { label: "Blog", path: "/blog/", columns: [
    { label: "Fancy Serial Numbers", path: "/blog/#fancy-serial-numbers", links: fancyArticles },
    { label: "Star Notes", path: "/blog/#star-notes", links: links(["/star-note-lookup/"]) },
    { label: "$2 Bills", path: "/blog/#two-dollar-bills", links: links(["/2-dollar-bill-serial-number-lookup/", "/2-dollar-bill-value/", "/1976-2-dollar-bill-value/"]) },
    { label: "Company", path: "/about/", links: companyLinks },
  ] },
];
