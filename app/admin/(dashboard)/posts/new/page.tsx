"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

const categories = ["Finance", "Legal", "Fundraising", "Marketing", "Tech", "Strategy"];

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Finance",
    author: "Founderstreet Team",
    authorRole: "Editorial",
    coverImage: "",
    tags: "",
    readingTime: 5,
    featured: false,
    status: "draft" as "draft" | "published",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && !prev.slug ? { slug: slugify(value) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError(data.error || "Could not save post. Is Postgres connected?");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="admin-form-header">
        <Link href="/admin/posts" className="admin-back-link" aria-label="Back to posts">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          New Post
        </h1>
      </div>
      <p className="admin-page-desc">Drafts and published posts appear under Resources on the live site.</p>

      <form onSubmit={handleSubmit} className="post-form-grid">
        <div className="post-form-main">
          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-title">
                Title *
              </label>
              <input
                id="post-title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Post title…"
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-slug">
                Slug
              </label>
              <input
                id="post-slug"
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="auto-generated-from-title"
                className="admin-input admin-input--mono"
              />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-excerpt">
                Excerpt *
              </label>
              <textarea
                id="post-excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Brief description shown in listing pages…"
                className="admin-textarea"
                style={{ minHeight: "5rem" }}
              />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-content">
                Content (Markdown) *
              </label>
              <textarea
                id="post-content"
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={20}
                placeholder={"# Heading\n\nWrite your article in Markdown…"}
                className="admin-textarea admin-input--mono"
                style={{ minHeight: "24rem" }}
              />
            </div>
          </div>
        </div>

        <div className="post-form-side">
          <div className="admin-card">
            <h3 className="admin-section-heading">Publish</h3>
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-status">
                Status
              </label>
              <select id="post-status" name="status" value={form.status} onChange={handleChange} className="admin-select">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <label className="admin-check">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured post
            </label>
            {error ? <p className="admin-msg--err" style={{ marginTop: "0.75rem" }}>{error}</p> : null}
            <button type="submit" disabled={saving} className="admin-btn admin-btn--primary" style={{ width: "100%", marginTop: "1rem" }}>
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden /> : <Save className="w-3.5 h-3.5" aria-hidden />}
              {saving ? "Saving…" : "Save Post"}
            </button>
          </div>

          <div className="admin-card">
            <h3 className="admin-section-heading">Meta</h3>
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-category">
                Category
              </label>
              <select id="post-category" name="category" value={form.category} onChange={handleChange} className="admin-select">
                {categories.map((c) => (
                  <option key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-tags">
                Tags (comma-separated)
              </label>
              <input
                id="post-tags"
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
                className="admin-input"
              />
            </div>
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-readtime">
                Reading time (minutes)
              </label>
              <input
                id="post-readtime"
                type="number"
                name="readingTime"
                value={form.readingTime}
                onChange={handleChange}
                min={1}
                max={60}
                className="admin-input"
              />
            </div>
            <AdminImageUploadField
              id="post-cover"
              label="Cover image"
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
              hint="Shown at the top of the article and in listings."
            />
          </div>

          <div className="admin-card">
            <h3 className="admin-section-heading">Author</h3>
            <div className="admin-field">
              <label className="admin-label" htmlFor="post-author">
                Name
              </label>
              <input id="post-author" type="text" name="author" value={form.author} onChange={handleChange} className="admin-input" />
            </div>
            <div className="admin-field" style={{ marginBottom: 0 }}>
              <label className="admin-label" htmlFor="post-author-role">
                Role
              </label>
              <input id="post-author-role" type="text" name="authorRole" value={form.authorRole} onChange={handleChange} className="admin-input" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
