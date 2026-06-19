import { getSiteContent } from "@/lib/site-content";
import CtaSectionForm from "../../_components/CtaSectionForm";

export default async function AdminCtaPage() {
  const site = await getSiteContent();
  return <CtaSectionForm initial={site.home.cta} />;
}
