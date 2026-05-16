"use client";

import { useState } from "react";
import type { TeamPageCms, TeamPageMemberCms } from "@/lib/site-content-defaults";
import { patchSite } from "./patchClient";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

const DEPARTMENTS = ["Leadership", "Senior Consultants", "Consultants", "Associates", "Interns"];

const emptyMember = (): TeamPageMemberCms => ({
  name: "",
  role: "",
  background: "",
  image: "",
  department: "Associates",
});

export default function TeamPageForm({ initial }: { initial: TeamPageCms }) {
  const [data, setData] = useState(() => structuredClone(initial));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function updateMember(i: number, patch: Partial<TeamPageMemberCms>) {
    const members = [...data.members];
    members[i] = { ...members[i], ...patch };
    setData({ ...data, members });
  }

  function addMember() {
    setData({ ...data, members: [...data.members, emptyMember()] });
  }

  function removeMember(i: number) {
    setData({ ...data, members: data.members.filter((_, j) => j !== i) });
  }

  function moveMember(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= data.members.length) return;
    const members = [...data.members];
    [members[i], members[j]] = [members[j], members[i]];
    setData({ ...data, members });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); setErr("");
    setSaving(true);
    try {
      const validMembers = data.members
        .map((m) => ({ ...m, name: m.name.trim(), role: m.role.trim(), background: m.background.trim(), image: m.image.trim(), department: m.department.trim() }))
        .filter((m) => m.name && m.role && m.department);
      if (validMembers.length === 0) {
        setErr("Add at least one member with name, role, and department.");
        setSaving(false);
        return;
      }
      await patchSite({
        teamPage: {
          ...data,
          metadata: { title: data.metadata.title.trim(), description: data.metadata.description.trim() },
          hero: { eyebrow: data.hero.eyebrow.trim(), title: data.hero.title.trim(), subtitle: data.hero.subtitle.trim() },
          members: validMembers,
        },
      });
      setMsg("Saved.");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const membersByDept = (dept: string) => data.members.filter((m) => m.department === dept);

  return (
    <form onSubmit={onSave}>
      <h1 className="admin-page-title">Team page</h1>
      <p className="admin-page-desc">
        All 16 team members on <strong>/team</strong>. Members are grouped by department on the live page.
      </p>

      <details className="details-block" open>
        <summary>SEO metadata</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Page title</label>
            <input className="admin-input" value={data.metadata.title} onChange={(e) => setData({ ...data, metadata: { ...data.metadata, title: e.target.value } })} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Meta description</label>
            <textarea className="admin-textarea" rows={2} value={data.metadata.description} onChange={(e) => setData({ ...data, metadata: { ...data.metadata, description: e.target.value } })} />
          </div>
        </div>
      </details>

      <details className="details-block" open>
        <summary>Hero section</summary>
        <div className="details-block__body">
          <div className="admin-field">
            <label className="admin-label">Eyebrow text</label>
            <input className="admin-input" value={data.hero.eyebrow} onChange={(e) => setData({ ...data, hero: { ...data.hero, eyebrow: e.target.value } })} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={data.hero.title} onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Subtitle</label>
            <textarea className="admin-textarea" rows={3} value={data.hero.subtitle} onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })} />
          </div>
        </div>
      </details>

      {DEPARTMENTS.map((dept) => {
        const deptMembers = data.members
          .map((m, i) => ({ m, i }))
          .filter(({ m }) => m.department === dept);

        return (
          <details key={dept} className="details-block" open>
            <summary>{dept} ({deptMembers.length})</summary>
            <div className="details-block__body">
              {deptMembers.map(({ m, i }) => (
                <div key={i} className="admin-card" style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <p className="admin-card__title" style={{ margin: 0 }}>{m.name || `Member ${i + 1}`}</p>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button type="button" className="admin-btn" style={{ padding: "0 8px" }} onClick={() => moveMember(i, -1)} title="Move up">↑</button>
                      <button type="button" className="admin-btn" style={{ padding: "0 8px" }} onClick={() => moveMember(i, 1)} title="Move down">↓</button>
                      <button type="button" className="admin-btn" onClick={() => removeMember(i)}>Remove</button>
                    </div>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label className="admin-label">Name</label>
                      <input className="admin-input" value={m.name} onChange={(e) => updateMember(i, { name: e.target.value })} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Role / title</label>
                      <input className="admin-input" value={m.role} onChange={(e) => updateMember(i, { role: e.target.value })} />
                    </div>
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-field">
                      <label className="admin-label">Credentials / background</label>
                      <input className="admin-input" value={m.background} onChange={(e) => updateMember(i, { background: e.target.value })} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Department</label>
                      <select className="admin-select" value={m.department} onChange={(e) => updateMember(i, { department: e.target.value })}>
                        {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <AdminImageUploadField
                    id={`team-${i}-img`}
                    label="Photo"
                    value={m.image}
                    onChange={(url) => updateMember(i, { image: url })}
                    hint="Upload a portrait, or use /team/filename.avif for files already in the server."
                  />
                </div>
              ))}
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={() => setData({ ...data, members: [...data.members, { ...emptyMember(), department: dept }] })}
              >
                Add {dept.replace(/s$/, "").toLowerCase()}
              </button>
            </div>
          </details>
        );
      })}

      <details className="details-block">
        <summary>Other / unassigned members ({data.members.filter((m) => !DEPARTMENTS.includes(m.department)).length})</summary>
        <div className="details-block__body">
          {data.members
            .map((m, i) => ({ m, i }))
            .filter(({ m }) => !DEPARTMENTS.includes(m.department))
            .map(({ m, i }) => (
              <div key={i} className="admin-card" style={{ marginBottom: "1rem" }}>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label className="admin-label">Name</label>
                    <input className="admin-input" value={m.name} onChange={(e) => updateMember(i, { name: e.target.value })} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Department</label>
                    <select className="admin-select" value={m.department} onChange={(e) => updateMember(i, { department: e.target.value })}>
                      {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <button type="button" className="admin-btn" onClick={() => removeMember(i)}>Remove</button>
              </div>
            ))}
          <button type="button" className="admin-btn admin-btn--primary" onClick={addMember}>
            Add member
          </button>
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
