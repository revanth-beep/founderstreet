import { getSiteContent } from "@/lib/site-content";
import TermsPageForm from "../_components/TermsPageForm";

export default async function AdminTermsPage() {
  const site = await getSiteContent();
  return <TermsPageForm initial={site.termsPage} />;
}
