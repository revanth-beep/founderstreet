"use client";

import { useEffect, useRef } from "react";
import { Lightbulb, Rocket, BarChart3, Users } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Idea Validation",
    desc: "Market sizing, SWOT, and unit economics before a single rupee is spent. We stress-test the concept with investor-grade rigour.",
    duration: "Week 1–2",
    color: "#66BB3F",
  },
  {
    icon: Rocket,
    step: "02",
    title: "Foundation Build",
    desc: "Company incorporated, bank accounts open, IP registered, and accounting setup live — legally ready to operate.",
    duration: "Week 2–4",
    color: "#56AD32",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Growth Execution",
    desc: "Full-stack marketing, e-commerce, and retail distribution activated simultaneously for maximum early momentum.",
    duration: "Month 2–6",
    color: "#7BC95A",
  },
  {
    icon: Users,
    step: "04",
    title: "Investor Readiness",
    desc: "Pitch deck, 5-year financial models, and direct warm introductions to our vetted angel and VC network.",
    duration: "Month 4–8",
    color: "#66BB3F",
  },
];

export default function ProcessSection() {
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
            Our Process
          </span>
          <h2 className="heading-lg" style={{ marginTop: "0.75rem" }}>
            From Idea to Investment-Ready{" "}
            <span className="gradient-text">in Under 6 Months</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "#E0E0DC", border: "1px solid #E0E0DC", borderRadius: "12px", overflow: "hidden" }} className="proc-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
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
                    background: step.color,
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
                    color: step.color,
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
                    background: step.color,
                    width: `${(idx + 1) * 25}%`
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .proc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 1024px) { .proc-grid { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </section>
  );
}
