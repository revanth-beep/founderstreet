import Link from "next/link";
import { FileText, Users, BarChart3, Plus, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/cms";

export default async function AdminDashboard() {
  const posts = await getAllPosts();
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-desc" style={{ marginBottom: 0 }}>
            Manage Founderstreet content, blog posts, and website copy.
          </p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn admin-btn--primary">
          <Plus className="w-3.5 h-3.5" />
          New Post
        </Link>
      </div>

      <div className="admin-stat-grid">
        {[
          { label: "Total Posts", value: posts.length, icon: FileText, bg: "#eff6ff", color: "#2563eb" },
          { label: "Published", value: publishedCount, icon: BarChart3, bg: "#f0fdf4", color: "#16a34a" },
          { label: "Drafts", value: draftCount, icon: FileText, bg: "#fefce8", color: "#ca8a04" },
          { label: "Subscribers", value: "—", icon: Users, bg: "#faf5ff", color: "#9333ea" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-stat-card">
              <div className="admin-stat-card__icon" style={{ background: stat.bg, color: stat.color }}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="admin-stat-card__value">{stat.value}</p>
              <p className="admin-stat-card__label">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="admin-list-card">
        <div className="admin-list-card__head">
          <h2>Recent Posts</h2>
          <Link href="/admin/posts">
            View all <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
          </Link>
        </div>
        <div>
          {posts.slice(0, 8).map((post) => (
            <div key={post.slug} className="admin-recent-row">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                <div
                  className={`admin-status-dot ${post.status === "published" ? "admin-status-dot--published" : "admin-status-dot--draft"}`}
                  title={post.status}
                />
                <div style={{ minWidth: 0 }}>
                  <p className="admin-text-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.title}
                  </p>
                  <p className="admin-text-muted" style={{ margin: "0.15rem 0 0" }}>
                    {post.category} · {post.readingTime} min read
                  </p>
                </div>
              </div>
              <Link href={`/admin/posts/${post.slug}`}>Edit →</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
