"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

type Footer = SiteContent["footer"];

export default function FooterSectionForm({ initial }: { initial: Footer }) {
  const [footer, setFooter] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ footer });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Footer</h1>
      <p className="admin-page-desc">Bottom of every page: company blurb, newsletter titles, and legal line.</p>

      <div className="admin-card">
        <p className="admin-card__title">Company block</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-brand">
            Name next to logo
          </label>
          <input
            id="f-brand"
            className="admin-input"
            value={footer.brandName}
            onChange={(e) => setFooter({ ...footer, brandName: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-desc">
            Short description
          </label>
          <textarea
            id="f-desc"
            className="admin-textarea"
            rows={3}
            value={footer.description}
            onChange={(e) => setFooter({ ...footer, description: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Newsletter</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-nt">
            Heading
          </label>
          <input
            id="f-nt"
            className="admin-input"
            value={footer.newsletterTitle}
            onChange={(e) => setFooter({ ...footer, newsletterTitle: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-ns">
            Supporting text
          </label>
          <textarea
            id="f-ns"
            className="admin-textarea"
            rows={2}
            value={footer.newsletterSubtitle}
            onChange={(e) => setFooter({ ...footer, newsletterSubtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Copyright</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-copy">
            Full copyright line
          </label>
          <p className="admin-hint">Use {"{year}"} where the current year should appear (e.g. © {"{year}"} My Company).</p>
          <input
            id="f-copy"
            className="admin-input"
            value={footer.copyrightTemplate}
            onChange={(e) => setFooter({ ...footer, copyrightTemplate: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        {msg && <span className="admin-msg--ok">{msg}</span>}
        {err && <span className="admin-msg--err">{err}</span>}
      </div>
    </form>
  );
}
