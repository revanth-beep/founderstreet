"use client";

import { useState } from "react";
import type { FounderStoriesCms, FounderStoryCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

const emptyStory = (): FounderStoryCms => ({
  name: "",
  role: "",
  sector: "",
  avatar: "",
  quote: "",
  result: "",
  rating: 5,
});

export default function FounderStoriesSectionForm({ initial }: { initial: FounderStoriesCms }) {
  const [eyebrow, setEyebrow] = useState(initial.eyebrow);
  const [title, setTitle] = useState(initial.title);
  const [stories, setStories] = useState(() => structuredClone(initial.stories));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function update(i: number, patch: Partial<FounderStoryCms>) {
    const next = [...stories];
    next[i] = { ...next[i], ...patch };
    setStories(next);
  }

  function add() {
    setStories([...stories, emptyStory()]);
  }

  function remove(i: number) {
    setStories(stories.filter((_, j) => j !== i));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      const cleaned = stories
        .map((s) => ({
          ...s,
          name: s.name.trim(),
          role: s.role.trim(),
          sector: s.sector.trim(),
          avatar: s.avatar.trim(),
          quote: s.quote.trim(),
          result: s.result.trim(),
          rating: Math.min(5, Math.max(1, Math.round(Number(s.rating) || 5))),
        }))
        .filter((s) => s.quote && s.name);
      if (cleaned.length === 0) {
        setErr("Add at least one story with a name and a quote.");
        setSaving(false);
        return;
      }
      await patchSite({
        home: {
          founderStories: {
            eyebrow: eyebrow.trim(),
            title: title.trim(),
            stories: cleaned,
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
      <h1 className="admin-page-title">Home — founder stories</h1>
      <p className="admin-page-desc">
        The dark testimonial carousel on the homepage. Upload a headshot or paste an image URL, add a quote, and a short &ldquo;result&rdquo;
        line (e.g. funding raised).
      </p>

      <div className="admin-card">
        <p className="admin-card__title">Section header</p>
        <div className="admin-field">
          <label className="admin-label">Small label (green pill)</label>
          <input className="admin-input" value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Main title</label>
          <input className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>

      {stories.map((s, i) => (
        <details key={i} className="details-block" open={i === 0}>
          <summary>
            Story {i + 1}: {s.name || "Untitled"}
          </summary>
          <div className="details-block__body">
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Name</label>
                <input className="admin-input" value={s.name} onChange={(e) => update(i, { name: e.target.value })} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Star rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="admin-input"
                  value={s.rating}
                  onChange={(e) => update(i, { rating: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Role / title</label>
                <input className="admin-input" value={s.role} onChange={(e) => update(i, { role: e.target.value })} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Sector</label>
                <input className="admin-input" value={s.sector} onChange={(e) => update(i, { sector: e.target.value })} />
              </div>
            </div>
            <AdminImageUploadField
              id={`story-${i}-avatar`}
              label="Photo"
              value={s.avatar}
              onChange={(url) => update(i, { avatar: url })}
              hint="Square photos work best in the carousel."
            />
            <div className="admin-field">
              <label className="admin-label">Quote</label>
              <textarea className="admin-textarea" rows={4} value={s.quote} onChange={(e) => update(i, { quote: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Result line (highlighted pill)</label>
              <input className="admin-input" value={s.result} onChange={(e) => update(i, { result: e.target.value })} />
            </div>
            <button type="button" className="admin-btn" onClick={() => remove(i)}>
              Remove story
            </button>
          </div>
        </details>
      ))}

      <button type="button" className="admin-btn admin-btn--primary" style={{ marginBottom: "1.5rem" }} onClick={add}>
        Add story
      </button>

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
