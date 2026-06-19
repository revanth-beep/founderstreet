import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Founderstreet's privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="heading-lg mb-6">Privacy Policy</h1>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
          Last updated: April 2025
        </p>
        <div className="prose prose-lg max-w-none space-y-6 text-[#4A4A4A] text-sm leading-relaxed">
          <p>
            Founderstreet (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to
            protecting your personal data. This privacy policy explains how we collect, use,
            and safeguard your information when you use our services.
          </p>
          <h2 className="heading-sm mt-8 mb-3">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as your name, email address,
            phone number, and startup details when you fill out our contact form, subscribe to our
            newsletter, or use our startup health check tool.
          </p>
          <h2 className="heading-sm mt-8 mb-3">How We Use Your Information</h2>
          <p>
            We use the information we collect to provide our services, communicate with you,
            send newsletters (with your consent), and improve our platform.
          </p>
          <h2 className="heading-sm mt-8 mb-3">Contact Us</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:hello@northvilleconsultinggroup.com" className="text-[#66BB3F] underline">
              hello@northvilleconsultinggroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
