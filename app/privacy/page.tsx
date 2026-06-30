import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy | Founderstreet",
  description: "Founderstreet's privacy policy.",
};

function renderBody(text: string) {
  // Force the contact email to the current address regardless of stored content.
  const fixed = text.replace(/hello@northvilleconsultinggroup\.com/gi, "hi@founderstreet.in");
  const parts = fixed.split(/(\S+@\S+\.\S+)/g);
  return parts.map((part, i) =>
    /\S+@\S+\.\S+/.test(part) ? (
      <a key={i} href={`mailto:${part}`} style={{ color: "#66BB3F", fontWeight: 600, textDecoration: "underline" }}>
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default async function PrivacyPage() {
  const site = await getSiteContent();
  const { lastUpdated, sections } = site.privacyPage;

  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Legal
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "48rem", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "clamp(1.75rem, 4vw, 3rem)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {sections.map((section, i) => (
              <div key={i}>
                {section.heading ? (
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginTop: i === 0 ? 0 : "2rem", marginBottom: "0.65rem" }}>
                    {section.heading}
                  </h2>
                ) : null}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                  {renderBody(section.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
