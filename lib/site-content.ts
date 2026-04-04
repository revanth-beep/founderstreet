import { deepMerge } from "@/lib/deep-merge";
import { ensureCmsSchema, getSql } from "@/lib/db";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content-defaults";

export type { SiteContent, HeroCms } from "@/lib/site-content-defaults";

export async function getSiteContent(): Promise<SiteContent> {
  await ensureCmsSchema();
  const sql = getSql();
  if (!sql) {
    return structuredClone(defaultSiteContent);
  }
  const rows = await sql`SELECT data FROM cms_site_content WHERE id = 'main'`;
  const row = rows[0] as { data: unknown } | undefined;
  const raw = row?.data;
  if (!raw || typeof raw !== "object") {
    return structuredClone(defaultSiteContent);
  }
  return deepMerge(
    structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
    raw as Record<string, unknown>
  ) as unknown as SiteContent;
}

export async function getSiteContentRawFromDb(): Promise<Record<string, unknown> | null> {
  await ensureCmsSchema();
  const sql = getSql();
  if (!sql) return null;
  const rows = await sql`SELECT data FROM cms_site_content WHERE id = 'main'`;
  const row = rows[0] as { data: unknown } | undefined;
  if (!row?.data || typeof row.data !== "object") return null;
  return row.data as Record<string, unknown>;
}

export async function saveSiteContentToDb(data: SiteContent): Promise<void> {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL / POSTGRES_URL is not configured.");
  await ensureCmsSchema();
  const payload = JSON.stringify(data);
  await sql`
    INSERT INTO cms_site_content (id, data, updated_at)
    VALUES ('main', ${payload}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      data = EXCLUDED.data,
      updated_at = NOW();
  `;
}

/** Merge partial JSON over code defaults, then persist (Postgres required). */
export async function saveMergedSiteContent(partial: unknown): Promise<SiteContent> {
  if (!partial || typeof partial !== "object") {
    throw new Error("Invalid JSON body");
  }
  const merged = deepMerge(
    structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
    partial as Record<string, unknown>
  ) as unknown as SiteContent;
  await saveSiteContentToDb(merged);
  return merged;
}

/**
 * Merge a partial update into the **current live** content (defaults + DB),
 * then persist. Use this for section forms so other sections are not reset.
 */
export async function patchSiteContent(partial: Record<string, unknown>): Promise<SiteContent> {
  if (!partial || typeof partial !== "object") {
    throw new Error("Invalid patch");
  }
  const current = await getSiteContent();
  const merged = deepMerge(
    current as unknown as Record<string, unknown>,
    partial
  ) as unknown as SiteContent;
  await saveSiteContentToDb(merged);
  return merged;
}
