"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Zap, Users2, Target, Lightbulb, Rocket, BarChart3, Users, Search } from "lucide-react";
import type { WhySectionCms } from "@/lib/site-content-defaults";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  ShieldCheck, Zap, Users2, Target, Lightbulb, Rocket, BarChart3, Users, Search,
};

export default function WhySection({ cms }: { cms: WhySectionCms }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const items = sectionRef.current?.querySelectorAll(".why-item");
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }} className="why-grid">

          {/* Left */}
          <div>
            <span className="label-tag" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              {cms.eyebrow}
            </span>
            <h2 className="heading-lg" style={{ marginBottom: "1.25rem", marginTop: "0.5rem" }}>
              {cms.title}{" "}
              <span className="gradient-text">{cms.titleGradient}</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: "2.5rem", maxWidth: "480px" }}>
              {cms.subtitle}
            </p>

            {/* Comparison table */}
            <div style={{
              background: "#3d4246",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "0.875rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  Feature
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F87171", textAlign: "center" as const }}>
                  Traditional CA
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9FE670", textAlign: "center" as const }}>
                  FounderStreet
                </span>
              </div>
              {cms.comparison.map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < cms.comparison.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#F87171", textAlign: "center" as const, fontWeight: 500 }}>
                    {row.them}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#9FE670", textAlign: "center" as const, fontWeight: 600 }}>
                    {row.us}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — reasons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {cms.reasons.map((r) => {
              const Icon = ICON_MAP[r.iconName] ?? ShieldCheck;
              return (
                <div
                  key={r.title}
                  className="why-item"
                  style={{
                    padding: "1.625rem",
                    background: "#FAFAFA",
                    border: "1px solid #E0E0DC",
                    borderRadius: "10px",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 30px rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#CEEAB8";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC";
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px",
                    background: "#E9F6E4",
                    border: "1px solid #DEF3D4",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <Icon size={18} color="#66BB3F" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1rem", fontWeight: 700,
                    color: "#3d4246", marginBottom: "0.5rem"
                  }}>
                    {r.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8125rem", lineHeight: 1.65,
                    color: "#5A5A5A"
                  }}>
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

          </section>
  );
}
