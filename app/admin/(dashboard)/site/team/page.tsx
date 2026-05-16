import { getSiteContent } from "@/lib/site-content";
import TeamPageForm from "../_components/TeamPageForm";

export default async function AdminTeamPage() {
  const site = await getSiteContent();
  return <TeamPageForm initial={site.teamPage} />;
}
