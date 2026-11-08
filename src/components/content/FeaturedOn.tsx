import Image from "next/image";

/**
 * "Featured on" badge row shown at the foot of the home page. Server Component.
 */
export function FeaturedOn() {
  return (
    <section className="featured-on" aria-label="Featured on">
      <span className="featured-on-label">Featured on</span>
      <a href="https://viesearch.com/" target="_blank" rel="nofollow noopener" aria-label="Featured on Viesearch">
        <span className="featured-on-badge">
          <Image
            src="/images/viesearch-badge.png"
            alt="Featured on Viesearch"
            width={600}
            height={240}
            className="featured-on-img"
            loading="lazy"
          />
        </span>
      </a>
      <a href="https://fazier.com/launches/www.banknoteexpert.com" target="_blank">
        <img
          src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=neutral"
          alt="Fazier badge"
          width={250}
        />
      </a>
      <a href="https://twelve.tools" target="_blank" rel="nofollow noopener">
        <img
          src="https://twelve.tools/badge0-white.svg"
          alt="Featured on Twelve Tools"
          width={148}
          height={40}
          loading="lazy"
        />
      </a>
    </section>
  );
}
