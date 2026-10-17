"use client";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DirectoryPage } from "@/config/editorial";
import { ArticleByline } from "@/components/content/ArticleByline";

const categories = [{id:"all",label:"All pages"},{id:"fancy-serial-numbers",label:"Fancy Serial Numbers"},{id:"star-notes",label:"Star Notes"},{id:"two-dollar-bills",label:"$2 Bills"},{id:"tools",label:"Tools"},{id:"company",label:"Company"}];
function subscribe(callback: () => void) { window.addEventListener("hashchange",callback); return () => window.removeEventListener("hashchange",callback); }
const snapshot = () => window.location.hash.slice(1) || "all";
const serverSnapshot = () => "all";

export function ArticleDirectory({ articles }: { articles: DirectoryPage[] }) {
  const activeHash = useSyncExternalStore(subscribe,snapshot,serverSnapshot);
  const active = categories.some(item => item.id === activeHash) ? activeHash : "all";
  const [query,setQuery] = useState("");
  const [sort,setSort] = useState("new");
  const needle = query.trim().toLowerCase();
  const filtered = articles.filter(article => (active === "all" || (active === "tools" ? article.isTool : article.categoryId === active)) && `${article.title} ${article.description}`.toLowerCase().includes(needle)).sort((a,b) => sort === "popular" ? a.popularOrder-b.popularOrder : b.modified.localeCompare(a.modified) || a.title.localeCompare(b.title));
  const featured = filtered.find(article => article.popularOrder === 1);
  const tools = [{path:"/",label:"Fancy Serial Number Checker"},{path:"/star-note-lookup/",label:"Star Note Lookup"},{path:"/2-dollar-bill-serial-number-lookup/",label:"$2 Bill Serial Number Lookup"}];
  const selectedTool = active === "star-notes" ? tools[1] : active === "two-dollar-bills" ? tools[2] : tools[0];
  return <div className="article-directory flex flex-col gap-6">
    <div className="blog-search-row"><label className="blog-search"><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
    <div className="journal-toolbar"><div className="blog-filters" aria-label="Page categories">{categories.map(item => <button id={item.id} key={item.id} type="button" aria-pressed={active === item.id} onClick={() => {window.location.hash = item.id;}}>{item.label}</button>)}</div><div className="journal-sort" aria-label="Page order"><button type="button" aria-pressed={sort === "new"} onClick={() => setSort("new")}>Recently updated</button><button type="button" aria-pressed={sort === "popular"} onClick={() => setSort("popular")}>Most popular</button></div></div>
    {featured && <section className="blog-feature" aria-labelledby="featured-guide"><Link href={featured.path} className="journal-feature-image"><Image src={featured.image} alt={featured.imageAlt} width={1200} height={640} sizes="(max-width: 767px) 100vw, 650px" unoptimized={featured.image === "/birthdaynote.png"} preload /></Link><div className="blog-feature-copy"><Link rel="tag" className="article-category" href={`/blog/#${featured.categoryId}`}>{featured.category}</Link><h2 id="featured-guide" className="text-h2"><Link href={featured.path}>{featured.title}</Link></h2><ArticleByline published={featured.published} readingMinutes={featured.readingMinutes} /><p>{featured.description}</p><Link className="journal-read-link" href={featured.path}>Read guide <span aria-hidden="true">→</span></Link></div></section>}
    <div className="blog-index"><section aria-labelledby="journal-heading"><div className="journal-feed-heading"><h2 id="journal-heading" className="text-h2">{active === "tools" ? "Tools" : active === "company" ? "Company" : sort === "new" ? "Latest articles" : "Most popular"}</h2><p className="blog-count" role="status">{filtered.length} {filtered.length === 1 ? "page" : "pages"}</p></div><div className="blog-cards">{filtered.map(article => <article key={article.path} className="blog-card"><Link href={article.path} className="journal-card-image" tabIndex={-1} aria-hidden="true"><Image src={article.image} alt="" width={800} height={420} sizes="(max-width: 600px) 100vw, 450px" unoptimized={article.image === "/birthdaynote.png"} /><span>{article.category}</span></Link><div className="blog-card-body"><h3><Link href={article.path}>{article.title}</Link></h3>{article.hasByline && <ArticleByline published={article.published} readingMinutes={article.readingMinutes} />}<p className="text-xs text-zinc-500">Updated <time dateTime={article.modified}>{article.modified}</time></p><p>{article.description}</p></div></article>)}</div>{filtered.length === 0 && <p className="blog-empty">No pages match your search. Try another term or category.</p>}</section>
    <aside className="journal-sidebar"><section className="journal-tool-callout"><h2 className="text-h2">{selectedTool.label}</h2><p>Check your banknote with the tools behind these guides.</p><Link className="journal-gold-button" href={selectedTool.path}>Open tool <span aria-hidden="true">→</span></Link></section><section className="blog-sidebar"><h2 className="text-h3"><a href="#tools">Tools</a></h2><ul>{tools.map(tool => <li key={tool.path}><Link data-navigation-link="true" href={tool.path}>{tool.label}</Link></li>)}</ul></section></aside></div>
  </div>;
}
