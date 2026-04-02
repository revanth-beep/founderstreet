"use client";

import { useEffect, useRef } from "react";
import { Lightbulb, Rocket, BarChart3, Users } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "Step 01",
    title: "Idea Validation",
    desc: "We stress-test your concept with market sizing, SWOT analysis, and unit economics before a single rupee is spent.",
    duration: "Week 1–2",
  },
  {
    icon: Rocket,
    step: "Step 02",
    title: "Foundation Build",
    desc: "Company incorporation, bank accounts, IP registration, and accounting setup — your venture is legally ready to operate.",
    duration: "Week 2–4",
  },
  {
    icon: BarChart3,
    step: "Step 03",
    title: "Growth Execution",
    desc: "Full-stack marketing campaigns, e-commerce build, and retail distribution activated simultaneously for maximum momentum.",
    duration: "Month 2–6",
  },
  {
    icon: Users,
    step: "Step 04",
    title: "Investor Readiness",
    desc: "Pitch deck creation, 5-year financial models, and direct warm introductions to our vetted angel and VC network.",
    duration: "Month 4–8",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".process-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              once: true,
            },
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-grey-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Our Process
          </span>
          <h2 className="heading-lg mt-3 text-balance">
            From Idea to Investment-Ready{" "}
            <span className="gradient-text">in Under 6 Months</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-border overflow-hidden">
            <div
              ref={lineRef}
              className="h-full bg-primary origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="process-card relative">
                  {/* Vertical connector mobile */}
                  {idx < steps.length - 1 && (
                    <div className="sm:hidden absolute left-7 top-14 w-px h-full bg-border" />
                  )}

                  <div className="flex lg:flex-col gap-5 lg:gap-0">
                    {/* Icon circle */}
                    <div className="relative z-10 w-14 h-14 bg-white border-2 border-border rounded-full flex items-center justify-center flex-shrink-0 lg:mb-6 shadow-soft">
                      <Icon className="w-6 h-6 text-primary" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-grey-400 mb-1 lg:mb-2">
                        {step.step} · {step.duration}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-grey-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-grey-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
