"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [key, setKey] = useState("");
  const [masked, setMasked] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((d) => { setIsSet(!!d.geminiSet); setMasked(d.geminiMasked || ""); })
      .catch(() => {});
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geminiApiKey: key }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setErr(typeof d.error === "string" ? d.error : "Could not save."); return; }
      setMsg("Saved. The AI Pitch Deck tool is now active.");
      setIsSet(true);
      setMasked(`${key.slice(0, 6)}…${key.slice(-4)}`);
      setKey("");
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <h1 className="admin-page-title">Settings & API Keys</h1>
      <p className="admin-page-desc">Keys entered here are stored securely in your database and are never shown on the website.</p>

      <div className="admin-card">
        <h2 className="admin-card__title" style={{ marginBottom: "0.35rem" }}>Gemini API Key</h2>
        <p className="admin-hint" style={{ marginBottom: "1rem" }}>
          Powers the AI Pitch Deck generator. Get a free key at aistudio.google.com/apikey.
          {isSet && <> Current key on file: <strong>{masked}</strong>.</>}
        </p>
        <form onSubmit={save}>
          <div className="admin-field">
            <label className="admin-label">{isSet ? "Replace API key" : "Paste your Gemini API key"}</label>
            <input
              className="admin-input"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AQ.… or AIza…"
              autoComplete="off"
            />
          </div>
          <div className="admin-actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving || !key.trim()}>
              {saving ? "Saving…" : "Save key"}
            </button>
            {msg && <span className="admin-msg--ok">{msg}</span>}
            {err && <span className="admin-msg--err">{err}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
