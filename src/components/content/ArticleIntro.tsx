import { pageModified } from "@/config/page-dates";
import Image from "next/image";
import Link from "next/link";
import { getArticle } from "@/config/editorial";
import { ArticleByline } from "@/components/content/ArticleByline";
export function ArticleCategory({ path }: { path: string }) {
  const article = getArticle(path);
  return <Link rel="tag" className="article-category" href={`/blog/#${article.categoryId}`} data-editorial-addition="true">{article.category}</Link>;
}
export function ArticleIntro({ path }: { path: string }) {
  const article = getArticle(path);
  return <div className="article-intro" data-editorial-addition="true"><ArticleByline published={article.published} readingMinutes={article.readingMinutes} /><p className="mt-2 text-xs text-zinc-500">Updated <time dateTime={pageModified[path]}>{pageModified[path]}</time></p><figure className="article-cover"><Image src={article.image} alt={article.imageAlt} width={1200} height={640} sizes="(max-width: 800px) 100vw, 1000px" preload /></figure></div>;
}
