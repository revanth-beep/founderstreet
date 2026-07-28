import type { Metadata } from "next";
import { Users } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import HireTalentForm from "@/components/sections/HireTalentForm";

export const metadata: Metadata = {
  title: "Hire Talent | FounderStreet",
  description:
    "FounderStreet gives your startup direct access to a curated database of students and young professionals from IIMs and India's top colleges, matched to your open roles by function, specialization, and intent.",
};

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

const WHY_REASONS = [
  {
    title: "Verified college partnerships",
    desc: "Direct pipelines into IIMs and top undergraduate and postgraduate institutions across India.",
  },
  {
    title: "Curated pools, not mass applications",
    desc: "Colleges put forward candidates from their network who match your role on specialization, skills, and, where relevant, prior work experience.",
  },
  {
    title: "You review, you decide",
    desc: "We send a shortlist. You run the interviews and make the call.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Post your requirement",
    desc: "Share your company and contact details below. We will send you the full role brief form right after.",
  },
  {
    step: "02",
    title: "We match against our database",
    desc: "We screen our talent pool and match candidates to your role, weighted to your criteria.",
  },
  {
    step: "03",
    title: "Colleges confirm availability",
    desc: "We coordinate with partner colleges to confirm shortlisted students are ready to interview.",
  },
  {
    step: "04",
    title: "You interview and hire",
    desc: "Receive a ranked shortlist with match rationale: you take it from there.",
  },
];

const STEP_COLORS = ["#66BB3F", "#56AD32", "#7BC95A", "#66BB3F"];

export default function HireTalentPage() {
  return (
    <>
      <ServiceHero
        label="Hire Talent"
        title="Hire From India's Best Campuses,"
        titleHighlight="Without the Hiring Grind"
        subtitle="FounderStreet gives your startup direct access to a curated database of students and young professionals from IIMs and India's top colleges, matched to your open roles by function, specialization, and intent, not just keywords."
        ctaText="Post Your Requirement"
        ctaHref="#requirement-form"
        ctaSecondaryText="See How It Works"
        ctaSecondaryHref="#how-it-works"
        icon={Users}
      />

      {/* Why FounderStreet */}
      <section style={{ background: "#FFFFFF", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Why FounderStreet</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>
              A talent pipeline most startups can&apos;t build on their own
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              College internships and placements typically take years of relationship-building. We&apos;ve already done it, so you get the shortlist without the groundwork.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.25rem", maxWidth: "60rem", margin: "0 auto" }}>
            {WHY_REASONS.map((r, i) => (
              <div
                key={r.title}
                className="card"
                style={{ padding: "1.625rem" }}
              >
                <div style={{
                  width: "40px", height: "40px",
                  background: "#E9F6E4",
                  border: "1px solid #DEF3D4",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700, fontSize: "1.0625rem",
                  color: "#66BB3F",
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.0625rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
                  {r.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.65, color: "#5A5A5A" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>How It Works</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>From open role to shortlist</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Tell us what you need once: we handle the sourcing, screening, and college coordination.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "#E0E0DC", border: "1px solid #E0E0DC", borderRadius: "12px", overflow: "hidden" }} className="proc-grid">
            {STEPS.map((s, idx) => {
              const color = STEP_COLORS[idx % STEP_COLORS.length];
              return (
                <div key={s.step} style={{ background: "#FFFFFF", padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem", fontWeight: 700,
                      color: "#FFFFFF", background: color,
                      width: "32px", height: "32px", borderRadius: "8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.75rem", fontWeight: 800,
                      color: "#F0F0ED", lineHeight: 1,
                      userSelect: "none" as const,
                    }}>
                      {s.step}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.0625rem", fontWeight: 700, color: "#3d4246" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7, color: "#5A5A5A" }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Post a Requirement */}
      <section id="requirement-form" style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Post a Requirement</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Tell us who you&apos;re looking for</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              The more specific you are, the better your shortlist. This takes about five minutes.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginTop: "0.75rem" }}>
              * indicates a required field. All other fields are optional or conditional as noted.
            </p>
          </div>
          <div style={{ maxWidth: "44rem", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "clamp(1.5rem, 4vw, 2.5rem)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <HireTalentForm />
          </div>
        </div>
      </section>
    </>
  );
}
