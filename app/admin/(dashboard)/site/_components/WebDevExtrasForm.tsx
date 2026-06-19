"use client";

import { useState } from "react";
import type { WebDevServiceCard } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function WebDevExtrasForm({
  initialCards,
  initialTechStack,
}: {
  initialCards: WebDevServiceCard[];
  initialTechStack: string[];
}) {
  const [cards, setCards] = useState(initialCards);
  const [techStack, setTechStack] = useState(initialTechStack);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { webDevelopment: { serviceCards: cards, techStack } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setCard(i: number, k: keyof WebDevServiceCard, v: string | string[]) {
    const next = [...cards];
    next[i] = { ...next[i], [k]: v } as WebDevServiceCard;
    setCards(next);
  }

  function setFeatures(i: number, raw: string) {
    setCard(i, "features", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  return (
    <div>
      <form onSubmit={onSave}>
        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Service cards</h2>
        {cards.map((card, i) => (
          <div key={i} style={{ border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Card {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setCards(c => c.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. ShoppingCart, Globe, Palette, Smartphone)</label>
                <input className="admin-input" value={card.iconName} onChange={e => setCard(i, "iconName", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Number (e.g. 01)</label>
                <input className="admin-input" value={card.number} onChange={e => setCard(i, "number", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Title</label>
              <input className="admin-input" value={card.title} onChange={e => setCard(i, "title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={card.desc} onChange={e => setCard(i, "desc", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Features (one per line)</label>
              <textarea className="admin-textarea" rows={4} value={card.features.join("\n")} onChange={e => setFeatures(i, e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setCards(c => [...c, { iconName: "Code2", number: String(c.length + 1).padStart(2, "0"), title: "", desc: "", features: [] }])} style={{ marginBottom: "1.5rem" }}>+ Add card</button>

        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>Tech stack</h2>
        <p className="admin-hint" style={{ marginBottom: "0.5rem" }}>Comma-separated or one per line.</p>
        <div className="admin-field">
          <label className="admin-label">Technologies (one per line)</label>
          <textarea
            className="admin-textarea"
            rows={6}
            value={techStack.join("\n")}
            onChange={e => setTechStack(e.target.value.split("\n").map(s => s.trim()).filter(Boolean))}
          />
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save web dev content"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
