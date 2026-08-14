import { getSql } from "@/lib/db";

// Server-only key/value store for secrets like API keys. Never sent to the client.

async function ensure(sql: NonNullable<ReturnType<typeof getSql>>): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

export async function getConfig(key: string): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    await ensure(sql);
    const rows = await sql`SELECT value FROM app_config WHERE key = ${key} LIMIT 1`;
    const r = rows[0] as { value?: string } | undefined;
    return r?.value ?? null;
  } catch (e) {
    console.error("getConfig failed:", e);
    return null;
  }
}

export async function setConfig(key: string, value: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await ensure(sql);
  await sql`
    INSERT INTO app_config (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
  `;
  return true;
}
