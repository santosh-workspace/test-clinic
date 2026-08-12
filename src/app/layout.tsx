import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Cursor } from "@/components/providers/Cursor";
import { Loader } from "@/components/providers/Loader";
import { PageTransition } from "@/components/providers/PageTransition";
import { ScrollProgress } from "@/components/providers/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { graph, hospitalSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

/**
 * `display: "swap"` keeps text visible during font load (avoids the invisible-
 * text FOIT that costs LCP), and both faces are self-hosted by next/font, so
 * there is no third-party connection on the critical path.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline} in ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  generator: "Next.js",
  keywords: [
    `paediatrician in ${siteConfig.city}`,
    `pediatrician in ${siteConfig.city}`,
    `child specialist in ${siteConfig.city}`,
    `eye specialist in ${siteConfig.city}`,
    `ophthalmologist in ${siteConfig.city}`,
    `eye hospital in ${siteConfig.city}`,
    `paediatric hospital in ${siteConfig.city}`,
    `child doctor in ${siteConfig.cityAlt}`,
    `eye doctor in ${siteConfig.cityAlt}`,
    "cataract consultation",
    "vaccination and immunisation",
    "newborn care",
    "Yogeshwari Hospital",
  ],
  category: "Health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(siteConfig.verification.google
    ? { verification: { google: siteConfig.verification.google } }
    : {}),
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#04121e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${instrument.variable}`}>
      <head>
        {/*
          Framer Motion serialises each element's `initial` state into the SSR
          HTML — which means every scroll-revealed section ships as opacity:0.
          With JavaScript disabled nothing would ever un-hide it, leaving a
          blank page. This forces the resting state for those users.
        */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important;visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        {/* Site-wide graph: Organization → Hospital → WebSite */}
        <JsonLd data={graph(organizationSchema(), hospitalSchema(), websiteSchema())} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Loader />
        <Cursor />
        <ScrollProgress />

        <SmoothScroll>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
          {/* Spacer so the sticky bar never covers the last line of the footer */}
          <div aria-hidden="true" className="h-20 bg-ink-950 lg:hidden" />
          <MobileActionBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
