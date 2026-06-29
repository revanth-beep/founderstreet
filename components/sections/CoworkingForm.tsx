"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

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

const labelSt: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "#3d4246",
  marginBottom: "0.4rem",
};

function Req() {
  return <span style={{ color: "#E5484D" }}> *</span>;
}

export default function CoworkingForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/coworking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, email, requirement }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(typeof d.error === "string" ? d.error : "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const cardSt: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid #E0E0DC",
    borderRadius: "12px",
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  };

  if (done) {
    return (
      <div style={{ ...cardSt, textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          Thank you! We&apos;ve received your requirement.
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>
          Our team will get in touch with you shortly with exclusive Sylework pricing for Founderstreet clients.
        </p>
      </div>
    );
  }

  return (
    <div style={cardSt}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={labelSt}>Name<Req /></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputSt} placeholder="Your full name"
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
        </div>
        <div>
          <label style={labelSt}>Contact No.<Req /></label>
          <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required style={inputSt} placeholder="+91 ..."
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
        </div>
        <div>
          <label style={labelSt}>Email ID<Req /></label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputSt} placeholder="you@company.com"
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#66BB3F"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E0E0DC"; }}
          />
        </div>
        <div>
          <label style={labelSt}>Requirement<Req /></label>
          <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} required rows={4} style={{ ...inputSt, resize: "vertical" }} placeholder="City, number of seats, private cabin or hot desk, timeline, etc."
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "#66BB3F"; }}
            onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "#E0E0DC"; }}
          />
        </div>
        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E5484D" }}>{error}</p>
        )}
        <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: "center" }}>
          {loading
            ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
            : <>Share My Requirement <ArrowRight size={15} /></>
          }
        </button>
      </form>
    </div>
  );
}
