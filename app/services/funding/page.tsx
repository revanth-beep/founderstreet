import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight, FileText, BarChart3, Users, Search, Shield, Zap, Target } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import InvestorMatchQuiz from "@/components/sections/InvestorMatchQuiz";

export const metadata: Metadata = {
  title: "Investor Funding & Pitch Deck Services",
  description:
    "Pitch deck creation, financial projections, and investor matchmaking. Connect with India's leading angels, VCs, and accelerators.",
};

const coreServices = [
  { icon: FileText, title: "Pitch Deck Creation", desc: "The 12-slide master deck designed to make investors lean forward. We combine data storytelling with visual design excellence.", deliverables: ["12-slide investor deck", "Narrative storyboarding", "Visual design (Figma/PowerPoint)", "Investor Q&A script", "Mock pitch session", "3 revision rounds"] },
  { icon: BarChart3, title: "Financial Projections", desc: "5-year Excel models that withstand investor scrutiny. Built bottom-up with clear assumptions, scenario analysis, and key driver sensitivity.", deliverables: ["5-year P&L projection", "Revenue & cost model", "3 scenarios (bear/base/bull)", "Cohort analysis", "Fundraise utilisation plan", "Cap table modelling"] },
  { icon: Users, title: "Investor Matchmaking", desc: "Warm introductions to the right investors at the right stage. No cold emails. We only connect you with investors who've pre-indicated interest.", deliverables: ["Investor database scan", "Stage & sector matching", "Warm email introductions", "Meeting preparation brief", "Pipeline CRM setup (n8n)", "Post-meeting follow-up"] },
];

