import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Book a free strategy call with Founderstreet. We respond within 24 hours.",
};

export default function ContactPage() {
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
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em] block mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Let&apos;s Talk About Your Startup.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Book a free 30-minute discovery call. We&apos;ll understand your stage, identify
              your biggest gaps, and tell you exactly how we can help. No pitch. No pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-grey-900 mb-2">
                Pitch Your Idea
              </h2>
              <p className="text-grey-600 text-sm mb-6">
                Fill out the form and a member of our team will reach out within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              {/* Contact details */}
              <div className="bg-grey-50 rounded-sm border border-border p-6">
                <h3 className="font-serif font-bold text-grey-900 mb-5">Contact Details</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "hello@founderstreet.in",
                      href: "mailto:hello@founderstreet.in",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+91 98765 43210",
                      href: "tel:+919876543210",
                    },
                    {
                      icon: MapPin,
                      label: "Office",
                      value: "DLF Cyber City, Gurugram, Haryana 122002",
                      href: null,
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: "Monday–Saturday, 10 AM – 7 PM IST",
                      href: null,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-grey-400 text-xs font-medium uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-grey-700 text-sm hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-grey-700 text-sm">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social */}
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-grey-400 text-xs font-medium uppercase tracking-wider mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-2">
                    {[
                      { Icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
                      { Icon: XIcon, href: "https://twitter.com", label: "Twitter" },
                      { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                    ].map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-white border border-border rounded-sm flex items-center justify-center text-grey-500 hover:bg-primary hover:text-white hover:border-primary transition-all"
                        aria-label={label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="bg-primary rounded-sm p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">We respond within 24 hours</p>
                    <p className="text-white/70 text-xs mt-1 leading-relaxed">
                      Every inquiry is reviewed by a senior team member. No automated responses,
                      no gatekeeping.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ quick links */}
              <div>
                <p className="text-grey-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Common Questions
                </p>
                <div className="space-y-2">
                  {[
                    "How much does incorporation cost?",
                    "How quickly can you build my pitch deck?",
                    "Do you work with international founders?",
                    "What's included in the free health check?",
                  ].map((q) => (
                    <div
                      key={q}
                      className="flex items-center justify-between p-3 bg-white border border-border rounded-sm text-sm text-grey-600 hover:border-primary hover:text-primary cursor-pointer transition-all"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
