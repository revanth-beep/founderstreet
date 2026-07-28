import { NextRequest, NextResponse } from "next/server";

const INDUSTRY_LABELS: Record<string, string> = {
  consumer: "Consumer Products & Retail",
  technology: "Technology & Software",
  services: "Services & Marketplace",
  other: "Healthcare, Education & Other",
};

const CUSTOMER_LABELS: Record<string, string> = {
  b2c: "Individual consumers (B2C)",
  b2b: "Other businesses (B2B)",
  b2b2c: "Both consumers & businesses",
  govt: "Government / Institutions",
};

const STAGE_LABELS: Record<string, string> = {
  idea: "Just an idea",
  mvp: "Building the product",
  early_users: "Launched, early customers",
  revenue: "Generating steady revenue",
};

const CHALLENGE_LABELS: Record<string, string> = {
  pmf: "Validating the idea / market fit",
  build: "Building the product",
  acquisition: "Acquiring customers",
  funding: "Raising funding",
};

const TEAM_LABELS: Record<string, string> = {
  solo: "Solo founder",
  two: "2 co-founders",
  three_plus: "3+ founders",
  team: "Small team (5+)",
};

const TIMELINE_LABELS: Record<string, string> = {
  "3m": "Within 3 months",
  "6m": "3–6 months",
  "12m": "6–12 months",
  not_yet: "Not focused on raising yet",
};

