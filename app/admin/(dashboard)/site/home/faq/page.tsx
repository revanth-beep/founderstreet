import { getSiteContent } from "@/lib/site-content";
import HomeFaqForm from "../../_components/HomeFaqForm";

export default async function AdminHomeFaqPage() {
  const site = await getSiteContent();
  return <HomeFaqForm initial={site.home.faq} />;
}
