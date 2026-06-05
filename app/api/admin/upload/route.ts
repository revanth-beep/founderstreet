import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth-admin";

export async function POST(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured. Add Vercel Blob in your project." },
      { status: 503 }
    );
  }

  const maxBytes = 4 * 1024 * 1024;

  const form = await request.formData();
  const file = form.get("file");
  if (!file || !(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > maxBytes) {
    return NextResponse.json({ error: "File too large (max 4 MB). Please compress or resize the image first." }, { status: 400 });
  }

  const mime = (file as Blob).type || "";
  if (mime && !mime.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }

  const name = (form.get("filename") as string) || "upload";
  const safe = String(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const pathname = `cms/uploads/${Date.now()}-${safe}`;

  const buf = Buffer.from(await file.arrayBuffer());

  let blob;
  try {
    blob = await put(pathname, buf, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (putErr) {
    const msg = putErr instanceof Error ? putErr.message : String(putErr);
    if (msg.includes("private store")) {
      return NextResponse.json(
        { error: "Your Vercel Blob store is set to private. Go to Vercel → Storage → your Blob store → Settings and change access to Public, then try again." },
        { status: 503 }
      );
    }
    throw putErr;
  }

  return NextResponse.json({ url: blob.url });
}
