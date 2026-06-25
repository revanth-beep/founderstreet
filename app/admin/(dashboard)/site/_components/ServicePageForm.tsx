"use client";

import { useState } from "react";
import type { ServicePageCms, ServicePagePricingTier, ServicePageFaqItem } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

type ServiceKey = "validation" | "incorporation" | "accounting" | "bookkeeping" | "marketing" | "webDevelopment" | "funding";

const SERVICE_LABELS: Record<ServiceKey, string> = {
  validation: "Test Your Idea (Validation)",
  incorporation: "Incorporation",
  accounting: "Accounting & Virtual CFO",
  bookkeeping: "Book-keeping & Taxation",
  marketing: "Marketing & Retail",
  webDevelopment: "Web & Tech Development",
  funding: "Investor Funding",
};

export default function ServicePageForm({
  serviceKey,
  initial,
}: {
  serviceKey: ServiceKey;
  initial: ServicePageCms;
}) {
  const [data, setData] = useState<ServicePageCms>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr(""); setSaving(true);
    try {
      await patchSite({ servicePages: { [serviceKey]: data } });
      setMsg("Saved. Page will update within 60 seconds.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  // ── helpers ─────────────────────────────────────────────────────────
  function setHero(k: keyof typeof data.hero, v: string | { value: string; label: string }[]) {
    setData(d => ({ ...d, hero: { ...d.hero, [k]: v } }));
  }

  function setStat(i: number, k: "value" | "label", v: string) {
    const stats = [...data.hero.stats];
    stats[i] = { ...stats[i], [k]: v };
    setHero("stats", stats);
  }

  function addStat() {
    setHero("stats", [...data.hero.stats, { value: "", label: "" }]);
  }

  function removeStat(i: number) {
    setHero("stats", data.hero.stats.filter((_, j) => j !== i));
  }

  function setFaqItem(i: number, k: keyof ServicePageFaqItem, v: string) {
    const faq = [...data.faq];
    faq[i] = { ...faq[i], [k]: v };
    setData(d => ({ ...d, faq }));
  }

  function addFaq() {
    setData(d => ({ ...d, faq: [...d.faq, { question: "", answer: "" }] }));
  }

  function removeFaq(i: number) {
    setData(d => ({ ...d, faq: d.faq.filter((_, j) => j !== i) }));
  }

  function setPricingTier(i: number, k: keyof ServicePagePricingTier, v: string | boolean | string[]) {
    const pricing = [...data.pricing];
    pricing[i] = { ...pricing[i], [k]: v } as ServicePagePricingTier;
    setData(d => ({ ...d, pricing }));
  }

  function setPricingFeatures(i: number, raw: string) {
    setPricingTier(i, "features", raw.split("\n").map(s => s.trim()).filter(Boolean));
  }

  function addPricingTier() {
    setData(d => ({
      ...d,
      pricing: [...d.pricing, { name: "", price: "", desc: "", features: [], highlight: false, cta: "" }],
    }));
  }

  function removePricingTier(i: number) {
    setData(d => ({ ...d, pricing: d.pricing.filter((_, j) => j !== i) }));
  }

  // ── render ───────────────────────────────────────────────────────────
  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Services — {SERVICE_LABELS[serviceKey]}</h1>
      <p className="admin-page-desc">Edit the hero, FAQ, pricing, and bottom CTA for this service page.</p>

      {/* Meta */}
      <div className="admin-card">
        <p className="admin-card__title">Page meta (SEO)</p>
        <div className="admin-field">
          <label className="admin-label">Page title</label>
          <input className="admin-input" value={data.meta.title}
            onChange={e => setData(d => ({ ...d, meta: { ...d.meta, title: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Meta description</label>
          <textarea className="admin-textarea" rows={2} value={data.meta.description}
            onChange={e => setData(d => ({ ...d, meta: { ...d.meta, description: e.target.value } }))} />
        </div>
      </div>

      {/* Hero */}
      <div className="admin-card">
        <p className="admin-card__title">Hero section</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Eyebrow label</label>
            <input className="admin-input" value={data.hero.label} onChange={e => setHero("label", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">CTA button text</label>
            <input className="admin-input" value={data.hero.ctaText} onChange={e => setHero("ctaText", e.target.value)} />
          </div>
        </div>
        <div className="admin-field">
          <label className="admin-label">Heading (first part)</label>
          <input className="admin-input" value={data.hero.title} onChange={e => setHero("title", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Heading highlight (green text)</label>
          <input className="admin-input" value={data.hero.titleHighlight} onChange={e => setHero("titleHighlight", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={3} value={data.hero.subtitle} onChange={e => setHero("subtitle", e.target.value)} />
        </div>

        <p className="admin-label" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Stats (displayed below subtitle)</p>
        {data.hero.stats.map((stat, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-end" }}>
            <div className="admin-field" style={{ flex: "0 0 120px", margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Value</label>
              <input className="admin-input" value={stat.value} onChange={e => setStat(i, "value", e.target.value)} />
            </div>
            <div className="admin-field" style={{ flex: 1, margin: 0 }}>
              <label className="admin-label" style={{ fontSize: "0.6875rem" }}>Label</label>
              <input className="admin-input" value={stat.label} onChange={e => setStat(i, "label", e.target.value)} />
            </div>
            <button type="button" className="admin-btn" style={{ marginBottom: "0.125rem" }} onClick={() => removeStat(i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addStat}>+ Add stat</button>
      </div>

      {/* FAQ */}
      <div className="admin-card">
        <p className="admin-card__title">FAQ</p>
        {data.faq.map((item, i) => (
          <div key={i} style={{ borderBottom: i < data.faq.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Question {i + 1}</p>
              <button type="button" className="admin-btn" onClick={() => removeFaq(i)}>Remove</button>
            </div>
            <div className="admin-field">
              <label className="admin-label">Question</label>
              <input className="admin-input" value={item.question} onChange={e => setFaqItem(i, "question", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Answer</label>
              <textarea className="admin-textarea" rows={3} value={item.answer} onChange={e => setFaqItem(i, "answer", e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addFaq}>+ Add FAQ item</button>
      </div>

      {/* Pricing */}
      <div className="admin-card">
        <p className="admin-card__title">Pricing tiers</p>
        {data.pricing.map((tier, i) => (
          <div key={i} style={{ borderBottom: i < data.pricing.length - 1 ? "1px solid #F0F0ED" : "none", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <p className="admin-label" style={{ margin: 0 }}>Tier {i + 1}{tier.highlight ? " (highlighted)" : ""}</p>
              <button type="button" className="admin-btn" onClick={() => removePricingTier(i)}>Remove</button>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Name</label>
                <input className="admin-input" value={tier.name} onChange={e => setPricingTier(i, "name", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Price (e.g. ₹14,999)</label>
                <input className="admin-input" value={tier.price} onChange={e => setPricingTier(i, "price", e.target.value)} />
              </div>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Period (e.g. /month, one-time — optional)</label>
                <input className="admin-input" value={tier.period ?? ""} onChange={e => setPricingTier(i, "period", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Badge text (e.g. Most Popular — optional)</label>
                <input className="admin-input" value={tier.badge ?? ""} onChange={e => setPricingTier(i, "badge", e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" rows={2} value={tier.desc} onChange={e => setPricingTier(i, "desc", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Features (one per line)</label>
              <textarea className="admin-textarea" rows={4} value={tier.features.join("\n")} onChange={e => setPricingFeatures(i, e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">CTA button text</label>
              <input className="admin-input" value={tier.cta} onChange={e => setPricingTier(i, "cta", e.target.value)} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", cursor: "pointer" }}>
              <input type="checkbox" checked={tier.highlight} onChange={e => setPricingTier(i, "highlight", e.target.checked)} />
              Highlighted tier (shown in green)
            </label>
          </div>
        ))}
        <button type="button" className="admin-btn" onClick={addPricingTier}>+ Add pricing tier</button>
      </div>

      {/* Bottom CTA */}
      <div className="admin-card">
        <p className="admin-card__title">Bottom CTA section</p>
        <div className="admin-field">
          <label className="admin-label">Heading</label>
          <input className="admin-input" value={data.bottomCta.title}
            onChange={e => setData(d => ({ ...d, bottomCta: { ...d.bottomCta, title: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={2} value={data.bottomCta.subtitle}
            onChange={e => setData(d => ({ ...d, bottomCta: { ...d.bottomCta, subtitle: e.target.value } }))} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Button label</label>
          <input className="admin-input" value={data.bottomCta.buttonLabel}
            onChange={e => setData(d => ({ ...d, bottomCta: { ...d.bottomCta, buttonLabel: e.target.value } }))} />
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
