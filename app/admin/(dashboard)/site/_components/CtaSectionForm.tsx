"use client";

import { useState } from "react";
import type { CtaSectionCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function CtaSectionForm({ initial }: { initial: CtaSectionCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { cta: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — CTA section</h1>
      <p className="admin-page-desc">Edit the full-width CTA banner at the bottom of the homepage.</p>

      <div className="admin-card">
        <p className="admin-card__title">Heading</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Heading (first part)</label>
            <input className="admin-input" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Heading italic (green, shown after first part)</label>
            <input className="admin-input" value={data.titleItalic} onChange={e => setData(d => ({ ...d, titleItalic: e.target.value }))} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={3} value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Small note below buttons</label>
          <input className="admin-input" value={data.note} onChange={e => setData(d => ({ ...d, note: e.target.value }))} />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Primary button</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Button label</label>
            <input className="admin-input" value={data.primaryLabel} onChange={e => setData(d => ({ ...d, primaryLabel: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Button href</label>
            <input className="admin-input" value={data.primaryHref} onChange={e => setData(d => ({ ...d, primaryHref: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Secondary button</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Button label</label>
            <input className="admin-input" value={data.secondaryLabel} onChange={e => setData(d => ({ ...d, secondaryLabel: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Button href</label>
            <input className="admin-input" value={data.secondaryHref} onChange={e => setData(d => ({ ...d, secondaryHref: e.target.value }))} />
          </div>
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
