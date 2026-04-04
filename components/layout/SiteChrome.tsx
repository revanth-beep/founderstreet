import { headers } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIWidget from "@/components/AIWidget";
import { getSiteContent } from "@/lib/site-content";
import { PATHNAME_HEADER } from "@/lib/request-path";

export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const path = h.get(PATHNAME_HEADER) ?? "";

  if (path.startsWith("/admin")) {
    return <>{children}</>;
  }

  const site = await getSiteContent();
  return (
    <>
      <Navbar cms={site.nav} />
      <main>{children}</main>
      <Footer cms={site.footer} />
      <AIWidget />
    </>
  );
}
