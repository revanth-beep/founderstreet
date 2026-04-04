import { getSiteContent } from "@/lib/site-content";
import PartnersSectionForm from "../../_components/PartnersSectionForm";

export default async function AdminPartnersPage() {
  const site = await getSiteContent();
  return <PartnersSectionForm initial={site.home.partnerMarquee} />;
}
