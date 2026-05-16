import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowRight, CheckCircle2, BarChart3, Target, TrendingUp } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import StartupQuiz from "@/components/sections/StartupQuiz";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";

export const metadata: Metadata = {
  title: "Startup Idea Validation & Strategy",
  description:
    "Stress-test your concept before capital is deployed. Market sizing, SWOT analysis, competitor benchmarking, and unit economics modelling.",
};

const deliverables = [
  {
    icon: BarChart3,
    title: "Market Sizing & TAM/SAM/SOM Analysis",
    desc: "We model your total addressable market from first principles, not just copying a McKinsey slide. You'll know the true revenue ceiling and exactly what share is realistic.",
    points: ["Bottom-up market model", "Revenue potential by geography", "3-scenario sizing (conservative/base/bull)"],
  },
  {
    icon: Target,
    title: "SWOT & Competitor Benchmarking",
    desc: "We audit every incumbent in your space: their CAC, LTV, pricing, and the gaps in their product. You'll know exactly where they're failing and how to win.",
    points: ["Competitive landscape map", "Whitespace opportunity analysis", "Positioning recommendation"],
  },
  {
    icon: TrendingUp,
    title: "Unit Economics Modelling",
    desc: "The most important slide in your deck. We build the exact CAC vs LTV model investors will stress-test, including payback periods and contribution margin.",
    points: ["CAC by acquisition channel", "LTV by cohort", "Payback period & break-even model"],
  },
];

const faqs = [
  {
    question: "How long does the validation process take?",
    answer:
      "Our standard validation sprint takes 10–14 working days. We deliver a full report with market sizing, SWOT, and unit economics model, plus a 60-minute walkthrough call.",
  },
  {
    question: "What data sources do you use for market sizing?",
    answer:
      "We use a combination of primary research (founder interviews, consumer surveys), secondary data (Statista, IBEF, industry reports), and bottom-up modelling from existing comparable businesses.",
  },
  {
    question: "Will this analysis work for a pre-revenue idea?",
    answer:
      "Absolutely. In fact, this is where it's most valuable. Pre-revenue validation prevents you from building the wrong thing. We've validated ideas from napkin-sketch stage all the way to Series A.",
  },
  {
    question: "Do you provide the SWOT report as a downloadable template?",
    answer:
      "Yes. Every client receives a fully editable PowerPoint and Excel model. You own all the IP. We also provide a condensed investor-ready version of the market analysis.",
  },
  {
    question: "Can this replace a formal market research firm?",
    answer:
      "For early-stage startups, yes. Traditional market research firms charge ₹5–15L for slower, more generic reports. We're purpose-built for Indian startup contexts and move at startup velocity.",
  },
];

export default function ValidationPage() {
  return (
    <>
      <ServiceHero
        label="Validation & Strategy"
        title="Stress-Test Your Idea"
        titleHighlight="Before Capital Is Deployed."
        subtitle="We audit the concept with the same rigour an institutional investor would. Market sizing, competitive intelligence, and unit economics before you spend a single rupee."
        ctaText="Start Validation"
        icon={FlaskConical}
        stats={[
          { value: "85%", label: "Of validated ideas pivot at least once" },
          { value: "3x", label: "Higher success rate post-validation" },
          { value: "14 days", label: "Turnaround time" },
        ]}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>What You Get</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Three Reports. Zero Guesswork.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    padding: "clamp(1.25rem, 3vw, 2rem)",
                    background: "#FFFFFF",
                    border: "1px solid #E0E0DC",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "6px",
                          background: "#E9F6E4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={20} color="#66BB3F" />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "#A0A0A0",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Deliverable {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#3d4246",
                        lineHeight: 1.3,
                      }}
                    >
                      {d.title}
                    </h3>
                  </div>
                  <div style={{ flex: "2 1 280px", minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "#5A5A5A",
                        marginBottom: "1rem",
                      }}
                    >
                      {d.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {d.points.map((p) => (
                        <span
                          key={p}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "#66BB3F",
                            background: "#E9F6E4",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "999px",
                          }}
                        >
                          <CheckCircle2 size={12} color="#66BB3F" />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>Free Startup Health Check</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
                lineHeight: 1.2,
              }}
            >
              Get a Free SWOT Report
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#5A5A5A",
                marginTop: "0.75rem",
                lineHeight: 1.7,
              }}
            >
              Answer 5 questions about your idea. We&apos;ll send a personalised sample SWOT report to your inbox instantly.
            </p>
          </div>
          <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <StartupQuiz />
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <ServicePageEyebrow>FAQ</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
              }}
            >
              Common Questions
            </h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)",
          paddingBlock: "clamp(4rem, 8vw, 5.5rem)",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            Ready to validate your idea?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.72)",
              maxWidth: "28rem",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Book a free 30-minute discovery call and we&apos;ll scope out your validation project within 24 hours.
          </p>
          <Link href="/contact" className="btn-white">
            Start My Validation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
