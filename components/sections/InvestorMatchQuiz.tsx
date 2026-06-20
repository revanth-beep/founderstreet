"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Loader2, CheckCircle2 } from "lucide-react";

type QuizStep = "q1" | "q2" | "q3" | "q4" | "q5" | "email" | "loading" | "result";

const questions = [
  {
    id: "q1" as QuizStep,
    next: "q2" as QuizStep,
    label: "Q1 of 5",
    question: "What is your primary industry?",
    options: ["FinTech", "SaaS / B2B Software", "D2C / Consumer", "HealthTech", "DeepTech", "EdTech", "AgriTech", "Other"],
  },
  {
    id: "q2" as QuizStep,
    next: "q3" as QuizStep,
    label: "Q2 of 5",
    question: "What is your primary business model?",
    options: ["B2B", "B2C", "Marketplace", "B2B2C", "Hardware / Deep-tech"],
  },
  {
    id: "q3" as QuizStep,
    next: "q4" as QuizStep,
    label: "Q3 of 5",
    question: "What stage are you raising for?",
    options: ["Pre-Seed (Idea / MVP)", "Seed (Early Traction)", "Pre-Series A", "Series A"],
  },
  {
    id: "q4" as QuizStep,
    next: "q5" as QuizStep,
    label: "Q4 of 5",
    question: "How much capital are you raising?",
    options: ["Under ₹50 Lakhs", "₹50L – ₹2Cr", "₹2Cr – ₹5Cr", "$1M+"],
  },
  {
    id: "q5" as QuizStep,
    next: "email" as QuizStep,
    label: "Q5 of 5",
    question: "What is your current revenue traction?",
    options: ["Pre-Revenue", "Post-Revenue (Early)", "₹10L – ₹50L ARR", "₹1Cr+ ARR"],
  },
];

const SAMPLE_MATCHES = [
  { name: "Blume Ventures", focus: "Early-stage Indian tech startups", stage: "Pre-Seed – Seed", cheque: "₹50L – ₹3Cr", fit: "Strong sector match and stage alignment." },
  { name: "Venture Catalysts", focus: "India's largest integrated incubator", stage: "Seed", cheque: "$200K – $2M", fit: "Active deployment velocity. Portfolio conflict check: clear." },
  { name: "AngelList India", focus: "Rolling funds, SAFE notes", stage: "Pre-Seed – Seed", cheque: "₹10L – ₹1Cr", fit: "Ranked #1 by deal count. Mandate match confirmed." },
];

export default function InvestorMatchQuiz() {
  const [step, setStep] = useState<QuizStep>("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function pickOption(questionId: string, option: string, next: QuizStep) {
    setAnswers(a => ({ ...a, [questionId]: option }));
    setStep(next);
  }

  function submitEmail() {
    if (!email.includes("@")) { setEmailError("Enter a valid email address."); return; }
    setEmailError("");
    setStep("loading");
    setTimeout(() => setStep("result"), 1400);
  }

  const currentQ = questions.find(q => q.id === step);

  return (
    <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
      {currentQ && (
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F", marginBottom: "0.75rem" }}>
            {currentQ.label}
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.125rem, 2vw, 1.375rem)", fontWeight: 700, color: "#3d4246", marginBottom: "1.25rem" }}>{currentQ.question}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {currentQ.options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => pickOption(currentQ.id, opt, currentQ.next)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.125rem", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#3d4246", textAlign: "left", transition: "all 0.18s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#66BB3F"; (e.currentTarget as HTMLElement).style.background = "#F7FDF3"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC"; (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E0E0DC", flexShrink: 0 }} />
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "email" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Mail size={18} color="#66BB3F" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.125rem, 2vw, 1.375rem)", fontWeight: 700, color: "#3d4246" }}>Unlock Your Top 3 Investor Matches</h3>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>
            Enter your email and we will instantly reveal the 3 investors best matched to your stage, sector, and funding requirement.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="you@startup.com"
              style={{ flex: "1 1 240px", padding: "0.75rem 1rem", border: `1px solid ${emailError ? "#EF4444" : "#E0E0DC"}`, borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", outline: "none" }}
            />
            <button type="button" onClick={submitEmail} className="btn-primary" style={{ flexShrink: 0 }}>
              See My Matches <ArrowRight size={15} />
            </button>
          </div>
          {emailError && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "0.5rem" }}>{emailError}</p>}
        </div>
      )}

      {step === "loading" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "3rem 0" }}>
          <Loader2 size={32} color="#66BB3F" style={{ animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>Scanning 200+ investor mandates...</p>
        </div>
      )}

      {step === "result" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
            <CheckCircle2 size={22} color="#66BB3F" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246" }}>Your Top 3 Investor Matches</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {SAMPLE_MATCHES.map((m, i) => (
              <div key={m.name} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.625rem" }}>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F" }}>Match #{i + 1}</span>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: "#3d4246", marginTop: "0.25rem" }}>{m.name}</h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878" }}>{m.focus}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>{m.stage}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "#3d4246" }}>{m.cheque}</p>
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", background: "#F7FDF3", border: "1px solid #CEEAB8", borderRadius: "6px", padding: "0.5rem 0.75rem" }}>
                  <strong style={{ color: "#56AD32" }}>Why this match:</strong> {m.fit}
                </p>
              </div>
            ))}
          </div>
          <div style={{ background: "#3d4246", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Get the full bespoke investor list + warm introductions
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              These 3 are a preview. Our team builds a custom dossier of 15–25 vetted investors with portfolio conflict checks and partner-level profiling.
            </p>
            <Link href="/contact" className="btn-primary">
              Book Your Capital Strategy Call
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
          </div>
  );
}
