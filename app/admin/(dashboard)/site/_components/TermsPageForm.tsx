"use client";

import { useState } from "react";
import type { LegalPageCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function TermsPageForm({ initial }: { initial: LegalPageCms }) {
  const [page, setPage] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function updateSection(i: number, field: "heading" | "body", value: string) {
    const sections = [...page.sections];
    sections[i] = { ...sections[i], [field]: value };
    setPage({ ...page, sections });
  }

  function addSection() {
    setPage({ ...page, sections: [...page.sections, { heading: "", body: "" }] });
  }

  function removeSection(i: number) {
    setPage({ ...page, sections: page.sections.filter((_, j) => j !== i) });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ termsPage: page });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Terms of Service page</h1>
      <p className="admin-page-desc">
        Edit the content of the /terms page. Each section has an optional heading and a body paragraph. Leave a heading blank to render the paragraph without a heading (useful for the intro).
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Page details</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tos-updated">Last updated date</label>
          <p className="admin-hint">Shown below the page title. Example: April 2025</p>
          <input
            id="tos-updated"
            className="admin-input"
            value={page.lastUpdated}
            onChange={(e) => setPage({ ...page, lastUpdated: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Sections</p>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>
          Each section renders as an optional heading followed by a paragraph. Email addresses in the body are automatically turned into mailto links.
        </p>
        {page.sections.map((section, i) => (
          <div key={i} style={{ borderTop: i > 0 ? "1px solid #e5e7eb" : "none", paddingTop: i > 0 ? "1rem" : 0, marginTop: i > 0 ? "1rem" : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="admin-label" style={{ margin: 0 }}>Section {i + 1}</span>
              <button type="button" className="admin-btn" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }} onClick={() => removeSection(i)}>Remove</button>
            </div>
            <div className="admin-field">
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Heading (leave blank for intro paragraph)</label>
              <input
                className="admin-input"
                value={section.heading}
                placeholder="e.g. Services"
                onChange={(e) => updateSection(i, "heading", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Body text</label>
              <textarea
                className="admin-textarea"
                rows={4}
                value={section.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" style={{ marginTop: "1rem" }} onClick={addSection}>
          + Add section
        </button>
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
