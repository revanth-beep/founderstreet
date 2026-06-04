import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminWebDevPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="webDevelopment" initial={site.servicePages.webDevelopment} />;
}
