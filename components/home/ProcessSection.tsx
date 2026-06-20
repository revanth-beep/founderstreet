"use client";

import { useEffect, useRef } from "react";
import { Lightbulb, Rocket, BarChart3, Users, ShieldCheck, Zap, Users2, Target, Search } from "lucide-react";
import type { ProcessSectionCms } from "@/lib/site-content-defaults";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Lightbulb, Rocket, BarChart3, Users, ShieldCheck, Zap, Users2, Target, Search,
};

const STEP_COLORS = ["#66BB3F", "#56AD32", "#7BC95A", "#66BB3F"];

export default function ProcessSection({ cms }: { cms: ProcessSectionCms }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const cards = sectionRef.current?.querySelectorAll(".proc-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: "#F7F7F5" }}>
      <div className="container-custom">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <span className="label-tag" style={{ marginBottom: "1rem" }}>
            {cms.eyebrow}
          </span>
          <h2 className="heading-lg" style={{ marginTop: "0.75rem" }}>
            {cms.title}{" "}
            <span className="gradient-text">{cms.titleGradient}</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "#E0E0DC", border: "1px solid #E0E0DC", borderRadius: "12px", overflow: "hidden" }} className="proc-grid">
          {cms.steps.map((step, idx) => {
            const Icon = ICON_MAP[step.iconName] ?? Lightbulb;
            const color = STEP_COLORS[idx % STEP_COLORS.length];
            return (
              <div
                key={step.step}
                className="proc-card"
                style={{
                  background: "#FFFFFF",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{
                    width: "48px", height: "48px",
                    background: color,
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={22} color="#FFFFFF" />
                  </div>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "3.5rem", fontWeight: 800,
                    color: "#F0F0ED", lineHeight: 1,
                    userSelect: "none"
                  }}>
                    {step.step}
                  </span>
                </div>

                {/* Duration badge */}
                <div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6875rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: color,
                    background: "#E9F6E4",
                    padding: "0.2rem 0.625rem", borderRadius: "99px"
                  }}>
                    {step.duration}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.25rem", fontWeight: 700,
                  color: "#3d4246",
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "#5A5A5A",
                }}>
                  {step.desc}
                </p>

                {/* Progress indicator */}
                <div style={{
                  height: "3px", borderRadius: "99px",
                  background: "#F0F0ED", marginTop: "0.5rem"
                }}>
                  <div style={{
                    height: "100%", borderRadius: "99px",
                    background: color,
                    width: `${(idx + 1) * Math.round(100 / cms.steps.length)}%`
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

          </section>
  );
}
