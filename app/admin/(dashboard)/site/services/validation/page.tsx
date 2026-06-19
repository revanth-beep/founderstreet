import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import ValidationExtrasForm from "../../_components/ValidationExtrasForm";

export default async function AdminValidationPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="validation" initial={site.servicePages.validation} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <ValidationExtrasForm initial={site.servicePages.validation.deliverables} />
      </div>
    </>
  );
}
