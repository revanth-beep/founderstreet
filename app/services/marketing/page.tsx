import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, ArrowRight, Search, MousePointer, Monitor, MapPin, Store } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Marketing & Retail Expansion",
  description:
    "Full-funnel growth engineering. SEO, Google Ads, Meta Ads, OOH billboards, retail distribution. Digital and offline marketing for Indian startups.",
};

const services = [
  {
    category: "Digital & Performance",
    icon: Monitor,
    items: [
      {
        title: "SEO & Content Marketing",
        desc: "Dominate organic search for your category. We build topical authority through long-form content, technical SEO, and link building — compounding traffic over time.",
        metrics: ["3–6 month to page 1", "Evergreen traffic asset"],
      },
      {
        title: "Google Ads (Search & Display)",
        desc: "High-intent leads at the exact moment of need. We manage campaigns with surgical precision — Quality Score optimisation, negative keyword management, and bid strategies.",
        metrics: ["Target ROAS: 3–5x", "Cost per lead optimisation"],
      },
      {
        title: "Meta Ads (Facebook & Instagram)",
        desc: "Full-funnel social campaigns from cold audience prospecting to warm retargeting. Creative strategy, A/B testing, and dynamic product ads for e-commerce brands.",
        metrics: ["Creative-led strategy", "Full-funnel attribution"],
      },
    ],
  },
  {
    category: "Offline OOH & BTL",
    icon: MapPin,
    items: [
      {
        title: "Billboard & Outdoor Advertising",
        desc: "Prime billboard locations in Tier-1 and Tier-2 cities. We have direct partnerships with Times OOH, Laqshya Media, and Metro Ads for competitive rates.",
        metrics: ["Pan-India network", "Geo-targeted placement"],
      },
      {
        title: "Mall Kiosks & Pop-Up Activations",
        desc: "High-footfall retail experiences at Phoenix Malls, Select Citywalk, and Inorbit. From kiosk design to staffing and sales training.",
        metrics: ["10+ premium malls", "D2C brand launches"],
      },
      {
        title: "BTL & Sampling Campaigns",
        desc: "Product sampling, roadshows, and brand activation events that put your product directly in consumers' hands for direct feedback and conversion.",
        metrics: ["Measurable footfall", "CRM data capture"],
      },
    ],
  },
  {
    category: "Retail Distribution",
    icon: Store,
    items: [
      {
        title: "Super-Stockist Network",
        desc: "Connect directly with our vetted network of regional distributors and super-stockists across 15+ states. From general trade to modern trade.",
        metrics: ["15+ states covered", "Vetted distributor network"],
      },
      {
        title: "Modern Trade & E-Commerce Marketplaces",
        desc: "End-to-end listing management on Amazon, Flipkart, Blinkit, Zepto, and Swiggy Instamart. Plus modern trade tie-ups with Big Bazaar and DMart.",
        metrics: ["Top marketplace coverage", "Listing optimisation"],
      },
    ],
  },
];

const faqs = [
  {
    question: "What kind of ROAS can we expect from Meta/Google Ads?",
    answer:
      "For D2C brands, we typically target a blended ROAS of 3–5x within the first 60–90 days. Performance varies by category, price point, and creative quality. We set realistic benchmarks in a discovery call before committing to targets.",
  },
  {
    question: "Do you handle the creative/ad design as well?",
    answer:
      "Yes. Our performance marketing retainer includes ad creative production — static images, short-form video (reels), and carousel ads. We A/B test creatives continuously and only scale winning formats.",
  },
  {
    question: "What's the minimum OOH advertising budget?",
    answer:
      "For a single billboard in a Tier-1 city (prime location), expect ₹1.5–4L per month. We recommend a minimum 3-month campaign for brand recall. We can help with a ₹5–10L activation budget across multiple formats.",
  },
  {
    question: "How long does it take to set up retail distribution?",
    answer:
      "Initial distributor conversations begin in Week 1. First purchase orders typically come in by Week 4–6. We manage the relationship, credit terms negotiation, and supply chain coordination throughout.",
  },
  {
    question: "Do you work with early-stage startups with limited budgets?",
    answer:
      "Yes. We have a lean-start option for D2C brands at ₹25,000/month for digital-only (SEO + 1 paid channel). We grow the scope as your revenue scales. Our model is outcome-aligned — we grow when you grow.",
  },
];

export default function MarketingPage() {
  return (
    <>
      <ServiceHero
        label="Marketing & Retail Expansion"
        title="Full-Funnel Growth,"
        titleHighlight="Online and Offline."
        subtitle="We engineer demand across every customer touchpoint — from Google search to highway billboards to retail shelf space. Integrated digital performance and high-impact offline activations."
        ctaText="Plan My Growth"
        icon={Megaphone}
        stats={[
          { value: "4.2x", label: "Average blended ROAS" },
          { value: "15+", label: "States in distributor network" },
          { value: "50+", label: "D2C brands scaled" },
        ]}
      />

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {services.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.category} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-grey-900">
                    {category.category}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white border border-border rounded-sm p-5 hover:shadow-medium hover:border-primary/30 transition-all duration-300"
                    >
                      <h3 className="font-serif font-bold text-grey-900 mb-2">{item.title}</h3>
                      <p className="text-grey-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.metrics.map((m) => (
                          <span
                            key={m}
                            className="text-xs bg-green-100 text-primary font-medium px-2.5 py-1 rounded-full"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Study Strip */}
      <section className="section-padding bg-grey-950">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: "₹40L MRR", context: "in 90 days", detail: "D2C nutrition brand via Meta Ads + retail distribution" },
              { metric: "4.8x ROAS", context: "on Google Ads", detail: "B2B SaaS using branded search + competitor conquesting" },
              { metric: "3 states", context: "in 45 days", detail: "FMCG launch via super-stockist network expansion" },
            ].map((result) => (
              <div key={result.metric} className="bg-grey-900/60 border border-grey-800 rounded-sm p-6 text-center">
                <p className="font-serif text-3xl font-bold text-white mb-1">{result.metric}</p>
                <p className="text-green-400 text-sm font-medium mb-3">{result.context}</p>
                <p className="text-grey-400 text-xs leading-relaxed">{result.detail}</p>
              </div>
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
            Ready to engineer your growth?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Book a free growth audit. We&apos;ll map out your acquisition channels and give
            you a 90-day action plan.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Get My Growth Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
