import Link from "next/link";
import { FileText, Users, BarChart3, Plus, ArrowRight } from "lucide-react";
import { SAMPLE_POSTS } from "@/lib/cms";

export default async function AdminDashboard() {
  const posts = SAMPLE_POSTS;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-grey-900">Dashboard</h1>
          <p className="text-grey-500 text-sm mt-1">Manage your Founderstreet content</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="btn-primary text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Posts", value: posts.length, icon: FileText, color: "bg-blue-50 text-blue-600" },
          { label: "Published", value: publishedCount, icon: BarChart3, color: "bg-green-50 text-green-600" },
          { label: "Drafts", value: draftCount, icon: FileText, color: "bg-yellow-50 text-yellow-600" },
          { label: "Subscribers", value: "—", icon: Users, color: "bg-purple-50 text-purple-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-border rounded-sm p-4">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="font-serif text-2xl font-bold text-grey-900">{stat.value}</p>
              <p className="text-grey-500 text-xs mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent posts */}
      <div className="bg-white border border-border rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-grey-900 text-sm">Recent Posts</h2>
          <Link href="/admin/posts" className="text-primary text-xs font-semibold flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <div key={post.slug} className="flex items-center justify-between px-5 py-3 hover:bg-grey-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${post.status === "published" ? "bg-green-500" : "bg-yellow-500"}`} />
                <div>
                  <p className="font-medium text-grey-900 text-sm">{post.title}</p>
                  <p className="text-grey-400 text-xs">{post.category} · {post.readingTime} min read</p>
                </div>
              </div>
              <Link
                href={`/admin/posts/${post.slug}`}
                className="text-grey-400 hover:text-primary text-xs transition-colors"
              >
                Edit →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
