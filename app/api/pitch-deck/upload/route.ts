import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Issues a short-lived token so the browser can upload the pitch deck
// straight to Vercel Blob, bypassing the serverless request-body size limit.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ],
        maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        /* no-op: the analyze route reads and then deletes the blob */
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
