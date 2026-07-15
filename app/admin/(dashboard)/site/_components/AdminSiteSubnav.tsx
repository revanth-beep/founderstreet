"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem =
  | { type: "group"; label: string }
  | { type: "link"; href: string; label: string };

const ITEMS: NavItem[] = [
  { type: "link", href: "/admin/site", label: "Overview" },
  // Global
  { type: "group", label: "Global" },
  { type: "link", href: "/admin/site/navigation", label: "Navigation & Logo" },
  { type: "link", href: "/admin/site/footer", label: "Footer & Social" },
  // Home
  { type: "group", label: "Home" },
  { type: "link", href: "/admin/site/home/hero", label: "Hero" },
  { type: "link", href: "/admin/site/home/services", label: "Services" },
  { type: "link", href: "/admin/site/home/health-check-block", label: "Health Check Block" },
  { type: "link", href: "/admin/site/home/why", label: "Why Founderstreet" },
  { type: "link", href: "/admin/site/home/stylework", label: "Stylework Perk" },
  { type: "link", href: "/admin/site/home/hire-talent-perk", label: "Hire Talent Perk" },
  { type: "link", href: "/admin/site/home/process", label: "Process" },
  { type: "link", href: "/admin/site/home/partners", label: "Partners" },
  { type: "link", href: "/admin/site/home/founder-stories", label: "Founder stories" },
  { type: "link", href: "/admin/site/home/teaser", label: "Article strip" },
  { type: "link", href: "/admin/site/home/faq", label: "Home FAQ" },
  { type: "link", href: "/admin/site/home/cta", label: "CTA section" },
  // Service pages
  { type: "group", label: "Service pages" },
  { type: "link", href: "/admin/site/services/validation", label: "Validation" },
  { type: "link", href: "/admin/site/services/incorporation", label: "Incorporation" },
  { type: "link", href: "/admin/site/services/accounting", label: "Accounting" },
  { type: "link", href: "/admin/site/services/bookkeeping", label: "Book-keeping & Tax" },
  { type: "link", href: "/admin/site/services/marketing", label: "Marketing" },
  { type: "link", href: "/admin/site/services/web-development", label: "Web Dev" },
  { type: "link", href: "/admin/site/services/funding", label: "Funding" },
  { type: "link", href: "/admin/site/services/pitch-deck", label: "Pitch Deck & Valuation" },
  // Other pages
  { type: "group", label: "Other pages" },
  { type: "link", href: "/admin/site/contact", label: "Contact" },
  { type: "link", href: "/admin/site/about", label: "About" },
  { type: "link", href: "/admin/site/team", label: "Team" },
  { type: "link", href: "/admin/site/resources-page", label: "Resources" },
];

function active(href: string, path: string): boolean {
  if (href === "/admin/site") return path === "/admin/site";
  return path === href || path.startsWith(`${href}/`);
}

export default function AdminSiteSubnav() {
  const path = usePathname() || "";

  return (
    <nav className="admin-subnav" aria-label="Website content sections">
      {ITEMS.map((item, i) => {
        if (item.type === "group") {
          return (
            <span
              key={`g-${i}`}
              style={{
                display: "block",
                width: "100%",
                flexBasis: "100%",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.5625rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#A0A0A0",
                marginTop: i === 0 ? 0 : "0.25rem",
                marginBottom: "0.1rem",
              }}
            >
              {item.label}
            </span>
          );
        }
        return (
          <Link key={item.href} href={item.href} data-active={active(item.href, path) ? "true" : "false"}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
