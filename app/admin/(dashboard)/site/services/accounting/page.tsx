import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminAccountingPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="accounting" initial={site.servicePages.accounting} />;
}
