import { getRoute } from "@/config/routes";
import { directoryPages as articles } from "@/config/editorial";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleDirectory } from "@/components/content/ArticleDirectory";
const page = getRoute("/blog/");
export const metadata = buildMetadata({title:page.title,description:page.description,path:page.path});
export default function BlogPage() {
  return <article className="blog-page flex flex-col gap-10"><Breadcrumbs items={[{name:"Home",path:"/"},{name:"Blog",path:page.path}]} /><header className="blog-hero"><h1 className="text-display">{page.title}</h1><p className="text-lead mt-4">{page.description}</p></header><ArticleDirectory articles={articles} /><JsonLd data={{"@context":"https://schema.org","@type":"CollectionPage",name:page.title,description:page.description,url:`${SITE_URL}${page.path}`,mainEntity:{"@type":"ItemList",itemListElement:articles.map((article,index)=>({"@type":"ListItem",position:index+1,name:article.title,url:`${SITE_URL}${article.path}`}))}}} /></article>;
}
