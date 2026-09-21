import Link from "next/link";
import { AUTHOR_NAME } from "@/config/site";
export function ArticleByline({ published, readingMinutes }: { published: string; readingMinutes: number }) {
  const date = new Intl.DateTimeFormat("en-US", {month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(`${published}T00:00:00Z`));
  return <div className="article-byline" data-editorial-addition="true"><Link rel="author" href="/about-the-author/">{AUTHOR_NAME}</Link><time dateTime={published}>{date}</time><span>{readingMinutes} min read</span></div>;
}
