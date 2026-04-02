import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import NewsletterForm from "@/components/sections/NewsletterForm";

const services = [
  { name: "Test Your Idea", href: "/services/validation" },
  { name: "Incorporation & Compliance", href: "/services/incorporation" },
  { name: "Accounting & Taxation", href: "/services/accounting" },
  { name: "Marketing & Retail", href: "/services/marketing" },
  { name: "Web Development", href: "/services/web-development" },
  { name: "Pitch Decks & Valuation", href: "/services/funding" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "The Founder's Brief", href: "/resources" },
  { name: "Startup Health Check", href: "/startup-health-check" },
  { name: "Contact Us", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

export default function Footer() {
  return (
    <footer className="bg-grey-950 text-white">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm font-serif">FS</span>
              </div>
              <span className="font-serif font-bold text-xl text-white">Founderstreet</span>
            </Link>
            <p className="text-grey-400 text-sm leading-relaxed mb-6">
              The unseen engine behind India&apos;s next great startups. From Day Zero to
              Pre-Seed, we build the infrastructure you need to scale.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-grey-800 rounded-sm flex items-center justify-center text-grey-400 hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-grey-800 rounded-sm flex items-center justify-center text-grey-400 hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-grey-800 rounded-sm flex items-center justify-center text-grey-400 hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Core Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-grey-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Company & Insights
            </h4>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-grey-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter CTA */}
          <div>
            <h4 className="font-serif font-semibold text-white text-lg mb-2">
              Get the Founder&apos;s Edge.
            </h4>
            <p className="text-grey-400 text-sm leading-relaxed mb-4">
              Join founders receiving our weekly breakdown on unit economics, pitch
              tear-downs, and growth tactics.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-grey-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-grey-500 text-sm">
            © {new Date().getFullYear()} Founderstreet. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-grey-500 hover:text-grey-300 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-grey-500 hover:text-grey-300 text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/admin"
              className="text-grey-600 hover:text-grey-400 text-xs transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

