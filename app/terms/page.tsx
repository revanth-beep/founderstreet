import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Founderstreet's terms of service.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="heading-lg mb-6">Terms of Service</h1>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
          Last updated: April 2025
        </p>
        <div className="space-y-6 text-[#4A4A4A] text-sm leading-relaxed">
          <p>
            By using Founderstreet&apos;s services, you agree to these Terms of Service.
            Please read them carefully before engaging our services.
          </p>
          <h2 className="heading-sm mt-8 mb-3">Services</h2>
          <p>
            Founderstreet provides startup infrastructure services including company incorporation,
            accounting, marketing, web development, and fundraising support. All services are
            subject to a separate engagement agreement.
          </p>
          <h2 className="heading-sm mt-8 mb-3">Payment</h2>
          <p>
            Payment terms are specified in individual service agreements. Refund policies vary
            by service type. Please refer to your engagement letter for specific terms.
          </p>
          <h2 className="heading-sm mt-8 mb-3">Contact</h2>
          <p>
            For queries, contact{" "}
            <a href="mailto:hello@northvilleconsultinggroup.com" className="text-[#66BB3F] underline">
              hello@northvilleconsultinggroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
