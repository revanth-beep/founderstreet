"use client";

import { useState } from "react";
import type { HomeFaqCms, HomeFaqItem } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function HomeFaqForm({ initial }: { initial: HomeFaqCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { faq: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setItem(i: number, k: keyof HomeFaqItem, v: string) {
    const items = [...data.items];
    items[i] = { ...items[i], [k]: v };
    setData(d => ({ ...d, items }));
  }

  function addItem() {
    setData(d => ({ ...d, items: [...d.items, { q: "", a: "" }] }));
  }

  function removeItem(i: number) {
    setData(d => ({ ...d, items: d.items.filter((_, j) => j !== i) }));
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — FAQ</h1>
      <p className="admin-page-desc">Edit the FAQ accordion shown at the bottom of the homepage.</p>

      <div className="admin-card">
        <p className="admin-card__title">Section header</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Eyebrow label</label>
            <input className="admin-input" value={data.eyebrow} onChange={e => setData(d => ({ ...d, eyebrow: e.target.value }))} />
          </div>
        </div>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Heading (first part)</label>
            <input className="admin-input" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Heading gradient (green text)</label>
            <input className="admin-input" value={data.titleGradient} onChange={e => setData(d => ({ ...d, titleGradient: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">FAQ items</p>
        {data.items.map((item, i) => (
          <div key={i} style={{ borderBottom: i < data.items.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Question {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeItem(i)}>Remove</button>
            </div>
            <div className="admin-field">
              <label className="admin-label">Question</label>
              <input className="admin-input" value={item.q} onChange={e => setItem(i, "q", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Answer</label>
              <textarea className="admin-textarea" rows={3} value={item.a} onChange={e => setItem(i, "a", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addItem}>+ Add FAQ item</button>
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
