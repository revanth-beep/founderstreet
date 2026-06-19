import { getSiteContent } from "@/lib/site-content";
import ProcessSectionForm from "../../_components/ProcessSectionForm";

export default async function AdminProcessPage() {
  const site = await getSiteContent();
  return <ProcessSectionForm initial={site.home.process} />;
}
