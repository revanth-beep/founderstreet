import Link from "next/link";
import { Plus, Edit2, Eye, Trash2 } from "lucide-react";
import { SAMPLE_POSTS } from "@/lib/cms";

export default function AdminPostsPage() {
  const posts = SAMPLE_POSTS;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-grey-900">Blog Posts</h1>
          <p className="text-grey-500 text-sm mt-1">{posts.length} posts total</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary text-xs">
          <Plus className="w-3.5 h-3.5" />
          New Post
        </Link>
      </div>

      <div className="bg-white border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-grey-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-grey-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-grey-900 text-sm">{post.title}</p>
                    <p className="text-grey-400 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs bg-green-100 text-primary font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === "published" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-xs text-grey-600 capitalize">{post.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/resources/${post.slug}`}
                        target="_blank"
                        className="w-7 h-7 text-grey-400 hover:text-primary flex items-center justify-center rounded-sm hover:bg-grey-100 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="w-7 h-7 text-grey-400 hover:text-primary flex items-center justify-center rounded-sm hover:bg-grey-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        className="w-7 h-7 text-grey-400 hover:text-red-500 flex items-center justify-center rounded-sm hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
