import { getSiteContent } from "@/lib/site-content";
import ServicesSectionForm from "../../_components/ServicesSectionForm";

export default async function AdminServicesSectionPage() {
  const site = await getSiteContent();
  return (
    <ServicesSectionForm
      header={site.home.services}
      serviceCards={site.home.serviceCards}
    />
  );
}
