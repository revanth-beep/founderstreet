"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

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
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Logo is shared with the navbar. Upload it under <strong>Navigation &amp; Logo</strong>.</p>
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
          <label className="admin-label" htmlFor="f-subsidiary">
            Subsidiary line (shown beneath name)
          </label>
          <input
            id="f-subsidiary"
            className="admin-input"
            value={footer.subsidiaryText}
            onChange={(e) => setFooter({ ...footer, subsidiaryText: e.target.value })}
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
        <p className="admin-card__title">Social media links</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label" htmlFor="f-li">LinkedIn URL</label>
            <input id="f-li" className="admin-input" value={footer.socialLinks?.linkedin ?? ""}
              onChange={(e) => setFooter({ ...footer, socialLinks: { ...(footer.socialLinks ?? { linkedin: "", twitter: "", instagram: "" }), linkedin: e.target.value } })} />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="f-tw">Twitter / X URL</label>
            <input id="f-tw" className="admin-input" value={footer.socialLinks?.twitter ?? ""}
              onChange={(e) => setFooter({ ...footer, socialLinks: { ...(footer.socialLinks ?? { linkedin: "", twitter: "", instagram: "" }), twitter: e.target.value } })} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="f-ig">Instagram URL</label>
          <input id="f-ig" className="admin-input" value={footer.socialLinks?.instagram ?? ""}
            onChange={(e) => setFooter({ ...footer, socialLinks: { ...(footer.socialLinks ?? { linkedin: "", twitter: "", instagram: "" }), instagram: e.target.value } })} />
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

      <div className="admin-card">
        <p className="admin-card__title">Core Services links</p>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Links shown in the footer under "Core Services".</p>
        {(footer.serviceLinks ?? []).map((link, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Name</label>
              <input className="admin-input" value={link.name} onChange={e => {
                const serviceLinks = [...(footer.serviceLinks ?? [])];
                serviceLinks[i] = { ...serviceLinks[i], name: e.target.value };
                setFooter({ ...footer, serviceLinks });
              }} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Href</label>
              <input className="admin-input" value={link.href} onChange={e => {
                const serviceLinks = [...(footer.serviceLinks ?? [])];
                serviceLinks[i] = { ...serviceLinks[i], href: e.target.value };
                setFooter({ ...footer, serviceLinks });
              }} />
            </div>
            <button type="button" className="admin-btn" style={{ marginBottom: "0.125rem" }} onClick={() => setFooter({ ...footer, serviceLinks: (footer.serviceLinks ?? []).filter((_, j) => j !== i) })}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setFooter({ ...footer, serviceLinks: [...(footer.serviceLinks ?? []), { name: "", href: "" }] })}>+ Add link</button>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Company links</p>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Links shown in the footer under "Company".</p>
        {(footer.companyLinks ?? []).map((link, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Name</label>
              <input className="admin-input" value={link.name} onChange={e => {
                const companyLinks = [...(footer.companyLinks ?? [])];
                companyLinks[i] = { ...companyLinks[i], name: e.target.value };
                setFooter({ ...footer, companyLinks });
              }} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Href</label>
              <input className="admin-input" value={link.href} onChange={e => {
                const companyLinks = [...(footer.companyLinks ?? [])];
                companyLinks[i] = { ...companyLinks[i], href: e.target.value };
                setFooter({ ...footer, companyLinks });
              }} />
            </div>
            <button type="button" className="admin-btn" style={{ marginBottom: "0.125rem" }} onClick={() => setFooter({ ...footer, companyLinks: (footer.companyLinks ?? []).filter((_, j) => j !== i) })}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setFooter({ ...footer, companyLinks: [...(footer.companyLinks ?? []), { name: "", href: "" }] })}>+ Add link</button>
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
