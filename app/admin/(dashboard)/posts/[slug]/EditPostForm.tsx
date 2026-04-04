"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/cms";
import AdminImageUploadField from "../../_components/AdminImageUploadField";

const categories = ["Finance", "Legal", "Fundraising", "Marketing", "Tech", "Strategy"];

export default function EditPostForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
    authorRole: post.authorRole,
    coverImage: post.coverImage ?? "",
    tags: post.tags.join(", "),
    readingTime: post.readingTime,
    featured: post.featured,
    status: post.status,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(post.slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        alert(d.error || "Save failed");
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
          Edit Post
        </h1>
      </div>
      <p className="admin-page-desc">Updating {post.status === "published" ? "a published" : "a draft"} article.</p>

      <form onSubmit={handleSubmit} className="post-form-grid">
        <div className="post-form-main">
          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-title">
                Title *
              </label>
              <input id="edit-title" type="text" name="title" value={form.title} onChange={handleChange} required className="admin-input" />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-slug">
                Slug (read-only)
              </label>
              <input
                id="edit-slug"
                type="text"
                name="slug"
                value={form.slug}
                readOnly
                className="admin-input admin-input--readonly admin-input--mono"
              />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-excerpt">
                Excerpt *
              </label>
              <textarea
                id="edit-excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="admin-textarea"
                style={{ minHeight: "5rem" }}
              />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-content">
                Content (Markdown) *
              </label>
              <textarea
                id="edit-content"
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={20}
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
              <label className="admin-label" htmlFor="edit-status">
                Status
              </label>
              <select id="edit-status" name="status" value={form.status} onChange={handleChange} className="admin-select">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <label className="admin-check">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured post
            </label>
            <button type="submit" disabled={saving} className="admin-btn admin-btn--primary" style={{ width: "100%", marginTop: "1rem" }}>
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden /> : <Save className="w-3.5 h-3.5" aria-hidden />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>

          <div className="admin-card">
            <h3 className="admin-section-heading">Meta</h3>
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-category">
                Category
              </label>
              <select id="edit-category" name="category" value={form.category} onChange={handleChange} className="admin-select">
                {categories.map((c) => (
                  <option key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-tags">
                Tags (comma-separated)
              </label>
              <input id="edit-tags" type="text" name="tags" value={form.tags} onChange={handleChange} className="admin-input" />
            </div>
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-readtime">
                Reading time (minutes)
              </label>
              <input
                id="edit-readtime"
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
              id="edit-cover"
              label="Cover image"
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
              hint="Shown at the top of the article and in listings."
            />
          </div>

          <div className="admin-card">
            <h3 className="admin-section-heading">Author</h3>
            <div className="admin-field">
              <label className="admin-label" htmlFor="edit-author">
                Name
              </label>
              <input id="edit-author" type="text" name="author" value={form.author} onChange={handleChange} className="admin-input" />
            </div>
            <div className="admin-field" style={{ marginBottom: 0 }}>
              <label className="admin-label" htmlFor="edit-author-role">
                Role
              </label>
              <input id="edit-author-role" type="text" name="authorRole" value={form.authorRole} onChange={handleChange} className="admin-input" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