function buildSwotHtml(
  name: string,
  description: string,
  answers: Record<string, string>
): string {
  const stage = STAGE_LABELS[answers.stage] ?? answers.stage ?? "N/A";
  const industry = INDUSTRY_LABELS[answers.industry] ?? answers.industry ?? "N/A";
  const customers = CUSTOMER_LABELS[answers.customers] ?? answers.customers ?? "N/A";
  const challenge = CHALLENGE_LABELS[answers.challenge] ?? answers.challenge ?? "N/A";
  const team = TEAM_LABELS[answers.team] ?? answers.team ?? "N/A";
  const timeline = TIMELINE_LABELS[answers.timeline] ?? answers.timeline ?? "N/A";
  const whatYouDo = (description || "").trim();

  // Generate contextual SWOT points based on answers (industry-agnostic)
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  // Team
  if (answers.team === "two" || answers.team === "three_plus") {
    strengths.push("Multiple co-founders bring complementary skills and shared accountability.");
  } else if (answers.team === "team") {
    strengths.push("An early team in place shows execution capability and gives investors confidence.");
  } else {
    weaknesses.push("Solo founding increases execution risk. Consider finding a co-founder or early key hire.");
  }

  // Stage
  if (answers.stage === "revenue") {
    strengths.push("Revenue traction is your strongest signal. Lead with it in every investor conversation.");
    opportunities.push("With revenue proof, you are in a strong position to raise your next round.");
  } else if (answers.stage === "early_users") {
    strengths.push("Early customer adoption validates real demand before heavy capital is deployed.");
    opportunities.push("Iterate fast on customer feedback to reach product-market fit before fundraising.");
  } else if (answers.stage === "mvp") {
    weaknesses.push("No paying customers yet. Prioritise your first 10 paying customers before raising.");
    opportunities.push("Product-build stage is ideal for low-cost customer discovery and pre-orders.");
  } else {
    weaknesses.push("Idea stage carries the highest execution risk with no market proof yet.");
    opportunities.push("Validation sprints and landing-page tests can de-risk the idea cheaply.");
  }

  // Customer type
  if (answers.customers === "b2b") {
    opportunities.push("B2B models often have stronger unit economics and recurring revenue. Attractive to investors.");
    threats.push("B2B sales cycles can be long. Plan for multi-month deal timelines and a clear pipeline.");
  } else if (answers.customers === "b2c") {
    threats.push("Customer acquisition costs are rising across consumer categories. Retention and brand are critical.");
    opportunities.push("Strong B2C brands can scale quickly with the right performance-marketing and distribution mix.");
  } else if (answers.customers === "b2b2c") {
    weaknesses.push("Serving both consumers and businesses can split focus. Be clear on which side you win first.");
  } else if (answers.customers === "govt") {
    threats.push("Government and institutional sales involve long procurement cycles and compliance requirements.");
  }

  // Industry-specific note
  if (answers.industry === "other") {
    threats.push("Regulated sectors (healthcare, education, finance) need compliance built into the roadmap early.");
  } else if (answers.industry === "services") {
    weaknesses.push("Service and marketplace models can be hard to scale without standardised processes or liquidity.");
  }

  // Challenge -> FounderStreet service match
  if (answers.challenge === "funding") {
    opportunities.push("FounderStreet can connect you with 25+ active angel investors and VC partners.");
  } else if (answers.challenge === "pmf") {
    opportunities.push("Our Startup Validation service can help you test market fit with real customers in 2 weeks.");
  } else if (answers.challenge === "acquisition") {
    opportunities.push("Our marketing team specialises in early-stage customer acquisition across B2C and B2B.");
  } else if (answers.challenge === "build") {
    opportunities.push("Our tech team can help you ship a focused first version without over-building.");
  }

  // Timeline
  if (answers.timeline === "3m") {
    threats.push("A 3-month fundraising timeline is aggressive. Start warm introductions immediately.");
  }

  // Market sizing note built from the founder's own description of the business
  const marketNote = whatYouDo
    ? `Because you described your startup as "${whatYouDo}", your market should be sized for that exact niche, not the broad category. Two businesses in the same industry can have very different addressable markets, so we size yours from the specific segment, geography, and customer you actually serve.`
    : `Market size depends heavily on your exact niche, not just the broad industry. We size your TAM/SAM/SOM from the specific segment, geography, and customer you serve.`;

  const renderList = (items: string[], color: string) =>
    items.length
      ? items.map((i) => `<li style="margin-bottom:6px;color:#3d4246;">${i}</li>`).join("")
      : `<li style="color:#A0A0A0;">Not enough data to generate specific points.</li>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your SWOT Report — FounderStreet</title></head>
<body style="margin:0;padding:0;background:#F5F5F3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F3;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#1B4332;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#66BB3F;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">FounderStreet · by Northville Consulting Group</p>
            <h1 style="margin:0;color:#FFFFFF;font-size:26px;font-weight:700;line-height:1.2;">Your Free Startup SWOT Report</h1>
          </td>
        </tr>
        <!-- Greeting -->
        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0 0 8px;font-size:16px;color:#3d4246;">Hi ${name},</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#5A5A5A;">
              Based on your answers, here is your personalised Startup SWOT Report. Use this as a starting point to identify where to focus your energy as you build and scale.
            </p>
          </td>
        </tr>
        <!-- Your Answers -->
        <tr>
          <td style="padding:24px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F9F7;border-radius:8px;overflow:hidden;">
              <tr><td style="padding:16px 20px;border-bottom:1px solid #EBEBEB;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#66BB3F;">Your Profile</p>
              </td></tr>
              ${[
    ...(whatYouDo ? [["What You Do", whatYouDo]] : []),
    ["Stage", stage],
    ["Industry", industry],
    ["Customers", customers],
    ["Main Challenge", challenge],
    ["Team", team],
    ["Funding Timeline", timeline],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 20px;border-bottom:1px solid #EBEBEB;">
            <span style="font-size:12px;color:#A0A0A0;">${label}: </span>
            <span style="font-size:13px;font-weight:600;color:#3d4246;">${value}</span>
          </td></tr>`
    )
    .join("")}
            </table>
          </td>
        </tr>
        <!-- SWOT -->
        <tr>
          <td style="padding:24px 40px 0;">
            <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse:collapse;">
              <!-- Strengths & Weaknesses -->
              <tr>
                <td width="50%" style="vertical-align:top;padding:12px 12px 12px 0;">
                  <div style="background:#E9F6E4;border-radius:8px;padding:16px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#2D7A3A;">Strengths</p>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.6;">${renderList(strengths, "#2D7A3A")}</ul>
                  </div>
                </td>
                <td width="50%" style="vertical-align:top;padding:12px 0 12px 12px;">
                  <div style="background:#FFF4E5;border-radius:8px;padding:16px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#C07000;">Weaknesses</p>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.6;">${renderList(weaknesses, "#C07000")}</ul>
                  </div>
                </td>
              </tr>
              <!-- Opportunities & Threats -->
              <tr>
                <td width="50%" style="vertical-align:top;padding:0 12px 0 0;">
                  <div style="background:#E8F0FF;border-radius:8px;padding:16px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1A4EBF;">Opportunities</p>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.6;">${renderList(opportunities, "#1A4EBF")}</ul>
                  </div>
                </td>
                <td width="50%" style="vertical-align:top;padding:0 0 0 12px;">
                  <div style="background:#FFEAEA;border-radius:8px;padding:16px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#BF1A1A;">Threats</p>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.6;">${renderList(threats, "#BF1A1A")}</ul>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Market Sizing Note -->
        <tr>
          <td style="padding:8px 40px 0;">
            <div style="background:#F4F1E8;border-left:3px solid #66BB3F;border-radius:6px;padding:16px 18px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1B4332;">On Market Sizing</p>
              <p style="margin:0;font-size:13px;line-height:1.7;color:#5A5A5A;">${marketNote}</p>
            </div>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <div style="background:#1B4332;border-radius:8px;padding:24px;text-align:center;">
              <p style="margin:0 0 8px;color:#FFFFFF;font-size:15px;font-weight:700;">Want a deeper analysis?</p>
              <p style="margin:0 0 16px;color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6;">Book a free 30-minute discovery call and our team will walk you through a full market validation plan.</p>
              <a href="https://founderstreet.in/contact" style="display:inline-block;background:#66BB3F;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:6px;">Book a Free Call</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #EBEBEB;text-align:center;">
            <p style="margin:0;font-size:12px;color:#A0A0A0;">© ${new Date().getFullYear()} FounderStreet · Northville Consulting Group. All rights reserved.</p>
            <p style="margin:4px 0 0;font-size:12px;color:#A0A0A0;">You received this because you completed our Startup Health Check quiz.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const FROM_ADDRESS = "FounderStreet <hi@founderstreet.in>";
