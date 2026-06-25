"use client";

import { useState } from "react";
import type { AccountingServiceCard } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function BookkeepingExtrasForm({ initial }: { initial: AccountingServiceCard[] }) {
  const [items, setItems] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { bookkeeping: { serviceCards: items } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setField(i: number, k: keyof AccountingServiceCard, v: string | string[]) {
    const next = [...items];
    next[i] = { ...next[i], [k]: v } as AccountingServiceCard;
    setItems(next);
  }

  function setFeatures(i: number, raw: string) {
    setField(i, "features", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  return (
    <div>
      <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Service cards</h2>
      <p className="admin-hint" style={{ marginBottom: "1rem" }}>Service cards shown in the grid on the book-keeping &amp; taxation page.</p>
      <form onSubmit={onSave}>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Card {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setItems(p => p.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. BookOpen, Receipt, FileText, PieChart)</label>
                <input className="admin-input" value={item.iconName} onChange={e => setField(i, "iconName", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={item.title} onChange={e => setField(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={item.desc} onChange={e => setField(i, "desc", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Features (one per line)</label>
              <textarea className="admin-textarea" rows={4} value={item.features.join("\n")} onChange={e => setFeatures(i, e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setItems(p => [...p, { iconName: "BookOpen", title: "", desc: "", features: [] }])} style={{ marginBottom: "1rem" }}>+ Add card</button>
        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save service cards"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
