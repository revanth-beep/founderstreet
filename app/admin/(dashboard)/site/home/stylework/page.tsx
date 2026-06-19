import { getSiteContent } from "@/lib/site-content";
import StyleworkForm from "../../_components/StyleworkForm";

export default async function AdminStyleworkPage() {
  const site = await getSiteContent();
  return <StyleworkForm initial={site.home.stylework} />;
}
