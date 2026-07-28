import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-admin";
import { createPost, getAllPosts } from "@/lib/cms";

export async function GET(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  try {
    const data = await request.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    let post;
    try {
      post = await createPost({
      slug: String(data.slug),
      title: String(data.title),
      excerpt: String(data.excerpt ?? ""),
      content: String(data.content),
      category: String(data.category ?? "Strategy"),
      author: String(data.author ?? "FounderStreet Team"),
      authorRole: String(data.authorRole ?? "Editorial"),
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: Number(data.readingTime) || 5,
      featured: Boolean(data.featured),
      status: data.status === "draft" ? "draft" : "published",
    });
    } catch (err: unknown) {
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
      if (code === "23505") {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
      }
      throw err;
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    const msg = error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
