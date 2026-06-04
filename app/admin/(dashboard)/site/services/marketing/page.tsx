import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminMarketingPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="marketing" initial={site.servicePages.marketing} />;
}
