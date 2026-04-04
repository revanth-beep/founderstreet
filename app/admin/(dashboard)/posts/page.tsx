import Link from "next/link";
import { Plus, Edit2, Eye } from "lucide-react";
import { getAllPosts } from "@/lib/cms";
import DeletePostButton from "./DeletePostButton";

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="admin-page-title">Blog Posts</h1>
          <p className="admin-page-desc" style={{ marginBottom: 0 }}>
            {posts.length} posts total — create and edit articles for the Resources section.
          </p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--primary">
          <Plus className="w-3.5 h-3.5" />
          New Post
        </Link>
      </div>

      <div className="admin-list-card">
        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden lg:table-cell">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <p className="admin-text-title">{post.title}</p>
                    <p className="admin-text-muted" style={{ margin: "0.2rem 0 0", maxWidth: "28rem" }} title={post.excerpt}>
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="admin-pill">{post.category}</span>
                  </td>
                  <td className="hidden lg:table-cell">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <span
                        className={`admin-status-dot ${post.status === "published" ? "admin-status-dot--published" : "admin-status-dot--draft"}`}
                      />
                      <span style={{ fontSize: "0.8125rem", color: "#4a5056", textTransform: "capitalize" }}>{post.status}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.15rem" }}>
                      <Link
                        href={`/resources/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-icon-btn"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link href={`/admin/posts/${post.slug}`} className="admin-icon-btn" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <DeletePostButton slug={post.slug} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
