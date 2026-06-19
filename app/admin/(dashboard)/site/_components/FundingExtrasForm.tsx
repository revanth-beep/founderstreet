"use client";

import { useState } from "react";
import type { FundingCoreService, BeyondAlgorithmCard } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function FundingExtrasForm({
  initialCore,
  initialBeyond,
}: {
  initialCore: FundingCoreService[];
  initialBeyond: BeyondAlgorithmCard[];
}) {
  const [core, setCore] = useState(initialCore);
  const [beyond, setBeyond] = useState(initialBeyond);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { funding: { coreServices: core, beyondAlgorithm: beyond } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setCoreFn(i: number, k: keyof FundingCoreService, v: string | string[]) {
    const next = [...core];
    next[i] = { ...next[i], [k]: v } as FundingCoreService;
    setCore(next);
  }

  function setCoreDelivs(i: number, raw: string) {
    setCoreFn(i, "deliverables", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  function setBeyondFn(i: number, k: keyof BeyondAlgorithmCard, v: string) {
    const next = [...beyond];
    next[i] = { ...next[i], [k]: v };
    setBeyond(next);
  }

  return (
    <div>
      <form onSubmit={onSave}>
        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Core service cards</h2>
        {core.map((s, i) => (
          <div key={i} style={{ border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Service {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setCore(c => c.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. FileText, BarChart3, Users)</label>
                <input className="admin-input" value={s.iconName} onChange={e => setCoreFn(i, "iconName", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={s.title} onChange={e => setCoreFn(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={s.desc} onChange={e => setCoreFn(i, "desc", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Deliverables (one per line)</label>
              <textarea className="admin-textarea" rows={4} value={s.deliverables.join("\n")} onChange={e => setCoreDelivs(i, e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setCore(c => [...c, { iconName: "FileText", title: "", desc: "", deliverables: [] }])} style={{ marginBottom: "1.5rem" }}>+ Add service</button>

        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>Beyond the Algorithm cards</h2>
        {beyond.map((p, i) => (
          <div key={i} style={{ border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Card {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setBeyond(b => b.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. Search, Zap, Users, Target)</label>
                <input className="admin-input" value={p.iconName} onChange={e => setBeyondFn(i, "iconName", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={p.title} onChange={e => setBeyondFn(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={p.desc} onChange={e => setBeyondFn(i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setBeyond(b => [...b, { iconName: "Search", title: "", desc: "" }])} style={{ marginBottom: "1rem" }}>+ Add card</button>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save funding content"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
