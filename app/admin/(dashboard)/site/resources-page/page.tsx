import { getSiteContent } from "@/lib/site-content";
import ResourcesPageSectionForm from "../_components/ResourcesPageSectionForm";

export default async function AdminResourcesPageCopyPage() {
  const site = await getSiteContent();
  return <ResourcesPageSectionForm initial={site.resourcesPage} />;
}
