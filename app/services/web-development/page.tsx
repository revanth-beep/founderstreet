import type { Metadata } from "next";
import Link from "next/link";
import { Code2, ArrowRight, ShoppingCart, Globe, Palette, Smartphone } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Web & Tech Development",
  description:
    "Shopify stores, custom web apps, SaaS platforms, and UI/UX design. Scalable digital storefronts built for high conversion.",
};

const services = [
  {
    icon: ShoppingCart,
    number: "01",
    title: "E-Commerce & Shopify Builds",
    desc: "Conversion-optimised storefronts built on Shopify, WooCommerce, or custom stacks. Average checkout conversion increase: 35%.",
    features: [
      "Custom Shopify theme development",
      "One-click checkout optimisation",
      "Product page CRO",
      "Payment gateway integration",
      "Inventory & ERP sync",
      "Mobile-first design",
    ],
  },
  {
    icon: Globe,
    number: "02",
    title: "Custom Web Apps & Platforms",
    desc: "Bespoke technology stacks for SaaS products, marketplace platforms, and complex business applications.",
    features: [
      "SaaS product development",
      "B2B marketplace platforms",
      "API development & integration",
      "Admin dashboards & analytics",
      "Scalable cloud architecture",
      "Auth & subscription systems",
    ],
  },
  {
    icon: Palette,
    number: "03",
    title: "UI/UX Design",
    desc: "Wireframing, prototyping, and high-fidelity design systems. Every interface we design has a measurable conversion objective.",
    features: [
      "User journey mapping",
      "Wireframes & prototypes",
      "Design system & component library",
      "Figma-to-code handoff",
      "A/B test design variants",
      "Accessibility compliance",
    ],
  },
  {
    icon: Smartphone,
    number: "04",
    title: "Mobile App Development",
    desc: "React Native and Flutter apps that feel native on iOS and Android. From consumer apps to B2B tools.",
    features: [
      "Cross-platform (iOS & Android)",
      "Offline-first architecture",
      "Push notifications",
      "In-app purchases",
      "App Store optimisation",
      "Analytics integration",
    ],
  },
];

const faqs = [
  {
    question: "What technologies do you use?",
    answer:
      "Our frontend stack: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python (FastAPI), PostgreSQL, Redis. Cloud: AWS and Vercel for deployment. For e-commerce, we specialise in Shopify (plus custom themes) and WooCommerce.",
  },
  {
    question: "How long does a typical e-commerce build take?",
    answer:
      "A standard Shopify build (custom theme, up to 5 collection pages, checkout customisation) takes 2–3 weeks. A fully custom e-commerce platform with advanced features takes 6–10 weeks. We work in 2-week sprints with demos at every stage.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. We offer monthly retainer packages for ongoing development, bug fixes, performance monitoring, and feature additions. Retainers start at ₹20,000/month for basic maintenance up to ₹80,000/month for dedicated development capacity.",
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Yes, and this is where we often see the biggest wins. We start with a conversion audit of your existing site, identify the biggest drop-off points, and redesign with a clear CRO strategy. Typical result: 30–60% improvement in lead generation.",
  },
  {
    question: "Who owns the code after the project is complete?",
    answer:
      "You own 100% of the code, design assets, and intellectual property. We provide full source code handoff via GitHub. No lock-in, no licensing fees. You can take the code anywhere.",
  },
];

export default function WebDevPage() {
  return (
    <>
      <ServiceHero
        label="Web & Tech Development"
        title="Scalable Digital Storefronts"
        titleHighlight="Built to Convert."
        subtitle="From Shopify builds to custom SaaS platforms — we engineer every digital experience with one obsession: conversion. Beautiful design meets technical rigour."
        ctaText="Start a Project"
        icon={Code2}
        stats={[
          { value: "35%", label: "Avg. checkout conversion increase" },
          { value: "< 2s", label: "Target page load time" },
          { value: "60+", label: "Products shipped" },
        ]}
      />

      {/* Before/After */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              The Founderstreet Difference
            </span>
            <h2 className="heading-md mt-3">Before & After</h2>
            <p className="text-grey-600 text-sm mt-3">
              Drag the slider to see how we transform underperforming websites into
              high-converting digital assets.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=700&fit=crop"
              afterSrc="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=700&fit=crop"
              beforeLabel="Before Founderstreet"
              afterLabel="After Founderstreet"
            />
            <p className="text-centre text-grey-400 text-xs text-center mt-3">
              Actual client project — D2C nutrition brand. Conversion rate improved from 1.2% to 4.8%.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Our Services
            </span>
            <h2 className="heading-md mt-3">What We Build</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-border rounded-sm p-6 lg:p-8 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div>
                      <span className="font-serif text-4xl font-bold text-grey-100 leading-none block mb-3">
                        {service.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <h3 className="font-serif font-bold text-grey-900">{service.title}</h3>
                      </div>
                      <p className="text-grey-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-grey-600">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-14 bg-grey-50 border-y border-border">
        <div className="container-custom">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-grey-400 mb-8">
            Technologies We Build With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
              "Redis", "Shopify", "Tailwind CSS", "AWS", "Vercel", "Figma",
              "Flutter", "React Native", "GraphQL", "Stripe",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white border border-border rounded-sm text-sm font-medium text-grey-700 hover:border-primary hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="heading-md">Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Share your brief and we&apos;ll come back with a scoped proposal within 48 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
