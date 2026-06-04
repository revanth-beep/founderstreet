import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";

export default async function AdminValidationPage() {
  const site = await getSiteContent();
  return <ServicePageForm serviceKey="validation" initial={site.servicePages.validation} />;
}
