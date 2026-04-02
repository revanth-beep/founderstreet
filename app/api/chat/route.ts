import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are Founder AI, an intelligent assistant for Founderstreet — India's premier startup infrastructure platform.

Your role is to:
1. Answer questions about startups, company incorporation, accounting, marketing, fundraising, and tech development in the Indian context
2. Provide knowledgeable, concise, and actionable advice
3. Educate founders about Founderstreet's specific services when relevant
4. Always end responses with a relevant call-to-action to book a call or explore a service

Founderstreet's core services:
- Test Your Idea: Market sizing, SWOT analysis, unit economics modelling
- Company Incorporation: Pvt Ltd, LLP formation in under 10 days. Includes DIN, DSC, MOA, AOA, trademark
- Accounting & Virtual CFO: Bookkeeping, GST, payroll, fundraising financial models
- Marketing & Retail: SEO, Google/Meta Ads, OOH advertising, retail distribution
- Web & Tech Development: Shopify, custom web apps, mobile apps, UI/UX
- Investor Funding: Pitch decks, financial projections, investor matchmaking

Key facts:
- Incorporation in under 10 days
- 150+ startups served
- ₹40Cr+ funding facilitated
- Pricing: Accounting from ₹8,000/month; incorporation packages available
- Based in Gurugram, serving all of India

Rules:
- Keep responses under 150 words
- Be conversational but professional
- Use simple language, avoid excessive jargon
- If someone asks about pricing, give ranges but encourage booking a call
- Always be honest about what you know vs. what requires a specialist conversation
- For legal questions beyond general guidance, recommend consulting with our incorporation team`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // If no API key, return a mock response
    if (!process.env.OPENAI_API_KEY) {
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

      let response =
        "Great question! I can help with that. Founderstreet specialises in exactly this area. Would you like to book a free 30-minute call with our team to get personalised guidance?";

      if (lastMessage.includes("llp") || lastMessage.includes("pvt ltd") || lastMessage.includes("private limited")) {
        response =
          "For VC-backed startups, Private Limited (Pvt Ltd) is almost always the right choice — it allows ESOPs, FDI, and is the only structure institutional investors accept. LLP works better for professional services firms. We can incorporate your Pvt Ltd in under 10 days. Want to book a call to get started?";
      } else if (lastMessage.includes("cost") || lastMessage.includes("price") || lastMessage.includes("fee")) {
        response =
          "Our pricing varies by service: Incorporation packages start from ₹15,000, accounting from ₹8,000/month, and pitch decks from ₹25,000. We offer bundled packages for startups needing multiple services. Book a free call and we'll give you an exact quote for your needs.";
      } else if (lastMessage.includes("fund") || lastMessage.includes("investor") || lastMessage.includes("raise")) {
        response =
          "Fundraising success comes down to three things: a compelling narrative, clean financials, and the right investor relationships. We help with all three — pitch deck creation, financial modelling, and warm introductions to our network of 200+ angels and VCs. Ready to start your round?";
      } else if (lastMessage.includes("incorporation") || lastMessage.includes("register") || lastMessage.includes("company")) {
        response =
          "We incorporate Private Limited companies in under 10 days. The process includes DIN/DSC for directors, name reservation, MOA/AOA drafting, SPICe+ filing, and post-incorporation setup (PAN, TAN, bank account). Everything handled end-to-end. Want to get started?";
      }

      return NextResponse.json({ message: response });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const message = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again or book a call with our team.";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "I'm having trouble right now. Please email us at hello@founderstreet.in or book a call." },
      { status: 200 }
    );
  }
}
