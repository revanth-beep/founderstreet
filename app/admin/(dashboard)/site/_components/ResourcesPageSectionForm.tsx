"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

type Rp = SiteContent["resourcesPage"];

export default function ResourcesPageSectionForm({ initial }: { initial: Rp }) {
  const [copy, setCopy] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ resourcesPage: copy });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Resources / blog listing page</h1>
      <p className="admin-page-desc">The top section of the page that lists all articles (not the articles themselves — use Blog posts).</p>

      <div className="admin-card">
        <p className="admin-card__title">Hero</p>
        <div className="admin-field">
          <label className="admin-label">Eyebrow (small green label)</label>
          <input
            className="admin-input"
            value={copy.eyebrow}
            onChange={(e) => setCopy({ ...copy, eyebrow: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Main title</label>
          <input
            className="admin-input"
            value={copy.title}
            onChange={(e) => setCopy({ ...copy, title: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Introduction</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={copy.subtitle}
            onChange={(e) => setCopy({ ...copy, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Stat row (three numbers)</p>
        <p className="admin-hint">The first number shows how many articles you have — it updates automatically. You only edit the labels here except “Readers” value.</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Label under article count</label>
            <input
              className="admin-input"
              value={copy.statArticlesLabel}
              onChange={(e) => setCopy({ ...copy, statArticlesLabel: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Middle number label</label>
            <p className="admin-hint">The middle number is fixed (categories) unless changed in code later.</p>
            <input
              className="admin-input"
              value={copy.statCategoriesLabel}
              onChange={(e) => setCopy({ ...copy, statCategoriesLabel: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Third stat — value (e.g. 10K+)</label>
            <input
              className="admin-input"
              value={copy.statReadersValue}
              onChange={(e) => setCopy({ ...copy, statReadersValue: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Third stat — label (e.g. Readers)</label>
            <input
              className="admin-input"
              value={copy.statReadersLabel}
              onChange={(e) => setCopy({ ...copy, statReadersLabel: e.target.value })}
            />
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
