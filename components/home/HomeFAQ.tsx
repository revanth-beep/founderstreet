"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does company incorporation take?",
    a: "We get your company live in under 10 working days. The timeline covers Director Identification Numbers (DIN), Digital Signature Certificates (DSC), name reservation via MCA, MOA and AOA drafting, SPICe+ filing, and PAN and TAN registration. All filings handled by us.",
  },
  {
    q: "What does the Virtual CFO service include?",
    a: "Virtual CFO covers monthly bookkeeping, GST and TDS compliance, payroll management, statutory filing (ITR, ROC), and strategic financial forecasting. You also get a dedicated CA, live financial dashboards, and investor-ready reporting. Pricing starts at ₹4,999/month.",
  },
  {
    q: "How does the investor matching work?",
    a: "We maintain a curated list of 775+ vetted investors across VCs, Angels, Banks, Family Offices, and Grants with active investment mandates. After understanding your stage, sector, and funding requirement, we make warm introductions to the right investors and support the conversation through term sheet stage.",
  },
  {
    q: "Do you work with idea-stage founders?",
    a: "Yes. Many of our clients come to us at Day Zero: pre-product, pre-revenue, and sometimes pre-team. Our validation and incorporation services are specifically designed for early-stage founders who need a structured foundation before building.",
  },
  {
    q: "What is your pricing model?",
    a: "Pricing varies by service. Company Incorporation starts at ₹6,999. Virtual CFO starts at ₹4,999/month. Web development starts at ₹24,999. For investor funding and marketing engagements, we work on milestone-based retainers. Book a discovery call for a custom quote.",
  },
  {
    q: "Do you offer refunds?",
    a: "We stand behind our work with a delivery guarantee on all compliance and incorporation filings. If we miss a committed deadline due to our error, we refund the fee for that milestone. Service fees for completed deliverables are non-refundable.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="container-custom" style={{ maxWidth: "54rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="label-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Common Questions
          </span>
          <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
            Answers for{" "}
            <span className="gradient-text">Founders</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid",
                  borderColor: isOpen ? "#CEEAB8" : "#E0E0DC",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                    color: "#3d4246",
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    color="#66BB3F"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#5A5A5A",
                    lineHeight: 1.75,
                    padding: "0 1.5rem 1.25rem",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
