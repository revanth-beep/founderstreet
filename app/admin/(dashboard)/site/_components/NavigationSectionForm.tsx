"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

type Nav = SiteContent["nav"];

export default function NavigationSectionForm({ initial }: { initial: Nav }) {
  const [nav, setNav] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ nav });
      setMsg("Saved. Visitors will see this in the top bar and menus.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Top navigation</h1>
      <p className="admin-page-desc">Text that appears in the site header, service menu, and mobile menu.</p>

      <div className="admin-card">
        <p className="admin-card__title">Brand &amp; shortcuts</p>
        <AdminImageUploadField
          id="nav-logo"
          label="Logo image (navbar)"
          hint="Displayed in the top-left of every page. Upload to Vercel Blob or paste a URL."
          value={nav.logoUrl ?? ""}
          onChange={(url) => setNav({ ...nav, logoUrl: url })}
        />
        <div className="admin-field">
          <label className="admin-label" htmlFor="brandName">Site name (next to logo)</label>
          <input id="brandName" className="admin-input" value={nav.brandName} onChange={(e) => setNav({ ...nav, brandName: e.target.value })} />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="subsidiaryText">Subsidiary line (shown beneath site name)</label>
          <input id="subsidiaryText" className="admin-input" value={nav.subsidiaryText} onChange={(e) => setNav({ ...nav, subsidiaryText: e.target.value })} />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="healthCtaShort">Short CTA label (desktop header)</label>
          <p className="admin-hint">e.g. &ldquo;Test Your Idea&rdquo; — shown next to the main contact button.</p>
          <input id="healthCtaShort" className="admin-input" value={nav.healthCtaShort} onChange={(e) => setNav({ ...nav, healthCtaShort: e.target.value })} />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Contact &amp; WhatsApp</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label" htmlFor="phone">Phone number (shown in navbar)</label>
            <p className="admin-hint">Displayed next to the WhatsApp button on desktop.</p>
            <input id="phone" className="admin-input" value={nav.phone ?? ""} onChange={(e) => setNav({ ...nav, phone: e.target.value })} placeholder="+91 98765 43210" />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="whatsappUrl">WhatsApp link (wa.me URL)</label>
            <p className="admin-hint">e.g. https://wa.me/919876543210</p>
            <input id="whatsappUrl" className="admin-input" value={nav.whatsappUrl ?? ""} onChange={(e) => setNav({ ...nav, whatsappUrl: e.target.value })} placeholder="https://wa.me/91XXXXXXXXXX" />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Services dropdown — promo box</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="healthPromoTitle">Promo title</label>
          <input id="healthPromoTitle" className="admin-input" value={nav.healthPromoTitle} onChange={(e) => setNav({ ...nav, healthPromoTitle: e.target.value })} />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="healthPromoSubtitle">Promo description</label>
          <textarea id="healthPromoSubtitle" className="admin-textarea" rows={2} value={nav.healthPromoSubtitle} onChange={(e) => setNav({ ...nav, healthPromoSubtitle: e.target.value })} />
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
