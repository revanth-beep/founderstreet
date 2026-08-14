"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, FileText, LogOut, Globe, Inbox, KeyRound } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-sidenav">
      <div className="admin-sidenav__brand">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "#fff" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#66BB3F",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 800, fontSize: 11 }}>FS</span>
          </div>
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.9rem" }}>Admin</span>
        </Link>
      </div>

      <nav className="admin-sidenav__nav">
        {[
          { icon: LayoutDashboard, name: "Dashboard", href: "/admin" },
          { icon: Inbox, name: "Contact form", href: "/admin/contact-submissions" },
          { icon: FileText, name: "Blog posts", href: "/admin/posts" },
          { icon: Globe, name: "Website pages", href: "/admin/site" },
          { icon: KeyRound, name: "Settings & Keys", href: "/admin/settings" },
        ].map(({ icon: Icon, name, href }) => (
          <Link key={href} href={href} className="admin-sidenav__link">
            <Icon style={{ width: 17, height: 17, opacity: 0.9 }} />
            {name}
          </Link>
        ))}
      </nav>

      <div className="admin-sidenav__footer">
        <Link href="/" className="admin-sidenav__link" style={{ marginBottom: 4 }}>
          ← Back to website
        </Link>
        <button type="button" onClick={handleLogout} className="admin-sidenav__btn">
          <LogOut style={{ width: 17, height: 17 }} />
          Log out
        </button>
      </div>
    </aside>
  );
}
