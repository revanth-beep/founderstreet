"use client";

import { useState } from "react";
import type { MarketingCategory, MarketingResult, AiStudioCard, MarketingServiceItem } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function MarketingExtrasForm({
  initialCategories,
  initialResults,
  initialAiStudio,
}: {
  initialCategories: MarketingCategory[];
  initialResults: MarketingResult[];
  initialAiStudio: AiStudioCard[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [results, setResults] = useState(initialResults);
  const [aiStudio, setAiStudio] = useState(initialAiStudio);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { marketing: { serviceCategories: categories, results, aiStudio } } });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function setCatField(ci: number, k: "category" | "iconName", v: string) {
    const next = [...categories];
    next[ci] = { ...next[ci], [k]: v };
    setCategories(next);
  }

  function setCatItem(ci: number, ii: number, k: keyof MarketingServiceItem, v: string | string[]) {
    const next = [...categories];
    const items = [...next[ci].items];
    items[ii] = { ...items[ii], [k]: v } as MarketingServiceItem;
    next[ci] = { ...next[ci], items };
    setCategories(next);
  }

  function setCatItemMetrics(ci: number, ii: number, raw: string) {
    setCatItem(ci, ii, "metrics", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  function setResultField(i: number, k: keyof MarketingResult, v: string) {
    const next = [...results];
    next[i] = { ...next[i], [k]: v };
    setResults(next);
  }

  function setAiField(i: number, k: keyof AiStudioCard, v: string) {
    const next = [...aiStudio];
    next[i] = { ...next[i], [k]: v };
    setAiStudio(next);
  }

  return (
    <div>
      <form onSubmit={onSave}>
        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem" }}>Service categories</h2>
        {categories.map((cat, ci) => (
          <div key={ci} style={{ border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
            <div className="admin-grid-2" style={{ marginBottom: "0.5rem" }}>
              <div className="admin-field">
                <label className="admin-label">Category name</label>
                <input className="admin-input" value={cat.category} onChange={e => setCatField(ci, "category", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Icon name (e.g. Monitor, MapPin, Store)</label>
                <input className="admin-input" value={cat.iconName} onChange={e => setCatField(ci, "iconName", e.target.value)} />
              </div>
            </div>
            {cat.items.map((item, ii) => (
              <div key={ii} style={{ background: "#F7F7F5", borderRadius: "6px", padding: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <p className="admin-label" style={{ margin: 0, fontSize: "0.75rem" }}>Item {ii + 1}</p>
                  <button type="button" className="admin-btn" onClick={() => {
                    const next = [...categories];
                    next[ci] = { ...next[ci], items: next[ci].items.filter((_, j) => j !== ii) };
                    setCategories(next);
                  }}>Remove</button>
                </div>
                <div className="admin-field">
                  <label className="admin-label">Title</label>
                  <input className="admin-input" value={item.title} onChange={e => setCatItem(ci, ii, "title", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" rows={2} value={item.desc} onChange={e => setCatItem(ci, ii, "desc", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Metrics (one per line)</label>
                  <textarea className="admin-textarea" rows={2} value={item.metrics.join("\n")} onChange={e => setCatItemMetrics(ci, ii, e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" className="admin-btn" onClick={() => {
              const next = [...categories];
              next[ci] = { ...next[ci], items: [...next[ci].items, { title: "", desc: "", metrics: [] }] };
              setCategories(next);
            }}>+ Add item</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setCategories(c => [...c, { category: "", iconName: "Monitor", items: [] }])} style={{ marginBottom: "1.5rem" }}>+ Add category</button>

        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>Results strip</h2>
        {results.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: "0 0 120px", margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Metric</label>
              <input className="admin-input" value={r.metric} onChange={e => setResultField(i, "metric", e.target.value)} />
            </div>
            <div className="admin-field" style={{ flex: "0 0 100px", margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Context</label>
              <input className="admin-input" value={r.context} onChange={e => setResultField(i, "context", e.target.value)} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Detail</label>
              <input className="admin-input" value={r.detail} onChange={e => setResultField(i, "detail", e.target.value)} />
            </div>
            <button type="button" className="admin-btn" onClick={() => setResults(rs => rs.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setResults(rs => [...rs, { metric: "", context: "", detail: "" }])} style={{ marginBottom: "1.5rem" }}>+ Add result</button>

        <h2 className="admin-card__title" style={{ marginBottom: "0.5rem", marginTop: "1.5rem" }}>AI Creative Studio cards</h2>
        {aiStudio.map((card, i) => (
          <div key={i} style={{ border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Card {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => setAiStudio(a => a.filter((_, j) => j !== i))}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Number (e.g. 01)</label>
                <input className="admin-input" value={card.n} onChange={e => setAiField(i, "n", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={card.title} onChange={e => setAiField(i, "title", e.target.value)} />
              </div>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Subtitle (platform list)</label>
                <input className="admin-input" value={card.sub} onChange={e => setAiField(i, "sub", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Tool name (e.g. Predis.ai)</label>
                <input className="admin-input" value={card.tool} onChange={e => setAiField(i, "tool", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Note</label>
              <textarea className="admin-textarea" rows={2} value={card.note} onChange={e => setAiField(i, "note", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={() => setAiStudio(a => [...a, { n: String(a.length + 1).padStart(2, "0"), title: "", sub: "", tool: "", note: "" }])} style={{ marginBottom: "1rem" }}>+ Add AI card</button>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save marketing content"}
          </button>
          {msg && <span className="admin-msg--ok">{msg}</span>}
          {err && <span className="admin-msg--err">{err}</span>}
        </div>
      </form>
    </div>
  );
}
