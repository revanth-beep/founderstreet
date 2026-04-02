import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIWidget from "@/components/AIWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIWidget />
      </body>
    </html>
  );
}
