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
  background: "#FFFFFF",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelSt: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#787878",
  marginBottom: "0.5rem",
};

const helpSt: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.75rem",
  color: "#A0A0A0",
  marginTop: "0.35rem",
};

const groupHeadSt: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#66BB3F",
  paddingBottom: "0.625rem",
  borderBottom: "1px solid #E0E0DC",
  marginBottom: "1.25rem",
};

function Req() {
  return <span style={{ color: "#E5484D" }}> *</span>;
}

function focusIn(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  (e.target as HTMLElement).style.borderColor = "#66BB3F";
  (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(102,187,63,0.08)";
}
function focusOut(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  (e.target as HTMLElement).style.borderColor = "#E0E0DC";
  (e.target as HTMLElement).style.boxShadow = "none";
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelSt}>{label}{required && <Req />}</label>
      {children}
      {hint && <p style={helpSt}>{hint}</p>}
    </div>
  );
}

const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" };

export default function HireTalentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/hire-talent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorDetail(typeof data.error === "string" ? data.error : "Something went wrong. Please try again or email hi@founderstreet.in.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Please check your connection or email hi@founderstreet.in.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "10px", padding: "2.5rem", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          We&apos;ve received your requirement!
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>
          Our team will reach out to collect the finer details and confirm your shortlist timeline.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Company & Contact */}
      <div>
        <p style={groupHeadSt}>Company &amp; Contact</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={grid2} className="ht-grid-2">
            <Field label="Company name" required>
              <input type="text" name="companyName" required placeholder="e.g., Acme Technologies" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Industry / sector" required>
              <input type="text" name="industry" required placeholder="e.g., FinTech, D2C, SaaS" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Contact person name" required>
              <input type="text" name="contactName" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Work email" required>
              <input type="email" name="workEmail" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Phone number" required>
              <input type="tel" name="phone" required defaultValue="+91 " style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Company website" hint="Optional">
              <input type="text" name="companyWebsite" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
        </div>
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E5484D", lineHeight: 1.5 }}>
          {errorDetail}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "0.9375rem", fontSize: "0.9375rem" }}
        >
          {status === "loading"
            ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
            : <>Submit Requirement <ArrowRight size={16} /></>
          }
        </button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#A0A0A0", textAlign: "center", marginTop: "0.875rem" }}>
          Share the basics now. Our team will reach out to collect the rest and confirm your shortlist timeline.
        </p>
      </div>
    </form>
  );
}
