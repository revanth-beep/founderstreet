"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Zap, Users2, Target } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Compliance-First Architecture",
    desc: "Every structure we build passes due diligence. Our playbooks are designed for investors, not just regulators.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    desc: "Incorporation in 10 days. MVP in 4 weeks. Pitch deck in 5 days. We move at startup velocity with enterprise rigour.",
  },
  {
    icon: Users2,
    title: "Embedded, Not Outsourced",
    desc: "We integrate directly with your founding team—Slack, Notion, weekly calls. You get a co-founder, not a vendor.",
  },
  {
    icon: Target,
    title: "Outcome-Aligned Pricing",
    desc: "No retainers for mediocrity. Our model is built on milestone delivery so our incentives are always aligned with yours.",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const items = sectionRef.current?.querySelectorAll(".why-item");
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: content */}
          <div>
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Why Founderstreet
            </span>
            <h2 className="heading-lg mt-3 mb-5">
              The Infrastructure Layer{" "}
              <span className="gradient-text">Investors Expect</span>
            </h2>
            <p className="body-lg mb-8">
              Most early-stage startups fail not because of bad ideas—but because of
              bad execution. We remove every operational, legal, and financial blocker
              that slows founders down before they can prove their concept.
            </p>

            {/* Differentiator box */}
            <div className="bg-grey-950 text-white p-6 rounded-sm">
              <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">
                The Founderstreet Difference
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Traditional CA Firm", "Founderstreet"],
                  ["Monthly retainer, no outcomes", "Milestone-based, outcome-aligned"],
                  ["Compliance only", "Full-stack infrastructure"],
                  ["3–6 month timelines", "10-day incorporation"],
                  ["No investor network", "Vetted VC + angel access"],
                ].map(([left, right], i) =>
                  i === 0 ? (
                    <div key={i} className="col-span-2 grid grid-cols-2 pb-3 border-b border-grey-800">
                      <span className="text-grey-500 text-xs font-semibold uppercase tracking-wider">{left}</span>
                      <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">{right}</span>
                    </div>
                  ) : (
                    <div key={i} className="col-span-2 grid grid-cols-2 py-2 border-b border-grey-800/50 last:border-0">
                      <span className="text-grey-500 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        {left}
                      </span>
                      <span className="text-white text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full" />
                        {right}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="why-item">
                  <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-base text-grey-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-grey-600 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
