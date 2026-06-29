import { ensureCmsSchema, getSql } from "@/lib/db";
import { generateId } from "@/lib/utils";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
}

export interface CMSManifest {
  posts: PostMeta[];
  lastUpdated: string;
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Present for listings / featured cards */
  author: string;
  coverImage?: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  status: "draft" | "published";
}

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role: string;
  cover_image: string | null;
  tags: string;
  reading_time: number;
  featured: boolean;
  status: string;
  published_at: string;
  updated_at: string;
};

function parseTags(raw: string): string[] {
  try {
    const j = JSON.parse(raw) as unknown;
    return Array.isArray(j) ? j.map(String) : [];
  } catch {
    return [];
  }
}

function asIso(v: string | Date): string {
  if (v instanceof Date) return v.toISOString();
  return new Date(v).toISOString();
}

function rowToBlogPost(r: PostRow): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    author: r.author,
    authorRole: r.author_role,
    coverImage: r.cover_image ?? undefined,
    tags: parseTags(r.tags),
    publishedAt: asIso(r.published_at),
    updatedAt: asIso(r.updated_at),
    readingTime: r.reading_time,
    featured: r.featured,
    status: r.status === "draft" ? "draft" : "published",
  };
}

function rowToMeta(r: PostRow): PostMeta {
  const b = rowToBlogPost(r);
  return metaFromBlogPost(b);
}

function metaFromBlogPost(b: BlogPost): PostMeta {
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    author: b.author,
    coverImage: b.coverImage,
    publishedAt: b.publishedAt,
    readingTime: b.readingTime,
    featured: b.featured,
    status: b.status,
  };
}

function sampleToBlogPost(
  raw: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): BlogPost {
  const now = new Date().toISOString();
  return {
    ...raw,
    id: `seed_${raw.slug}`,
    publishedAt: now,
    updatedAt: now,
  };
}

export const SAMPLE_POSTS: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">[] = [
  {
    slug: "unit-economics-101-what-every-founder-must-know",
    title: "Unit Economics 101: What Every Founder Must Know Before Raising",
    excerpt:
      "Before any investor writes a cheque, they will scrutinise your unit economics. Here's the complete framework to get it right.",
    content: `# Unit Economics 101\n\nUnit economics is the direct revenue and costs associated with a particular business model expressed on a per unit basis...`,
    category: "Finance",
    author: "Founderstreet Team",
    authorRole: "Virtual CFO Team",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop",
    tags: ["unit economics", "fundraising", "CAC", "LTV"],
    readingTime: 8,
    featured: true,
    status: "published",
  },
  {
    slug: "private-limited-vs-llp-india-2025",
    title: "Pvt Ltd vs LLP in India: The Definitive 2025 Guide for Founders",
    excerpt:
      "Choosing the wrong entity structure can cost you your next funding round. Here's exactly which one to pick and why.",
    content: `# Pvt Ltd vs LLP: Which is Right for Your Startup?\n\nThe entity structure you choose at inception can determine whether investors will fund you...`,
    category: "Legal",
    author: "Founderstreet Team",
    authorRole: "Incorporation Team",
    coverImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop",
    tags: ["incorporation", "Pvt Ltd", "LLP", "startup legal"],
    readingTime: 10,
    featured: true,
    status: "published",
  },
  {
    slug: "pitch-deck-teardown-what-sequoia-wants-to-see",
    title: "Pitch Deck Teardown: What India's Top VCs Actually Want to See",
    excerpt:
      "We've reviewed 200+ pitch decks. Here are the exact slides that make investors lean forward—and the mistakes that get you passed over.",
    content: `# What VCs Actually Want to See in Your Pitch Deck\n\nMost pitch decks follow a template. The ones that raise capital tell a story...`,
    category: "Fundraising",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=630&fit=crop",
    tags: ["pitch deck", "fundraising", "VC", "investor"],
    readingTime: 12,
    featured: false,
    status: "published",
  },
];

const sampleBlogPosts: BlogPost[] = SAMPLE_POSTS.map(sampleToBlogPost);

/**
 * Code-defined editorial articles. These are always merged into the post list
 * (deduped by slug, so a DB post with the same slug takes precedence). This lets
 * us publish curated articles without a database write.
 */
