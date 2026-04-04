"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="admin-icon-btn admin-icon-btn--danger"
      title="Delete"
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
    </button>
  );
}
