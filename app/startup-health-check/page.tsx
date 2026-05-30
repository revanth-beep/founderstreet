import type { Metadata } from "next";
import StartupQuiz from "@/components/sections/StartupQuiz";
import { CheckCircle2, ClipboardList, Mail, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Test Your Idea: Free SWOT Report | Founderstreet",
  description: "Answer 5 questions about your startup idea. Get a free personalised SWOT analysis and market sizing report sent to your inbox instantly.",
};

const what = [
  {
    icon: TrendingUp,
    title: "Market Sizing Snapshot",
    desc: "A brief TAM/SAM/SOM estimation for your sector based on your inputs.",
  },
  {
    icon: CheckCircle2,
    title: "SWOT Framework",
    desc: "Preliminary strengths, weaknesses, opportunities, and threats tailored to your stage.",
  },
  {
    icon: ClipboardList,
    title: "Top 3 Priorities",
    desc: "Actionable recommendations for your single biggest execution gap right now.",
  },
  {
    icon: Mail,
    title: "Follow-up from Our Team",
    desc: "A consultant from Founderstreet will review your answers and reach out within 48 hours.",
  },
];

export default function StartupHealthCheckPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)",
        paddingTop: "8rem", paddingBottom: "4.5rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)" }} />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "680px", marginInline: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "44px", height: "44px", background: "rgba(123,201,90,0.2)", border: "1px solid rgba(123,201,90,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ClipboardList size={20} color="#9FE670" />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670" }}>
              Test Your Idea, Free
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1rem" }}>
            5 Questions. Free SWOT Report.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
            Answer 5 quick questions about your startup. In exchange for your email, we&apos;ll send a personalised SWOT analysis and market positioning snapshot, instantly.
          </p>
        </div>
      </section>

      {/* ── Quiz + What you get ──────────────── */}
      <section className="section-padding" style={{ background: "#F7F7F5" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start", maxWidth: "960px", marginInline: "auto" }} className="hc-grid">

            {/* Quiz */}
            <StartupQuiz />

            {/* What you get */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#3d4246", marginBottom: "1.25rem" }}>
                What You&apos;ll Receive
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {what.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1rem", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px" }}>
                      <div style={{ width: "36px", height: "36px", background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color="#66BB3F" />
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#3d4246", marginBottom: "0.25rem" }}>{item.title}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "#787878" }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}

                <div style={{ padding: "1rem", background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "10px", marginTop: "0.25rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "#66BB3F", marginBottom: "0.25rem" }}>100% Free. No credit card.</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.65, color: "#56AD32" }}>
                    This report is our gift to the Indian startup ecosystem. No strings attached. We just ask for your email to send the report.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (min-width: 1024px) { .hc-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>
    </>
  );
}
