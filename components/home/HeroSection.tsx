"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import GSAP only on client
    const initGSAP = async () => {
      const { gsap } = await import("gsap");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        );
    };

    initGSAP();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background-dark">
      {/* Background texture */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(27, 67, 50, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(45, 106, 79, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 60% 80%, rgba(64, 145, 108, 0.2) 0%, transparent 40%)
            `,
          }}
        />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(184, 228, 199, 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-40 h-40 border border-green-800/30 rounded-full opacity-40 animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 border border-green-700/30 rounded-sm rotate-45 opacity-30" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-500 rounded-full opacity-60 animate-float" />
      <div
        className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-40"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-custom pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-green-500" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em]">
              India&apos;s Startup Infrastructure Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-display-xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            The Unseen Engine Behind India&apos;s{" "}
            <em className="italic text-green-400 not-italic" style={{ fontStyle: "italic" }}>
              Next Great
            </em>{" "}
            Startups.
          </h1>

          {/* Sub-headline */}
          <p
            ref={subRef}
            className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10"
          >
            From Day Zero to Pre-Seed, we provide the elite operational, financial, and
            digital infrastructure founders need to launch, scale, and secure funding.{" "}
            <span className="text-white/90 font-medium">
              You build the vision; we handle the execution.
            </span>
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-primary hover:bg-primary-light text-white font-semibold text-sm rounded-sm transition-all duration-300 hover:shadow-green-glow-lg hover:-translate-y-0.5"
            >
              Pitch Your Idea
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/startup-health-check"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-sm border border-white/20 transition-all duration-300"
            >
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
              Free Startup Health Check
            </Link>
          </div>

          {/* Trust indicators */}
          <p className="mt-6 text-white/40 text-xs font-medium tracking-wider">
            TRUSTED BY FOUNDERS ACROSS DELHI · MUMBAI · BENGALURU · HYDERABAD
          </p>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-green-800/50"
        >
          {[
            { value: "150+", label: "Startups Launched" },
            { value: "₹40Cr+", label: "Funding Facilitated" },
            { value: "98%", label: "Compliance Rate" },
            { value: "< 10 Days", label: "Avg. Incorporation Time" },
          ].map((stat) => (
            <div key={stat.label} className="lg:px-8 first:pl-0 last:pr-0">
              <div className="text-3xl lg:text-4xl font-serif font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-green-400/80 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <button
          onClick={() => {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
