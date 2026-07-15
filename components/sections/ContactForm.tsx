"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const services = [
  "Test Your Idea / Validation",
  "GTM & Strategy",
  "Company Incorporation and Annual Compliance",
  "Accounting & Virtual CFO",
  "Book-keeping & Taxation",
  "Digital Marketing",
  "Projections and Valuation Report",
  "Pitch Deck & Valuation",
  "Co-working Spaces",
  "Web & Tech Development",
  "Investor Funding & Pitch Deck",
  "Hire Talent",
  "Multiple Services",
  "Just Exploring",
];

const stages = [
  "Pre-idea (just exploring)",
  "Idea stage",
  "Building MVP",
  "Early revenue",
  "Scaling",
];

const inputStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#787878",
  marginBottom: "0.5rem",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [serviceVal, setServiceVal] = useState("");
  // Captured from the URL when arriving from a service page pricing CTA.
  const [sourceService, setSourceService] = useState("");
  const [sourcePlan, setSourcePlan] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service") ?? "";
    const plan = params.get("plan") ?? "";
    if (svc) {
      setSourceService(svc);
      if (services.includes(svc)) setServiceVal(svc);
    }
    if (plan) setSourcePlan(plan);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(fd.get("firstName") ?? ""),
          lastName: String(fd.get("lastName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          service: String(fd.get("service") ?? ""),
          stage: String(fd.get("stage") ?? ""),
          message: String(fd.get("message") ?? ""),
          sourceService,
          sourcePlan,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorDetail(typeof data.error === "string" ? data.error : "Something went wrong. Please try again or email hello@founderstreet.in.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Please check your connection or email hello@founderstreet.in.");
    }
  }

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = "#66BB3F";
    (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(102,187,63,0.08)";
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = "#E0E0DC";
    (e.target as HTMLElement).style.boxShadow = "none";
  };

  if (status === "success") {
    return (
      <div style={{ background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "10px", padding: "2.5rem", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          We&apos;ve received your message!
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>
          A senior team member will reach out within 24 hours. In the meantime, take our free Startup Health Check for instant insights.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>First Name *</label>
          <input type="text" name="firstName" required placeholder="Rahul" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
        <div>
          <label style={labelStyle}>Last Name *</label>
          <input type="text" name="lastName" required placeholder="Sharma" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address *</label>
        <input type="email" name="email" required placeholder="rahul@startup.in" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
      </div>

      <div>
        <label style={labelStyle}>Phone Number</label>
        <input type="tel" name="phone" placeholder="+91 98765 43210" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
      </div>

      <div>
        <label style={labelStyle}>Service You Need *</label>
        <select name="service" required value={serviceVal} onChange={(e) => setServiceVal(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} onFocus={focusIn} onBlur={focusOut}>
          <option value="">Select a service…</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Startup Stage *</label>
        <select name="stage" required style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} onFocus={focusIn} onBlur={focusOut}>
          <option value="">Where are you right now?</option>
          {stages.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Tell Us About Your Startup *</label>
        <textarea name="message" required rows={4} placeholder="Brief description of your idea, current challenges, and what you're looking for…"
          style={{ ...inputStyle, resize: "none" as const }}
          onFocus={focusIn as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
          onBlur={focusOut as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
        />
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#DC2626", lineHeight: 1.5 }}>
          {errorDetail || "Something went wrong. Please email us directly at hello@founderstreet.in."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "0.9375rem", fontSize: "0.9375rem", marginTop: "0.25rem" }}
      >
        {status === "loading"
          ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
          : <>Send My Enquiry <ArrowRight size={16} /></>
        }
      </button>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center" }}>
        By submitting, you agree to our Privacy Policy. We never share your data.
      </p>
    </form>
  );
}
