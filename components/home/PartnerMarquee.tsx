"use client";

import { cn } from "@/lib/utils";

// Using text-based logos for demo; in production replace with real SVG logos
const partners = [
  { name: "Times OOH", category: "Billboard Network" },
  { name: "BigTrade", category: "Distribution" },
  { name: "StartupIndia", category: "Ecosystem Partner" },
  { name: "NASSCOM", category: "Tech Partner" },
  { name: "IndiaMart", category: "B2B Platform" },
  { name: "Lemon Tree", category: "Hospitality" },
  { name: "Metro Ads", category: "Transit OOH" },
  { name: "Phoenix Malls", category: "Retail Activation" },
  { name: "Razorpay", category: "Fintech Partner" },
  { name: "AWS Activate", category: "Cloud Partner" },
  { name: "Google Ads", category: "Performance" },
  { name: "Meta Business", category: "Social Ads" },
];

function MarqueeItem({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-6 py-3 mx-3 bg-white rounded-sm border border-border shadow-soft">
      <div className="w-7 h-7 bg-green-100 rounded-sm flex items-center justify-center">
        <span className="text-primary font-bold text-xs">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="font-semibold text-grey-900 text-sm whitespace-nowrap">{name}</p>
        <p className="text-grey-500 text-xs whitespace-nowrap">{category}</p>
      </div>
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="py-14 bg-grey-50 border-y border-border overflow-hidden">
      <div className="container-custom mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-grey-400">
          Our Partner Network — Billboards · Distribution · Digital · Retail
        </p>
      </div>

      {/* Row 1 */}
      <div className="relative flex overflow-hidden mb-3">
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((p, i) => (
            <MarqueeItem key={`a-${i}`} name={p.name} category={p.category} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {[...partners.slice(6), ...partners.slice(0, 6), ...partners.slice(6), ...partners.slice(0, 6)].map(
            (p, i) => (
              <MarqueeItem key={`b-${i}`} name={p.name} category={p.category} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
