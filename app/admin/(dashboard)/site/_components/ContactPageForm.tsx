"use client";

import { useState } from "react";
import type { ContactPageCms, ContactDetailCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function ContactPageForm({ initial }: { initial: ContactPageCms }) {
  const [data, setData] = useState<ContactPageCms>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ contactPage: data });
      setMsg("Saved. Page will update within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setDetail(i: number, k: keyof ContactDetailCms, v: string) {
    const details = [...data.details];
    details[i] = { ...details[i], [k]: v };
    setData(d => ({ ...d, details }));
  }

  function addDetail() {
    setData(d => ({ ...d, details: [...d.details, { label: "", value: "", href: "" }] }));
  }

  function removeDetail(i: number) {
    setData(d => ({ ...d, details: d.details.filter((_, j) => j !== i) }));
  }

  function setFaqQ(i: number, v: string) {
    const faqQuestions = [...data.faqQuestions];
    faqQuestions[i] = v;
    setData(d => ({ ...d, faqQuestions }));
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Contact page</h1>
      <p className="admin-page-desc">Edit the hero, contact details, social links, and response badge on /contact.</p>

      {/* Meta */}
      <div className="admin-card">
        <p className="admin-card__title">Page meta (SEO)</p>
        <div className="admin-field">
          <label className="admin-label">Page title</label>
          <input className="admin-input" value={data.meta.title}
            onChange={e => setData(d => ({ ...d, meta: { ...d.meta, title: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Meta description</label>
          <textarea className="admin-textarea" rows={2} value={data.meta.description}
            onChange={e => setData(d => ({ ...d, meta: { ...d.meta, description: e.target.value } }))} />
        </div>
      </div>

      {/* Hero */}
      <div className="admin-card">
        <p className="admin-card__title">Hero section</p>
        <div className="admin-field">
          <label className="admin-label">Eyebrow label</label>
          <input className="admin-input" value={data.hero.eyebrow}
            onChange={e => setData(d => ({ ...d, hero: { ...d.hero, eyebrow: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Heading</label>
          <input className="admin-input" value={data.hero.title}
            onChange={e => setData(d => ({ ...d, hero: { ...d.hero, title: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={3} value={data.hero.subtitle}
            onChange={e => setData(d => ({ ...d, hero: { ...d.hero, subtitle: e.target.value } }))} />
        </div>
      </div>

      {/* Contact details */}
      <div className="admin-card">
        <p className="admin-card__title">Contact details</p>
        <p className="admin-hint">Label values: Email, Phone, Office, Hours — used to pick the icon automatically.</p>
        {data.details.map((item, i) => (
          <div key={i} style={{ borderBottom: i < data.details.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Item {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeDetail(i)}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Label (e.g. Email)</label>
                <input className="admin-input" value={item.label} onChange={e => setDetail(i, "label", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Value (displayed text)</label>
                <input className="admin-input" value={item.value} onChange={e => setDetail(i, "value", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Link href (e.g. mailto:..., tel:... — leave blank if not a link)</label>
              <input className="admin-input" value={item.href} onChange={e => setDetail(i, "href", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addDetail}>+ Add contact item</button>
      </div>

      {/* Social links */}
      <div className="admin-card">
        <p className="admin-card__title">Social media links</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">LinkedIn URL</label>
            <input className="admin-input" value={data.socialLinks.linkedin}
              onChange={e => setData(d => ({ ...d, socialLinks: { ...d.socialLinks, linkedin: e.target.value } }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Twitter / X URL</label>
            <input className="admin-input" value={data.socialLinks.twitter}
              onChange={e => setData(d => ({ ...d, socialLinks: { ...d.socialLinks, twitter: e.target.value } }))} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Instagram URL</label>
          <input className="admin-input" value={data.socialLinks.instagram}
            onChange={e => setData(d => ({ ...d, socialLinks: { ...d.socialLinks, instagram: e.target.value } }))} />
        </div>
      </div>

      {/* Response badge */}
      <div className="admin-card">
        <p className="admin-card__title">Response time badge</p>
        <div className="admin-field">
          <label className="admin-label">Title</label>
          <input className="admin-input" value={data.responseBadge.title}
            onChange={e => setData(d => ({ ...d, responseBadge: { ...d.responseBadge, title: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={2} value={data.responseBadge.subtitle}
            onChange={e => setData(d => ({ ...d, responseBadge: { ...d.responseBadge, subtitle: e.target.value } }))} />
        </div>
      </div>

      {/* FAQ questions */}
      <div className="admin-card">
        <p className="admin-card__title">Common questions sidebar</p>
        {data.faqQuestions.map((q, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input className="admin-input" value={q} onChange={e => setFaqQ(i, e.target.value)} style={{ flex: 1 }} />
            <button type="button" className="admin-btn" onClick={() => setData(d => ({ ...d, faqQuestions: d.faqQuestions.filter((_, j) => j !== i) }))}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setData(d => ({ ...d, faqQuestions: [...d.faqQuestions, ""] }))}>+ Add question</button>
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
