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

  await sql`
    CREATE TABLE IF NOT EXISTS cms_contact_submissions (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      service TEXT NOT NULL,
      stage TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS cms_contact_submissions_created_at_idx
    ON cms_contact_submissions (created_at DESC);
  `;

  return true;
}
