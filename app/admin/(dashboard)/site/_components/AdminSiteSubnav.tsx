"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string }[] = [
  { href: "/admin/site", label: "Overview" },
  { href: "/admin/site/navigation", label: "Navigation" },
  { href: "/admin/site/footer", label: "Footer" },
  { href: "/admin/site/home/hero", label: "Home — Hero" },
  { href: "/admin/site/home/services", label: "Home — Services" },
  { href: "/admin/site/home/partners", label: "Home — Partners" },
  { href: "/admin/site/home/founder-stories", label: "Home — Founder stories" },
  { href: "/admin/site/home/teaser", label: "Home — Article strip" },
  { href: "/admin/site/resources-page", label: "Resources page" },
  { href: "/admin/site/about", label: "About page" },
];

function active(href: string, path: string): boolean {
  if (href === "/admin/site") return path === "/admin/site";
  return path === href || path.startsWith(`${href}/`);
}

export default function AdminSiteSubnav() {
  const path = usePathname() || "";

  return (
    <nav className="admin-subnav" aria-label="Website content sections">
      {LINKS.map(({ href, label }) => (
        <Link key={href} href={href} data-active={active(href, path) ? "true" : "false"}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
