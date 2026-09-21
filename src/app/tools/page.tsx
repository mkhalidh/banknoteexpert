import Link from "next/link";
import { getRoute } from "@/config/routes";
import { toolLinks } from "@/config/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
const page = getRoute("/tools/");
export const metadata = buildMetadata({title:page.title,description:page.description,path:page.path});
export default function ToolsPage() {
  return <article className="flex flex-col gap-10"><Breadcrumbs items={[{name:"Home",path:"/"},{name:"Tools",path:page.path}]} /><header><h1 className="text-display">{page.title}</h1><p className="text-lead mt-4">{page.description}</p></header><div className="tools-directory">{toolLinks.map(link => <section key={link.path}><h2 className="text-h2"><Link href={link.path}>{link.label}</Link></h2><p>{getRoute(link.path).description}</p></section>)}</div></article>;
}