const EDITORIAL_POSTS: BlogPost[] = [
  {
    id: "editorial_indias-ipo-boom-vc-liquidity-2026",
    slug: "how-will-indias-ipo-boom-reshape-venture-capital-liquidity-in-2026",
    title: "How Will India's IPO Boom Reshape Venture Capital Liquidity in 2026?",
    excerpt:
      "India's 2025 IPO pipeline is set to drive liquidity upstream into private markets. Here is how public-market exits are reshaping VC underwriting, secondaries, and the rise of hybrid funds in 2026.",
    content: `# Venture Capital, Liquidity and the IPO Feedback Loop

The narrative for venture capital in 2026 is shifting from "markup" to "exit." The robust IPO pipeline established in 2025, where new-age tech companies saw strong investor appetite despite broader market flatness, is set to create a ripple effect throughout the private ecosystem.

As we move into 2026, success in the public markets is actively de-risking early-stage bets.

We expect the liquidity events at the top of the pyramid (IPOs) to drive capital upstream, reinvigorating the Series B and C funding landscapes.

However, this is not a return to indiscriminate risk-taking. Public market investors are rewarding profitability, governance, and operational discipline, signals that are now feeding directly back into private valuation frameworks. As a result, venture capital underwriting is becoming more synchronised with public market expectations far earlier in a company's lifecycle.

Timelines are not necessarily compressing. Building durable value takes time, and the "quick flip" mentality has been replaced by a focus on sustainable unit economics. Consequently, the secondary market is deepening, becoming a critical venue for liquidity rather than just a distress valve.

On the technology front, we must look past the "AI bubble" rhetoric surrounding the Magnificent Seven and focus on the application layer.

In India and Asia, the AI story for 2026 is not about building the next Large Language Model (LLM), but about the pragmatic integration of AI to strip out costs and boost productivity in traditional businesses.

We are seeing portfolio companies across sectors, from ed-tech to consumer services, deploying AI to optimise tech spend, rationalize headcount, and automate non-essential functions. The winners will not be those who build AI, but those who deploy it fastest and cheapest.

Furthermore, the structure of capital is evolving as the boundary between asset classes blurs. We are observing a crossover trend where public market strategies are increasingly incorporating private sleeves, giving rise to "hybrid funds."

These vehicles bridge the illiquidity of traditional venture capital with the cash-flow needs of family offices by blending listed assets with private pre-IPO allocations. This structure is likely to become dominant in 2026, allowing investors to capture private market alpha while managing liquidity profiles through a single product solution.

Source: <a href="https://www.lighthouse-canton.com/insights/how-will-indias-ipo-boom-reshape-venture-capital-liquidity-in-2026" target="_blank" rel="noopener noreferrer" style="color:#66BB3F;font-weight:600;text-decoration:underline;">Lighthouse Canton</a>`,
    category: "Funding",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=630&fit=crop",
    tags: ["venture capital", "IPO", "liquidity", "fundraising"],
    publishedAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
    readingTime: 6,
    featured: false,
    status: "published",
  },
  {
    id: "editorial_indian-ib-market-evolving-2026",
    slug: "how-indian-ib-market-is-evolving-in-2026",
    title: "How Indian IB Market is Evolving in 2026",
    excerpt:
      "From fintech disruption to an IPO boom, cross-border M&A, and the rise of ESG investing, here are the key trends and challenges reshaping India's investment banking market in 2026.",
    content: `India's investment banking scene is buzzing with energy, and it is not just because of billion-dollar transactions anymore. A mix of rising startups, progressive policy reforms, and an influx of global capital is reshaping the country's financial landscape. Investment banking in India is evolving in ways we could have only imagined a few years ago.

Gone are the days when big deals were conducted behind closed doors, in stuffy boardrooms. Today's financial landscape is fast-paced, fueled by technology, creative deal-making, and an emerging class of sharp, forward-thinking investors. It is a space where traditional players are collaborating with disruptors and where the future of finance is being reimagined every day.

Let us dive into the key trends and challenges that are reshaping the Indian investment banking market in 2026.

# The Rise of Fintech: A New Playing Field

Fintech is no longer just a buzzword; it is a game-changer that is fundamentally altering the way we think about finance. The rise of digital payment platforms, online lending, and robo-advisors has put pressure on traditional investment banks to innovate or risk being left behind. These startups are offering solutions that are faster, more efficient, and more user-friendly, making it increasingly difficult for legacy institutions to compete without adapting.

What is more, fintech is no longer just nibbling at the edges of the traditional financial system, it is devouring the playbook. Platforms like Paytm, Razorpay, and Cred are revolutionizing payments, while lending platforms like Bajaj Finserv and MoneyTap are making personal loans more accessible with just a few clicks. This is forcing established banks to rethink how they operate.

## The Response from Traditional Banks

In response to this disruption, traditional financial institutions are not sitting idle. Many have begun strategic partnerships or have outright acquired fintech startups to tap into their customer base and expertise. Banks are also investing heavily in their own digital infrastructures, whether by upgrading legacy systems or building entirely new platforms.

For example, HDFC Bank has partnered with Finbox, a fintech player, to provide buy now, pay later services. Similarly, ICICI Bank has revamped its mobile app to offer seamless digital banking experiences, integrating everything from bill payments to loan approvals.

## Takeaway for Investment Banks

In today's world, staying ahead means embracing technology. Whether it is offering digital payment solutions or streamlining the lending process, investment banks need to innovate and adapt to keep up with the rapidly changing market.

# IPO Boom: A Gateway to Global Capital

India's IPO market is booming, and the pace of companies lining up to go public has reached a level that is unprecedented. There is a huge appetite for capital, and companies are eager to tap into global markets. This surge in IPO activity is not just creating wealth for companies; it is democratizing access to investment opportunities, particularly with the influx of retail investors looking to diversify their portfolios.

## What is Driving the IPO Surge?

The IPO boom is being driven by several factors. Policy reforms aimed at making India a more investment-friendly country, combined with a bullish stock market, have opened the floodgates for IPOs. SEBI has been actively introducing regulatory measures to make the process smoother, which has made it easier for companies to go public.

Moreover, the rise of companies like Zomato, Nykaa, and Paytm going public has inspired others to follow suit. These high-profile IPOs have highlighted the wealth potential of listing on the Indian stock market, and companies are rushing to capitalize on this momentum.

## Challenges

But, with growth comes challenges. Valuations are climbing to unprecedented heights in certain sectors, leading to concerns about a potential bubble. As prices rise, both investors and regulatory bodies are becoming increasingly cautious. It is crucial for investment banks to conduct rigorous due diligence and ensure that the companies they are advising are ready for the scrutiny that comes with being a public entity.

## Takeaway for Investment Banks

As the IPO market heats up, investment banks must stay vigilant. The key to long-term success will be in ensuring transparency and maintaining rigorous standards. Helping companies navigate the IPO process while managing expectations will be crucial.

# Cross-Border Deals: Bridging the Global Divide

India is fast becoming a magnet for foreign investment, and this is driving a surge in cross-border M&A activity. Global companies are recognizing the vast potential in India's consumer market, and many are eager to tap into the skilled Indian workforce.

For investment banks, this trend presents exciting opportunities and challenges. Facilitating these complex, cross-border deals requires a deep understanding of international regulations, as well as cultural nuances. India's diverse market means that global companies often need local expertise to successfully navigate the complexities of business practices, regulatory requirements, and consumer behavior.

## The Role of Investment Banks

Investment banks play a pivotal role in ensuring that cross-border deals are executed smoothly. They act as intermediaries, helping companies find strategic partners, navigate legal hurdles, and structure deals that are mutually beneficial.

For instance, Amazon's acquisition of Future Group and Walmart's acquisition of Flipkart were both deals where investment banks facilitated negotiations, due diligence, and structuring of the deal.

## Takeaway for Investment Banks

Global partnerships are becoming more common, and investment banks need to have the right expertise to bridge the cultural and regulatory divide between regions. This requires building strong relationships and understanding the nuances of different markets.

# ESG Investing: The Conscience of Capital

Environmental, social, and governance (ESG) factors are rapidly becoming mainstream, driving investment decisions across the globe. No longer are these concerns confined to a small niche of investors; they are now central to the way major funds and investment banks are structuring their deals.

With growing awareness of climate change, inequality, and corporate responsibility, companies are under pressure to align with sustainable practices. ESG investing has now become a key driver of investment decisions, and investment banks are increasingly offering guidance on green bonds, impact investments, and sustainable business models.

## The Role of Investment Banks in ESG

Investment banks are advising companies on how to integrate ESG factors into their business models, ensuring that they not only comply with regulations but also meet investor expectations. Structuring green bonds, for instance, has become a lucrative way for companies to raise capital while promoting sustainable initiatives.

## Takeaway for Investment Banks

The growing focus on ESG represents a huge opportunity for investment banks to differentiate themselves. Offering sustainable financial products and advising companies on their ESG compliance will become increasingly important.

# Looking Ahead: Navigating the Uncertainties of 2026 and Beyond

As we approach 2026, the Indian investment banking market is poised for further transformation. The increasing adoption of technology, the rise of fintech, and the growing importance of ESG investing mean that investment banks need to adapt quickly to stay ahead.

However, this evolving landscape also brings uncertainties. As valuations climb, and as fintech continues to disrupt traditional banking models, investment banks will need to innovate, embrace new technologies, and stay connected with both global and local market dynamics to maintain their competitive edge.

## The Future of Investment Banking in India

The future of investment banking in India will depend on the ability of banks to navigate these changes. Agility, innovation, and customer-first strategies will be essential. Those that can anticipate market shifts, embrace new technologies, and structure deals that are both sustainable and responsible will likely lead the charge in shaping the future of finance in India.

# Conclusion: The Future Is Bright for Indian Investment Banking

India's investment banking market in 2026 is a dynamic, fast-evolving space, full of opportunities for those who are willing to adapt. By embracing technology, focusing on ESG factors, and understanding the growing demands of both global investors and Indian consumers, investment banks can continue to drive innovation and growth.

Source: <a href="https://www.jobaajlearnings.com/blog/how-indian-investment-banking-market-is-evolving-in-2026" target="_blank" rel="noopener noreferrer" style="color:#66BB3F;font-weight:600;text-decoration:underline;">Jobaaj Learnings</a>`,
    category: "Funding",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    tags: ["investment banking", "fintech", "IPO", "M&A", "ESG"],
    publishedAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
    readingTime: 7,
    featured: false,
    status: "published",
  },
  {
    id: "editorial_startup-valuation-before-fundraising-india",
    slug: "startup-valuation-before-fundraising-india-founders-guide",
    title: "Startup Valuation Before Fundraising: A Founder's Complete Guide for India",
    excerpt:
      "Pre-money vs post-money, valuation methods by stage, Indian sector benchmarks, angel tax relief, ESOP dilution, convertible notes, and how Indian VCs actually think about valuation.",
    content: `# Why valuation matters before you talk to a single investor

Most Indian founders treat valuation as a closing task. It appears at the end of the pitch deck in the "ask" slide. That framing costs money. Valuation work is actually a pre-work task that shapes every conversation before the first investor meeting.

Dilution compounds forward. If you give up 25% in your seed round at a low valuation, your Series A dilution starts from a cap table that already has a significant minority stakeholder. By Series B, a founder who undervalued at seed might own 35-40% of the company, versus 55-60% for a founder who defended a stronger seed valuation. That 15-20 percentage point difference, on a Rs. 500 crore outcome, is Rs. 75-100 crore in personal proceeds.

Negotiation leverage comes from preparation. A founder who walks in with a structured methodology, comparable transactions, and a clear narrative around their numbers negotiates from a position of knowledge. A founder who says "we think we are worth Rs. 25 crore because similar companies raised at that" negotiates from a position of hope. The difference is visible to experienced investors and priced accordingly.

Cap table implications reach beyond the current round. Every round's valuation and dilution creates the foundation for the next one. ESOP pools, convertible note conversions, and pro-rata rights all interact with your post-money ownership structure in ways that are very difficult to untangle later.

Down-round risk is real and underappreciated by first-time founders. A down-round triggers anti-dilution protection clauses for existing investors. Broad-based weighted average anti-dilution, the standard in most Indian term sheets, forces issuance of additional shares to protected investors, increasing dilution for founders. The cost of overvaluation is paid by founders, not investors.

# Pre-money vs post-money: the arithmetic every founder must own

The pre-money and post-money distinction is the most commonly misunderstood piece of fundraising arithmetic in the Indian startup ecosystem. Getting it wrong in a term sheet means you give up more than you intended.

Definitions: pre-money valuation is the value of your company before new investment comes in. Post-money valuation is pre-money valuation plus the new investment. Investor ownership percentage equals new investment divided by post-money valuation.

A founder says "I want to raise Rs. 5 crore at a Rs. 20 crore valuation." If they mean Rs. 20 crore pre-money versus Rs. 20 crore post-money, the outcome is very different:

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Item</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Rs. 20 cr pre-money</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Rs. 20 cr post-money</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">New investment</td><td style="border:1px solid #E0E0DC;padding:8px;">Rs. 5 crore</td><td style="border:1px solid #E0E0DC;padding:8px;">Rs. 5 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Post-money valuation</td><td style="border:1px solid #E0E0DC;padding:8px;">Rs. 25 crore</td><td style="border:1px solid #E0E0DC;padding:8px;">Rs. 20 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Investor ownership</td><td style="border:1px solid #E0E0DC;padding:8px;">20%</td><td style="border:1px solid #E0E0DC;padding:8px;">25%</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Founder ownership</td><td style="border:1px solid #E0E0DC;padding:8px;">80%</td><td style="border:1px solid #E0E0DC;padding:8px;">75%</td></tr></table>

The gap is 5 percentage points on a single misunderstood word. On a Rs. 200 crore exit, that misunderstanding costs the founder Rs. 10 crore net. Always state explicitly whether a valuation number is pre-money or post-money, and confirm the investor is using the same convention before signing a term sheet.

# Valuation methods by stage

The right valuation method depends entirely on what evidence you have. A pre-revenue startup cannot use a revenue multiple. Using the wrong method signals that the founder does not understand valuation fundamentals.

## Pre-revenue methods

The Berkus method assigns a range of value to five risk factors: soundness of the idea, prototype quality, management quality, strategic relationships, and product rollout. In India, adjust to Rs. 50 lakh to Rs. 2 crore per factor, implying a maximum of Rs. 5-10 crore for a pre-revenue company. The Scorecard method compares the target against a benchmark pre-revenue company in the same geography and sector, weighting founding team (around 30%), opportunity size (25%), product quality (15%), and other factors. Comparable transactions look at what similar pre-revenue companies in the same sector raised at recently, and are the method Indian angels actually use most often.

## Revenue-stage methods

ARR multiples for SaaS apply a market-derived multiple to annualised recurring revenue: roughly 5-10x for companies under Rs. 5 crore ARR, 8-15x for Rs. 5-20 crore ARR with good retention, and 12-20x for Rs. 20 crore plus ARR with net revenue retention above 110%. GMV multiples for marketplaces typically range 0.5-2x depending on take rate and unit economics. Revenue multiples for D2C brands range 1-4x trailing twelve-month revenue, conditioned on gross margin and repeat rate.

## Growth-stage methods

DCF is theoretically rigorous but least reliable for high-growth startups, used mainly as a floor check. Comparable company analysis benchmarks against listed or recently transacted private companies. Precedent transactions look at what acquirers paid for similar companies in recent deals.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Stage</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Primary method</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Supporting method</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Pre-revenue, idea/prototype</td><td style="border:1px solid #E0E0DC;padding:8px;">Berkus + scorecard</td><td style="border:1px solid #E0E0DC;padding:8px;">Comparable transactions</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Pre-revenue, paying pilots</td><td style="border:1px solid #E0E0DC;padding:8px;">Comparable transactions + scorecard</td><td style="border:1px solid #E0E0DC;padding:8px;">Berkus as floor</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Early revenue (Rs. 0-5 cr ARR)</td><td style="border:1px solid #E0E0DC;padding:8px;">Revenue multiple + comps</td><td style="border:1px solid #E0E0DC;padding:8px;">DCF as sanity check</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Scaling revenue (Rs. 5-50 cr ARR)</td><td style="border:1px solid #E0E0DC;padding:8px;">ARR/GMV multiple + comps</td><td style="border:1px solid #E0E0DC;padding:8px;">Precedent transactions</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Growth stage (Rs. 50 cr+ ARR)</td><td style="border:1px solid #E0E0DC;padding:8px;">Comps + DCF</td><td style="border:1px solid #E0E0DC;padding:8px;">Precedent transactions</td></tr></table>

# Indian startup valuation benchmarks by sector

Indian startup valuations vary significantly by sector, stage, and the quality of underlying metrics. The ranges below are based on publicly reported transactions from 2024-25 funding rounds. They are ranges, not guarantees.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.8125rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:6px;background:#F0F0ED;">Sector</th><th style="text-align:left;border:1px solid #E0E0DC;padding:6px;background:#F0F0ED;">Stage</th><th style="text-align:left;border:1px solid #E0E0DC;padding:6px;background:#F0F0ED;">Typical pre-money</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">B2B SaaS</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed (pre-revenue)</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 5-15 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">B2B SaaS</td><td style="border:1px solid #E0E0DC;padding:6px;">Pre-Series A (Rs. 1-5 cr ARR)</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 20-60 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">B2B SaaS</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A (Rs. 5-20 cr ARR)</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 60-200 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">D2C / consumer brand</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 5-20 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">D2C / consumer brand</td><td style="border:1px solid #E0E0DC;padding:6px;">Pre-Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 20-80 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Fintech (lending)</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 8-25 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Fintech (lending)</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 50-200 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Fintech (payments/infra)</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 80-300 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Healthtech</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 5-20 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Healthtech</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 40-150 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Edtech</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 5-15 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Edtech</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 30-100 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Deep tech / AI</td><td style="border:1px solid #E0E0DC;padding:6px;">Seed</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 10-30 crore</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:6px;">Marketplace</td><td style="border:1px solid #E0E0DC;padding:6px;">Series A</td><td style="border:1px solid #E0E0DC;padding:6px;">Rs. 50-200 crore</td></tr></table>

Sector nuances matter. India's B2B SaaS cohort has bifurcated between companies selling internationally (12-20x ARR at Series A) and domestically (6-10x ARR). In D2C, investors now focus on gross margin (35% plus is a common threshold), repeat purchase rate, and the share of direct versus marketplace revenue. In fintech, valuation is heavily shaped by regulatory posture: an NBFC with an RBI licence and clean GNPA ratios attracts a different framework than an unlicensed player. Healthtech valuations remain highly team-dependent at seed.

# How Indian VCs actually think about valuation

VCs are not primarily interested in what your company is worth today. They are interested in what it can be worth at exit, and whether the entry multiple gives them the return their fund model requires.

A typical early-stage VC fund in India manages Rs. 200-500 crore across 20-30 companies and needs to return 3-4x net to its LPs. Because many investments fail, the winners need to return 10-30x to pull the average up. This is why VCs ask about 100x outcomes even in companies that clearly will not be 100x businesses: they need the optionality.

VCs are always doing backwards math: exit value divided by post-money equals multiple. A VC investing Rs. 10 crore at Rs. 50 crore post-money (20% ownership) needs the company to reach Rs. 500-1,500 crore at exit. Most institutional VCs also have an ownership target: seed funds often want 10-20%, Series A funds 15-25%. If your valuation implies ownership below their target, they will negotiate the valuation down, ask for a larger cheque, or pass.

The practical implication: your valuation negotiation is about telling a credible exit story. A Rs. 40 crore pre-money at Series A is much easier to defend if you can show a credible path to Rs. 500 crore in 5-6 years backed by market size, comparable exits, and your unit economics trajectory.

# Section 56(2)(viib), angel tax, and Budget 2024 relief

The Finance (No. 2) Act, 2024 abolished Section 56(2)(viib), the provision that caused what the ecosystem called "angel tax" for over a decade. Before this, if an unlisted company issued shares above the fair market value under Rule 11UA, the excess was taxable as "income from other sources", creating a tax liability on the very capital being raised.

The Budget 2024 amendment removes the provision entirely with effect from 1 April 2024. Share issuances after that date are no longer subject to it. However, this does not remove all valuation-related tax obligations. Section 56(2)(x) on receipt of shares below FMV remains in force. Rule 11UA methodology remains relevant for buybacks, ESOPs, and restructuring. FEMA pricing guidelines, which require FMV-based pricing for foreign investor rounds, are a separate framework entirely independent of income-tax provisions.

The practical upshot: founders raising resident angel rounds after April 2024 can negotiate valuation purely on commercial merit without fear of a tax notice on the premium over Rule 11UA value. It does not eliminate the need for a defensible methodology, but it removes the specific risk of tax on capital raised.

# DPIIT recognition and SEBI angel fund regulations

DPIIT recognition is a formal government certification that unlocks regulatory and tax benefits. A company can seek it if it is a private limited company, partnership, or LLP, is not older than 10 years, has not exceeded Rs. 100 crore turnover in any year, and is working towards innovation or a scalable, high-employment model.

Key benefits relevant to fundraising include the Section 80-IAC tax holiday (3 years of income tax exemption out of the first 10), self-certification for labour and environmental laws, faster IP registration with an 80% rebate on patent fees, and access to the SIDBI-managed Fund of Funds.

On the investor side, Category I AIFs classified as Angel Funds under the SEBI AIF Regulations are designed for early-stage investing. As of 2026, parameters include a minimum corpus of Rs. 5 crore, a minimum investor commitment of Rs. 25 lakh, a maximum investment per investee of Rs. 10 crore, and eligibility limited to unlisted companies under 10 years old with turnover under Rs. 25 crore. Raising from a SEBI-regulated angel fund offers standardised documentation and regulatory comfort for co-investors.

# ESOP pool expansion and its dilution impact

ESOP pool creation is one of the most dilutive events on a cap table, and most founders underestimate it. At seed stage, investors commonly require a pool of 10-15% of fully diluted share capital to be created before the investment closes. The key word is "before": the pool is created from the pre-money capital, so it dilutes founders, not the new investor.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Outcome</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Without pool</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">With 15% pool (pre-money)</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Post-money total shares</td><td style="border:1px solid #E0E0DC;padding:8px;">125</td><td style="border:1px solid #E0E0DC;padding:8px;">147</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Founder ownership</td><td style="border:1px solid #E0E0DC;padding:8px;">80%</td><td style="border:1px solid #E0E0DC;padding:8px;">67.7%</td></tr></table>

Negotiation levers: push for the pool to be created post-money rather than pre-money where you have leverage; size the pool to an actual 18-24 month hiring plan rather than an arbitrary 15%; ensure forfeited options are recycled back into the pool; and understand the vesting schedule (standard in India is 4-year vesting with a 1-year cliff). Across multiple rounds, investors ask for the pool to be topped up before each round, so this dilution happens again every time.

# Convertible notes and SAFE agreements in India

Convertible instruments let founders and investors defer the valuation question to a future priced round. A convertible note is a debt instrument that converts into equity, typically at a 15-25% discount to the next round or at a valuation cap, whichever is better for the noteholder, with a maturity of 18-24 months and nominal interest of 8-12%. A SAFE is a non-debt instrument: no interest, no maturity, and it converts at the next priced round. In India a SAFE is treated as a compulsorily convertible instrument and must comply with the Companies Act and FEMA.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Factor</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Convertible note</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">SAFE</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Debt or equity</td><td style="border:1px solid #E0E0DC;padding:8px;">Debt (converts)</td><td style="border:1px solid #E0E0DC;padding:8px;">Equity-like</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Interest</td><td style="border:1px solid #E0E0DC;padding:8px;">Yes (8-12%)</td><td style="border:1px solid #E0E0DC;padding:8px;">No</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Maturity</td><td style="border:1px solid #E0E0DC;padding:8px;">Yes (18-24 months)</td><td style="border:1px solid #E0E0DC;padding:8px;">No</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Legal clarity in India</td><td style="border:1px solid #E0E0DC;padding:8px;">More established</td><td style="border:1px solid #E0E0DC;padding:8px;">Needs careful structuring</td></tr></table>

The point of these instruments is to avoid setting a valuation today, but the cap and discount still imply a maximum effective entry valuation. Model the fully diluted cap table after conversion at both the cap and the discount before issuing them.

# When to get a formal valuation report

A formal valuation report is legally required in specific contexts. Under Rule 11UA, fair market value for income-tax purposes must be determined by a registered valuer or merchant banker, relevant for ESOP perquisite tax, share buybacks, and restructuring. Under the FEMA Non-Debt Rules, any issue of shares to a foreign investor must be at or above FMV determined by a SEBI registered merchant banker, a hard compliance requirement where failure can result in RBI penalties. Under Companies Act Section 62(1)(c), the issue price for rights issues and private placements must be fair.

A report is also strategically valuable, even when not mandatory, before a seed round to anchor negotiation, when institutional investors require a fairness opinion, or when preparing for an acquisition. Costs range from Rs. 2-5 lakh for a straightforward pre-revenue analysis to Rs. 10-25 lakh for a complex multi-entity business. For most early-stage Indian startups, a Rs. 3-5 lakh report from a credible firm is a rational investment before a significant raise.

# Building a data room for valuation discussions

Your data room is the physical expression of your valuation thesis. Investors triangulate every number in your pitch against the documents in it. A pre-fundraise data room should cover corporate and legal documents (incorporation, MoA/AoA, shareholder agreements, DPIIT certificate, IP assignments, ESOP plan), financials (audited accounts, monthly management accounts, budget versus actuals, 3-year cash flow forecasts, a fully diluted cap table), operating metrics (revenue by customer and geography, cohort analysis, CAC and payback by channel, unit economics), market and competitive analysis, team backgrounds, and your valuation methodology with comparable transactions.

Common mistakes include sharing an incomplete or outdated cap table, overstating TAM with no methodology, missing audited financials, and inconsistent numbers between the deck and the data room. Every number in the deck must be traceable to a data room document. A clean, well-organised data room shortens diligence and signals operational maturity, both of which improve your negotiating position.

# Common founder mistakes that destroy negotiating leverage

Most valuation mistakes are judgment errors, not calculation errors. The patterns experienced advisors see repeatedly include:

1. Anchoring to a comparable that closed in 2021, when multiples were 30-60% higher than 2024-25 levels.
2. Overvaluing on vanity metrics like downloads, registered users, or total billings, which sophisticated investors look through to active users, paying customers, and net revenue.
3. Not modelling ESOP dilution correctly, and so overestimating post-round ownership.
4. Raising at a valuation the next round cannot sustain, risking a flat or down round 18 months later.
5. Accepting a term sheet without understanding the liquidation preference. A 1x non-participating preference is standard and founder-friendly; a 2x or participating preference with no cap is not.
6. Ignoring anti-dilution clauses in existing agreements before raising a new round.
7. Treating the first term sheet as the only option, which removes all negotiating leverage. A structured process with parallel conversations is the fix.
8. Sharing a valuation number before the investor has seen the business, which anchors them before they build conviction.

Source: <a href="https://www.dealplexus.com/blog/startup-valuation-before-fundraising" target="_blank" rel="noopener noreferrer" style="color:#66BB3F;font-weight:600;text-decoration:underline;">DealPlexus</a>`,
    category: "Funding",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    tags: ["valuation", "fundraising", "cap table", "ESOP", "angel tax"],
    publishedAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-02-10T00:00:00.000Z",
    readingTime: 18,
    featured: false,
    status: "published",
  },
  {
    id: "editorial_vc-deeptech-ai-startups-india-2026",
    slug: "what-vcs-look-for-in-deeptech-and-ai-startups-india-2026",
    title: "What Venture Capitalists Look for in Deeptech and AI Startups in India 2026",
    excerpt:
      "IP defensibility, commercial viability, team quality, data advantage, scalability, and alignment to India's digital public infrastructure: the eight criteria Indian VCs use to evaluate deeptech and AI startups in 2026.",
    content: `India's deeptech and AI ecosystem is evolving faster than ever. With the government's push for applied research, the rise of compute infrastructure, and a maturing talent pool, 2026 is shaping up to be a defining year for founders building frontier technologies. Amidst this growth, one question is critical: what exactly do venture capitalists look for when evaluating deeptech and AI startups in India?

Unlike SaaS or consumer tech, deeptech investing is inherently high-risk, IP-driven, capital-intensive, and dependent on long development cycles. This means VC criteria are sharper, more technical, and thesis-driven. In this article we break down these criteria through industry trends, founder insights, and an early-stage investment perspective.

# Why Deeptech and AI Startup Funding in India Is Rising in 2026

Despite market corrections across tech, AI and deeptech remain the fastest-growing VC categories.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Factor</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Why It Matters</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Government initiatives (IndiaAI Mission, Digital Public Infrastructure)</td><td style="border:1px solid #E0E0DC;padding:8px;">Democratizes AI compute, encourages indigenous innovation</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Surge in applied AI adoption across BFSI, healthcare, mobility</td><td style="border:1px solid #E0E0DC;padding:8px;">Increased enterprise demand shortens go-to-market cycles</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Academic talent pipeline from IITs, IISc, and research labs</td><td style="border:1px solid #E0E0DC;padding:8px;">Strong technical leadership for early-stage teams</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Rise of micro-VCs, corporate VCs, and deeptech-focused funds</td><td style="border:1px solid #E0E0DC;padding:8px;">More specialised capital entering frontier tech</td></tr></table>

# The Core VC Criteria for Deeptech and AI Startups in India

Below is a breakdown of the eight key dimensions most VCs use when evaluating companies.

## 1. Technical Depth and IP Defensibility

Deeptech evaluation begins with technology differentiation, not market traction. VCs examine whether the IP is defensible (patents, provisional filings, trade secrets, algorithms), whether the technology is 10x better than existing alternatives, whether it relies on core science or proprietary datasets, and whether it is easily replicable.

## 2. Commercial Viability and Time-to-Market

India's AI ecosystem historically faced long commercialization hurdles, but in 2026 enterprises are adopting AI faster than expected, particularly in healthcare, logistics, insurance automation, climate-tech, and robotics. VCs assess how soon the technology can generate revenue, whether there is a clear path from R&D to MVP to enterprise pilot to ARR, and whether the product solves a high-value problem.

## 3. High-Value Problem Statement

VCs avoid AI for its own sake. Investment flows to problems that are large, expensive, chronic, and poorly solved today, such as AI in medical imaging, predictive maintenance for infrastructure, edge AI in industrial automation, and robotics for logistics.

## 4. Team Quality, Research Rigor and Founder-Market Fit

A strong team is often the dealmaker: a technical founding team with research experience, complementary business and product leadership, the ability to attract and retain specialised talent, and grit for long development cycles. Common red flags include overestimating AI capabilities, weak scalability understanding, and brilliant technology with zero go-to-market clarity.

## 5. Data Advantage and Model Performance

VCs now ask what datasets power your model, how accurate and robust it is (precision, recall), whether it improves with more data, and what the compute strategy is (cloud, edge, hybrid). Data flywheels, unique and compounding advantages, are central to evaluation in 2026.

## 6. Scalability and Unit Economics

Even in deeptech, sustainability outweighs speed. VCs assess cloud and compute cost versus revenue potential, cost of inference, hardware and deployment complexity, and customer acquisition strategy. A scalable model means predictable costs, replicable deployments, and steady margins.

## 7. Market Size and Sector Maturity

VCs favour segments with rapid enterprise adoption, clear regulatory pathways, and global relevance.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Sector</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Why VC Interest Is Strong</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">AI-first healthcare (radiology, pathology)</td><td style="border:1px solid #E0E0DC;padding:8px;">High demand plus government digitization</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Robotics and automation</td><td style="border:1px solid #E0E0DC;padding:8px;">Labour gaps plus infrastructure modernization</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Climate-tech</td><td style="border:1px solid #E0E0DC;padding:8px;">Policy incentives plus global supply chain demand</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Industrial IoT and Edge AI</td><td style="border:1px solid #E0E0DC;padding:8px;">Manufacturing upgrade wave</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Cybersecurity AI</td><td style="border:1px solid #E0E0DC;padding:8px;">Exponentially growing threat volume</td></tr></table>

## 8. Alignment to India's Digital Public Infrastructure

Deeptech startups gain an edge by leveraging India's DPI, including ONDC, IndiaAI compute infrastructure, Ayushman Bharat Digital Mission, the UPI ecosystem, and logistics and industrial DPI (ULIP and ONDC). VCs want to see how technologies plug into national-scale networks, creating adoption and defensibility.

# Common Deal-Breakers VCs See

The most common deal-breakers are weak IP or easily replicable models; a "we will figure out go-to-market later" attitude; high inference costs with no optimization plan; overreliance on third-party models; no regulatory clarity; lack of customer validation or letters of intent; unrealistic timelines to MVP; a founder who is not full-time; zero moat beyond engineering talent; and poor defensibility versus Big Tech.

# Investor Interview Insights: Common Questions

Technical questions probe the core scientific innovation, proprietary model or data, accuracy at scale, and compute costs at 10x. Business and market questions cover the enterprise deployment model, the pilot-to-contract cycle, and market size. Financial questions cover burn rate, compute cost as a percentage of revenue, and the breakeven timeline. Risk and compliance questions cover data privacy and regulatory approvals.

# How Early-Stage VCs Evaluate Deeptech Startups

A founder-first diligence approach combined with deep technical analysis typically focuses on the following.

<table style="width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:0.875rem;"><tr><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Criteria</th><th style="text-align:left;border:1px solid #E0E0DC;padding:8px;background:#F0F0ED;">Focus</th></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Technology and IP</td><td style="border:1px solid #E0E0DC;padding:8px;">Novelty, patents, defensible engineering</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Founding team</td><td style="border:1px solid #E0E0DC;padding:8px;">Research pedigree plus product execution</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Market</td><td style="border:1px solid #E0E0DC;padding:8px;">High-value industrial and enterprise problems</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">GTM strategy</td><td style="border:1px solid #E0E0DC;padding:8px;">Enterprise-ready deployment clarity</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Moat</td><td style="border:1px solid #E0E0DC;padding:8px;">Data advantage plus engineering moat</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Capital efficiency</td><td style="border:1px solid #E0E0DC;padding:8px;">Smart compute usage, disciplined cycles</td></tr>
<tr><td style="border:1px solid #E0E0DC;padding:8px;">Regulatory fit</td><td style="border:1px solid #E0E0DC;padding:8px;">Especially in healthcare, drones, infrastructure</td></tr></table>

# Conclusion: What Founders Should Prioritize in 2026

To secure VC funding in India, founders must present defensible, scalable, and enterprise-ready businesses. The final checklist for deeptech and AI: strong IP with difficult-to-replicate engineering; a clear path from research to product to revenue; an efficient compute strategy; enterprise-ready product design; a strong founding team with a research background; and alignment with India's industrial and digital growth. Founders who build with these principles have the best chance of raising capital and scaling into global deeptech leaders.

Source: <a href="https://seafund.in/article/what-venture-capitalists-look-for-in-deeptech-and-ai-startups-in-india-2026/" target="_blank" rel="noopener noreferrer" style="color:#66BB3F;font-weight:600;text-decoration:underline;">Seafund</a>`,
    category: "Funding",
    author: "Founderstreet Team",
    authorRole: "Investor Relations Team",
    tags: ["deeptech", "AI", "venture capital", "fundraising"],
    publishedAt: "2026-02-20T00:00:00.000Z",
    updatedAt: "2026-02-20T00:00:00.000Z",
    readingTime: 9,
    featured: false,
    status: "published",
  },
];

