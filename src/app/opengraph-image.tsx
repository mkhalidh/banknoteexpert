import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = "Banknote Expert: US Banknote Serial Number Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide default Open Graph image. This route has no dynamic segments, so
 * `params` resolves to an empty object — but in Next.js 16 the prop is a
 * Promise, so it is awaited before use.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<Record<string, never>>;
}) {
  await params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.75, letterSpacing: 2 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          US Banknote Serial Number Tools
        </div>
        <div style={{ fontSize: 34, marginTop: 32, opacity: 0.85 }}>
          banknoteexpert.com
        </div>
      </div>
    ),
    { ...size },
  );
}
