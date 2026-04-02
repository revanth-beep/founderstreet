import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FileText, LogOut, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: { default: "CMS Admin", template: "%s | Founderstreet Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-grey-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-grey-950 flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-grey-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs font-serif">FS</span>
            </div>
            <span className="font-serif font-bold text-white text-sm">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { icon: LayoutDashboard, name: "Dashboard", href: "/admin" },
            { icon: FileText, name: "Blog Posts", href: "/admin/posts" },
            { icon: Settings, name: "Settings", href: "/admin/settings" },
          ].map(({ icon: Icon, name, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 text-grey-400 hover:text-white hover:bg-grey-800 rounded-sm text-sm transition-colors"
            >
              <Icon className="w-4 h-4" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-grey-800">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-grey-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
