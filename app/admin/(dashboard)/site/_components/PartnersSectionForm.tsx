"use client";

import { useState } from "react";
import type { PartnerMarqueeCms, PartnerPillCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

const emptyPartner = (): PartnerPillCms => ({ name: "", cat: "" });

export default function PartnersSectionForm({ initial }: { initial: PartnerMarqueeCms }) {
  const [headline, setHeadline] = useState(initial.headline);
  const [partners, setPartners] = useState(() => [...initial.partners]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function update(i: number, patch: Partial<PartnerPillCms>) {
    const next = [...partners];
    next[i] = { ...next[i], ...patch };
    setPartners(next);
  }

  function add() {
    setPartners([...partners, emptyPartner()]);
  }

  function remove(i: number) {
    setPartners(partners.filter((_, j) => j !== i));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      const cleaned = partners.map((p) => ({ name: p.name.trim(), cat: p.cat.trim() })).filter((p) => p.name);
      if (cleaned.length === 0) {
        setErr("Add at least one partner with a name.");
        setSaving(false);
        return;
      }
      await patchSite({
        home: {
          partnerMarquee: {
            headline: headline.trim(),
            partners: cleaned,
          },
        },
      });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — partner network</h1>
      <p className="admin-page-desc">
        The scrolling band of partner names on the homepage. Each row has the <strong>display name</strong> and a short{" "}
        <strong>category</strong> (e.g. Billboard, Retail).
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Section heading</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="pm-headline">
            Line above the marquees (often includes em dashes or middots)
          </label>
          <input
            id="pm-headline"
            className="admin-input"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Partners ({partners.length})</p>
        <p className="admin-hint" style={{ marginTop: "-0.5rem" }}>
          Remove blank rows before saving, or they will be skipped. At least one named partner is required.
        </p>
        {partners.map((p, i) => (
          <details key={i} className="details-block" open={i === 0}>
            <summary>
              Partner {i + 1}: {p.name || "Untitled"}
            </summary>
            <div className="details-block__body">
              <div className="admin-grid-2">
                <div className="admin-field">
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={p.name} onChange={(e) => update(i, { name: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Category label</label>
                  <input className="admin-input" value={p.cat} onChange={(e) => update(i, { cat: e.target.value })} />
                </div>
              </div>
              <button type="button" className="admin-btn" style={{ marginBottom: "0.5rem" }} onClick={() => remove(i)}>
                Remove partner
              </button>
            </div>
          </details>
        ))}
        <button type="button" className="admin-btn admin-btn--primary" onClick={add}>
          Add partner
        </button>
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        {msg ? <span className="admin-msg--ok">{msg}</span> : null}
        {err ? <span className="admin-msg--err">{err}</span> : null}
      </div>
    </form>
  );
}
