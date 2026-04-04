"use client";

import { useState } from "react";
import type { AboutPageCms, AboutTeamMemberCms, AboutValueCms, AboutValueIcon } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

const ICON_OPTIONS: { value: AboutValueIcon; label: string }[] = [
  { value: "target", label: "Target — goals / outcomes" },
  { value: "zap", label: "Zap — speed / energy" },
  { value: "heart", label: "Heart — people-first" },
];

const emptyMember = (): AboutTeamMemberCms => ({ name: "", role: "", background: "", image: "" });

const emptyValue = (): AboutValueCms => ({ icon: "target", title: "", desc: "" });

export default function AboutPageForm({ initial }: { initial: AboutPageCms }) {
  const [about, setAbout] = useState(() => structuredClone(initial));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const storyParas = about.story.paragraphs || [];

  function setStat(i: number, field: "value" | "label", v: string) {
    const next = [...(about.story.stats || [])];
    while (next.length <= i) next.push({ value: "", label: "" });
    next[i] = { ...next[i], [field]: v };
    setAbout({ ...about, story: { ...about.story, stats: next } });
  }

  function setPara(i: number, v: string) {
    const next = [...storyParas];
    next[i] = v;
    setAbout({ ...about, story: { ...about.story, paragraphs: next } });
  }

  function addPara() {
    setAbout({ ...about, story: { ...about.story, paragraphs: [...storyParas, ""] } });
  }

  function removePara(i: number) {
    setAbout({
      ...about,
      story: { ...about.story, paragraphs: storyParas.filter((_, j) => j !== i) },
    });
  }

  function updateValue(i: number, patch: Partial<AboutValueCms>) {
    const items = [...about.values.items];
    items[i] = { ...items[i], ...patch };
    setAbout({ ...about, values: { ...about.values, items } });
  }

  function addValue() {
    setAbout({ ...about, values: { ...about.values, items: [...about.values.items, emptyValue()] } });
  }

  function removeValue(i: number) {
    setAbout({
      ...about,
      values: { ...about.values, items: about.values.items.filter((_, j) => j !== i) },
    });
  }

  function updateMember(i: number, patch: Partial<AboutTeamMemberCms>) {
    const members = [...about.team.members];
    members[i] = { ...members[i], ...patch };
    setAbout({ ...about, team: { ...about.team, members } });
  }

  function addMember() {
    setAbout({ ...about, team: { ...about.team, members: [...about.team.members, emptyMember()] } });
  }

  function removeMember(i: number) {
    setAbout({
      ...about,
      team: { ...about.team, members: about.team.members.filter((_, j) => j !== i) },
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setSaving(true);
    try {
      const paragraphs = (about.story.paragraphs || []).map((p) => p.trim()).filter(Boolean);
      if (paragraphs.length === 0) {
        setErr("Add at least one story paragraph.");
        setSaving(false);
        return;
      }
      const members = about.team.members.map((m) => ({
        ...m,
        name: m.name.trim(),
        role: m.role.trim(),
        background: m.background.trim(),
        image: m.image.trim(),
      }));
      const validMembers = members.filter((m) => m.name);
      if (validMembers.length === 0) {
        setErr("Add at least one team member with a name.");
        setSaving(false);
        return;
      }
      const valueItems = about.values.items
        .map((v) => ({ ...v, title: v.title.trim(), desc: v.desc.trim() }))
        .filter((v) => v.title && v.desc);
      if (valueItems.length === 0) {
        setErr("Add at least one value card with title and description.");
        setSaving(false);
        return;
      }

      const storyStats = (about.story.stats || [])
        .map((s) => ({ value: s.value.trim(), label: s.label.trim() }))
        .filter((s) => s.value && s.label);
      if (storyStats.length === 0) {
        setErr("Add at least one stat (value + label).");
        setSaving(false);
        return;
      }

      const payload: AboutPageCms = {
        ...about,
        metadata: {
          title: about.metadata.title.trim(),
          description: about.metadata.description.trim(),
        },
        hero: {
          eyebrow: about.hero.eyebrow.trim(),
          titleLine1: about.hero.titleLine1.trim(),
          titleAccent: about.hero.titleAccent.trim(),
          lead: about.hero.lead.trim(),
        },
        story: {
          ...about.story,
          label: about.story.label.trim(),
          titleLine1: about.story.titleLine1.trim(),
          titleGradient: about.story.titleGradient.trim(),
          paragraphs,
          stats: storyStats,
        },
        values: {
          ...about.values,
          label: about.values.label.trim(),
          title: about.values.title.trim(),
          items: valueItems,
        },
        team: {
          ...about.team,
          label: about.team.label.trim(),
          title: about.team.title.trim(),
          members: validMembers,
        },
        cta: {
          title: about.cta.title.trim(),
          subtitle: about.cta.subtitle.trim(),
          buttonLabel: about.cta.buttonLabel.trim(),
          buttonHref: about.cta.buttonHref.trim() || "/contact",
        },
      };

      await patchSite({ aboutPage: payload });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const statRows = [...(about.story.stats || [])];
  while (statRows.length < 4) statRows.push({ value: "", label: "" });

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">About page</h1>
      <p className="admin-page-desc">
        Everything on <strong>/about</strong>: SEO title and description, hero, story, metrics, values, team, and bottom call-to-action.
      </p>

      <details className="details-block" open>
        <summary>Search &amp; browser tab (metadata)</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Page title (tab / Google)</label>
            <input
              className="admin-input"
              value={about.metadata.title}
              onChange={(e) => setAbout({ ...about, metadata: { ...about.metadata, title: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Meta description</label>
            <textarea
              className="admin-textarea"
              rows={2}
              value={about.metadata.description}
              onChange={(e) => setAbout({ ...about, metadata: { ...about.metadata, description: e.target.value } })}
            />
          </div>
        </div>
      </details>

      <details className="details-block" open>
        <summary>Hero (top dark band)</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Eyebrow</label>
            <input
              className="admin-input"
              value={about.hero.eyebrow}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, eyebrow: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Headline — first part (before the green italic)</label>
            <input
              className="admin-input"
              value={about.hero.titleLine1}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, titleLine1: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Headline — green italic part</label>
            <input
              className="admin-input"
              value={about.hero.titleAccent}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, titleAccent: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Intro paragraph</label>
            <textarea
              className="admin-textarea"
              rows={4}
              value={about.hero.lead}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, lead: e.target.value } })}
            />
          </div>
        </div>
      </details>

      <details className="details-block" open>
        <summary>Story &amp; stats (white section)</summary>
        <div className="details-block__body">
          <div className="admin-grid-2">
            <div className="admin-field">
              <label className="admin-label">Small tag</label>
              <input
                className="admin-input"
                value={about.story.label}
                onChange={(e) => setAbout({ ...about, story: { ...about.story, label: e.target.value } })}
              />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-label">Title — first part</label>
            <input
              className="admin-input"
              value={about.story.titleLine1}
              onChange={(e) => setAbout({ ...about, story: { ...about.story, titleLine1: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Title — green gradient part</label>
            <input
              className="admin-input"
              value={about.story.titleGradient}
              onChange={(e) => setAbout({ ...about, story: { ...about.story, titleGradient: e.target.value } })}
            />
          </div>
          <p className="admin-card__title" style={{ marginTop: "1rem" }}>
            Paragraphs
          </p>
          {storyParas.map((p, i) => (
            <div key={i} className="admin-field">
              <label className="admin-label">Paragraph {i + 1}</label>
              <textarea className="admin-textarea" rows={3} value={p} onChange={(e) => setPara(i, e.target.value)} />
              <button type="button" className="admin-btn" onClick={() => removePara(i)}>
                Remove paragraph
              </button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn--primary" onClick={addPara}>
            Add paragraph
          </button>
          <p className="admin-card__title" style={{ marginTop: "1.5rem" }}>
            Stat tiles
          </p>
          {statRows.map((s, i) => (
            <div key={i} className="admin-grid-2">
              <div className="admin-field">
                <label className="admin-label">Value {i + 1}</label>
                <input className="admin-input" value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Label {i + 1}</label>
                <input className="admin-input" value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </details>

      <details className="details-block" open>
        <summary>Values cards</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Section tag</label>
            <input
              className="admin-input"
              value={about.values.label}
              onChange={(e) => setAbout({ ...about, values: { ...about.values, label: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Section title</label>
            <input
              className="admin-input"
              value={about.values.title}
              onChange={(e) => setAbout({ ...about, values: { ...about.values, title: e.target.value } })}
            />
          </div>
          {about.values.items.map((v, i) => (
            <div key={i} className="admin-card" style={{ marginBottom: "1rem" }}>
              <p className="admin-card__title">Value {i + 1}</p>
              <div className="admin-field">
                <label className="admin-label">Icon</label>
                <select
                  className="admin-select"
                  value={v.icon}
                  onChange={(e) => updateValue(i, { icon: e.target.value as AboutValueIcon })}
                >
                  {ICON_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={v.title} onChange={(e) => updateValue(i, { title: e.target.value })} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" rows={3} value={v.desc} onChange={(e) => updateValue(i, { desc: e.target.value })} />
              </div>
              <button type="button" className="admin-btn" onClick={() => removeValue(i)}>
                Remove value
              </button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn--primary" onClick={addValue}>
            Add value card
          </button>
        </div>
      </details>

      <details className="details-block" open>
        <summary>Team</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Section tag</label>
            <input
              className="admin-input"
              value={about.team.label}
              onChange={(e) => setAbout({ ...about, team: { ...about.team, label: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Section title</label>
            <input
              className="admin-input"
              value={about.team.title}
              onChange={(e) => setAbout({ ...about, team: { ...about.team, title: e.target.value } })}
            />
          </div>
          {about.team.members.map((m, i) => (
            <div key={i} className="admin-card" style={{ marginBottom: "1rem" }}>
              <p className="admin-card__title">Person {i + 1}</p>
              <div className="admin-grid-2">
                <div className="admin-field">
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={m.name} onChange={(e) => updateMember(i, { name: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Role</label>
                  <input className="admin-input" value={m.role} onChange={(e) => updateMember(i, { role: e.target.value })} />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-label">Background (credentials line)</label>
                <input className="admin-input" value={m.background} onChange={(e) => updateMember(i, { background: e.target.value })} />
              </div>
              <AdminImageUploadField
                id={`team-${i}-image`}
                label="Photo"
                value={m.image}
                onChange={(url) => updateMember(i, { image: url })}
                hint="Upload a portrait or use a path like /team/name.jpg if the file is already on the server."
              />
              <button type="button" className="admin-btn" onClick={() => removeMember(i)}>
                Remove person
              </button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn--primary" onClick={addMember}>
            Add team member
          </button>
        </div>
      </details>

      <details className="details-block" open>
        <summary>Bottom CTA band</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input
              className="admin-input"
              value={about.cta.title}
              onChange={(e) => setAbout({ ...about, cta: { ...about.cta, title: e.target.value } })}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Subtitle</label>
            <textarea
              className="admin-textarea"
              rows={2}
              value={about.cta.subtitle}
              onChange={(e) => setAbout({ ...about, cta: { ...about.cta, subtitle: e.target.value } })}
            />
          </div>
          <div className="admin-grid-2">
            <div className="admin-field">
              <label className="admin-label">Button label</label>
              <input
                className="admin-input"
                value={about.cta.buttonLabel}
                onChange={(e) => setAbout({ ...about, cta: { ...about.cta, buttonLabel: e.target.value } })}
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Button link</label>
              <input
                className="admin-input"
                value={about.cta.buttonHref}
                onChange={(e) => setAbout({ ...about, cta: { ...about.cta, buttonHref: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </details>

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
