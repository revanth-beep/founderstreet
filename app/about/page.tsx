import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founderstreet is the unseen engine behind India's next great startups. Learn about our mission, team, and values.",
};

const values = [
  {
    icon: Target,
    title: "Outcome-Obsessed",
    desc: "Every deliverable has a measurable objective. We don't track hours — we track milestones. Our incentives are permanently aligned with yours.",
  },
  {
    icon: Zap,
    title: "Speed as a Competitive Advantage",
    desc: "Startups die of slow execution. We've engineered every process to move at startup velocity without sacrificing quality or compliance.",
  },
  {
    icon: Heart,
    title: "Founder-First, Always",
    desc: "We've all been founders. We know what it feels like to build something from nothing. Every decision we make is filtered through that lens.",
  },
];

const team = [
  {
    name: "Arjun Kapoor",
    role: "Co-founder & CEO",
    background: "Ex-McKinsey, IIT Delhi. Led strategy for 3 VC-backed startups.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Priya Verma",
    role: "Co-founder & CFO",
    background: "Chartered Accountant, 8 years at Big 4. Expert in startup taxation and fundraising.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Rohan Singh",
    role: "Head of Technology",
    background: "Ex-Flipkart engineering. Full-stack architect with 10+ product launches.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Kavya Nair",
    role: "Head of Marketing",
    background: "Built marketing teams at 2 unicorns. D2C and performance marketing specialist.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background-dark pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(27, 67, 50, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 85% 30%, rgba(45, 106, 79, 0.25) 0%, transparent 40%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(184, 228, 199, 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em] block mb-5">
              About Founderstreet
            </span>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We&apos;re the team that builds the scaffolding{" "}
              <em className="italic text-green-400">while you build the skyscraper.</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Founderstreet was born from frustration. Three ex-founders who had each wasted
              critical early months on company registration, CAC spreadsheets, and pitch deck
              revisions — instead of building product and acquiring customers.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label mb-4">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Our Story
              </span>
              <h2 className="heading-md mt-3 mb-5">
                Built by Founders, <span className="gradient-text">for Founders</span>
              </h2>
              <div className="space-y-4 text-grey-600 text-sm leading-relaxed">
                <p>
                  In 2021, our founding team was building three separate startups across
                  different sectors. Each of us hit the same wall: the operational overhead
                  of building a company in India was eating into our time to build the actual
                  product.
                </p>
                <p>
                  Incorporation took 6 weeks instead of 10 days. The CA we hired didn&apos;t
                  understand startup equity or ESOP accounting. Our pitch deck looked like a
                  school project. And we had no idea who the right investors were for our stage.
                </p>
                <p>
                  So we built Founderstreet — the infrastructure layer we wished existed.
                  Today, we&apos;ve helped 150+ startups across India launch, scale, and raise
                  over ₹40Cr in funding.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2021", label: "Founded" },
                { value: "150+", label: "Startups Served" },
                { value: "₹40Cr+", label: "Funding Facilitated" },
                { value: "4", label: "Cities Present" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-grey-50 border border-border rounded-sm p-6 text-center"
                >
                  <p className="font-serif text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-grey-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Our Values
            </span>
            <h2 className="heading-md mt-3">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white border border-border rounded-sm p-6 hover:shadow-medium transition-all duration-300">
                  <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-grey-900 mb-2">{val.title}</h3>
                  <p className="text-grey-600 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              The Team
            </span>
            <h2 className="heading-md mt-3">The People Behind the Platform</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square overflow-hidden rounded-sm mb-4 bg-grey-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif font-bold text-grey-900 mb-0.5">{member.name}</h3>
                <p className="text-primary text-xs font-semibold mb-2">{member.role}</p>
                <p className="text-grey-500 text-xs leading-relaxed">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to work with us?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Book a free 30-minute discovery call and let&apos;s figure out exactly how we can
            help you move faster.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold text-sm rounded-sm hover:bg-green-50 transition-colors">
            Book a Free Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