function mergeEditorial(list: PostMeta[]): PostMeta[] {
  const slugs = new Set(list.map((p) => p.slug));
  const extras = EDITORIAL_POSTS.filter((e) => !slugs.has(e.slug)).map(metaFromBlogPost);
  return [...list, ...extras];
}

/** Older seeded sample articles we no longer want shown anywhere. */
const HIDDEN_SLUGS = new Set([
  "unit-economics-101-what-every-founder-must-know",
  "private-limited-vs-llp-india-2025",
  "pitch-deck-teardown-what-sequoia-wants-to-see",
]);

async function seedPostsIfEmpty(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  const c = await sql`SELECT COUNT(*)::int AS n FROM cms_posts`;
  const n = (c[0] as { n: number }).n;
  if (n > 0) return;

  for (const raw of SAMPLE_POSTS) {
    const post = sampleToBlogPost(raw);
    const tagsJson = JSON.stringify(post.tags);
    await sql`
      INSERT INTO cms_posts (
        id, slug, title, excerpt, content, category, author, author_role,
        cover_image, tags, reading_time, featured, status, published_at, updated_at
      ) VALUES (
        ${post.id}, ${post.slug}, ${post.title}, ${post.excerpt}, ${post.content},
        ${post.category}, ${post.author}, ${post.authorRole},
        ${post.coverImage ?? null}, ${tagsJson}, ${post.readingTime},
        ${post.featured}, ${post.status}, ${post.publishedAt}, ${post.updatedAt}
      )
      ON CONFLICT (slug) DO NOTHING;
    `;
  }
}

