"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const services = [
  "Test Your Idea / Validation",
  "Company Incorporation",
  "Accounting & Virtual CFO",
  "Marketing & Retail",
  "Web & Tech Development",
  "Investor Funding & Pitch Deck",
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

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-serif text-xl font-bold text-grey-900 mb-2">
          We&apos;ve received your message!
        </h3>
        <p className="text-grey-600 text-sm leading-relaxed">
          A senior team member will reach out within 24 hours. In the meantime, take our
          free Startup Health Check for instant insights.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Rahul"
            className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Sharma"
            className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="rahul@startup.in"
          className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="+91 98765 43210"
          className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
          Service You Need *
        </label>
        <select
          name="service"
          required
          className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white text-grey-700 appearance-none"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
          Startup Stage *
        </label>
        <select
          name="stage"
          required
          className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white text-grey-700 appearance-none"
        >
          <option value="">Where are you right now?</option>
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
          Tell Us About Your Startup *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Brief description of your idea, current challenges, and what you're looking for..."
          className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors bg-white resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong. Please email us directly at hello@founderstreet.in.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center py-3.5"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Send My Enquiry
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-grey-400 text-xs text-center">
        By submitting, you agree to our Privacy Policy. We never share your data.
      </p>
    </form>
  );
}
