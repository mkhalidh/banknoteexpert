import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";

// Self-hosted via next/font — no runtime requests to Google.
// Only the display face is preloaded: it renders the hero <h1> (the LCP
// element), so its file is on the critical path. The sans body and mono
// data faces load on demand with font-display: swap — preloading them too
// would compete with the LCP font for early bandwidth and regress LCP.
const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

// Display face for headings only — a sharp, engraved-feeling serif that
// reads like currency typography, deliberately distinct from the sans body.
// Preloaded (default) because the hero <h1 class="text-display"> is the LCP.
const serifDisplay = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "Banknote Expert: US Banknote Serial Number Tools",
  description:
    "Free tools to check US banknote serial numbers for fancy patterns, star notes and collectible value.",
  path: "/",
});

// Every route on this site is fully static; make that explicit and enforced.
export const dynamic = "force-static";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${serifDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Apply a stored theme override before first paint — no flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}",
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900 focus:shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="site-main mx-auto w-full flex-1">
          {children}
        </main>
        <Footer />
      </body>
      <Script id="google-tag" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-72D1E83TN3');
setTimeout(function () {
  var script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-72D1E83TN3';
  script.async = true;
  document.head.appendChild(script);
}, 3000);`}
      </Script>
    </html>
  );
}
