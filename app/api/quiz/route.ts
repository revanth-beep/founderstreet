import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, answers } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // Store lead in KV / send welcome email
    console.log("Quiz lead:", { name, email, answers });

    // In production: trigger email with SWOT report template
    // await sendEmail({
    //   to: email,
    //   subject: "Your Free Startup SWOT Report — Founderstreet",
    //   template: "swot-report",
    //   data: { name, answers }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
