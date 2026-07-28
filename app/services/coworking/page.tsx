import type { Metadata } from "next";
import CoworkingForm from "@/components/sections/CoworkingForm";

export const metadata: Metadata = {
  title: "Co-working Spaces | FounderStreet",
  description: "In collaboration with Sylework, FounderStreet clients get exclusive prices on co-working spaces. Share your requirement and our team will get in touch.",
};

export default function CoworkingPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Co-working Spaces
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "640px" }}>
            Exclusive co-working pricing for FounderStreet clients.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "560px", lineHeight: 1.75 }}>
            In collaboration with Sylework, we offer exclusive prices for FounderStreet clients. Kindly share your requirements in the box below and we&apos;ll get in touch.
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <CoworkingForm />
          </div>
        </div>
      </section>
    </>
  );
}
