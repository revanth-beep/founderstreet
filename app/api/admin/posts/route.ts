import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/lib/cms";

// Simple token-based auth for admin routes
function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("x-admin-token") || 
    request.cookies.get("admin-token")?.value;
  return token === (process.env.ADMIN_SECRET || "founderstreet-admin-2025");
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === "production" && !isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    const post = await createPost(data);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
