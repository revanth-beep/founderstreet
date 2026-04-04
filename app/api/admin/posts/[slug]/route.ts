import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-admin";
import { deletePost, getPostBySlug, updatePost } from "@/lib/cms";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  const { slug } = await ctx.params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  const { slug } = await ctx.params;

  try {
    const data = await request.json();
    const updated = await updatePost(slug, {
      title: data.title != null ? String(data.title) : undefined,
      excerpt: data.excerpt != null ? String(data.excerpt) : undefined,
      content: data.content != null ? String(data.content) : undefined,
      category: data.category != null ? String(data.category) : undefined,
      author: data.author != null ? String(data.author) : undefined,
      authorRole: data.authorRole != null ? String(data.authorRole) : undefined,
      coverImage: data.coverImage === "" ? undefined : data.coverImage != null ? String(data.coverImage) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      readingTime: data.readingTime != null ? Number(data.readingTime) : undefined,
      featured: data.featured != null ? Boolean(data.featured) : undefined,
      status: data.status === "draft" || data.status === "published" ? data.status : undefined,
    });
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  const { slug } = await ctx.params;
  const ok = await deletePost(slug);
  if (!ok) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
