import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AUTHOR_NAME, AUTHOR_BIO, AUTHOR_SAME_AS } from "@/config/site";
import { getRoute } from "@/config/routes";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/content/RelatedPages";
const page = getRoute("/about-the-author/");
export const metadata = buildMetadata({title:page.title,description:page.description,path:page.path});
export default function AuthorPage() {
  return <article className="author-page flex flex-col gap-10">
    <Breadcrumbs items={[{name:"Home",path:"/"},{name:page.title,path:page.path}]} />
    <header><h1 className="text-display">About the Author</h1><h2 className="text-h2 mt-5">{AUTHOR_NAME}</h2><p className="text-lead mt-4">{AUTHOR_BIO}</p></header>
    <div className="author-story"><p>The site is written and maintained by {AUTHOR_NAME}, drawing on published auction records, grading standards and Bureau of Engraving and Printing data rather than guesswork. Our aim is a resource we would trust ourselves: accurate on the facts, careful with the numbers, and clear about what is known versus estimated.</p><p>If you spot an error in a series fact or a value range, we want to hear about it. Accuracy in this niche is worth more than reach, and correcting the record quickly is part of how a reference earns trust.</p></div>
    <RelatedPages links={[{href:"/methodology/",label:"Methodology"},{href:"/about/",label:"About Banknote Expert"},{href:"/blog/",label:"Banknote Guides & Articles"}]} />
    <JsonLd data={{"@context":"https://schema.org","@type":"ProfilePage",mainEntity:{"@type":"Person","@id":`${SITE_URL}${page.path}#person`,name:AUTHOR_NAME,url:`${SITE_URL}${page.path}`,description:AUTHOR_BIO,sameAs:AUTHOR_SAME_AS}}} />
  </article>;
}
