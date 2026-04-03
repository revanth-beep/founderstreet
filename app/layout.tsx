import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIWidget from "@/components/AIWidget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://founderstreet.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Founderstreet — The Unseen Engine Behind India's Next Great Startups",
    template: "%s | Founderstreet",
  },
  description:
    "From Day Zero to Pre-Seed, we provide the elite operational, financial, and digital infrastructure founders need to launch, scale, and secure funding.",
  keywords: [
    "startup consulting India",
    "company incorporation India",
    "startup accounting",
    "pitch deck India",
    "virtual CFO startup",
    "investor matching India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://founderstreet.in",
    siteName: "Founderstreet",
    title: "Founderstreet — The Unseen Engine Behind India's Next Great Startups",
    description:
      "Elite operational, financial, and digital infrastructure for Indian founders.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founderstreet",
    description: "The unseen engine behind India's next great startups.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- global brand fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#FAFAFA", color: "#3d4246" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIWidget />
      </body>
    </html>
  );
}
