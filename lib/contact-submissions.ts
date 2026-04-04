import { ensureCmsSchema, getSql } from "@/lib/db";
import { generateId } from "@/lib/utils";

export type ContactSubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  stage: string;
  message: string;
};

export type ContactSubmissionRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  stage: string;
  message: string;
  createdAt: string;
};

type Row = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  stage: string;
  message: string;
  created_at: string;
};

function trimLen(s: string, max: number): string {
  return s.trim().slice(0, max);
}

export async function createContactSubmission(raw: ContactSubmissionInput): Promise<ContactSubmissionRow | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureCmsSchema();

  const firstName = trimLen(raw.firstName, 120);
  const lastName = trimLen(raw.lastName, 120);
  const email = trimLen(raw.email, 254).toLowerCase();
  const phone = trimLen(raw.phone, 40);
  const service = trimLen(raw.service, 200);
  const stage = trimLen(raw.stage, 120);
  const message = trimLen(raw.message, 8000);

  if (!firstName || !lastName || !email || !service || !stage || !message) {
    throw new Error("Missing required fields");
  }

  const id = generateId();
  await sql`
    INSERT INTO cms_contact_submissions (
      id, first_name, last_name, email, phone, service, stage, message
    ) VALUES (
      ${id}, ${firstName}, ${lastName}, ${email}, ${phone}, ${service}, ${stage}, ${message}
    );
  `;

  const rows = await sql`
    SELECT * FROM cms_contact_submissions WHERE id = ${id} LIMIT 1
  `;
  const r = rows[0] as Row | undefined;
  return r ? rowToPublic(r) : null;
}

function rowToPublic(r: Row): ContactSubmissionRow {
  return {
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    service: r.service,
    stage: r.stage,
    message: r.message,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function countContactSubmissions(): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  await ensureCmsSchema();
  const rows = await sql`
    SELECT count(*)::int AS c FROM cms_contact_submissions
  `;
  const r = rows[0] as { c: number } | undefined;
  return r?.c ?? 0;
}

export async function listContactSubmissions(limit = 200): Promise<ContactSubmissionRow[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureCmsSchema();
  const safeLimit = Math.min(Math.max(1, limit), 500);
  const rows = await sql`
    SELECT * FROM cms_contact_submissions
    ORDER BY created_at DESC
    LIMIT ${safeLimit}
  `;
  return (rows as Row[]).map(rowToPublic);
}
