import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import WebDevExtrasForm from "../../_components/WebDevExtrasForm";

export default async function AdminWebDevPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="webDevelopment" initial={site.servicePages.webDevelopment} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <WebDevExtrasForm
          initialCards={site.servicePages.webDevelopment.serviceCards}
          initialTechStack={site.servicePages.webDevelopment.techStack}
        />
      </div>
    </>
  );
}
