"use client";

import { useState } from "react";
import type { ProcessSectionCms, ProcessStep } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function ProcessSectionForm({ initial }: { initial: ProcessSectionCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { process: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setStep(i: number, k: keyof ProcessStep, v: string) {
    const steps = [...data.steps];
    steps[i] = { ...steps[i], [k]: v };
    setData(d => ({ ...d, steps }));
  }

  function addStep() {
    setData(d => ({ ...d, steps: [...d.steps, { iconName: "Lightbulb", step: String(d.steps.length + 1).padStart(2, "0"), title: "", desc: "", duration: "" }] }));
  }

  function removeStep(i: number) {
    setData(d => ({ ...d, steps: d.steps.filter((_, j) => j !== i) }));
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — Process</h1>
      <p className="admin-page-desc">Edit the process section heading and step cards.</p>

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
        <p className="admin-card__title">Process steps</p>
        {data.steps.map((step, i) => (
          <div key={i} style={{ borderBottom: i < data.steps.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Step {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeStep(i)}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. Lightbulb, Rocket, BarChart3, Users)</label>
                <input className="admin-input" value={step.iconName} onChange={e => setStep(i, "iconName", e.target.value)} placeholder="Lightbulb" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Step number (e.g. 01)</label>
                <input className="admin-input" value={step.step} onChange={e => setStep(i, "step", e.target.value)} />
              </div>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={step.title} onChange={e => setStep(i, "title", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Duration (e.g. Week 1–2)</label>
                <input className="admin-input" value={step.duration} onChange={e => setStep(i, "duration", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={step.desc} onChange={e => setStep(i, "desc", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addStep}>+ Add step</button>
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
