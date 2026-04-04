import { getSiteContent } from "@/lib/site-content";
import FooterSectionForm from "../_components/FooterSectionForm";

export default async function AdminFooterPage() {
  const site = await getSiteContent();
  return <FooterSectionForm initial={site.footer} />;
}
