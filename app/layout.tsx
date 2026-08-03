import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meridianphysio.example.com"),
  title: {
    default: "Meridian Physio & Recovery | Sports Physiotherapy, Measured",
    template: "%s | Meridian Physio & Recovery",
  },
  description:
    "Boutique sports physiotherapy and post-surgical recovery clinic. Assessment-led treatment plans with measured, tracked progress from day one to return-to-sport.",
  keywords: [
    "sports physiotherapy",
    "physical therapy clinic",
    "post-surgical rehab",
    "manual therapy",
    "return to sport recovery",
  ],
  openGraph: {
    title: "Meridian Physio & Recovery",
    description:
      "Assessment-led sports physiotherapy and recovery, with progress measured every visit.",
    url: "https://meridianphysio.example.com",
    siteName: "Meridian Physio & Recovery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Physio & Recovery",
    description:
      "Assessment-led sports physiotherapy and recovery, with progress measured every visit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