const faqs = [
  { question: "What does the pitch deck creation process look like?", answer: "Week 1: Discovery call + competitive analysis + narrative structure workshop. Week 2: First draft (8 slides). Week 3: Revisions + financial model integration. Week 4: Final deck + investor Q&A prep session. We also provide a 30-minute mock pitch before your first investor meeting." },
  { question: "What is the 12-slide master deck structure?", answer: "Our proven structure: 1) Cover + Hook, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Go-to-Market, 8) Traction, 9) Team, 10) Financials, 11) Competition, 12) The Ask. Each slide has a single, clear message." },
  { question: "How do you source investors for matchmaking?", answer: "We maintain a live network of 25+ vetted investor connects active in India. We only make warm introductions. Cold email blasting destroys reputation. Matching is based on sector fit, cheque size, and stage alignment." },
  { question: "What does the n8n automation process mean for investor outreach?", answer: "We use n8n (a workflow automation tool) to systematise investor pipeline management. This includes automated follow-up sequences, CRM tracking, meeting scheduling, and data room access management. No warm lead falls through the cracks." },
  { question: "Do you take equity for your fundraising services?", answer: "No equity for pitch deck creation or financial modelling. For investor matchmaking and warm introductions, we charge a fixed project fee upfront. We do not take success fees or equity percentages. This keeps our incentives clean and conflict-free." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

export default function FundingPage() {
  return (
    <>
      <ServiceHero
        label="Investor Funding & Pitch Decks"
        title="Turn Metrics Into"
        titleHighlight="a Compelling Narrative."
        subtitle="We transform your raw data into the exact story institutional investors want to hear. Pitch deck creation, financial modelling, and warm introductions to our vetted network."
        ctaText="Build My Deck"
        icon={TrendingUp}
        stats={[
          { value: "₹40Cr+", label: "Funding facilitated" },
          { value: "200+", label: "Investor introductions" },
          { value: "73%", label: "Decks that secured term sheets" },
        ]}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} color="#66BB3F" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#3d4246", marginBottom: "0.5rem" }}>{service.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{service.desc}</p>
                  <div style={{ borderTop: "1px solid #E0E0DC", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.75rem" }}>Deliverables</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {service.deliverables.map((d) => (
                        <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#66BB3F", flexShrink: 0 }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing strip */}
      <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", borderBottom: "1px solid #E0E0DC", paddingBlock: "2.5rem" }}>
        <div className="container-custom">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem 3rem", alignItems: "center", justifyContent: "center" }}>
            {[
              { service: "Pitch Deck Creation", price: "Starting at ₹9,999" },
              { service: "Financial Projections (5-year)", price: "Starting at ₹14,999" },
              { service: "Investor Matchmaking", price: "Starting at ₹24,999" },
              { service: "Full Fundraising Package", price: "Custom — Book a Call" },
            ].map(item => (
              <div key={item.service} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginBottom: "0.25rem" }}>{item.service}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "#3d4246" }}>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Investor Matchmaker Quiz */}
      <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>AI Investor Matchmaker</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Find Your Top 3 Investor Matches in 60 Seconds</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              5 quick questions. No pitch deck upload. No friction. Our AI cross-references your profile against 200+ active investor mandates and surfaces the 3 best fits.
            </p>
          </div>
          <InvestorMatchQuiz />
        </div>
      </section>

      {/* Beyond the Algorithm */}
      <section style={{ background: "#3d4246", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9FE670" }}>Beyond the Algorithm</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#FFFFFF", marginTop: "1rem", lineHeight: 1.2 }}>
              The AI found the fund. We find the strategy.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Here is how we go deeper than any algorithm can.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {[
              { icon: Search, title: "Portfolio Conflict Checks", desc: "We analyse the fund's active portfolio to ensure they have not quietly invested in your direct competitor in the past 6 months." },
              { icon: Zap, title: "Dry Powder & Deployment Velocity", desc: "We track exactly where a fund is in its lifecycle: actively deploying or just taking coffee chats with no capital to deploy." },
              { icon: Users, title: "Partner-Level Profiling", desc: "Funds do not write cheques. Partners do. We identify exactly which General Partner holds the mandate for your specific sector and stage." },
              { icon: Target, title: "Follow-On Capacity & Strategic Fit", desc: "We analyse past deals to assess the investor's track record of participating in subsequent rounds (Series A/B)." },
            ].map(p => {
              const Icon = p.icon;
              return (
                <div key={p.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(102,187,63,0.15)", border: "1px solid rgba(102,187,63,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={18} color="#9FE670" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", maxWidth: "32rem", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              Do not guess your way through fundraising. Let us build your custom investor dossier and facilitate the warm introductions.
            </p>
            <Link href="/contact" className="btn-primary">
              Book Your Capital Strategy Call
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pitch Deck Builder */}
      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Pitch Deck Builder</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Need a Deck in 60 Seconds? Start Here.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              AI generates your first draft. Our team polishes it into an investor-ready deck.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.25rem", maxWidth: "56rem", margin: "0 auto" }}>
            {[
              { tier: "Tier 1", label: "Quick Draft", price: "Free", tool: "Gamma.app", desc: "AI generates a 10-slide deck from a single prompt in under 60 seconds. 70M+ users globally.", highlight: false, ctaLabel: "Generate Free Draft" },
              { tier: "Tier 2", label: "Polished Deck", price: "₹4,999", tool: "Chronicle HQ", desc: "Interactive block-based deck (Indian-founded, Accel-backed). Our team reviews and edits before delivery.", highlight: true, ctaLabel: "Get a Polished Deck" },
              { tier: "Tier 3", label: "Investor-Grade Deck", price: "₹24,999+", tool: "Slidebean", desc: "Bespoke narrative with slide-level analytics. Templates used by Airbnb, Intercom, Buffer.", highlight: false, ctaLabel: "Book Bespoke Deck" },
            ].map(t => (
              <div key={t.tier} style={{ background: t.highlight ? "#66BB3F" : "#FFFFFF", border: t.highlight ? "1px solid #56AD32" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: t.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {t.highlight && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>Most Popular</span>}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.highlight ? "rgba(255,255,255,0.65)" : "#A0A0A0", marginBottom: "0.25rem" }}>{t.tier}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: t.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{t.label}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: t.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.75rem" }}>{t.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: t.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{t.desc}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: t.highlight ? "rgba(255,255,255,0.5)" : "#A0A0A0", marginBottom: "1.25rem" }}>Powered by {t.tool}</p>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "0.625rem 1rem", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: t.highlight ? "#FFFFFF" : "#66BB3F", color: t.highlight ? "#66BB3F" : "#FFFFFF" }}>
                  {t.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={h2}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <CaseStudyBanner />

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Your funding round starts with one deck.</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Let&apos;s build the narrative that gets you in the room and gets the room to say yes.
          </p>
          <Link href="/contact" className="btn-white">
            Build My Pitch Deck
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
