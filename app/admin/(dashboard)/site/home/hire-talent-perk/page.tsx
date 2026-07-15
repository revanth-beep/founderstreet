import { getSiteContent } from "@/lib/site-content";
import HireTalentPerkForm from "../../_components/HireTalentPerkForm";

export default async function AdminHireTalentPerkPage() {
  const site = await getSiteContent();
  return <HireTalentPerkForm initial={site.home.hireTalentPerk} />;
}
