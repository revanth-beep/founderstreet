import { getSiteContent } from "@/lib/site-content";
import WhySectionForm from "../../_components/WhySectionForm";

export default async function AdminWhyPage() {
  const site = await getSiteContent();
  return <WhySectionForm initial={site.home.why} />;
}
