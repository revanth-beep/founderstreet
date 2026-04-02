import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowRight, CheckCircle2, BarChart3, Target, TrendingUp } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import StartupQuiz from "@/components/sections/StartupQuiz";

export const metadata: Metadata = {
  title: "Startup Idea Validation & Strategy",
  description:
    "Stress-test your concept before capital is deployed. Market sizing, SWOT analysis, competitor benchmarking, and unit economics modelling.",
};

const deliverables = [
  {
    icon: BarChart3,
    title: "Market Sizing & TAM/SAM/SOM Analysis",
    desc: "We model your total addressable market from first principles — not just copy a McKinsey slide. You'll know the true revenue ceiling and exactly what share is realistic.",
    points: ["Bottom-up market model", "Revenue potential by geography", "3-scenario sizing (conservative/base/bull)"],
  },
  {
    icon: Target,
    title: "SWOT & Competitor Benchmarking",
    desc: "We audit every incumbent in your space — their CAC, LTV, pricing, and the gaps in their product. You'll know exactly where they're failing and how to win.",
    points: ["Competitive landscape map", "Whitespace opportunity analysis", "Positioning recommendation"],
  },
  {
    icon: TrendingUp,
    title: "Unit Economics Modelling",
    desc: "The most important slide in your deck. We build the exact CAC vs LTV model investors will stress-test, including payback periods and contribution margin.",
    points: ["CAC by acquisition channel", "LTV by cohort", "Payback period & break-even model"],
  },
];

const faqs = [
  {
    question: "How long does the validation process take?",
    answer:
      "Our standard validation sprint takes 10–14 working days. We deliver a full report with market sizing, SWOT, and unit economics model, plus a 60-minute walkthrough call.",
  },
  {
    question: "What data sources do you use for market sizing?",
    answer:
      "We use a combination of primary research (founder interviews, consumer surveys), secondary data (Statista, IBEF, industry reports), and bottom-up modelling from existing comparable businesses.",
  },
  {
    question: "Will this analysis work for a pre-revenue idea?",
    answer:
      "Absolutely. In fact, this is where it's most valuable. Pre-revenue validation prevents you from building the wrong thing. We've validated ideas from napkin-sketch stage all the way to Series A.",
  },
  {
    question: "Do you provide the SWOT report as a downloadable template?",
    answer:
      "Yes. Every client receives a fully editable PowerPoint and Excel model. You own all the IP. We also provide a condensed investor-ready version of the market analysis.",
  },
  {
    question: "Can this replace a formal market research firm?",
    answer:
      "For early-stage startups, yes. Traditional market research firms charge ₹5–15L for slower, more generic reports. We're purpose-built for Indian startup contexts and move at startup velocity.",
  },
];

export default function ValidationPage() {
  return (
    <>
      <ServiceHero
        label="Validation & Strategy"
        title="Stress-Test Your Idea"
        titleHighlight="Before Capital Is Deployed."
        subtitle="We don't just launch — we audit the concept with the same rigour an institutional investor would. Market sizing, competitive intelligence, and unit economics before you spend a single rupee."
        ctaText="Start Validation"
        icon={FlaskConical}
        stats={[
          { value: "85%", label: "Of validated ideas pivot at least once" },
          { value: "3x", label: "Higher success rate post-validation" },
          { value: "14 days", label: "Turnaround time" },
        ]}
      />

      {/* Deliverables */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              What You Get
            </span>
            <h2 className="heading-md mt-3">
              Three Reports. Zero Guesswork.
            </h2>
          </div>

          <div className="space-y-6">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8 bg-white border border-border rounded-sm hover:shadow-medium transition-all duration-300"
                >
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-green-100 rounded-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-grey-400 uppercase tracking-wider">
                        Deliverable {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-grey-900 text-lg">
                      {d.title}
                    </h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-grey-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {d.points.map((p) => (
                        <span
                          key={p}
                          className="flex items-center gap-1.5 text-xs font-medium text-primary bg-green-100 px-3 py-1.5 rounded-full"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Quiz */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Free Startup Health Check
            </span>
            <h2 className="heading-md mt-3">
              Get a Free SWOT Report
            </h2>
            <p className="text-grey-600 mt-3 text-sm leading-relaxed">
              Answer 5 questions about your idea. We&apos;ll send a personalised sample SWOT
              report to your inbox instantly.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <StartupQuiz />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              FAQ
            </span>
            <h2 className="heading-md mt-3">Common Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to validate your idea?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Book a free 30-minute discovery call and we&apos;ll scope out your validation
            project within 24 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Start My Validation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
