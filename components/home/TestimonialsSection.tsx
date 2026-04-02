"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Founder, AgriConnect",
    company: "B2B AgriTech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote:
      "Founderstreet handled everything from our Pvt Ltd incorporation to building our MVP in just 6 weeks. We closed our pre-seed round of ₹1.2Cr within 4 months of launch.",
    raise: "₹1.2Cr Pre-Seed",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Co-founder, NourishKart",
    company: "D2C Nutrition",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=80&h=80&fit=crop&crop=face",
    quote:
      "The Virtual CFO service was a game-changer. Our burn rate clarity and unit economics model convinced investors we had a tight grip on our business. Exceptional work.",
    raise: "₹75L Angel Round",
    rating: 5,
  },
  {
    name: "Arjun Kapoor",
    role: "Founder, ZippyLogistics",
    company: "Last-Mile Delivery",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    quote:
      "Our Shopify store built by Founderstreet went from 0 to ₹40L monthly GMV in 3 months. The marketing team's ROAS on Meta Ads alone was 4.2x. Worth every paisa.",
    raise: "₹40L MRR in 90 days",
    rating: 5,
  },
  {
    name: "Kavya Reddy",
    role: "Founder, LearnIQ",
    company: "EdTech SaaS",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    quote:
      "The pitch deck they built for us was the sharpest 12 slides I've ever seen. Every VC we presented to mentioned it. We ended up oversubscribed in our seed round.",
    raise: "₹3Cr Seed (Oversubscribed)",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    };
    init();
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="section-padding bg-background-dark overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-green-400 mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Founder Stories
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mt-3">
            Results That Speak for Themselves
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main card */}
          <div className="bg-grey-900/60 border border-grey-800 rounded-sm p-8 lg:p-12 relative">
            <Quote className="absolute top-8 left-8 w-10 h-10 text-primary/40" />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <blockquote className="font-serif text-xl lg:text-2xl text-white italic leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-grey-400 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>

              {/* Result pill */}
              <div className="lg:flex-shrink-0 bg-primary/20 border border-primary/30 rounded-sm px-6 py-5 text-center">
                <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Result
                </p>
                <p className="font-serif text-xl font-bold text-white">{t.raise}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === current ? "bg-primary w-6" : "bg-grey-700 w-1.5"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-sm border border-grey-700 flex items-center justify-center text-grey-400 hover:border-primary hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-sm border border-grey-700 flex items-center justify-center text-grey-400 hover:border-primary hover:text-white transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
