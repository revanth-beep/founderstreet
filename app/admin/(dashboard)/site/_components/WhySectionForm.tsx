"use client";

import { useState } from "react";
import type { WhySectionCms, WhyReason, ComparisonRow } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function WhySectionForm({ initial }: { initial: WhySectionCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { why: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setReason(i: number, k: keyof WhyReason, v: string) {
    const reasons = [...data.reasons];
    reasons[i] = { ...reasons[i], [k]: v };
    setData(d => ({ ...d, reasons }));
  }

  function addReason() {
    setData(d => ({ ...d, reasons: [...d.reasons, { iconName: "ShieldCheck", title: "", desc: "" }] }));
  }

  function removeReason(i: number) {
    setData(d => ({ ...d, reasons: d.reasons.filter((_, j) => j !== i) }));
  }

  function setRow(i: number, k: keyof ComparisonRow, v: string) {
    const comparison = [...data.comparison];
    comparison[i] = { ...comparison[i], [k]: v };
    setData(d => ({ ...d, comparison }));
  }

  function addRow() {
    setData(d => ({ ...d, comparison: [...d.comparison, { label: "", them: "", us: "" }] }));
  }

  function removeRow(i: number) {
    setData(d => ({ ...d, comparison: d.comparison.filter((_, j) => j !== i) }));
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — Why Founderstreet</h1>
      <p className="admin-page-desc">Edit the reason cards and comparison table in the Why section.</p>

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
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={3} value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Reason cards (4 cards shown in 2x2 grid)</p>
        {data.reasons.map((r, i) => (
          <div key={i} style={{ borderBottom: i < data.reasons.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Card {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeReason(i)}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. ShieldCheck, Zap, Users2, Target)</label>
                <input className="admin-input" value={r.iconName} onChange={e => setReason(i, "iconName", e.target.value)} placeholder="ShieldCheck" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={r.title} onChange={e => setReason(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={r.desc} onChange={e => setReason(i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addReason}>+ Add reason card</button>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Comparison table rows</p>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Columns: Feature | Traditional CA | Founderstreet</p>
        {data.comparison.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Feature label</label>
              <input className="admin-input" value={row.label} onChange={e => setRow(i, "label", e.target.value)} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Traditional CA</label>
              <input className="admin-input" value={row.them} onChange={e => setRow(i, "them", e.target.value)} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Founderstreet</label>
              <input className="admin-input" value={row.us} onChange={e => setRow(i, "us", e.target.value)} />
            </div>
            <button type="button" className="admin-btn" style={{ marginBottom: "0.125rem" }} onClick={() => removeRow(i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addRow}>+ Add row</button>
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
