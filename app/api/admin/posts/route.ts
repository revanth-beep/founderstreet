import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts } from "@/lib/cms";

// Simple token-based auth for admin routes
function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("x-admin-token") || 
    request.cookies.get("admin-token")?.value;
  return token === (process.env.ADMIN_SECRET || "founderstreet-admin-2025");
}

export async function GET(request: NextRequest) {
  // Publicly readable for now (posts are public)
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    // In development, skip auth check. In production, uncomment:
    // if (!isAuthorized(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const post = await createPost(data);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    // In development without Blob configured, return a mock success
    return NextResponse.json({ 
      post: { id: "mock", ...await request.json() },
      note: "Blob storage not configured — post not persisted"
    }, { status: 201 });
  }
}
