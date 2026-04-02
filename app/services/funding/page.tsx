import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight, FileText, BarChart3, Users, Download, ExternalLink } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Investor Funding & Pitch Deck Services",
  description:
    "Pitch deck creation, financial projections, and investor matchmaking. Connect with India's leading angels, VCs, and accelerators.",
};

const deckTemplates = [
  {
    name: "Seed Round Deck",
    slides: 12,
    best: "Pre-seed to seed",
    raise: "₹50L – ₹3Cr",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
  },
  {
    name: "Series A Narrative",
    slides: 15,
    best: "Traction-stage",
    raise: "₹3Cr – ₹20Cr",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    name: "Angel Round Teaser",
    slides: 8,
    best: "Idea to MVP",
    raise: "₹10L – ₹1Cr",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=300&fit=crop",
  },
  {
    name: "Accelerator Application",
    slides: 10,
    best: "Y Combinator / SFA",
    raise: "Programme equity",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  },
];

const faqs = [
  {
    question: "What does the pitch deck creation process look like?",
    answer:
      "Week 1: Discovery call + competitive analysis + narrative structure workshop. Week 2: First draft (8 slides). Week 3: Revisions + financial model integration. Week 4: Final deck + investor Q&A prep session. We also provide a 30-minute mock pitch before your first investor meeting.",
  },
  {
    question: "What is the 12-slide master deck structure?",
    answer:
      "Our proven structure: 1) Cover + Hook, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Go-to-Market, 8) Traction, 9) Team, 10) Financials, 11) Competition, 12) The Ask. Each slide has a single, clear message.",
  },
  {
    question: "How do you source investors for matchmaking?",
    answer:
      "We maintain a live database of 200+ vetted angels, 40+ VC funds, and 15+ accelerators/incubators active in India. We only make warm introductions — cold email blasting destroys reputation. Matching is based on sector fit, cheque size, and stage alignment.",
  },
  {
    question: "What does the n8n automation process mean for investor outreach?",
    answer:
      "We use n8n (a workflow automation tool) to systematise investor pipeline management. This includes automated follow-up sequences, CRM tracking, meeting scheduling, and data room access management — ensuring no warm lead falls through the cracks.",
  },
  {
    question: "Do you take equity for your fundraising services?",
    answer:
      "No equity for pitch deck creation or financial modelling. For investor matchmaking and warm introductions, we charge a fixed project fee upfront. We do not take success fees or equity percentages — this keeps our incentives clean and conflict-free.",
  },
];

export default function FundingPage() {
  return (
    <>
      <ServiceHero
        label="Investor Funding & Pitch Decks"
        title="Turn Metrics Into"
        titleHighlight="a Compelling Narrative."
        subtitle="We transform your raw data into the exact story institutional investors want to hear. Pitch deck creation, financial modelling, and warm introductions to our vetted network."
        ctaText="Build My Deck"
        icon={TrendingUp}
        stats={[
          { value: "₹40Cr+", label: "Funding facilitated" },
          { value: "200+", label: "Investor introductions" },
          { value: "73%", label: "Decks that secured term sheets" },
        ]}
      />

      {/* Core Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Pitch Deck Creation",
                desc: "The 12-slide master deck designed to make investors lean forward. We combine data storytelling with visual design excellence.",
                deliverables: [
                  "12-slide investor deck",
                  "Narrative storyboarding",
                  "Visual design (Figma/PowerPoint)",
                  "Investor Q&A script",
                  "Mock pitch session",
                  "3 revision rounds",
                ],
              },
              {
                icon: BarChart3,
                title: "Financial Projections",
                desc: "5-year Excel models that withstand investor scrutiny. Built bottom-up with clear assumptions, scenario analysis, and key driver sensitivity.",
                deliverables: [
                  "5-year P&L projection",
                  "Revenue & cost model",
                  "3 scenarios (bear/base/bull)",
                  "Cohort analysis",
                  "Fundraise utilisation plan",
                  "Cap table modelling",
                ],
              },
              {
                icon: Users,
                title: "Investor Matchmaking",
                desc: "Warm introductions to the right investors at the right stage. No cold emails. We only connect you with investors who've pre-indicated interest.",
                deliverables: [
                  "Investor database scan",
                  "Stage & sector matching",
                  "Warm email introductions",
                  "Meeting preparation brief",
                  "Pipeline CRM setup (n8n)",
                  "Post-meeting follow-up",
                ],
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white border border-border rounded-sm p-6 hover:shadow-medium transition-all duration-300">
                  <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-grey-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-grey-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-grey-400 mb-3">Deliverables</p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-grey-600">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Resource Library
            </span>
            <h2 className="heading-md mt-3">Pitch Deck Templates</h2>
            <p className="text-grey-600 text-sm mt-3">
              Preview our winning frameworks. Download a free seed-round template and
              start building your narrative today.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deckTemplates.map((template) => (
              <div
                key={template.name}
                className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-medium transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] overflow-hidden bg-grey-100 relative">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-background-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Preview
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {template.slides} slides
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-grey-900 text-sm mb-1">{template.name}</h3>
                  <p className="text-grey-500 text-xs mb-1">Best for: {template.best}</p>
                  <p className="text-primary text-xs font-semibold mb-3">Target raise: {template.raise}</p>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:gap-2.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Free Template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Download Seed-Round Template
              <Download className="w-4 h-4" />
            </Link>
            <p className="text-grey-400 text-xs mt-3">Free with email. No commitment required.</p>
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
            Your funding round starts with one deck.
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Let&apos;s build the narrative that gets you in the room — and gets the room to say yes.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Build My Pitch Deck
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
