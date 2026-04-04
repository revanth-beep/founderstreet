import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sqlInstance: NeonQueryFunction<false, false> | null = null;

export function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function getSql(): NeonQueryFunction<false, false> | null {
  if (sqlInstance) return sqlInstance;
  const url = getDatabaseUrl();
  if (!url) return null;
  sqlInstance = neon(url);
  return sqlInstance;
}

export async function ensureCmsSchema(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Strategy',
      author TEXT NOT NULL,
      author_role TEXT NOT NULL DEFAULT '',
      cover_image TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      reading_time INT NOT NULL DEFAULT 5,
      featured BOOLEAN NOT NULL DEFAULT false,
      status TEXT NOT NULL DEFAULT 'published',
      published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_site_content (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  return true;
}
