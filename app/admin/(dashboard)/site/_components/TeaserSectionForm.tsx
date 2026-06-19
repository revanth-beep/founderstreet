"use client";

import { useState } from "react";
import type { ResourcesTeaserCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function TeaserSectionForm({ initial }: { initial: ResourcesTeaserCms }) {
  const [teaser, setTeaser] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ home: { resourcesTeaser: teaser } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home: article preview strip</h1>
      <p className="admin-page-desc">
        The section that shows a few blog posts. Posts are chosen automatically from your published articles.
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Text</p>
        <div className="admin-field">
          <label className="admin-label">Small label (with book icon)</label>
          <input
            className="admin-input"
            value={teaser.eyebrow}
            onChange={(e) => setTeaser({ ...teaser, eyebrow: e.target.value })}
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Heading: before green word</label>
            <input
              className="admin-input"
              value={teaser.titleBefore}
              onChange={(e) => setTeaser({ ...teaser, titleBefore: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Heading: green word</label>
            <input
              className="admin-input"
              value={teaser.titleGradient}
              onChange={(e) => setTeaser({ ...teaser, titleGradient: e.target.value })}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">View all link text</label>
          <input
            className="admin-input"
            value={teaser.viewAllLabel}
            onChange={(e) => setTeaser({ ...teaser, viewAllLabel: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Articles to show on home page</label>
          <p className="admin-hint">How many published articles appear in the preview strip (3 to 6).</p>
          <select
            className="admin-select"
            value={teaser.maxPosts || 3}
            onChange={(e) => setTeaser({ ...teaser, maxPosts: Number(e.target.value) })}
          >
            {[3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} articles</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
        {msg && <span className="admin-msg--ok">{msg}</span>}
        {err && <span className="admin-msg--err">{err}</span>}
      </div>
    </form>
  );
}
