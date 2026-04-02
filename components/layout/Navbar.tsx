"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  FlaskConical,
  Building2,
  Calculator,
  Megaphone,
  Code2,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    name: "Test Your Idea",
    href: "/services/validation",
    icon: FlaskConical,
    desc: "Market sizing, SWOT & unit economics",
  },
  {
    name: "Incorporation & Compliance",
    href: "/services/incorporation",
    icon: Building2,
    desc: "End-to-end company registration",
  },
  {
    name: "Accounting & Virtual CFO",
    href: "/services/accounting",
    icon: Calculator,
    desc: "Financial plumbing for founders",
  },
  {
    name: "Marketing & Retail",
    href: "/services/marketing",
    icon: Megaphone,
    desc: "Full-funnel digital and offline growth",
  },
  {
    name: "Web & Tech Development",
    href: "/services/web-development",
    icon: Code2,
    desc: "Scalable storefronts and platforms",
  },
  {
    name: "Investor Funding",
    href: "/services/funding",
    icon: TrendingUp,
    desc: "Pitch decks, projections & matchmaking",
  },
];

const navLinks = [
  { name: "Services", href: "#", hasDropdown: true },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-soft"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-xs font-serif">FS</span>
                </div>
                <span
                  className={cn(
                    "font-serif font-bold text-lg tracking-tight transition-colors duration-300",
                    scrolled || !isHomePage ? "text-grey-900" : "text-white"
                  )}
                >
                  Founderstreet
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setServicesOpen((o) => !o)}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200",
                        scrolled || !isHomePage
                          ? "text-grey-700 hover:text-primary"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-sm border border-border shadow-strong p-4 grid grid-cols-2 gap-2">
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-start gap-3 p-3 rounded-sm hover:bg-grey-50 transition-colors group"
                            >
                              <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
                                <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-grey-900 group-hover:text-primary transition-colors">
                                  {service.name}
                                </p>
                                <p className="text-xs text-grey-500 mt-0.5 leading-relaxed">
                                  {service.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                        <div className="col-span-2 pt-2 mt-1 border-t border-border">
                          <Link
                            href="/startup-health-check"
                            className="flex items-center justify-between p-3 rounded-sm bg-green-100 hover:bg-green-200 transition-colors group"
                          >
                            <div>
                              <p className="font-semibold text-sm text-primary">
                                Free Startup Health Check
                              </p>
                              <p className="text-xs text-primary/70 mt-0.5">
                                5 questions. Get a free SWOT report.
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200",
                      scrolled || !isHomePage
                        ? "text-grey-700 hover:text-primary"
                        : "text-white/90 hover:text-white",
                      pathname === link.href &&
                        (scrolled || !isHomePage) &&
                        "text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/startup-health-check"
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  scrolled || !isHomePage
                    ? "text-grey-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                )}
              >
                Free Health Check
              </Link>
              <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
                Pitch Your Idea
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={cn(
                "lg:hidden p-2 rounded-sm",
                scrolled || !isHomePage ? "text-grey-700" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-80 bg-white shadow-strong transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs font-serif">FS</span>
              </div>
              <span className="font-serif font-bold text-base text-grey-900">
                Founderstreet
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-grey-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto max-h-[calc(100vh-80px)]">
            <nav className="space-y-1">
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-grey-700 hover:text-primary hover:bg-grey-50 rounded-sm transition-colors"
              >
                Services
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    mobileServicesOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileServicesOpen && (
                <div className="ml-3 space-y-1 border-l-2 border-green-200 pl-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-grey-600 hover:text-primary hover:bg-grey-50 rounded-sm transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {service.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {[
                { name: "About", href: "/about" },
                { name: "Resources", href: "/resources" },
                { name: "Startup Health Check", href: "/startup-health-check" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-grey-700 hover:text-primary hover:bg-grey-50 rounded-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-border">
              <Link href="/contact" className="btn-primary w-full justify-center">
                Pitch Your Idea
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
