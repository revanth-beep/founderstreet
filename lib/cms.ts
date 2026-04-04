import { ensureCmsSchema, getSql } from "@/lib/db";
import { generateId } from "@/lib/utils";

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
  /** Present for listings / featured cards */
  author: string;
  coverImage?: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
}

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role: string;
  cover_image: string | null;
  tags: string;
  reading_time: number;
  featured: boolean;
  status: string;
  published_at: string;
  updated_at: string;
};

function parseTags(raw: string): string[] {
  try {
    const j = JSON.parse(raw) as unknown;
    return Array.isArray(j) ? j.map(String) : [];
  } catch {
    return [];
  }
}

function asIso(v: string | Date): string {
  if (v instanceof Date) return v.toISOString();
  return new Date(v).toISOString();
}

function rowToBlogPost(r: PostRow): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    author: r.author,
    authorRole: r.author_role,
    coverImage: r.cover_image ?? undefined,
    tags: parseTags(r.tags),
    publishedAt: asIso(r.published_at),
    updatedAt: asIso(r.updated_at),
    readingTime: r.reading_time,
    featured: r.featured,
    status: r.status === "draft" ? "draft" : "published",
  };
}

function rowToMeta(r: PostRow): PostMeta {
  const b = rowToBlogPost(r);
  return metaFromBlogPost(b);
}

function metaFromBlogPost(b: BlogPost): PostMeta {
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    author: b.author,
    coverImage: b.coverImage,
    publishedAt: b.publishedAt,
    readingTime: b.readingTime,
    featured: b.featured,
    status: b.status,
  };
}

function sampleToBlogPost(
  raw: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): BlogPost {
  const now = new Date().toISOString();
  return {
    ...raw,
    id: `seed_${raw.slug}`,
    publishedAt: now,
    updatedAt: now,
  };
}

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

const sampleBlogPosts: BlogPost[] = SAMPLE_POSTS.map(sampleToBlogPost);

async function seedPostsIfEmpty(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  const c = await sql`SELECT COUNT(*)::int AS n FROM cms_posts`;
  const n = (c[0] as { n: number }).n;
  if (n > 0) return;

  for (const raw of SAMPLE_POSTS) {
    const post = sampleToBlogPost(raw);
    const tagsJson = JSON.stringify(post.tags);
    await sql`
      INSERT INTO cms_posts (
        id, slug, title, excerpt, content, category, author, author_role,
        cover_image, tags, reading_time, featured, status, published_at, updated_at
      ) VALUES (
        ${post.id}, ${post.slug}, ${post.title}, ${post.excerpt}, ${post.content},
        ${post.category}, ${post.author}, ${post.authorRole},
        ${post.coverImage ?? null}, ${tagsJson}, ${post.readingTime},
        ${post.featured}, ${post.status}, ${post.publishedAt}, ${post.updatedAt}
      )
      ON CONFLICT (slug) DO NOTHING;
    `;
  }
}

async function ensureReady(): Promise<boolean> {
  const ok = await ensureCmsSchema();
  if (!ok) return false;
  await seedPostsIfEmpty();
  return true;
}

export async function getAllPosts(status?: "draft" | "published"): Promise<PostMeta[]> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    let list = sampleBlogPosts.map(metaFromBlogPost);
    if (status) list = list.filter((p) => p.status === status);
    return list.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  const rows = status
    ? await sql`SELECT * FROM cms_posts WHERE status = ${status} ORDER BY published_at DESC`
    : await sql`SELECT * FROM cms_posts ORDER BY published_at DESC`;

  return (rows as PostRow[]).map(rowToMeta);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    const p = sampleBlogPosts.find((x) => x.slug === slug);
    return p ?? null;
  }

  const rows = await sql`SELECT * FROM cms_posts WHERE slug = ${slug} LIMIT 1`;
  const r = rows[0] as PostRow | undefined;
  return r ? rowToBlogPost(r) : null;
}

export async function createPost(
  data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): Promise<BlogPost> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    throw new Error("DATABASE_URL / POSTGRES_URL is required to create posts.");
  }

  const id = generateId();
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id,
    publishedAt: now,
    updatedAt: now,
  };

  const tagsJson = JSON.stringify(post.tags ?? []);

  await sql`
    INSERT INTO cms_posts (
      id, slug, title, excerpt, content, category, author, author_role,
      cover_image, tags, reading_time, featured, status, published_at, updated_at
    ) VALUES (
      ${post.id}, ${post.slug}, ${post.title}, ${post.excerpt}, ${post.content},
      ${post.category}, ${post.author}, ${post.authorRole},
      ${post.coverImage ?? null}, ${tagsJson}, ${post.readingTime},
      ${post.featured}, ${post.status}, ${post.publishedAt}, ${post.updatedAt}
    );
  `;

  return post;
}

export async function updatePost(
  slug: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) return null;

  const existing = await getPostBySlug(slug);
  if (!existing) return null;

  const next: BlogPost = {
    ...existing,
    ...data,
    slug: existing.slug,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  const tagsJson = JSON.stringify(next.tags ?? []);

  await sql`
    UPDATE cms_posts SET
      title = ${next.title},
      excerpt = ${next.excerpt},
      content = ${next.content},
      category = ${next.category},
      author = ${next.author},
      author_role = ${next.authorRole},
      cover_image = ${next.coverImage ?? null},
      tags = ${tagsJson},
      reading_time = ${next.readingTime},
      featured = ${next.featured},
      status = ${next.status},
      updated_at = ${next.updatedAt}
    WHERE slug = ${slug};
  `;

  return next;
}

export async function deletePost(slug: string): Promise<boolean> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) return false;
  await sql`DELETE FROM cms_posts WHERE slug = ${slug}`;
  return true;
}
