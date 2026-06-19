"use client";

import { useState } from "react";
import type { HealthCheckBlockCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function HealthCheckBlockForm({ initial }: { initial: HealthCheckBlockCms }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ home: { healthCheckBlock: data } });
      setMsg("Saved. Page updates within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setBullet(i: number, v: string) {
    const bullets = [...data.bullets];
    bullets[i] = v;
    setData(d => ({ ...d, bullets }));
  }

  function addBullet() {
    setData(d => ({ ...d, bullets: [...d.bullets, ""] }));
  }

  function removeBullet(i: number) {
    setData(d => ({ ...d, bullets: d.bullets.filter((_, j) => j !== i) }));
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — Health Check Block</h1>
      <p className="admin-page-desc">Edit the "Test Your Idea" / SWOT section on the homepage.</p>

      <div className="admin-card">
        <p className="admin-card__title">Labels</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Eyebrow label</label>
            <input className="admin-input" value={data.eyebrow} onChange={e => setData(d => ({ ...d, eyebrow: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Badge text (e.g. Powered by AI)</label>
            <input className="admin-input" value={data.badge} onChange={e => setData(d => ({ ...d, badge: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Heading and copy</p>
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
          <label className="admin-label">Subtitle paragraph</label>
          <textarea className="admin-textarea" rows={3} value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Bullet points</p>
        {data.bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
            <input className="admin-input" style={{ flex: 1 }} value={b} onChange={e => setBullet(i, e.target.value)} />
            <button type="button" className="admin-btn" onClick={() => removeBullet(i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addBullet}>+ Add bullet</button>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">CTA button</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Button label</label>
            <input className="admin-input" value={data.buttonLabel} onChange={e => setData(d => ({ ...d, buttonLabel: e.target.value }))} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Button href</label>
            <input className="admin-input" value={data.buttonHref} onChange={e => setData(d => ({ ...d, buttonHref: e.target.value }))} />
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