// Internal inbox that gets a copy of every SWOT lead for follow-up.
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

async function resendSend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }
}

function buildLeadNotificationHtml(
  name: string,
  email: string,
  phone: string,
  description: string,
  answers: Record<string, string>
): string {
  const stage = STAGE_LABELS[answers.stage] ?? answers.stage ?? "N/A";
  const industry = INDUSTRY_LABELS[answers.industry] ?? answers.industry ?? "N/A";
  const customers = CUSTOMER_LABELS[answers.customers] ?? answers.customers ?? "N/A";
  const challenge = CHALLENGE_LABELS[answers.challenge] ?? answers.challenge ?? "N/A";
  const team = TEAM_LABELS[answers.team] ?? answers.team ?? "N/A";
  const timeline = TIMELINE_LABELS[answers.timeline] ?? answers.timeline ?? "N/A";

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", (phone || "").trim() || "N/A"],
    ["What They Do", (description || "").trim() || "N/A"],
    ["Stage", stage],
    ["Industry", industry],
    ["Customers", customers],
    ["Main Challenge", challenge],
    ["Team", team],
    ["Funding Timeline", timeline],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;">${label}</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${value}</td></tr>`
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;max-width:560px;">
    <h2 style="color:#1B4332;">New SWOT Quiz Lead</h2>
    <p style="color:#5A5A5A;">Someone just completed the Startup Health Check quiz. Their details:</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
    <p style="color:#A0A0A0;font-size:12px;margin-top:16px;">A full SWOT report was automatically emailed to ${email}.</p>
  </div>`;
}

// Plain-text version of the report. Including a text/plain alternative makes
// the email look transactional (not marketing), which helps it land in the
// primary inbox rather than the Promotions tab.
function buildSwotText(name: string): string {
  return `Hi ${name},

Here is your free personalised Startup SWOT Report from FounderStreet.

Open this email in an HTML-capable client to see your full Strengths, Weaknesses, Opportunities and Threats, plus a market-sizing note tailored to your startup.

Want a deeper analysis? Reply to this email or book a free 30-minute discovery call at https://founderstreet.in/contact

FounderStreet, by Northville Consulting Group.`;
}

async function sendEmail(to: string, name: string, phone: string, description: string, answers: Record<string, string>) {
  // 1. SWOT report to the person who filled the form
  await resendSend({
    from: FROM_ADDRESS,
    to: [to],
    subject: `${name}, here is your Startup SWOT Report`,
    html: buildSwotHtml(name, description, answers),
    text: buildSwotText(name),
    reply_to: LEADS_INBOX,
    headers: {
      "List-Unsubscribe": `<mailto:${LEADS_INBOX}?subject=unsubscribe>`,
    },
  });

  // 2. Internal copy of the lead for follow-up (best-effort, never blocks the user)
  try {
    await resendSend({
      from: FROM_ADDRESS,
      to: [LEADS_INBOX],
      subject: `New SWOT lead: ${name}`,
      html: buildLeadNotificationHtml(name, to, phone, description, answers),
      reply_to: to,
    });
  } catch (e) {
    console.error("Lead notification failed:", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, description, answers } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    await sendEmail(email, name, phone ?? "", description ?? "", answers ?? {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
