import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // In production: store in Vercel KV or email service (Mailchimp/Resend)

    // Example KV storage (uncomment when KV is configured):
    // const { kv } = await import("@vercel/kv");
    // const existing = await kv.lrange("subscribers", 0, -1);
    // if (!existing.includes(email)) {
    //   await kv.lpush("subscribers", email);
    // }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
