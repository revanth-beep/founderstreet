"use client";

import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, AlertTriangle, Target, Sparkles } from "lucide-react";

const swotItems = [
  {
    icon: TrendingUp,
    label: "Strengths",
    color: "#66BB3F",
    bg: "#E9F6E4",
    border: "#CEEAB8",
    points: ["Scalable SaaS model", "Strong unit economics", "Experienced founding team"],
  },
  {
    icon: AlertTriangle,
    label: "Weaknesses",
    color: "#F59E0B",
    bg: "#FEF3C7",
    border: "#FDE68A",
    points: ["No network effects yet", "High CAC in early stage", "Unproven at scale"],
  },
  {
    icon: Zap,
    label: "Opportunities",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    points: ["India's $1T digital market", "Underserved Tier-2 cities", "Rising VC appetite"],
  },
  {
    icon: Target,
    label: "Threats",
    color: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
    points: ["Incumbent entrenchment", "Regulatory changes", "Talent competition"],
  },
];

export default function TestYourIdeaBlock() {
  return (
    <section style={{ background: "#FFFFFF", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="tyi-grid">

          {/* Left: copy */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span className="label-tag">Start Here</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#56AD32", background: "#E9F6E4", border: "1px solid #CEEAB8", padding: "0.2rem 0.625rem", borderRadius: "99px" }}>
                <Sparkles size={11} />
                Powered by AI
              </span>
            </div>
            <h2 className="heading-lg" style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>
              Get a Free SWOT Snapshot{" "}
              <span className="gradient-text">of Your Idea</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: "2rem", maxWidth: "440px" }}>
              Before you commit time and capital, stress-test your concept. Answer 5 questions and get a personalised SWOT report instantly, free.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Identify your biggest risks before investors do",
                "Understand market sizing and competitive gaps",
                "Delivered to your inbox in under 60 seconds",
              ].map(point => (
                <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#5A5A5A", lineHeight: 1.6 }}>
                  <span style={{ color: "#66BB3F", fontWeight: 700, marginTop: "1px", flexShrink: 0 }}>→</span>
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/startup-health-check" className="btn-primary">
              Run Your Free SWOT Now
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: sample SWOT preview */}
          <div>
            <div style={{
              background: "#F7F7F5",
              border: "1px solid #E0E0DC",
              borderRadius: "14px",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* "Sample Report" watermark label */}
              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "#3d4246", color: "#FFFFFF",
                fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.2rem 0.6rem", borderRadius: "4px",
              }}>
                Sample Report
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                SWOT Analysis
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {swotItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{
                      background: "#FFFFFF",
                      border: `1px solid ${item.border}`,
                      borderRadius: "8px",
                      padding: "0.875rem",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "4px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={12} color={item.color} />
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: item.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          {item.label}
                        </span>
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {item.points.map(pt => (
                          <li key={pt} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A", lineHeight: 1.5 }}>
                            · {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0", textAlign: "center", marginTop: "1rem" }}>
                Your personalised report includes unit economics, competitive analysis, and next steps.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .tyi-grid { grid-template-columns: 1fr 1fr !important; gap: 5rem !important; }
        }
      `}</style>
    </section>
  );
}
