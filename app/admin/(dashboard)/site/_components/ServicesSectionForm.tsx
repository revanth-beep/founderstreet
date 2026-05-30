"use client";

import { useState } from "react";
import type { ServiceCardCms, ServicesHeaderCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

const LABELS = [
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
  "Service 6",
];

export default function ServicesSectionForm({
  header,
  serviceCards,
}: {
  header: ServicesHeaderCms;
  serviceCards: ServiceCardCms[];
}) {
  const [svcHeader, setSvcHeader] = useState(header);
  const [cards, setCards] = useState(() => structuredClone(serviceCards).slice(0, 6));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function updateCard(i: number, patch: Partial<ServiceCardCms>) {
    const next = [...cards];
    next[i] = { ...next[i], ...patch };
    setCards(next);
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
      <p className="admin-page-desc">The “What we do” block with six tiles. Link paths should match your site (e.g. /services/validation).</p>

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
          <summary>{LABELS[i]} — {card.name || "Untitled"}</summary>
          <div className="details-block__body">
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