async function ensureReady(): Promise<boolean> {
  const ok = await ensureCmsSchema();
  if (!ok) return false;
  await seedPostsIfEmpty();
  return true;
}

export async function getAllPosts(status?: "draft" | "published"): Promise<PostMeta[]> {
  const sql = getSql();
  let list: PostMeta[];
  if (!(await ensureReady()) || !sql) {
    list = sampleBlogPosts.map(metaFromBlogPost);
  } else {
    const rows = status
      ? await sql`SELECT * FROM cms_posts WHERE status = ${status} ORDER BY published_at DESC`
      : await sql`SELECT * FROM cms_posts ORDER BY published_at DESC`;
    list = (rows as PostRow[]).map(rowToMeta);
  }

  list = mergeEditorial(list).filter((p) => !HIDDEN_SLUGS.has(p.slug));
  if (status) list = list.filter((p) => p.status === status);
  return list.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (HIDDEN_SLUGS.has(slug)) {
    return EDITORIAL_POSTS.find((x) => x.slug === slug) ?? null;
  }

  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    const p = sampleBlogPosts.find((x) => x.slug === slug)
      ?? EDITORIAL_POSTS.find((x) => x.slug === slug);
    return p ?? null;
  }

  const rows = await sql`SELECT * FROM cms_posts WHERE slug = ${slug} LIMIT 1`;
  const r = rows[0] as PostRow | undefined;
  if (r) return rowToBlogPost(r);
  return EDITORIAL_POSTS.find((x) => x.slug === slug) ?? null;
}

