"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Loader2, Building2 } from "lucide-react";

type Step = "q1" | "q2" | "q3" | "loading" | "result";
type Result = { entity: string; reason: string; ctaLabel: string };

const label = { fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#3d4246", marginBottom: "0.75rem", display: "block" as const };
const optionBase = { display: "flex" as const, alignItems: "center" as const, gap: "0.75rem", padding: "0.75rem 1rem", border: "1px solid #E0E0DC", borderRadius: "8px", background: "#FFFFFF", cursor: "pointer" as const, fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", transition: "all 0.2s ease", width: "100%", textAlign: "left" as const };

export default function EntityAdvisor() {
  const [step, setStep] = useState<Step>("q1");
  const [partners, setPartners] = useState("");
  const [funding, setFunding] = useState("");
  const [foreign, setForeign] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function submit(foreignVal: string) {
    setForeign(foreignVal);
    setStep("loading");
    try {
      const res = await fetch("/api/entity-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partners, funding, foreign: foreignVal }),
      });
      setResult(await res.json());
    } catch {
      setResult({ entity: "Pvt Ltd", reason: "Private Limited is the safest default for most startups.", ctaLabel: "Start Pvt Ltd Registration" });
    }
    setStep("result");
  }

  const Opt = ({ label: lbl, onClick }: { label: string; onClick: () => void }) => (
    <button type="button" onClick={onClick} style={optionBase}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#66BB3F"; (e.currentTarget as HTMLElement).style.background = "#F7FDF3"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC"; (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
    >
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#66BB3F", flexShrink: 0 }} />
      {lbl}
    </button>
  );

  return (
    <div style={{ background: "#F7F7F5", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "clamp(1.5rem, 3vw, 2rem)", maxWidth: "42rem", margin: "3rem auto 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#E9F6E4", border: "1px solid #CEEAB8", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={16} color="#66BB3F" />
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#3d4246" }}>Not sure which entity? Ask the Advisor</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>3 quick questions. Instant AI-powered recommendation.</p>
        </div>
      </div>

      {step === "q1" && (
        <div>
          <span style={label}>Q1 of 3: How many co-founders or partners?</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Opt label="Just me — solo founder" onClick={() => { setPartners("solo"); setStep("q2"); }} />
            <Opt label="2 founders" onClick={() => { setPartners("2+"); setStep("q2"); }} />
            <Opt label="3 or more founders / partners" onClick={() => { setPartners("3+"); setStep("q2"); }} />
          </div>
        </div>
      )}

      {step === "q2" && (
        <div>
          <span style={label}>Q2 of 3: Are you planning to raise VC or angel funding?</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Opt label="Yes, we plan to raise equity funding" onClick={() => { setFunding("yes"); setStep("q3"); }} />
            <Opt label="Maybe later, but not immediately" onClick={() => { setFunding("maybe"); setStep("q3"); }} />
            <Opt label="No, we'll be bootstrapped" onClick={() => { setFunding("no"); setStep("q3"); }} />
          </div>
        </div>
      )}

      {step === "q3" && (
        <div>
          <span style={label}>Q3 of 3: Do you plan to accept foreign investment (FDI)?</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Opt label="Yes, we may have foreign investors" onClick={() => submit("yes")} />
            <Opt label="No, all investors will be Indian" onClick={() => submit("no")} />
            <Opt label="Not sure yet" onClick={() => submit("unsure")} />
          </div>
        </div>
      )}

      {step === "loading" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "2rem", color: "#5A5A5A", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>
          <Loader2 size={20} color="#66BB3F" style={{ animation: "spin 0.8s linear infinite" }} />
          Analysing your answers...
        </div>
      )}

      {step === "result" && result && (
        <div style={{ background: "#FFFFFF", border: "1px solid #CEEAB8", borderRadius: "10px", padding: "1.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F", marginBottom: "0.5rem" }}>
            AI Recommendation
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Building2 size={20} color="#66BB3F" />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.375rem", fontWeight: 700, color: "#3d4246" }}>{result.entity}</p>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{result.reason}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.875rem" }}>
              {result.ctaLabel}
              <ArrowRight size={14} />
            </Link>
            <button type="button" onClick={() => { setStep("q1"); setPartners(""); setFunding(""); setResult(null); }} style={{ background: "none", border: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878", cursor: "pointer", textDecoration: "underline" }}>
              Start over
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
