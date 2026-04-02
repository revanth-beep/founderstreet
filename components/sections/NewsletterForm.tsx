"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>You&apos;re on the list!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          className="flex-1 px-3 py-2.5 bg-[#2C2C2C] border border-[#4A4A4A] text-white placeholder-[#8A8A8A] text-sm rounded-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 bg-[#1B4332] text-white text-sm font-semibold rounded-sm hover:bg-[#2D6A4F] transition-colors flex-shrink-0 disabled:opacity-50"
          aria-label="Subscribe"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
        </button>
      </div>
      <p className="text-[#6B6B6B] text-xs">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
