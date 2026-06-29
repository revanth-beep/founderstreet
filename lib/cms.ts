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

/**
 * Code-defined editorial articles. These are always merged into the post list
 * (deduped by slug, so a DB post with the same slug takes precedence). This lets
 * us publish curated articles without a database write.
 */
const EDITORIAL_POSTS: BlogPost[] = [
  {
    id: "editorial_indias-ipo-boom-vc-liquidity-2026",
    slug: "how-will-indias-ipo-boom-reshape-venture-capital-liquidity-in-2026",
    title: "How Will India's IPO Boom Reshape Venture Capital Liquidity in 2026?",
    excerpt:
      "India's 2025 IPO pipeline is set to drive liquidity upstream into private markets. Here is how public-market exits are reshaping VC underwriting, secondaries, and the rise of hybrid funds in 2026.",
    content: `# Venture Capital, Liquidity and the IPO Feedback Loop

The narrative for venture capital in 2026 is shifting from "markup" to "exit." The robust IPO pipeline established in 2025, where new-age tech companies saw strong investor appetite despite broader market flatness, is set to create a ripple effect throughout the private ecosystem.

As we move into 2026, success in the public markets is actively de-risking early-stage bets.

We expect the liquidity events at the top of the pyramid (IPOs) to drive capital upstream, reinvigorating the Series B and C funding landscapes.

However, this is not a return to indiscriminate risk-taking. Public market investors are rewarding profitability, governance, and operational discipline, signals that are now feeding directly back into private valuation frameworks. As a result, venture capital underwriting is becoming more synchronised with public market expectations far earlier in a company's lifecycle.

Timelines are not necessarily compressing. Building durable value takes time, and the "quick flip" mentality has been replaced by a focus on sustainable unit economics. Consequently, the secondary market is deepening, becoming a critical venue for liquidity rather than just a distress valve.

On the technology front, we must look past the "AI bubble" rhetoric surrounding the Magnificent Seven and focus on the application layer.

In India and Asia, the AI story for 2026 is not about building the next Large Language Model (LLM), but about the pragmatic integration of AI to strip out costs and boost productivity in traditional businesses.

We are seeing portfolio companies across sectors, from ed-tech to consumer services, deploying AI to optimise tech spend, rationalize headcount, and automate non-essential functions. The winners will not be those who build AI, but those who deploy it fastest and cheapest.

Furthermore, the structure of capital is evolving as the boundary between asset classes blurs. We are observing a crossover trend where public market strategies are increasingly incorporating private sleeves, giving rise to "hybrid funds."

These vehicles bridge the illiquidity of traditional venture capital with the cash-flow needs of family offices by blending listed assets with private pre-IPO allocations. This structure is likely to become dominant in 2026, allowing investors to capture private market alpha while managing liquidity profiles through a single product solution.

Source: <a href="https://www.lighthouse-canton.com/insights/how-will-indias-ipo-boom-reshape-venture-capital-liquidity-in-2026" target="_blank" rel="noopener noreferrer" style="color:#66BB3F;font-weight:600;text-decoration:underline;">Lighthouse Canton</a>`,
    category: "Funding",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=630&fit=crop",
    tags: ["venture capital", "IPO", "liquidity", "fundraising"],
    publishedAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
    readingTime: 6,
    featured: false,
    status: "published",
  },
];

function mergeEditorial(list: PostMeta[]): PostMeta[] {
  const slugs = new Set(list.map((p) => p.slug));
  const extras = EDITORIAL_POSTS.filter((e) => !slugs.has(e.slug)).map(metaFromBlogPost);
  return [...list, ...extras];
}

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
  let list: PostMeta[];
  if (!(await ensureReady()) || !sql) {
    list = sampleBlogPosts.map(metaFromBlogPost);
  } else {
    const rows = status
      ? await sql`SELECT * FROM cms_posts WHERE status = ${status} ORDER BY published_at DESC`
      : await sql`SELECT * FROM cms_posts ORDER BY published_at DESC`;
    list = (rows as PostRow[]).map(rowToMeta);
  }

  list = mergeEditorial(list);
  if (status) list = list.filter((p) => p.status === status);
  return list.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    const p = sampleBlogPosts.find((x) => x.slug === slug)
      ?? EDITORIAL_POSTS.find((x) => x.slug === slug);
    return p ?? null;
  }

  const rows = await sql`SELECT * FROM cms_posts WHERE slug = ${slug} LIMIT 1`;
  const r = rows[0] as PostRow | undefined;
  if (r) return rowToBlogPost(r);
  return EDITORIAL_POSTS.find((x) => x.slug === slug) ?? null;
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
