import type { Metadata } from "next";
import "./admin-panel.css";

export const metadata: Metadata = {
  title: { default: "CMS Admin", template: "%s | Founderstreet Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
