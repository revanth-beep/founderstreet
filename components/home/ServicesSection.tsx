"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Building2,
  Calculator,
  Megaphone,
  Code2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: FlaskConical,
    name: "Test Your Idea",
    tagline: "Validation & Strategy",
    desc: "Stress-test your concept before capital is deployed. Market sizing, SWOT analysis, and unit economics modelling.",
    href: "/services/validation",
    color: "from-green-900 to-green-800",
    accent: "bg-green-700",
  },
  {
    number: "02",
    icon: Building2,
    name: "Incorporation & Compliance",
    tagline: "Company Formation",
    desc: "End-to-end entity registration. DIN, DSC, MOA, AOA filings and IP protection handled in under 10 days.",
    href: "/services/incorporation",
    color: "from-grey-900 to-grey-800",
    accent: "bg-grey-700",
  },
  {
    number: "03",
    icon: Calculator,
    name: "Accounting & Taxation",
    tagline: "Virtual CFO",
    desc: "Institutional-grade financial plumbing. Bookkeeping, payroll, GST compliance, and strategic runway management.",
    href: "/services/accounting",
    color: "from-green-900 to-green-800",
    accent: "bg-green-700",
  },
  {
    number: "04",
    icon: Megaphone,
    name: "Marketing & Retail",
    tagline: "Full-Funnel Growth",
    desc: "SEO, Google Ads, Meta Ads, OOH billboards, mall kiosks, and retail distribution through our stockist network.",
    href: "/services/marketing",
    color: "from-grey-900 to-grey-800",
    accent: "bg-grey-700",
  },
  {
    number: "05",
    icon: Code2,
    name: "Web & Tech Development",
    tagline: "Digital Storefronts",
    desc: "Shopify builds, custom web apps, and SaaS platforms designed for high conversion and rapid scale.",
    href: "/services/web-development",
    color: "from-green-900 to-green-800",
    accent: "bg-green-700",
  },
  {
    number: "06",
    icon: TrendingUp,
    name: "Investor Funding",
    tagline: "Pitch & Matchmaking",
    desc: "12-slide master decks, 5-year financial models, and direct introductions to angels, VCs, and accelerators.",
    href: "/services/funding",
    color: "from-grey-900 to-grey-800",
    accent: "bg-grey-700",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll(".service-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              What We Do
            </span>
            <h2 className="heading-lg mt-3">
              Six Pillars of{" "}
              <span className="gradient-text">Startup Infrastructure</span>
            </h2>
          </div>
          <p className="text-grey-600 text-base max-w-sm leading-relaxed">
            Every service is designed to remove execution bottlenecks so you can move
            faster, raise smarter, and scale further.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border rounded-sm overflow-hidden">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className={`service-card relative group p-8 lg:p-10 bg-white hover:bg-grey-950 transition-all duration-500 border-r border-b border-border last:border-r-0 ${
                  idx % 3 === 2 ? "border-r-0" : ""
                } ${idx >= 3 ? "border-b-0" : ""}`}
              >
                {/* Number */}
                <span className="absolute top-6 right-8 font-serif text-5xl font-bold text-grey-100 group-hover:text-grey-800 transition-colors duration-500 select-none leading-none">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 bg-green-100 group-hover:bg-primary rounded-sm flex items-center justify-center mb-6 transition-colors duration-500">
                  <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-700 group-hover:text-green-400 mb-2 transition-colors duration-500">
                    {service.tagline}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-grey-900 group-hover:text-white mb-3 transition-colors duration-500">
                    {service.name}
                  </h3>
                  <p className="text-grey-600 group-hover:text-grey-400 text-sm leading-relaxed transition-colors duration-500">
                    {service.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative z-10 mt-8 flex items-center gap-2 text-primary group-hover:text-green-400 text-sm font-semibold transition-colors duration-500">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-grey-600 text-sm">Not sure where to start?</p>
          <Link
            href="/startup-health-check"
            className="btn-secondary text-sm"
          >
            Take the 5-minute Health Check
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
