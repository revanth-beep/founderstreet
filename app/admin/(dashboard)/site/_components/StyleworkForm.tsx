"use client";

import { useState } from "react";
import type { StyleworkCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function StyleworkForm({ initial }: { initial: StyleworkCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { stylework: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — Stylework / Ecosystem Perk</h1>
      <p className="admin-page-desc">Edit the co-working perk banner displayed after the Why section.</p>

      <div className="admin-card">
        <p className="admin-card__title">Banner content</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Eyebrow (green small label)</label>
            <input className="admin-input" value={data.eyebrow} onChange={e => setData(d => ({ ...d, eyebrow: e.target.value }))} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Title</label>
          <input className="admin-input" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea className="admin-textarea" rows={3} value={data.description} onChange={e => setData(d => ({ ...d, description: e.target.value }))} />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Button</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Button label</label>
            <input className="admin-input" value={data.buttonLabel} onChange={e => setData(d => ({ ...d, buttonLabel: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Button href</label>
            <input className="admin-input" value={data.href} onChange={e => setData(d => ({ ...d, href: e.target.value }))} />
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
