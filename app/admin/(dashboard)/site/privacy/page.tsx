import { getSiteContent } from "@/lib/site-content";
import PrivacyPageForm from "../_components/PrivacyPageForm";

export default async function AdminPrivacyPage() {
  const site = await getSiteContent();
  return <PrivacyPageForm initial={site.privacyPage} />;
}
