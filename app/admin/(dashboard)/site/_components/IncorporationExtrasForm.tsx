"use client";

import { useState } from "react";
import type { IncorporationStep, IncorporationBundle } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function IncorporationExtrasForm({
  initialSteps,
  initialBundles,
}: {
  initialSteps: IncorporationStep[];
  initialBundles: IncorporationBundle[];
}) {
  const [steps, setSteps] = useState(initialSteps);
  const [bundles, setBundles] = useState(initialBundles);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { incorporation: { steps, bundles } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setStep(i: number, k: keyof IncorporationStep, v: string) {
    const next = [...steps];
    next[i] = { ...next[i], [k]: v };
    setSteps(next);
  }

  function setBundle(i: number, k: keyof IncorporationBundle, v: string | string[]) {
    const next = [...bundles];
    next[i] = { ...next[i], [k]: v } as IncorporationBundle;
    setBundles(next);
  }

  function setBundleItems(i: number, raw: string) {
    setBundle(i, "items", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  return (
    <div>
      <form onSubmit={onSave}>
        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Process steps</h2>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Steps shown in the accordion on the incorporation page.</p>
        {steps.map((step, i) => (
          <div key={i} style={{ borderBottom: i < steps.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Step {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setSteps(s => s.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Step number (e.g. 01)</label>
                <input className="admin-input" value={step.step} onChange={e => setStep(i, "step", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Timeline (e.g. Day 1–2)</label>
                <input className="admin-input" value={step.time} onChange={e => setStep(i, "time", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Title</label>
              <input className="admin-input" value={step.title} onChange={e => setStep(i, "title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={step.desc} onChange={e => setStep(i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setSteps(s => [...s, { step: String(s.length + 1).padStart(2, "0"), title: "", desc: "", time: "" }])} style={{ marginBottom: "1.5rem" }}>+ Add step</button>

        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>Document bundles</h2>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>Three bundle cards shown below the steps section.</p>
        {bundles.map((bundle, i) => (
          <div key={i} style={{ borderBottom: i < bundles.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Bundle {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setBundles(b => b.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. FileText, Shield, Award)</label>
                <input className="admin-input" value={bundle.iconName} onChange={e => setBundle(i, "iconName", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={bundle.title} onChange={e => setBundle(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Items (one per line)</label>
              <textarea className="admin-textarea" rows={4} value={bundle.items.join("\n")} onChange={e => setBundleItems(i, e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setBundles(b => [...b, { iconName: "FileText", title: "", items: [] }])} style={{ marginBottom: "1rem" }}>+ Add bundle</button>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save steps & bundles"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
