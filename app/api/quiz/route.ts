import { NextRequest, NextResponse } from "next/server";

const SECTOR_LABELS: Record<string, string> = {
  b2b_saas: "B2B SaaS / Enterprise",
  d2c: "D2C / Consumer Brand",
  vertical_tech: "FinTech / EdTech / HealthTech",
  marketplace: "Marketplace / Platform",
};

const STAGE_LABELS: Record<string, string> = {
  idea: "Just an idea",
  mvp: "Building MVP",
  early_users: "Have early users",
  revenue: "Generating revenue",
};

const CHALLENGE_LABELS: Record<string, string> = {
  pmf: "Validating product-market fit",
  build: "Building the product",
  acquisition: "Acquiring first customers",
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
  answers: Record<string, string>
): string {
  const stage = STAGE_LABELS[answers.stage] ?? answers.stage ?? "N/A";
  const sector = SECTOR_LABELS[answers.sector] ?? answers.sector ?? "N/A";
  const challenge = CHALLENGE_LABELS[answers.challenge] ?? answers.challenge ?? "N/A";
  const team = TEAM_LABELS[answers.team] ?? answers.team ?? "N/A";
  const timeline = TIMELINE_LABELS[answers.timeline] ?? answers.timeline ?? "N/A";

  // Generate contextual SWOT points based on answers
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  if (answers.team === "two" || answers.team === "three_plus") {
    strengths.push("Multiple co-founders bring complementary skills and shared accountability.");
  } else if (answers.team === "team") {
    strengths.push("Early team formation shows execution capability and investor confidence.");
  } else {
    weaknesses.push("Solo founding increases execution risk — consider finding a co-founder.");
  }

  if (answers.stage === "revenue") {
    strengths.push("Revenue traction is your strongest signal — use it in every investor conversation.");
    opportunities.push("With revenue proof, you are in a strong position to raise a seed round.");
  } else if (answers.stage === "early_users") {
    strengths.push("Early user adoption validates demand before heavy capital deployment.");
    opportunities.push("Iterate fast on feedback to hit product-market fit before fundraising.");
  } else if (answers.stage === "mvp") {
    weaknesses.push("No users yet — prioritise getting your first 10 paying customers before raising.");
    opportunities.push("MVP stage is ideal for low-cost customer discovery.");
  } else {
    weaknesses.push("Idea stage carries the highest execution risk with no market proof.");
    opportunities.push("Validation workshops and landing-page tests can de-risk the idea cheaply.");
  }

  if (answers.sector === "b2b_saas") {
    opportunities.push("B2B SaaS has strong unit economics and recurring revenue — attractive to investors.");
    threats.push("Long B2B sales cycles can stretch your runway — plan for 3–6 month deal timelines.");
  } else if (answers.sector === "d2c") {
    opportunities.push("D2C brands can scale quickly with performance marketing and retail distribution.");
    threats.push("Customer acquisition costs in D2C are rising — strong branding and retention are critical.");
  } else if (answers.sector === "vertical_tech") {
    opportunities.push("Vertical tech (FinTech/EdTech/HealthTech) attracts dedicated sector-focused VCs.");
    threats.push("Regulatory compliance (RBI, DPDP Act) can be a barrier — factor this into your roadmap.");
  } else if (answers.sector === "marketplace") {
    weaknesses.push("Marketplace cold-start problem: both supply and demand need to be built simultaneously.");
    opportunities.push("Once liquidity is achieved, marketplaces have strong network-effect moats.");
  }

  if (answers.challenge === "funding") {
    opportunities.push("Founderstreet can connect you with 25+ active angel investors and VC partners.");
  } else if (answers.challenge === "pmf") {
    opportunities.push("Our Startup Validation service can help you test PMF with real customers in 2 weeks.");
  } else if (answers.challenge === "acquisition") {
    opportunities.push("Our marketing team specialises in early-stage D2C and B2B customer acquisition.");
  }

  if (answers.timeline === "3m") {
    threats.push("A 3-month fundraising timeline is aggressive — start warm introductions immediately.");
  }

  const renderList = (items: string[], color: string) =>
    items.length
      ? items.map((i) => `<li style="margin-bottom:6px;color:#3d4246;">${i}</li>`).join("")
      : `<li style="color:#A0A0A0;">Not enough data to generate specific points.</li>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your SWOT Report — Founderstreet</title></head>
<body style="margin:0;padding:0;background:#F5F5F3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F3;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#1B4332;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#66BB3F;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Founderstreet · by Northville Consulting Group</p>
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
    ["Stage", stage],
    ["Sector", sector],
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
            <p style="margin:0;font-size:12px;color:#A0A0A0;">© ${new Date().getFullYear()} Founderstreet · Northville Consulting Group. All rights reserved.</p>
            <p style="margin:4px 0 0;font-size:12px;color:#A0A0A0;">You received this because you completed our Startup Health Check quiz.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const FROM_ADDRESS = "Founderstreet <hi@founderstreet.in>";
// Internal inbox that gets a copy of every SWOT lead for follow-up.
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hello@northvilleconsultinggroup.com";

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
  answers: Record<string, string>
): string {
  const stage = STAGE_LABELS[answers.stage] ?? answers.stage ?? "N/A";
  const sector = SECTOR_LABELS[answers.sector] ?? answers.sector ?? "N/A";
  const challenge = CHALLENGE_LABELS[answers.challenge] ?? answers.challenge ?? "N/A";
  const team = TEAM_LABELS[answers.team] ?? answers.team ?? "N/A";
  const timeline = TIMELINE_LABELS[answers.timeline] ?? answers.timeline ?? "N/A";

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Stage", stage],
    ["Sector", sector],
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

async function sendEmail(to: string, name: string, answers: Record<string, string>) {
  // 1. SWOT report to the person who filled the form
  await resendSend({
    from: FROM_ADDRESS,
    to: [to],
    subject: `${name}, here's your free Startup SWOT Report`,
    html: buildSwotHtml(name, answers),
    reply_to: LEADS_INBOX,
  });

  // 2. Internal copy of the lead for follow-up (best-effort, never blocks the user)
  try {
    await resendSend({
      from: FROM_ADDRESS,
      to: [LEADS_INBOX],
      subject: `New SWOT lead: ${name}`,
      html: buildLeadNotificationHtml(name, to, answers),
      reply_to: to,
    });
  } catch (e) {
    console.error("Lead notification failed:", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, answers } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    await sendEmail(email, name, answers ?? {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
