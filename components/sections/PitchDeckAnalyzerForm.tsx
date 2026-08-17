"use client";

import { useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { ArrowRight, Loader2, Upload, Check, X, ShieldCheck } from "lucide-react";

type Category = { name: string; score: number; max: number; note: string };
type SlideCheck = { name: string; present: boolean; note: string };
type Analysis = {
  overallScore: number;
  verdict: string;
  summary: string;
  categories: Category[];
  slides: SlideCheck[];
  topFixes: string[];
};

const inputSt: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "1.5px solid #E0E0DC", borderRadius: "6px",
  fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", outline: "none",
  background: "#FFFFFF", transition: "border-color 0.2s ease",
};
const labelSt: React.CSSProperties = {
  display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700,
  letterSpacing: "0.08em", textTransform: "uppercase", color: "#787878", marginBottom: "0.5rem",
};
function Req() { return <span style={{ color: "#E5484D" }}> *</span>; }

function scoreColor(pct: number): string {
  if (pct >= 75) return "#66BB3F";
  if (pct >= 50) return "#E5A21A";
  return "#E5484D";
}

const cardSt: React.CSSProperties = {
  background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px",
  padding: "clamp(1.5rem, 4vw, 2.5rem)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function PitchDeckAnalyzerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 100 * 1024 * 1024) { setError("File is too large. Please upload a PDF under 100 MB."); return; }
    setError(""); setFile(f); setFileName(f ? f.name : "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please upload your pitch deck (PDF)."); return; }
    setStatus("loading"); setError("");
    try {
      // Upload the deck straight to temporary storage (no request-size limit).
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/pitch-deck/upload",
        contentType: file.type || undefined,
      });
      const res = await fetch("/api/pitch-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, blobUrl: blob.url, fileName: file.name, fileType: file.type }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("error"); setError(typeof data.error === "string" ? data.error : "Something went wrong."); return; }
      setAnalysis(data.analysis as Analysis);
      setStatus("idle");
    } catch {
      setStatus("error"); setError("Upload failed. Please check your connection and try again.");
    }
  }

  // ── Results view ────────────────────────────────────────
  if (analysis) {
    const pct = analysis.overallScore;
    const col = scoreColor(pct);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ ...cardSt, textAlign: "center" }}>
          <p style={{ ...labelSt, color: "#A0A0A0", marginBottom: "1rem" }}>Your Pitch Deck Score</p>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "4.5rem", fontWeight: 800, lineHeight: 1, color: col }}>
            {pct}<span style={{ fontSize: "1.75rem", color: "#A0A0A0" }}>/100</span>
          </div>
          {analysis.verdict && <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontStyle: "italic", color: "#3d4246", marginTop: "0.75rem" }}>{analysis.verdict}</p>}
          <div style={{ height: "8px", borderRadius: "99px", background: "#F0F0ED", marginTop: "1.5rem", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: "99px" }} />
          </div>
          {analysis.summary && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", lineHeight: 1.7, marginTop: "1.25rem", maxWidth: "520px", marginInline: "auto" }}>{analysis.summary}</p>}
        </div>

        <div style={cardSt}>
          <p style={{ ...labelSt, color: "#66BB3F", marginBottom: "1.25rem" }}>Scorecard</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {analysis.categories.map((c) => {
              const cp = Math.round((c.score / (c.max || 20)) * 100);
              return (
                <div key={c.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#3d4246" }}>{c.name}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 700, color: scoreColor(cp) }}>{c.score}/{c.max}</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "99px", background: "#F0F0ED", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${cp}%`, background: scoreColor(cp), borderRadius: "99px" }} />
                  </div>
                  {c.note && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878", marginTop: "0.35rem", lineHeight: 1.55 }}>{c.note}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={cardSt}>
          <p style={{ ...labelSt, color: "#66BB3F", marginBottom: "1.25rem" }}>16-Slide Structure Check</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem 1.25rem" }}>
            {analysis.slides.map((s) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#3d4246" }}>
                {s.present
                  ? <Check size={15} color="#66BB3F" style={{ flexShrink: 0 }} />
                  : <X size={15} color="#E5484D" style={{ flexShrink: 0 }} />}
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {analysis.topFixes.length > 0 && (
          <div style={cardSt}>
            <p style={{ ...labelSt, color: "#66BB3F", marginBottom: "1rem" }}>Highest-Impact Fixes</p>
            <ol style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {analysis.topFixes.map((f, i) => (
                <li key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#3d4246", lineHeight: 1.6 }}>{f}</li>
              ))}
            </ol>
          </div>
        )}

        <div style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A45 100%)", borderRadius: "12px", padding: "clamp(1.75rem, 4vw, 2.5rem)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
            Want a deck that walks into the room ready?
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 1.5rem" }}>
            Our team makes pitch decks investor-ready: sharper story, defensible numbers, and design that commands attention.
          </p>
          <Link href="/contact" className="btn-white">
            Contact FounderStreet <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Form view ───────────────────────────────────────────
  return (
    <div style={cardSt}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="ht-grid-2">
          <div><label style={labelSt}>Your name<Req /></label>
            <input value={name} onChange={(e) => setName(e.target.value)} required style={inputSt} placeholder="Your full name" /></div>
          <div><label style={labelSt}>Phone (with country code)<Req /></label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputSt} placeholder="+91 98765 43210" /></div>
        </div>
        <div><label style={labelSt}>Email address<Req /></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputSt} placeholder="you@company.com" /></div>
        <div>
          <label style={labelSt}>Upload your pitch deck (PDF · up to 100 MB)<Req /></label>
          <label style={{ ...inputSt, display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: fileName ? "#3d4246" : "#A0A0A0" }}>
            <Upload size={16} color="#66BB3F" />
            {fileName || "Choose your deck (PDF)"}
            <input type="file" accept=".pdf" onChange={onFile} style={{ display: "none" }} />
          </label>
        </div>

        {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E5484D", lineHeight: 1.5 }}>{error}</p>}

        <button type="submit" disabled={status === "loading"} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.9375rem", fontSize: "0.9375rem" }}>
          {status === "loading"
            ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Analyzing your deck…</>
            : <>Analyze My Pitch Deck, Free <ArrowRight size={16} /></>}
        </button>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", padding: "0.75rem 0.875rem", background: "#F4FAF0", border: "1px solid #E0F0D6", borderRadius: "8px" }}>
          <ShieldCheck size={15} color="#66BB3F" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A", lineHeight: 1.55, margin: 0 }}>
            Your deck is held in secure, temporary storage only for the analysis and deleted straight after. We never share, sell or reuse your idea. Your confidentiality is fully protected.
          </p>
        </div>
      </form>
    </div>
  );
}
