import Link from "next/link";
import { getRoute } from "@/config/routes";
import { toolLinks } from "@/config/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
const page = getRoute("/tools/");
export const metadata = buildMetadata({
  title: "US Banknote Research Tools: Serial Numbers and $2 Bills",
  description: "Browse free research tools for fancy serial patterns, star-note print runs, $2 bill serials and collectible banknote values.",
  path: page.path,
});
export default function ToolsPage() {
  return <article className="flex flex-col gap-10"><Breadcrumbs items={[{name:"Home",path:"/"},{name:"Tools",path:page.path}]} /><header><h1 className="text-display">{page.title}</h1><p className="text-lead mt-4">{page.description}</p><p className="mt-4 max-w-3xl text-zinc-700 dark:text-zinc-300">This page is the directory for Banknote Expert research tools. To analyze one US note now, use the <Link href="/" className="link-accent">free banknote serial number checker for dollar bills</Link>. The other tools below cover star-note runs, $2 bill series and individual collectible patterns.</p></header><div className="tools-directory">{toolLinks.map(link => <section key={link.path}><h2 className="text-h2"><Link href={link.path}>{link.label}</Link></h2><p>{getRoute(link.path).description}</p></section>)}</div></article>;
}
