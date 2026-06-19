"use client";

import { useState } from "react";
import type { ValidationDeliverable } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function ValidationExtrasForm({ initial }: { initial: ValidationDeliverable[] }) {
  const [items, setItems] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { validation: { deliverables: items } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setField(i: number, k: keyof ValidationDeliverable, v: string | string[]) {
    const next = [...items];
    next[i] = { ...next[i], [k]: v } as ValidationDeliverable;
    setItems(next);
  }

  function setPoints(i: number, raw: string) {
    setField(i, "points", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  function addItem() {
    setItems(p => [...p, { iconName: "BarChart3", title: "", desc: "", points: [] }]);
  }

  function removeItem(i: number) {
    setItems(p => p.filter((_, j) => j !== i));
  }

  return (
    <div>
      <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Deliverables section</h2>
      <p className="admin-hint" style={{ marginBottom: "1rem" }}>Three deliverable cards shown below the hero on the validation service page.</p>
      <form onSubmit={onSave}>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Deliverable {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeItem(i)}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. BarChart3, Target, TrendingUp)</label>
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
              <label className="admin-label">Bullet points (one per line)</label>
              <textarea className="admin-textarea" rows={3} value={item.points.join("\n")} onChange={e => setPoints(i, e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addItem} style={{ marginBottom: "1rem" }}>+ Add deliverable</button>
        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save deliverables"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
