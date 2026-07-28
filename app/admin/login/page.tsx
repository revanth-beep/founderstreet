"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <Link href="/" className="admin-login-back">
        ← Back to site
      </Link>
      <div className="admin-login-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/logo-color.png"
          alt="FounderStreet"
          style={{ height: "80px", width: "auto", display: "block", margin: "0 auto 1.25rem" }}
        />
        <h1 className="admin-login-card__title">FounderStreet CMS</h1>
        <p className="admin-login-card__lead">Sign in with your admin password.</p>
        <form onSubmit={onSubmit}>
          <div className="admin-field">
            <label className="admin-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          {error ? <p className="admin-msg--err admin-field">{error}</p> : null}
          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary" style={{ width: "100%" }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : null}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        {process.env.NODE_ENV === "development" ? (
          <p className="admin-login-card__devhint">
            Dev: default password is <code>dev</code> if ADMIN_PASSWORD is unset.
          </p>
        ) : null}
      </div>
    </div>
  );
}
