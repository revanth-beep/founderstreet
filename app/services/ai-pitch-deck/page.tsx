import type { Metadata } from "next";
import PitchDeckForm from "@/components/sections/PitchDeckForm";

export const metadata: Metadata = {
  title: "Free AI Pitch Deck Generator | FounderStreet",
  description: "Upload your pitch material, pick a theme, and get a personalised, investor-ready pitch deck emailed to you in minutes. Free, by FounderStreet.",
};

const perks = [
  "Built on a proven 12-slide investor structure",
  "Styled in your chosen colour theme and font",
  "Personalised with your name and company",
  "Delivered to your inbox in minutes, as PDF or PowerPoint",
];

export default function AiPitchDeckPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            AI Pitch Deck Generator
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "680px" }}>
            A million-dollar pitch deck, generated for you. Free.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "620px", lineHeight: 1.75, marginBottom: "2rem" }}>
            Upload your pitch material or describe your startup, choose a look, and our AI builds a polished, investor-ready deck. We email it to you in minutes.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem 1.5rem", maxWidth: "760px" }}>
            {perks.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                <span style={{ color: "#9FE670", flexShrink: 0 }}>✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <PitchDeckForm />
          </div>
        </div>
      </section>
    </>
  );
}
