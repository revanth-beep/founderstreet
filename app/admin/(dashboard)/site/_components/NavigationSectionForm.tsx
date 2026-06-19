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
          hint="Displayed in the top-left of every page at all times."
          value={nav.logoUrl ?? ""}
          onChange={(url) => setNav({ ...nav, logoUrl: url })}
        />
        <div className="admin-field">
          <label className="admin-label" htmlFor="logoSize">Logo size: {nav.logoSize || 44}px</label>
          <p className="admin-hint">Drag to resize the logo in the navbar (32 – 80 px).</p>
          <input
            id="logoSize"
            type="range"
            min={32}
            max={80}
            step={2}
            value={nav.logoSize || 44}
            onChange={(e) => setNav({ ...nav, logoSize: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "#66BB3F" }}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="logoTagline">Tagline below logo (optional)</label>
          <p className="admin-hint">Short line shown below the logo image and above the subsidiary text. Leave blank to hide.</p>
          <input id="logoTagline" className="admin-input" value={nav.logoTagline ?? ""} placeholder="e.g. India's Startup Platform" onChange={(e) => setNav({ ...nav, logoTagline: e.target.value })} />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="brandName">Site name (next to logo)</label>
          <input id="brandName" className="admin-input" value={nav.brandName} onChange={(e) => setNav({ ...nav, brandName: e.target.value })} />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="subsidiaryText">Subsidiary line (shown beneath tagline)</label>
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

      <div className="admin-card">
        <p className="admin-card__title">Services dropdown — menu items</p>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Items shown in the Services dropdown menu. The icon is auto-assigned by URL pattern.</p>
        {(nav.services ?? []).map((svc, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Name</label>
              <input className="admin-input" value={svc.name} onChange={e => {
                const services = [...(nav.services ?? [])];
                services[i] = { ...services[i], name: e.target.value };
                setNav({ ...nav, services });
              }} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Href</label>
              <input className="admin-input" value={svc.href} onChange={e => {
                const services = [...(nav.services ?? [])];
                services[i] = { ...services[i], href: e.target.value };
                setNav({ ...nav, services });
              }} />
            </div>
            <div className="admin-field" style={{ flex: 2, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Description</label>
              <input className="admin-input" value={svc.desc} onChange={e => {
                const services = [...(nav.services ?? [])];
                services[i] = { ...services[i], desc: e.target.value };
                setNav({ ...nav, services });
              }} />
            </div>
            <button type="button" className="admin-btn" style={{ marginBottom: "0.125rem" }} onClick={() => {
              setNav({ ...nav, services: (nav.services ?? []).filter((_, j) => j !== i) });
            }}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setNav({ ...nav, services: [...(nav.services ?? []), { name: "", href: "", desc: "" }] })}>+ Add service item</button>
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
