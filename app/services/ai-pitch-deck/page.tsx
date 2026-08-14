import type { Metadata } from "next";
import PitchDeckAnalyzerForm from "@/components/sections/PitchDeckAnalyzerForm";

export const metadata: Metadata = {
  title: "Free AI Pitch Deck Analyzer | FounderStreet",
  description: "Upload your pitch deck and get an instant, investor-grade score out of 100. We check spelling, grammar, design, readability, and the 16-slide structure. Free, by FounderStreet.",
};

const perks = [
  "Scored out of 100 across five investor-grade criteria",
  "Spelling, grammar, design craft and readability, reviewed",
  "Checked against the standard 16-slide investor structure",
  "Instant, honest feedback from a world-class advisory lens",
];

export default function PitchDeckAnalyzerPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            AI Pitch Deck Analyzer
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "700px" }}>
            How investor-ready is your pitch deck? Find out in seconds.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "620px", lineHeight: 1.75, marginBottom: "2rem" }}>
            Upload your deck and our analyzer scores it out of 100 the way top VCs would, on spelling, grammar, design, readability and structure, with the exact fixes that matter most.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "0.75rem 1.5rem", maxWidth: "780px" }}>
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
            <PitchDeckAnalyzerForm />
          </div>
        </div>
      </section>
    </>
  );
}
