import { put, list, del, head } from "@vercel/blob";
import { generateId } from "./utils";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
}

export interface CMSManifest {
  posts: PostMeta[];
  lastUpdated: string;
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage?: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
}

const MANIFEST_KEY = "cms/manifest.json";
const POSTS_PREFIX = "cms/posts/";

async function getManifest(): Promise<CMSManifest> {
  try {
    const blobs = await list({ prefix: MANIFEST_KEY });
    if (blobs.blobs.length === 0) {
      return { posts: [], lastUpdated: new Date().toISOString() };
    }
    const res = await fetch(blobs.blobs[0].url);
    return await res.json();
  } catch {
    return { posts: [], lastUpdated: new Date().toISOString() };
  }
}

async function saveManifest(manifest: CMSManifest): Promise<void> {
  await put(MANIFEST_KEY, JSON.stringify(manifest), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function getAllPosts(status?: "draft" | "published"): Promise<PostMeta[]> {
  const manifest = await getManifest();
  const posts = manifest.posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  if (status) return posts.filter((p) => p.status === status);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blobs = await list({ prefix: `${POSTS_PREFIX}${slug}.json` });
    if (blobs.blobs.length === 0) return null;
    const res = await fetch(blobs.blobs[0].url);
    return await res.json();
  } catch {
    return null;
  }
}

export async function createPost(
  data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): Promise<BlogPost> {
  const id = generateId();
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id,
    publishedAt: now,
    updatedAt: now,
  };

  await put(`${POSTS_PREFIX}${post.slug}.json`, JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  const manifest = await getManifest();
  const meta: PostMeta = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    featured: post.featured,
    status: post.status,
  };
  manifest.posts.push(meta);
  manifest.lastUpdated = now;
  await saveManifest(manifest);

  return post;
}

export async function updatePost(
  slug: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  const existing = await getPostBySlug(slug);
  if (!existing) return null;

  const updated: BlogPost = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await put(`${POSTS_PREFIX}${slug}.json`, JSON.stringify(updated), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  const manifest = await getManifest();
  const idx = manifest.posts.findIndex((p) => p.slug === slug);
  if (idx !== -1) {
    manifest.posts[idx] = {
      id: updated.id,
      slug: updated.slug,
      title: updated.title,
      excerpt: updated.excerpt,
      category: updated.category,
      author: updated.author,
      coverImage: updated.coverImage,
      publishedAt: updated.publishedAt,
      readingTime: updated.readingTime,
      featured: updated.featured,
      status: updated.status,
    };
    manifest.lastUpdated = new Date().toISOString();
    await saveManifest(manifest);
  }

  return updated;
}

export async function deletePost(slug: string): Promise<boolean> {
  try {
    const blobs = await list({ prefix: `${POSTS_PREFIX}${slug}.json` });
    if (blobs.blobs.length > 0) {
      await del(blobs.blobs[0].url);
    }
    const manifest = await getManifest();
    manifest.posts = manifest.posts.filter((p) => p.slug !== slug);
    manifest.lastUpdated = new Date().toISOString();
    await saveManifest(manifest);
    return true;
  } catch {
    return false;
  }
}

// Sample seed data for development
export const SAMPLE_POSTS: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">[] = [
  {
    slug: "unit-economics-101-what-every-founder-must-know",
    title: "Unit Economics 101: What Every Founder Must Know Before Raising",
    excerpt:
      "Before any investor writes a cheque, they will scrutinise your unit economics. Here's the complete framework to get it right.",
    content: `# Unit Economics 101\n\nUnit economics is the direct revenue and costs associated with a particular business model expressed on a per unit basis...`,
    category: "Finance",
    author: "Founderstreet Team",
    authorRole: "Virtual CFO Team",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop",
    tags: ["unit economics", "fundraising", "CAC", "LTV"],
    readingTime: 8,
    featured: true,
    status: "published",
  },
  {
    slug: "private-limited-vs-llp-india-2025",
    title: "Pvt Ltd vs LLP in India: The Definitive 2025 Guide for Founders",
    excerpt:
      "Choosing the wrong entity structure can cost you your next funding round. Here's exactly which one to pick and why.",
    content: `# Pvt Ltd vs LLP: Which is Right for Your Startup?\n\nThe entity structure you choose at inception can determine whether investors will fund you...`,
    category: "Legal",
    author: "Founderstreet Team",
    authorRole: "Incorporation Team",
    coverImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop",
    tags: ["incorporation", "Pvt Ltd", "LLP", "startup legal"],
    readingTime: 10,
    featured: true,
    status: "published",
  },
  {
    slug: "pitch-deck-teardown-what-sequoia-wants-to-see",
    title: "Pitch Deck Teardown: What India's Top VCs Actually Want to See",
    excerpt:
      "We've reviewed 200+ pitch decks. Here are the exact slides that make investors lean forward—and the mistakes that get you passed over.",
    content: `# What VCs Actually Want to See in Your Pitch Deck\n\nMost pitch decks follow a template. The ones that raise capital tell a story...`,
    category: "Fundraising",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=630&fit=crop",
    tags: ["pitch deck", "fundraising", "VC", "investor"],
    readingTime: 12,
    featured: false,
    status: "published",
  },
];
