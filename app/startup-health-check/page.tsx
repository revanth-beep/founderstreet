import type { Metadata } from "next";
import StartupQuiz from "@/components/sections/StartupQuiz";
import { CheckCircle2, ClipboardList, Mail, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Startup Health Check — Free SWOT Report",
  description:
    "Answer 5 questions about your startup. Get a free personalised SWOT analysis and market sizing report sent to your inbox.",
};

export default function StartupHealthCheckPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background-dark pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(27, 67, 50, 0.5) 0%, transparent 50%)
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
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Free Startup Health Check
            </span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            5 Questions. Free SWOT Report.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Answer 5 quick questions about your startup. In exchange for your email, we&apos;ll
            send a personalised SWOT analysis and market positioning snapshot — instantly.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="section-padding bg-grey-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
            {/* Quiz */}
            <StartupQuiz />

            {/* What you get */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-grey-900 mb-5">
                What You&apos;ll Receive
              </h2>
              {[
                {
                  icon: TrendingUp,
                  title: "Market Sizing Snapshot",
                  desc: "A brief TAM/SAM/SOM estimation for your sector based on your inputs.",
                },
                {
                  icon: CheckCircle2,
                  title: "SWOT Framework",
                  desc: "Preliminary strengths, weaknesses, opportunities, and threats tailored to your stage.",
                },
                {
                  icon: ClipboardList,
                  title: "Top 3 Priorities",
                  desc: "Actionable recommendations for your single biggest execution gap right now.",
                },
                {
                  icon: Mail,
                  title: "Follow-up from Our Team",
                  desc: "A human from Founderstreet will review your answers and reach out within 48 hours.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-white border border-border rounded-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-grey-900 text-sm">{item.title}</p>
                      <p className="text-grey-600 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm">
                <p className="text-primary text-xs font-semibold mb-1">100% Free. No credit card.</p>
                <p className="text-grey-600 text-xs leading-relaxed">
                  This report is our gift to the Indian startup ecosystem. No strings attached.
                  We just ask for your email to send the report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
