import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight, FileText, BarChart3, Users, Download } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";

export const metadata: Metadata = {
  title: "Investor Funding & Pitch Deck Services",
  description:
    "Pitch deck creation, financial projections, and investor matchmaking. Connect with India's leading angels, VCs, and accelerators.",
};

const deckTemplates = [
  { name: "Seed Round Deck", slides: 12, best: "Pre-seed to seed", raise: "₹50L – ₹3Cr", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop" },
  { name: "Series A Narrative", slides: 15, best: "Traction-stage", raise: "₹3Cr – ₹20Cr", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { name: "Angel Round Teaser", slides: 8, best: "Idea to MVP", raise: "₹10L – ₹1Cr", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=300&fit=crop" },
  { name: "Accelerator Application", slides: 10, best: "Y Combinator / SFA", raise: "Programme equity", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop" },
];

const coreServices = [
  { icon: FileText, title: "Pitch Deck Creation", desc: "The 12-slide master deck designed to make investors lean forward. We combine data storytelling with visual design excellence.", deliverables: ["12-slide investor deck", "Narrative storyboarding", "Visual design (Figma/PowerPoint)", "Investor Q&A script", "Mock pitch session", "3 revision rounds"] },
  { icon: BarChart3, title: "Financial Projections", desc: "5-year Excel models that withstand investor scrutiny. Built bottom-up with clear assumptions, scenario analysis, and key driver sensitivity.", deliverables: ["5-year P&L projection", "Revenue & cost model", "3 scenarios (bear/base/bull)", "Cohort analysis", "Fundraise utilisation plan", "Cap table modelling"] },
  { icon: Users, title: "Investor Matchmaking", desc: "Warm introductions to the right investors at the right stage. No cold emails. We only connect you with investors who've pre-indicated interest.", deliverables: ["Investor database scan", "Stage & sector matching", "Warm email introductions", "Meeting preparation brief", "Pipeline CRM setup (n8n)", "Post-meeting follow-up"] },
];

const faqs = [
  { question: "What does the pitch deck creation process look like?", answer: "Week 1: Discovery call + competitive analysis + narrative structure workshop. Week 2: First draft (8 slides). Week 3: Revisions + financial model integration. Week 4: Final deck + investor Q&A prep session. We also provide a 30-minute mock pitch before your first investor meeting." },
  { question: "What is the 12-slide master deck structure?", answer: "Our proven structure: 1) Cover + Hook, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Go-to-Market, 8) Traction, 9) Team, 10) Financials, 11) Competition, 12) The Ask. Each slide has a single, clear message." },
  { question: "How do you source investors for matchmaking?", answer: "We maintain a live database of 200+ vetted angels, 40+ VC funds, and 15+ accelerators/incubators active in India. We only make warm introductions — cold email blasting destroys reputation. Matching is based on sector fit, cheque size, and stage alignment." },
  { question: "What does the n8n automation process mean for investor outreach?", answer: "We use n8n (a workflow automation tool) to systematise investor pipeline management. This includes automated follow-up sequences, CRM tracking, meeting scheduling, and data room access management — ensuring no warm lead falls through the cracks." },
  { question: "Do you take equity for your fundraising services?", answer: "No equity for pitch deck creation or financial modelling. For investor matchmaking and warm introductions, we charge a fixed project fee upfront. We do not take success fees or equity percentages — this keeps our incentives clean and conflict-free." },
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

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>Resource Library</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Pitch Deck Templates</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Preview our winning frameworks. Download a free seed-round template and start building your narrative today.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1rem" }}>
            {deckTemplates.map((template) => (
              <div key={template.name} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#F0F0ED", position: "relative" }}>
                  <img src={template.image} alt={template.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
                  <div style={{ position: "absolute", top: "0.5rem", left: "0.5rem", background: "#66BB3F", color: "#FFFFFF", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                    {template.slides} slides
                  </div>
                </div>
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#3d4246", marginBottom: "0.25rem" }}>{template.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#787878", marginBottom: "0.25rem" }}>Best for: {template.best}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#66BB3F", marginBottom: "0.75rem" }}>Target raise: {template.raise}</p>
                  <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#66BB3F", textDecoration: "none" }}>
                    <Download size={14} />
                    Download Free Template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/contact" className="btn-primary">
              Download Seed-Round Template
              <Download size={16} />
            </Link>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginTop: "0.75rem" }}>Free with email. No commitment required.</p>
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

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Your funding round starts with one deck.</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Let&apos;s build the narrative that gets you in the room — and gets the room to say yes.
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
