"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-800/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Ready to Build Something{" "}
            <span className="italic text-green-300">Extraordinary?</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed mb-10">
            Schedule a free 30-minute strategy call. We&apos;ll review your idea, identify
            your biggest execution gaps, and show you exactly how we can help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Free Strategy Call
            </Link>
            <Link
              href="/startup-health-check"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-white/40 text-white font-semibold text-sm rounded-sm hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Take the Health Check
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="mt-6 text-white/50 text-sm">
            No commitment required · Response within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}
