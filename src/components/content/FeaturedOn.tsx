import Image from "next/image";

/**
 * "Featured on" badge row shown at the foot of the home page. The outbound
 * link is rel="nofollow" (and opens in a new tab) so it passes no link equity
 * and does not affect the homepage's SEO quality. Server Component.
 */
export function FeaturedOn() {
  return (
    <section className="featured-on" aria-label="Featured on">
      <span className="featured-on-label">Featured on</span>
      <a
        href="https://viesearch.com/293av/fancy-serial-number-checker-free-us-dollar-bill-serial-lookup"
        rel="nofollow noopener noreferrer"
        target="_blank"
        className="featured-on-badge"
      >
        <Image
          src="/images/viesearch-badge.png"
          alt="Featured on Viesearch"
          width={600}
          height={240}
          className="featured-on-img"
          loading="lazy"
        />
      </a>
    </section>
  );
}
