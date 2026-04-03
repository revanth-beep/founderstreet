"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "0.875rem 1rem",
        background: "rgba(123,201,90,0.15)",
        border: "1px solid rgba(123,201,90,0.3)",
        borderRadius: "6px"
      }}>
        <CheckCircle2 size={16} color="#9FE670" />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#9FE670" }}>
          You&apos;re in! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "6px" }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: 1,
            padding: "0.6875rem 0.875rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "5px",
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.2s ease"
          }}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(123,201,90,0.5)"; }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "0.6875rem 1rem",
            background: "#66BB3F",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#56AD32"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#66BB3F"; }}
        >
          {status === "loading"
            ? <Loader2 size={15} color="#FFFFFF" style={{ animation: "spin 1s linear infinite" }} />
            : <ArrowRight size={15} color="#FFFFFF" />
          }
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#F87171" }}>
          Something went wrong. Please try again.
        </p>
      )}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "rgba(255,255,255,0.2)" }}>
        No spam. Unsubscribe at any time.
      </p>
    </form>
  );
}
