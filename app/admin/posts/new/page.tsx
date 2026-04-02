"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

const categories = ["Finance", "Legal", "Fundraising", "Marketing", "Tech", "Strategy"];

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
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
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/posts");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/posts" className="text-grey-400 hover:text-grey-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-serif text-2xl font-bold text-grey-900">New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-border rounded-sm p-5">
            <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Post title..."
              className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="bg-white border border-border rounded-sm p-5">
            <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="auto-generated-from-title"
              className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors font-mono"
            />
          </div>

          <div className="bg-white border border-border rounded-sm p-5">
            <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description shown in listing pages..."
              className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="bg-white border border-border rounded-sm p-5">
            <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
              Content (Markdown) *
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={20}
              placeholder="# Heading&#10;&#10;Write your article in Markdown..."
              className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors resize-none font-mono"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-white border border-border rounded-sm p-5">
            <h3 className="font-semibold text-grey-900 text-sm mb-4">Publish</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm text-grey-700">Featured post</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full justify-center mt-4 text-xs"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>

          {/* Meta */}
          <div className="bg-white border border-border rounded-sm p-5 space-y-3">
            <h3 className="font-semibold text-grey-900 text-sm">Meta</h3>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Reading Time (min)</label>
              <input
                type="number"
                name="readingTime"
                value={form.readingTime}
                onChange={handleChange}
                min={1}
                max={60}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Cover Image URL</label>
              <input
                type="url"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Author */}
          <div className="bg-white border border-border rounded-sm p-5 space-y-3">
            <h3 className="font-semibold text-grey-900 text-sm">Author</h3>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Name</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-grey-600 uppercase tracking-wider mb-1.5">Role</label>
              <input
                type="text"
                name="authorRole"
                value={form.authorRole}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
