"use client";

import { useState } from "react";
import type { ServiceCardCms, ServicesHeaderCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function ServicesSectionForm({
  header,
  serviceCards,
}: {
  header: ServicesHeaderCms;
  serviceCards: ServiceCardCms[];
}) {
  const [svcHeader, setSvcHeader] = useState(header);
  const [cards, setCards] = useState(() => structuredClone(serviceCards));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function updateCard(i: number, patch: Partial<ServiceCardCms>) {
    const next = [...cards];
    next[i] = { ...next[i], ...patch };
    setCards(next);
  }

  function addCard() {
    setCards((prev) => [
      ...prev,
      {
        n: String(prev.length + 1).padStart(2, "0"),
        tag: "",
        name: "",
        desc: "",
        href: "/services/bookkeeping",
        price: "",
      },
    ]);
  }

  function removeCard(i: number) {
    setCards((prev) => prev.filter((_, j) => j !== i));
  }

  function moveCard(i: number, dir: -1 | 1) {
    setCards((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ home: { services: svcHeader, serviceCards: cards } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — services grid</h1>
      <p className="admin-page-desc">The “What we do” block. Add, remove, and reorder service tiles. Link paths should match your site (e.g. /services/bookkeeping).</p>

      <div className="admin-card">
        <p className="admin-card__title">Section header</p>
        <div className="admin-field">
          <label className="admin-label">Small tag (green pill)</label>
          <input
            className="admin-input"
            value={svcHeader.label}
            onChange={(e) => setSvcHeader({ ...svcHeader, label: e.target.value })}
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Title — first part</label>
            <input
              className="admin-input"
              value={svcHeader.title}
              onChange={(e) => setSvcHeader({ ...svcHeader, title: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Title — green part</label>
            <input
              className="admin-input"
              value={svcHeader.titleGradient}
              onChange={(e) => setSvcHeader({ ...svcHeader, titleGradient: e.target.value })}
            />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Description under title</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={svcHeader.subtitle}
            onChange={(e) => setSvcHeader({ ...svcHeader, subtitle: e.target.value })}
          />
        </div>
      </div>

      {cards.map((card, i) => (
        <details key={i} className="details-block" open={i === 0}>
          <summary>Service {i + 1} — {card.name || "Untitled"}</summary>
          <div className="details-block__body">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <button type="button" className="admin-btn" onClick={() => moveCard(i, -1)} disabled={i === 0}>↑ Move up</button>
              <button type="button" className="admin-btn" onClick={() => moveCard(i, 1)} disabled={i === cards.length - 1}>↓ Move down</button>
              <button type="button" className="admin-btn" onClick={() => removeCard(i)} style={{ marginLeft: "auto" }}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Number on card (e.g. 01)</label>
                <input
                  className="admin-input"
                  value={card.n}
                  onChange={(e) => updateCard(i, { n: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Category tag</label>
                <input
                  className="admin-input"
                  value={card.tag}
                  onChange={(e) => updateCard(i, { tag: e.target.value })}
                />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Card title</label>
              <input
                className="admin-input"
                value={card.name}
                onChange={(e) => updateCard(i, { name: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={card.desc}
                onChange={(e) => updateCard(i, { desc: e.target.value })}
              />
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Starting price badge</label>
                <p className="admin-hint">e.g. Starting at ₹6,999 — leave blank to hide</p>
                <input
                  className="admin-input"
                  value={card.price ?? ""}
                  onChange={(e) => updateCard(i, { price: e.target.value })}
                  placeholder="Starting at ₹6,999"
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Link when clicked</label>
                <p className="admin-hint">Must start with / — e.g. /services/accounting</p>
                <input
                  className="admin-input"
                  value={card.href}
                  onChange={(e) => updateCard(i, { href: e.target.value })}
                />
              </div>
            </div>
          </div>
        </details>
      ))}

      <button type="button" className="admin-btn" onClick={addCard} style={{ marginBottom: "1rem" }}>+ Add service</button>

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
