import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getRoute } from "@/config/routes";

export const metadata: Metadata = buildMetadata({
  title: "Banknote Hub: Categories, Guides & Value Tools",
  description:
    "Browse banknote categories, fancy serial number guides, star note lookup pages and $2 bill value resources in one place.",
  path: "/hub/",
});

const categoryLinks = [
  "/fancy-serial-numbers/",
  "/star-note-lookup/",
  "/2-dollar-bill-value/",
  "/fancy-serial-number-value/",
  "/2-dollar-bill-serial-number-lookup/",
  "/where-is-the-serial-number-on-a-dollar-bill/",
].map((path) => {
  const route = getRoute(path);
  return {
    href: route.path,
    label: route.title,
    description: route.description,
  };
});

const articleLinks = [
  "/fancy-serial-numbers/radar/",
  "/fancy-serial-numbers/ladder/",
  "/fancy-serial-numbers/low-serial-number/",
  "/fancy-serial-numbers/birthday-note/",
  "/methodology/",
  "/about/",
].map((path) => {
  const route = getRoute(path);
  return {
    href: route.path,
    label: route.title,
  };
});

export default function Page() {
  return (
    <article className="page-shell flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <header className="hero-panel">
        <div className="eyebrow">Banknote hub</div>
        <h1 className="mt-4 text-display">Banknote categories, tools and guides</h1>
        <p className="mt-3 max-w-3xl text-lead">
          Explore the main serial number categories from one place: collectible
          pattern checks, star note lookups, $2 bill guides and related
          educational articles.
        </p>
      </header>

      <section aria-labelledby="categories" className="space-y-4">
        <h2 id="categories" className="text-h2">Browse by category</h2>
        <div className="hub-grid">
          {categoryLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hub-card">
              <span className="hub-card__kicker">Guide</span>
              <span className="hub-card__title">{item.label}</span>
              <span className="hub-card__copy">{item.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="articles" className="space-y-4">
        <h2 id="articles" className="text-h2">Popular article pages</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {articleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[rgba(31,92,66,0.02)]"
            >
              <span className="block font-medium text-[var(--foreground)]">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
