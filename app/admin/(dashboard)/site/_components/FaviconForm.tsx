"use client";

import { useState } from "react";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

export default function FaviconForm({ initial }: { initial: string }) {
  const [favicon, setFavicon] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ favicon });
      setMsg("Saved. The new favicon will appear after the next page reload.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Favicon</h1>
      <p className="admin-page-desc">
        The small icon shown in browser tabs and bookmarks. Upload a square image (PNG, ICO, or SVG) ideally 32x32 or 64x64 pixels. Leave empty to use the default favicon.ico file.
      </p>

      <div className="admin-card">
        <AdminImageUploadField
          id="favicon-url"
          label="Favicon image"
          hint="Upload a square PNG/ICO/SVG (32×32 or 64×64 px recommended). The browser tab will update after saving and refreshing."
          value={favicon}
          onChange={setFavicon}
        />
        {favicon && (
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="admin-hint" style={{ margin: 0 }}>Preview:</span>
            <img src={favicon} alt="Favicon preview" style={{ width: 32, height: 32, objectFit: "contain", border: "1px solid #e5e7eb", borderRadius: 4, padding: 2 }} />
          </div>
        )}
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
