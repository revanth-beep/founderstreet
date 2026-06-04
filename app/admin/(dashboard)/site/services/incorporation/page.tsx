import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminIncorporationPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="incorporation" initial={site.servicePages.incorporation} />;
}
