"use client";

import { useState } from "react";
import type { HeroCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";

export default function HeroSectionForm({ initial }: { initial: HeroCms }) {
  const [hero, setHero] = useState(() => structuredClone(initial));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function setStat(i: number, field: "value" | "label", v: string) {
    const stats = [...hero.stats];
    stats[i] = { ...stats[i], [field]: v };
    setHero({ ...hero, stats });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      await patchSite({ home: { hero } });
      setMsg("Saved. Check the homepage.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Home — main banner</h1>
      <p className="admin-page-desc">
        The dark hero at the top of the homepage. For the main headline, you can use two lines in “Headline — line 1 &amp; 2” (press Enter
        for a line break).
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Eyebrow &amp; headline</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="eyebrow">
            Small label above headline
          </label>
          <input
            id="eyebrow"
            className="admin-input"
            value={hero.eyebrow}
            onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tb">
            Headline — line 1 &amp; 2 (line break optional)
          </label>
          <textarea
            id="tb"
            className="admin-textarea"
            rows={2}
            value={hero.titleBefore}
            onChange={(e) => setHero({ ...hero, titleBefore: e.target.value })}
          />
        </div>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label" htmlFor="ta">
              Highlighted word(s) in headline
            </label>
            <input
              id="ta"
              className="admin-input"
              value={hero.titleAccent}
              onChange={(e) => setHero({ ...hero, titleAccent: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="taf">
              Words after highlight
            </label>
            <input
              id="taf"
              className="admin-input"
              value={hero.titleAfter}
              onChange={(e) => setHero({ ...hero, titleAfter: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Intro paragraph</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="sub">
            Main paragraph
          </label>
          <textarea
            id="sub"
            className="admin-textarea"
            rows={3}
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="sube">
            Closing sentence (slightly brighter on the site)
          </label>
          <input
            id="sube"
            className="admin-input"
            value={hero.subtitleEmphasis}
            onChange={(e) => setHero({ ...hero, subtitleEmphasis: e.target.value })}
          />
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Buttons</p>
        <div className="admin-grid-2">
          <div className="admin-field">
            <label className="admin-label">Primary button — label</label>
            <input
              className="admin-input"
              value={hero.ctaPrimaryLabel}
              onChange={(e) => setHero({ ...hero, ctaPrimaryLabel: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Primary button — link</label>
            <p className="admin-hint">Internal path, e.g. /contact</p>
            <input
              className="admin-input"
              value={hero.ctaPrimaryHref}
              onChange={(e) => setHero({ ...hero, ctaPrimaryHref: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Secondary button — label</label>
            <input
              className="admin-input"
              value={hero.ctaSecondaryLabel}
              onChange={(e) => setHero({ ...hero, ctaSecondaryLabel: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Secondary button — link</label>
            <input
              className="admin-input"
              value={hero.ctaSecondaryHref}
              onChange={(e) => setHero({ ...hero, ctaSecondaryHref: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <p className="admin-card__title">Stats row (four boxes)</p>
        <div className="admin-field">
          <label className="admin-label" htmlFor="sl">
            Small heading above stats
          </label>
          <input
            id="sl"
            className="admin-input"
            value={hero.statsLabel}
            onChange={(e) => setHero({ ...hero, statsLabel: e.target.value })}
          />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="admin-grid-2" style={{ marginBottom: "1rem" }}>
            <div className="admin-field">
              <label className="admin-label">Stat {i + 1} — big number</label>
              <input
                className="admin-input"
                value={hero.stats[i]?.value ?? ""}
                onChange={(e) => setStat(i, "value", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Stat {i + 1} — label</label>
              <input
                className="admin-input"
                value={hero.stats[i]?.label ?? ""}
                onChange={(e) => setStat(i, "label", e.target.value)}
              />
            </div>
          </div>
        ))}
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
