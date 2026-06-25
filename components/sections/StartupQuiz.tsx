"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const questions = [
  {
    id: "stage",
    question: "What stage is your startup at?",
    options: [
      { label: "Just an idea", value: "idea" },
      { label: "Building the product", value: "mvp" },
      { label: "Launched, early customers", value: "early_users" },
      { label: "Generating steady revenue", value: "revenue" },
    ],
  },
  {
    id: "industry",
    question: "Which industry best describes your startup?",
    options: [
      { label: "Consumer Products & Retail", value: "consumer" },
      { label: "Technology & Software", value: "technology" },
      { label: "Services & Marketplace", value: "services" },
      { label: "Healthcare, Education & Other", value: "other" },
    ],
  },
  {
    id: "customers",
    question: "Who are your primary customers?",
    options: [
      { label: "Individual consumers (B2C)", value: "b2c" },
      { label: "Other businesses (B2B)", value: "b2b" },
      { label: "Both consumers & businesses", value: "b2b2c" },
      { label: "Government / Institutions", value: "govt" },
    ],
  },
  {
    id: "challenge",
    question: "What's your biggest challenge right now?",
    options: [
      { label: "Validating the idea / market fit", value: "pmf" },
      { label: "Building the product", value: "build" },
      { label: "Acquiring customers", value: "acquisition" },
      { label: "Raising funding", value: "funding" },
    ],
  },
  {
    id: "team",
    question: "What does your founding team look like?",
    options: [
      { label: "Solo founder", value: "solo" },
      { label: "2 co-founders", value: "two" },
      { label: "3+ founders", value: "three_plus" },
      { label: "Have a small team (5+)", value: "team" },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to raise funding?",
    options: [
      { label: "Within 3 months", value: "3m" },
      { label: "3–6 months", value: "6m" },
      { label: "6–12 months", value: "12m" },
      { label: "Not focused on raising yet", value: "not_yet" },
    ],
  },
];

type Step = "quiz" | "email" | "done";

const inputSt: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1.5px solid #E0E0DC",
  borderRadius: "6px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem",
  color: "#3d4246",
  outline: "none",
  background: "#FFFFFF",
  transition: "border-color 0.2s ease",
};

export default function StartupQuiz() {
  const [step, setStep] = useState<Step>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const q = questions[currentQ];
  const progress = ((currentQ + (answers[q?.id] ? 1 : 0)) / questions.length) * 100;

  function selectAnswer(value: string) {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < questions.length - 1) setCurrentQ((c) => c + 1);
      else setStep("email");
    }, 250);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description, answers }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
  }

  const cardSt: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid #E0E0DC",
    borderRadius: "12px",
    padding: "2rem",
  };

  const barSt: React.CSSProperties = {
    height: "4px", borderRadius: "99px",
    background: "#F0F0ED",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  if (step === "done") {
    return (
      <div style={{ ...cardSt, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          Your SWOT Report is on its way!
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A", marginBottom: "1.5rem" }}>
          Check your inbox within 5 minutes. We&apos;ve also tagged your profile so our team can follow up with personalised insights.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", padding: "1rem", background: "#FAFAFA", borderRadius: "8px" }}>
          {["Market Sizing", "SWOT Analysis", "Competitor Map"].map((item) => (
            <div key={item} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "#66BB3F", marginBottom: "0.25rem" }}>✓ Included</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#787878" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "email") {
    return (
      <div style={cardSt}>
        <div style={barSt}>
          <div style={{ height: "100%", background: "#66BB3F", width: "100%", borderRadius: "99px", transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F" }}>All done!</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>{questions.length} / {questions.length} questions</span>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.375rem" }}>
          Where should we send your report?
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#787878", marginBottom: "1.5rem" }}>
          Get your free personalised SWOT report instantly.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input type="text" placeholder="In one line, what does your startup do? (e.g. skincare D2C brand, B2B logistics software)" value={description} onChange={e => setDescription(e.target.value)} required style={inputSt}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required style={inputSt}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
          <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required style={inputSt}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center" }}>
            {loading
              ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
              : <>Send My Free SWOT Report <ArrowRight size={15} /></>
            }
          </button>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center" }}>
            No spam. Your data is private.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div style={cardSt}>
      {/* Progress bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#66BB3F" }}>
          Startup Health Check
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>
          {currentQ + 1} / {questions.length}
        </span>
      </div>
      <div style={barSt}>
        <div style={{ height: "100%", background: "#66BB3F", width: `${progress}%`, borderRadius: "99px", transition: "width 0.4s ease" }} />
      </div>

      {/* Question */}
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#3d4246", marginBottom: "1.25rem" }}>
        {q.question}
      </h3>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
        {q.options.map((opt) => {
          const selected = answers[q.id] === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => selectAnswer(opt.value)}
              style={{
                textAlign: "left",
                padding: "0.875rem 1rem",
                border: selected ? "1.5px solid #66BB3F" : "1.5px solid #E0E0DC",
                borderRadius: "8px",
                background: selected ? "#E9F6E4" : "#FFFFFF",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: selected ? 600 : 400,
                color: selected ? "#66BB3F" : "#3D3D3D",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!selected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#66BB3F";
                  (e.currentTarget as HTMLElement).style.background = "#FAFAFA";
                }
              }}
              onMouseLeave={e => {
                if (!selected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC";
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                }
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {currentQ > 0 && (
        <button onClick={() => setCurrentQ(c => c - 1)} style={{ marginTop: "1rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#A0A0A0", transition: "color 0.2s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#3D3D3D"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#A0A0A0"; }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
