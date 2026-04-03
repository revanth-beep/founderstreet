import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ArrowRight, CheckCircle2, Clock, Shield, FileText, Award } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ComparisonTable from "@/components/ui/ComparisonTable";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";

export const metadata: Metadata = {
  title: "Company Incorporation & Compliance",
  description:
    "End-to-end company incorporation in India. Pvt Ltd, LLP, and sole proprietorship registration with IP protection.",
};

const comparisonColumns = [
  { key: "pvtltd", label: "Private Limited", highlight: true },
  { key: "llp", label: "LLP" },
  { key: "prop", label: "Sole Proprietorship" },
];

const comparisonRows = [
  { feature: "Investor Preferred", values: [true, "partial", false] },
  { feature: "Limited Liability", values: [true, true, false] },
  { feature: "Min. Members Required", values: ["2", "2", "1"] },
  { feature: "ESOPs Available", values: [true, false, false] },
  { feature: "Foreign Investment (FDI)", values: [true, "partial", false] },
  { feature: "Annual Compliance Cost", values: ["₹25,000–50,000", "₹15,000–30,000", "₹5,000–10,000"] },
  { feature: "Incorporation Time", values: ["7–10 days", "10–15 days", "3–5 days"] },
  { feature: "Tax Rate (Turnover < ₹400Cr)", values: ["22%", "30%", "As per slab"] },
  { feature: "Perpetual Existence", values: [true, true, false] },
  { feature: "Best For", values: ["VC-backed startups", "Professional services", "Freelancers/solo ops"] },
];

const process = [
  { step: "01", title: "Director Identification Number (DIN)", desc: "We apply for DINs for all proposed directors. This is the first regulatory step in the incorporation process.", time: "Day 1–2" },
  { step: "02", title: "Digital Signature Certificate (DSC)", desc: "We obtain Class-3 DSCs for all directors, required for signing e-forms on the MCA portal.", time: "Day 1–3" },
  { step: "03", title: "Name Reservation via RUN", desc: "We file a name reservation request with MCA and get your company name approved. We send 3 alternatives.", time: "Day 3–5" },
  { step: "04", title: "MOA & AOA Drafting", desc: "We draft bespoke Memorandum and Articles of Association tailored to your business and investor needs.", time: "Day 4–6" },
  { step: "05", title: "SPICe+ Filing & CIN Issuance", desc: "We file the SPICe+ form with MCA. On approval, you receive your Certificate of Incorporation and CIN.", time: "Day 6–10" },
  { step: "06", title: "PAN, TAN & Bank Account", desc: "We immediately file for PAN and TAN, and assist in opening your company's current bank account.", time: "Day 10–14" },
];

const bundles = [
  {
    icon: FileText,
    title: "Complete Incorporation Bundle",
    items: ["Certificate of Incorporation", "PAN & TAN registration", "MOA & AOA documents", "Share certificates", "First board resolution", "Commencement certificate"],
  },
  {
    icon: Shield,
    title: "IP & Brand Protection",
    items: ["Trademark search & filing", "Class identification", "Domain registration", "Brand name legal clearance", "Logo copyright registration", "NDA templates"],
  },
  {
    icon: Award,
    title: "Post-Incorporation Setup",
    items: ["Startup India recognition", "GST registration (if needed)", "Bank account assistance", "Company letterhead & seal", "Annual compliance calendar", "CA introduction"],
  },
];

const faqs = [
  { question: "What is the minimum share capital required for a Pvt Ltd company?", answer: "There is no minimum paid-up capital requirement for a Private Limited Company as per the Companies (Amendment) Act, 2015. However, the authorised share capital (typically ₹1,00,000) is required for stamp duty calculation." },
  { question: "How many directors and shareholders are needed?", answer: "A minimum of 2 directors and 2 shareholders are required for a Private Limited Company. The same person can act as both director and shareholder. Maximum directors allowed: 15 (can be increased by special resolution)." },
  { question: "What documents do I need to provide?", answer: "For each director: PAN card, Aadhaar card, passport-size photograph, current bank statement (utility bill for address proof), email ID, and mobile number. For the registered office: rental agreement and NOC from landlord." },
  { question: "Can I incorporate a company as a non-resident Indian (NRI)?", answer: "Yes. NRIs can be directors and shareholders in an Indian company. At least one director must be a resident of India (stayed in India for at least 182 days in the previous calendar year)." },
  { question: "What happens after incorporation?", answer: "Post-incorporation, we handle: commencement of business declaration, opening of bank accounts, registration for GST (if applicable), Startup India registration, and first-year annual compliance calendar setup." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#111111",
  lineHeight: 1.2 as const,
  letterSpacing: "-0.01em" as const,
};

export default function IncorporationPage() {
  return (
    <>
      <ServiceHero
        label="Company Incorporation"
        title="Your Legal Foundation,"
        titleHighlight="Built Right From Day Zero."
        subtitle="End-to-end company registration and regulatory compliance. We handle the paperwork so your first 10 days are spent building product, not filing forms."
        ctaText="Start Incorporation"
        icon={Building2}
        stats={[
          { value: "< 10 Days", label: "Avg. incorporation time" },
          { value: "500+", label: "Companies incorporated" },
          { value: "100%", label: "Compliance success rate" },
        ]}
      />

      <section style={{ background: "#FAFAF8", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>Entity Comparison</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Which Structure is Right for You?</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Choosing the wrong entity can cost you your next funding round. Here&apos;s the data you need to decide.
            </p>
          </div>
          <ComparisonTable columns={comparisonColumns} rows={comparisonRows} title="Pvt Ltd vs LLP vs Sole Proprietorship" subtitle="A comprehensive comparison for Indian founders making the incorporation decision" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center", marginTop: "1rem" }}>
            * For startups seeking venture capital, Private Limited is the only investor-compatible structure.
          </p>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Our Process</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>
              Company Live in <span className="gradient-text">10 Working Days</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {process.map((p) => (
              <div key={p.step} style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      border: "2px solid #E0E0DC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 15px -3px rgba(0,0,0,0.07)",
                    }}
                  >
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "0.875rem", color: "#1B4332" }}>{p.step}</span>
                  </div>
                </div>
                <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                  <div style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 1rem", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.0625rem", color: "#111111" }}>{p.title}</h3>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", fontWeight: 500 }}>
                        <Clock size={12} />
                        {p.time}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAF8", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
            {bundles.map((bundle) => {
              const Icon = bundle.icon;
              return (
                <div key={bundle.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#EDFAF2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} color="#1B4332" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#111111", marginBottom: "1rem" }}>{bundle.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {bundle.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>
                        <CheckCircle2 size={16} color="#1B4332" style={{ flexShrink: 0, marginTop: "2px" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={h2}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Start your incorporation today</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Get your company live in 10 working days. We handle every filing; you focus on building your product.
          </p>
          <Link href="/contact" className="btn-white">
            Start Incorporation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
