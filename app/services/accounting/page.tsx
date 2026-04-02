import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, TrendingUp, FileText, Receipt, PieChart } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Accounting & Taxation — Virtual CFO",
  description:
    "Institutional-grade financial plumbing. Virtual CFO services, bookkeeping, payroll, GST compliance, and strategic runway management.",
};

const services = [
  {
    icon: TrendingUp,
    title: "Virtual CFO Services",
    desc: "High-level financial forecasting and runway management for early-stage startups. You get the strategic clarity of a ₹40L/yr CFO at a fraction of the cost.",
    features: [
      "Monthly financial health reports",
      "12-month cash flow forecasting",
      "Fundraising financial modelling",
      "Board-ready P&L presentations",
      "Burn rate optimisation",
      "Scenario planning (3 cases)",
    ],
  },
  {
    icon: FileText,
    title: "Bookkeeping & Payroll",
    desc: "Automated, accurate, and on time. We use cloud accounting tools to give you real-time visibility into your finances without any manual reconciliation.",
    features: [
      "Monthly bookkeeping & reconciliation",
      "Payroll processing & payslips",
      "Vendor payment management",
      "Bank statement reconciliation",
      "TDS deduction & filing",
      "Expense management",
    ],
  },
  {
    icon: Receipt,
    title: "GST & Taxation",
    desc: "Zero penalties. Optimised tax structures. We ensure every filing is on time and your tax structure is designed to minimise liability legally.",
    features: [
      "GST registration & filing (GSTR-1, 3B)",
      "Advance tax computation",
      "Annual income tax filing",
      "Tax audit support",
      "Transfer pricing advisory",
      "Startup tax exemptions (80-IAC)",
    ],
  },
  {
    icon: PieChart,
    title: "Investor Reporting",
    desc: "Institutional-grade reporting for your angel investors, lead funds, and board. Structured exactly as institutional investors expect to see it.",
    features: [
      "Monthly MIS reports",
      "Investor deck financials",
      "KPI dashboards",
      "Cohort analysis",
      "Due diligence data room",
      "ESOP accounting",
    ],
  },
];

const faqs = [
  {
    question: "How is a Virtual CFO different from a regular CA?",
    answer:
      "A CA handles compliance — taxes, audits, and filings. A Virtual CFO handles strategy — financial modelling, fundraising preparation, runway management, and board reporting. We provide both under one roof, so you don't need to manage two separate relationships.",
  },
  {
    question: "What accounting software do you use?",
    answer:
      "We primarily work with Zoho Books, QuickBooks, and Tally depending on client preference. We also integrate with Razorpay, Stripe, and other payment platforms for automated reconciliation. All clients get read-only access to their accounts in real time.",
  },
  {
    question: "Can you help us prepare for a due diligence audit?",
    answer:
      "Absolutely. We maintain your accounts in investor-ready condition from Day 1. When due diligence begins, we provide a complete data room with audited financials, tax returns, GST filings, payroll records, and cap table documentation.",
  },
  {
    question: "How do you handle startups with foreign investment?",
    answer:
      "We manage all FEMA compliance, RBI reporting requirements (FC-GPR, FC-TRS), and transfer pricing documentation required when a company receives foreign direct investment or has foreign directors.",
  },
  {
    question: "What is the pricing structure?",
    answer:
      "We offer three packages: Seed (bookkeeping + GST, from ₹8,000/month), Growth (adds payroll + TDS + investor reporting, from ₹18,000/month), and Scale (full Virtual CFO with fundraising support, from ₹35,000/month). Custom pricing for companies with more complex needs.",
  },
];

export default function AccountingPage() {
  return (
    <>
      <ServiceHero
        label="Accounting & Virtual CFO"
        title="Financial Plumbing"
        titleHighlight="That Impresses Investors."
        subtitle="Institutional-grade accounting, GST compliance, and virtual CFO services so you can focus 100% on product and growth — not spreadsheets."
        ctaText="Get Started"
        icon={Calculator}
        stats={[
          { value: "₹0", label: "Penalties across all clients" },
          { value: "48hr", label: "Monthly close cycle" },
          { value: "3x", label: "Faster due diligence" },
        ]}
      />

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Services
            </span>
            <h2 className="heading-md mt-3">
              Everything Under One Roof
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-border rounded-sm p-6 lg:p-8 hover:shadow-medium transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-grey-900 text-lg">{service.title}</h3>
                      <p className="text-grey-600 text-sm mt-1 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-grey-400 mb-3">
                      What&apos;s included
                    </p>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Pricing
            </span>
            <h2 className="heading-md mt-3">Transparent Monthly Pricing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Seed",
                price: "₹8,000",
                period: "/month",
                desc: "For pre-revenue startups",
                features: [
                  "Monthly bookkeeping",
                  "GST return filing",
                  "Bank reconciliation",
                  "Annual ITR filing",
                  "Email support",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Growth",
                price: "₹18,000",
                period: "/month",
                desc: "For revenue-generating startups",
                features: [
                  "Everything in Seed",
                  "Payroll processing",
                  "TDS deduction & filing",
                  "Investor MIS reports",
                  "Priority support",
                  "Quarterly strategy call",
                ],
                cta: "Most Popular",
                highlight: true,
              },
              {
                name: "Scale",
                price: "₹35,000",
                period: "/month",
                desc: "For pre-Series A startups",
                features: [
                  "Everything in Growth",
                  "Virtual CFO services",
                  "Fundraising model",
                  "Board reporting",
                  "Due diligence prep",
                  "Dedicated CFO partner",
                ],
                cta: "Get Started",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-sm border p-6 ${
                  plan.highlight
                    ? "bg-primary text-white border-primary shadow-green-glow-lg"
                    : "bg-white border-border"
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full mb-3 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-serif text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-grey-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlight ? "text-white/70" : "text-grey-500"}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-0.5 mb-5">
                  <span className={`font-serif text-3xl font-bold ${plan.highlight ? "text-white" : "text-grey-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-grey-500"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-white/90" : "text-grey-600"}`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-white/20" : "bg-green-100"}`}>
                        <span className={`w-2 h-2 rounded-full ${plan.highlight ? "bg-white" : "bg-primary"}`} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-2.5 px-4 rounded-sm text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-white text-primary hover:bg-green-50"
                      : "bg-primary text-white hover:bg-primary-light"
                  }`}
                >
                  {plan.cta === "Most Popular" ? "Get Started" : plan.cta}
                </Link>
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
            Get investor-grade financials from Day One
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Stop managing spreadsheets. Get a dedicated finance team for less than the cost
            of a part-time accountant.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Start Financial Setup
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
