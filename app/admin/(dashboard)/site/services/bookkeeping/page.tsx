import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import BookkeepingExtrasForm from "../../_components/BookkeepingExtrasForm";

export default async function AdminBookkeepingPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="bookkeeping" initial={site.servicePages.bookkeeping} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <BookkeepingExtrasForm initial={site.servicePages.bookkeeping.serviceCards} />
      </div>
    </>
  );
}
