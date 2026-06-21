import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Founderstreet's terms of service.",
};

function renderBody(text: string) {
  const parts = text.split(/(\S+@\S+\.\S+)/g);
  return parts.map((part, i) =>
    /\S+@\S+\.\S+/.test(part) ? (
      <a key={i} href={`mailto:${part}`} className="text-[#66BB3F] underline">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default async function TermsPage() {
  const site = await getSiteContent();
  const { lastUpdated, sections } = site.termsPage;

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="heading-lg mb-6">Terms of Service</h1>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
          Last updated: {lastUpdated}
        </p>
        <div className="space-y-6 text-[#4A4A4A] text-sm leading-relaxed">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading ? (
                <h2 className="heading-sm mt-8 mb-3">{section.heading}</h2>
              ) : null}
              <p>{renderBody(section.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