export async function createPost(
  data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): Promise<BlogPost> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) {
    throw new Error("DATABASE_URL / POSTGRES_URL is required to create posts.");
  }

  const id = generateId();
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id,
    publishedAt: now,
    updatedAt: now,
  };

  const tagsJson = JSON.stringify(post.tags ?? []);

  await sql`
    INSERT INTO cms_posts (
      id, slug, title, excerpt, content, category, author, author_role,
      cover_image, tags, reading_time, featured, status, published_at, updated_at
    ) VALUES (
      ${post.id}, ${post.slug}, ${post.title}, ${post.excerpt}, ${post.content},
      ${post.category}, ${post.author}, ${post.authorRole},
      ${post.coverImage ?? null}, ${tagsJson}, ${post.readingTime},
      ${post.featured}, ${post.status}, ${post.publishedAt}, ${post.updatedAt}
    );
  `;

  return post;
}

export async function updatePost(
  slug: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) return null;

  const existing = await getPostBySlug(slug);
  if (!existing) return null;

  const next: BlogPost = {
    ...existing,
    ...data,
    slug: existing.slug,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  const tagsJson = JSON.stringify(next.tags ?? []);

  await sql`
    UPDATE cms_posts SET
      title = ${next.title},
      excerpt = ${next.excerpt},
      content = ${next.content},
      category = ${next.category},
      author = ${next.author},
      author_role = ${next.authorRole},
      cover_image = ${next.coverImage ?? null},
      tags = ${tagsJson},
      reading_time = ${next.readingTime},
      featured = ${next.featured},
      status = ${next.status},
      updated_at = ${next.updatedAt}
    WHERE slug = ${slug};
  `;

  return next;
}

export async function deletePost(slug: string): Promise<boolean> {
  const sql = getSql();
  if (!(await ensureReady()) || !sql) return false;
  await sql`DELETE FROM cms_posts WHERE slug = ${slug}`;
  return true;
}
