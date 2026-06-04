import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminFundingPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="funding" initial={site.servicePages.funding} />;
}
