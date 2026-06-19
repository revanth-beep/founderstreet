import { getSiteContent } from "@/lib/site-content";
import HealthCheckBlockForm from "../../_components/HealthCheckBlockForm";

export default async function AdminHealthCheckBlockPage() {
  const site = await getSiteContent();
  return <HealthCheckBlockForm initial={site.home.healthCheckBlock} />;
}
