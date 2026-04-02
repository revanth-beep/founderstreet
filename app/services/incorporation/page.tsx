import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ArrowRight, CheckCircle2, Clock, Shield, FileText, Award } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ComparisonTable from "@/components/ui/ComparisonTable";

export const metadata: Metadata = {
  title: "Company Incorporation & Compliance",
  description:
    "End-to-end company incorporation in India. Pvt Ltd, LLP, and sole proprietorship registration with IP protection.",
};

const comparisonColumns = [
  { key: "pvtltd", label: "Private Limited", highlight: true },
  { key: "llp", label: "LLP" },
  { key: "prop", label: "Sole Proprietorship" },
];

const comparisonRows = [
  { feature: "Investor Preferred", values: [true, "partial", false] },
  { feature: "Limited Liability", values: [true, true, false] },
  { feature: "Min. Members Required", values: ["2", "2", "1"] },
  { feature: "ESOPs Available", values: [true, false, false] },
  { feature: "Foreign Investment (FDI)", values: [true, "partial", false] },
  { feature: "Annual Compliance Cost", values: ["₹25,000–50,000", "₹15,000–30,000", "₹5,000–10,000"] },
  { feature: "Incorporation Time", values: ["7–10 days", "10–15 days", "3–5 days"] },
  { feature: "Tax Rate (Turnover < ₹400Cr)", values: ["22%", "30%", "As per slab"] },
  { feature: "Perpetual Existence", values: [true, true, false] },
  { feature: "Best For", values: ["VC-backed startups", "Professional services", "Freelancers/solo ops"] },
];

const process = [
  {
    step: "01",
    title: "Director Identification Number (DIN)",
    desc: "We apply for DINs for all proposed directors. This is the first regulatory step in the incorporation process.",
    time: "Day 1–2",
  },
  {
    step: "02",
    title: "Digital Signature Certificate (DSC)",
    desc: "We obtain Class-3 DSCs for all directors, required for signing e-forms on the MCA portal.",
    time: "Day 1–3",
  },
  {
    step: "03",
    title: "Name Reservation via RUN",
    desc: "We file a name reservation request with MCA and get your company name approved. We send 3 alternatives.",
    time: "Day 3–5",
  },
  {
    step: "04",
    title: "MOA & AOA Drafting",
    desc: "We draft bespoke Memorandum and Articles of Association tailored to your business and investor needs.",
    time: "Day 4–6",
  },
  {
    step: "05",
    title: "SPICe+ Filing & CIN Issuance",
    desc: "We file the SPICe+ form with MCA. On approval, you receive your Certificate of Incorporation and CIN.",
    time: "Day 6–10",
  },
  {
    step: "06",
    title: "PAN, TAN & Bank Account",
    desc: "We immediately file for PAN and TAN, and assist in opening your company's current bank account.",
    time: "Day 10–14",
  },
];

const faqs = [
  {
    question: "What is the minimum share capital required for a Pvt Ltd company?",
    answer:
      "There is no minimum paid-up capital requirement for a Private Limited Company as per the Companies (Amendment) Act, 2015. However, the authorised share capital (typically ₹1,00,000) is required for stamp duty calculation.",
  },
  {
    question: "How many directors and shareholders are needed?",
    answer:
      "A minimum of 2 directors and 2 shareholders are required for a Private Limited Company. The same person can act as both director and shareholder. Maximum directors allowed: 15 (can be increased by special resolution).",
  },
  {
    question: "What documents do I need to provide?",
    answer:
      "For each director: PAN card, Aadhaar card, passport-size photograph, current bank statement (utility bill for address proof), email ID, and mobile number. For the registered office: rental agreement and NOC from landlord.",
  },
  {
    question: "Can I incorporate a company as a non-resident Indian (NRI)?",
    answer:
      "Yes. NRIs can be directors and shareholders in an Indian company. At least one director must be a resident of India (stayed in India for at least 182 days in the previous calendar year).",
  },
  {
    question: "What happens after incorporation?",
    answer:
      "Post-incorporation, we handle: commencement of business declaration, opening of bank accounts, registration for GST (if applicable), Startup India registration, and first-year annual compliance calendar setup.",
  },
];

export default function IncorporationPage() {
  return (
    <>
      <ServiceHero
        label="Company Incorporation"
        title="Your Legal Foundation,"
        titleHighlight="Built Right From Day Zero."
        subtitle="End-to-end company registration and regulatory compliance. We handle the paperwork so your first 10 days are spent building product, not filing forms."
        ctaText="Start Incorporation"
        icon={Building2}
        stats={[
          { value: "< 10 Days", label: "Avg. incorporation time" },
          { value: "500+", label: "Companies incorporated" },
          { value: "100%", label: "Compliance success rate" },
        ]}
      />

      {/* Entity Comparison */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Entity Comparison
            </span>
            <h2 className="heading-md mt-3">Which Structure is Right for You?</h2>
            <p className="text-grey-600 text-sm mt-3">
              Choosing the wrong entity can cost you your next funding round. Here&apos;s the
              data you need to decide.
            </p>
          </div>
          <ComparisonTable
            columns={comparisonColumns}
            rows={comparisonRows}
            title="Pvt Ltd vs LLP vs Sole Proprietorship"
            subtitle="A comprehensive comparison for Indian founders making the incorporation decision"
          />
          <p className="text-grey-400 text-xs text-center mt-4">
            * For startups seeking venture capital, Private Limited is the only investor-compatible structure.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Our Process
            </span>
            <h2 className="heading-md mt-3">
              Company Live in{" "}
              <span className="gradient-text">10 Working Days</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-[3.5rem] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4">
              {process.map((p, i) => (
                <div key={p.step} className="flex gap-6 lg:gap-8">
                  <div className="flex-shrink-0 relative">
                    <div className="w-14 h-14 bg-white border-2 border-border rounded-full flex items-center justify-center z-10 relative shadow-soft">
                      <span className="font-serif font-bold text-primary text-sm">{p.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 pb-6 lg:pb-8 last:pb-0">
                    <div className="bg-white border border-border rounded-sm p-5 hover:shadow-medium transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="font-serif font-bold text-grey-900">{p.title}</h3>
                        <span className="flex items-center gap-1 text-xs text-grey-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {p.time}
                        </span>
                      </div>
                      <p className="text-grey-600 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Complete Incorporation Bundle",
                items: [
                  "Certificate of Incorporation",
                  "PAN & TAN registration",
                  "MOA & AOA documents",
                  "Share certificates",
                  "First board resolution",
                  "Commencement certificate",
                ],
              },
              {
                icon: Shield,
                title: "IP & Brand Protection",
                items: [
                  "Trademark search & filing",
                  "Class identification",
                  "Domain registration",
                  "Brand name legal clearance",
                  "Logo copyright registration",
                  "NDA templates",
                ],
              },
              {
                icon: Award,
                title: "Post-Incorporation Setup",
                items: [
                  "Startup India recognition",
                  "GST registration (if needed)",
                  "Bank account assistance",
                  "Company letterhead & seal",
                  "Annual compliance calendar",
                  "CA introduction",
                ],
              },
            ].map((bundle) => {
              const Icon = bundle.icon;
              return (
                <div key={bundle.title} className="bg-white border border-border rounded-sm p-6">
                  <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-grey-900 mb-4">{bundle.title}</h3>
                  <ul className="space-y-2">
                    {bundle.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-grey-600">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-grey-50">
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
            Start your incorporation today
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Get your company live in 10 working days. We handle every filing; you focus on
            building your product.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Start Incorporation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
