import { getRoute } from "@/config/routes";
import { directoryPages as articles } from "@/config/editorial";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleDirectory } from "@/components/content/ArticleDirectory";
const page = getRoute("/blog/");
export const metadata = buildMetadata({title:page.title,description:page.description,path:page.path});
export default function BlogPage() {
  return <article className="blog-page flex flex-col gap-10"><Breadcrumbs items={[{name:"Home",path:"/"},{name:"Blog",path:page.path}]} /><header className="blog-hero"><h1 className="text-display">{page.title}</h1><p className="text-lead mt-4">{page.description}</p></header><ArticleDirectory articles={articles} /></article>;
}
