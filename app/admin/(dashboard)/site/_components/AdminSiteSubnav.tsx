"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; group?: string }[] = [
  { href: "/admin/site", label: "Overview" },
  // Global
  { href: "/admin/site/navigation", label: "Navigation & Logo", group: "Global" },
  { href: "/admin/site/footer", label: "Footer & Social", group: "Global" },
  // Home
  { href: "/admin/site/home/hero", label: "Home — Hero", group: "Home" },
  { href: "/admin/site/home/services", label: "Home — Services", group: "Home" },
  { href: "/admin/site/home/partners", label: "Home — Partners", group: "Home" },
  { href: "/admin/site/home/founder-stories", label: "Home — Founder stories", group: "Home" },
  { href: "/admin/site/home/teaser", label: "Home — Article strip", group: "Home" },
  // Service pages
  { href: "/admin/site/services/validation", label: "Service — Validation", group: "Service pages" },
  { href: "/admin/site/services/incorporation", label: "Service — Incorporation", group: "Service pages" },
  { href: "/admin/site/services/accounting", label: "Service — Accounting", group: "Service pages" },
  { href: "/admin/site/services/marketing", label: "Service — Marketing", group: "Service pages" },
  { href: "/admin/site/services/web-development", label: "Service — Web Dev", group: "Service pages" },
  { href: "/admin/site/services/funding", label: "Service — Funding", group: "Service pages" },
  // Other pages
  { href: "/admin/site/contact", label: "Contact page", group: "Other pages" },
  { href: "/admin/site/about", label: "About page", group: "Other pages" },
  { href: "/admin/site/team", label: "Team page", group: "Other pages" },
  { href: "/admin/site/resources-page", label: "Resources page", group: "Other pages" },
];

function active(href: string, path: string): boolean {
  if (href === "/admin/site") return path === "/admin/site";
  return path === href || path.startsWith(`${href}/`);
}

export default function AdminSiteSubnav() {
  const path = usePathname() || "";
  let lastGroup = "";

  return (
    <nav className="admin-subnav" aria-label="Website content sections">
      {LINKS.map(({ href, label, group }) => {
        const showGroup = group && group !== lastGroup;
        if (showGroup) lastGroup = group!;
        return (
          <div key={href}>
            {showGroup && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.5625rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                padding: "0.75rem 1rem 0.25rem",
                margin: 0,
              }}>
                {group}
              </p>
            )}
            <Link href={href} data-active={active(href, path) ? "true" : "false"}>
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
