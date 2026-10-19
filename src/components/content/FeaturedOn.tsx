import Image from "next/image";

/**
 * "Featured on" badge row shown at the foot of the home page. Server Component.
 */
export function FeaturedOn() {
  return (
    <section className="featured-on" aria-label="Featured on">
      <span className="featured-on-label">Featured on</span>
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
    </section>
  );
}
