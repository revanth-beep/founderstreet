"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Upload } from "lucide-react";
import { THEMES, FONTS, INDUSTRIES, DECK_FORMATS } from "@/lib/pitch-deck/themes";

const inputSt: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", border: "1.5px solid #E0E0DC", borderRadius: "6px",
  fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", outline: "none",
  background: "#FFFFFF", transition: "border-color 0.2s ease",
};
const labelSt: React.CSSProperties = {
  display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700,
  letterSpacing: "0.08em", textTransform: "uppercase", color: "#787878", marginBottom: "0.5rem",
};
const groupHead: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "#66BB3F", paddingBottom: "0.625rem",
  borderBottom: "1px solid #E0E0DC", marginBottom: "1.25rem",
};
function Req() { return <span style={{ color: "#E5484D" }}> *</span>; }
const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" };

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function PitchDeckForm() {
  const [companyName, setCompanyName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [industry, setIndustry] = useState("");
  const [deckFormat, setDeckFormat] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState("emerald");
  const [font, setFont] = useState("editorial");
  const [format, setFormat] = useState<"pdf" | "pptx" | "both">("pdf");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 3 * 1024 * 1024) {
      setError("File is too large. Please upload a file under 3 MB (or paste your details instead).");
      return;
    }
    setError("");
    setFile(f);
    setFileName(f ? f.name : "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      let filePayload: { name: string; type: string; base64: string } | null = null;
      if (file) {
        filePayload = { name: file.name, type: file.type, base64: await fileToBase64(file) };
      }
      const res = await fetch("/api/pitch-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, companyName, oneLiner, industry, deckFormat,
          pastedText, theme, font, format, file: filePayload,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const cardSt: React.CSSProperties = {
    background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  };

  if (status === "success") {
    return (
      <div style={{ ...cardSt, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          Your pitch deck is on its way!
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7, color: "#5A5A5A" }}>
          Check your inbox in the next few minutes. We&apos;ve emailed your personalised, investor-ready deck to <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={cardSt}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
        {/* About your startup */}
        <div>
          <p style={groupHead}>About Your Startup</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={grid2} className="ht-grid-2">
              <div><label style={labelSt}>Startup / company name<Req /></label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder="e.g., Acme AI" style={inputSt} /></div>
              <div><label style={labelSt}>One-liner: what you do</label>
                <input value={oneLiner} onChange={(e) => setOneLiner(e.target.value)} placeholder="e.g., AI copilot for logistics" style={inputSt} /></div>
            </div>
            <div style={grid2} className="ht-grid-2">
              <div><label style={labelSt}>Industry</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ ...inputSt, appearance: "none", cursor: "pointer" }}>
                  <option value="">Select industry…</option>
                  {INDUSTRIES.map((o) => <option key={o} value={o}>{o}</option>)}
                </select></div>
              <div><label style={labelSt}>Deck purpose</label>
                <select value={deckFormat} onChange={(e) => setDeckFormat(e.target.value)} style={{ ...inputSt, appearance: "none", cursor: "pointer" }}>
                  <option value="">Select purpose…</option>
                  {DECK_FORMATS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select></div>
            </div>
            <div>
              <label style={labelSt}>Upload your pitch material (PDF, Word, or text · under 3 MB)</label>
              <label style={{ ...inputSt, display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: fileName ? "#3d4246" : "#A0A0A0" }}>
                <Upload size={16} color="#66BB3F" />
                {fileName || "Choose a file (optional)"}
                <input type="file" accept=".pdf,.doc,.docx,.txt,.md" onChange={onFile} style={{ display: "none" }} />
              </label>
            </div>
            <div>
              <label style={labelSt}>…or paste your pitch details</label>
              <textarea value={pastedText} onChange={(e) => setPastedText(e.target.value)} rows={4} placeholder="Problem, solution, market, traction, team, what you're raising…" style={{ ...inputSt, resize: "vertical" }} />
            </div>
          </div>
        </div>

        {/* Design */}
        <div>
          <p style={groupHead}>Design</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelSt}>Colour theme</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.625rem" }}>
                {THEMES.map((t) => {
                  const active = theme === t.id;
                  return (
                    <button type="button" key={t.id} onClick={() => setTheme(t.id)} style={{
                      display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 0.75rem",
                      border: active ? "1.5px solid #66BB3F" : "1.5px solid #E0E0DC", borderRadius: "8px",
                      background: active ? "#E9F6E4" : "#FFFFFF", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8125rem", fontWeight: 600, color: "#3d4246",
                    }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: `#${t.accent}`, border: `2px solid #${t.dark}`, flexShrink: 0 }} />
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={grid2} className="ht-grid-2">
              <div><label style={labelSt}>Font style</label>
                <select value={font} onChange={(e) => setFont(e.target.value)} style={{ ...inputSt, appearance: "none", cursor: "pointer" }}>
                  {FONTS.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select></div>
              <div><label style={labelSt}>File format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value as "pdf" | "pptx" | "both")} style={{ ...inputSt, appearance: "none", cursor: "pointer" }}>
                  <option value="pdf">PDF (polished, ready to send)</option>
                  <option value="pptx">PowerPoint (editable)</option>
                  <option value="both">Both PDF and PowerPoint</option>
                </select></div>
            </div>
          </div>
        </div>

        {/* Your details */}
        <div>
          <p style={groupHead}>Where should we send it?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={grid2} className="ht-grid-2">
              <div><label style={labelSt}>Your name<Req /></label>
                <input value={name} onChange={(e) => setName(e.target.value)} required style={inputSt} /></div>
              <div><label style={labelSt}>Phone number<Req /></label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputSt} /></div>
            </div>
            <div><label style={labelSt}>Email address<Req /></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" style={inputSt} /></div>
          </div>
        </div>

        {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E5484D", lineHeight: 1.5 }}>{error}</p>}

        <div>
          <button type="submit" disabled={status === "loading"} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.9375rem", fontSize: "0.9375rem" }}>
            {status === "loading"
              ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Generating your deck… (up to a minute)</>
              : <>Get My Pitch Deck, Free <ArrowRight size={16} /></>}
          </button>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center", marginTop: "0.875rem" }}>
            No spam. We email your deck and our team may follow up to help you polish it.
          </p>
        </div>
      </form>
    </div>
  );
}
