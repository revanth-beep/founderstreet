@AGENTS.md

# Founderstreet — Project Context

## What This App Is
Founderstreet is a B2B SaaS marketing + services platform for Indian startups, operating as a subsidiary of **Northville Consulting Group**. It combines a marketing website, headless CMS, AI founder assistant, and admin dashboard. Target customers: early-stage Indian founders (Day Zero to pre-seed).

## Branding
- **Tagline in UI**: "by Northville Consulting Group" — shown beneath the Founderstreet wordmark in the navbar and footer on every page
- **Copyright line**: `© {year} Founderstreet · Northville Consulting Group. All rights reserved.`
- Both are stored in `defaultSiteContent.nav.subsidiaryText` and `defaultSiteContent.footer.subsidiaryText` and editable via Admin → Navigation / Footer

## Core Services Offered
1. Test Your Idea — market validation, SWOT, unit economics
2. Company Incorporation — Private Ltd/LLP in 10 days
3. Accounting & Virtual CFO — GST, payroll, financial models
4. Marketing & Retail — SEO, paid ads, retail distribution
5. Web & Tech Development — Shopify, custom apps, mobile
6. Investor Funding — pitch decks, investor matching

## Tech Stack
- **Framework**: Next.js (App Router) + React + TypeScript strict mode
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- **Animations**: GSAP 3 with ScrollTrigger
- **Forms**: React Hook Form + Zod validation
- **CMS/DB**: Neon serverless PostgreSQL (`@neondatabase/serverless`)
- **Storage**: Vercel Blob (images), optional Vercel KV
- **AI**: OpenAI GPT-4o-mini (chat widget, falls back to mock responses)
- **Auth**: JWT via `jose` library, 7-day sessions, httpOnly cookies
- **Deployment**: Vercel

## Key Architecture Decisions
- **Hybrid CMS**: TypeScript defaults in `lib/site-content-defaults.ts` are deep-merged with JSONB stored in PostgreSQL. No rebuild needed for content changes — ISR at 60s handles it.
- **Single-user admin**: No user table. One password in env vars (`ADMIN_PASSWORD`). JWT signed with `ADMIN_JWT_SECRET`.
- **Graceful degradation**: No DB → use in-memory sample posts. No OpenAI key → use hardcoded mock responses.
- **ISR 60s**: Home page, resources page, team page, and blog post pages all use `revalidate: 60`.

## Directory Structure
```
app/                    # Next.js App Router pages + API routes
  admin/                # CMS dashboard (JWT-protected via middleware.ts)
  api/                  # Backend: chat, contact, quiz, subscribe, admin/*
  services/             # 6 service detail pages (mostly static)
  resources/            # Blog listing + [slug] dynamic pages
  team/                 # /team page (page.tsx + TeamCard.tsx client component)
  about/, contact/, startup-health-check/, privacy/, terms/
components/
  home/                 # Homepage section components
  sections/             # ContactForm, StartupQuiz, NewsletterForm
  layout/               # SiteChrome (wraps header/footer/nav/AI widget)
    Navbar.tsx          # Shows subsidiary tagline; links: Services, About, Team, Resources, Contact
    Footer.tsx          # Shows subsidiary tagline; company links include Our Team
  ui/                   # Reusable UI: ServiceHero, Accordion, Button
  AIWidget.tsx          # Floating bottom-right chat widget
lib/
  cms.ts                # Blog CRUD (PostgreSQL)
  site-content.ts       # Save/load homepage content from DB
  site-content-defaults.ts  # TypeScript types + defaults for ALL sections (including teamPage)
  db.ts                 # Neon connection + auto-creates 3 tables on first run
  contact-submissions.ts
  auth-admin.ts         # JWT helpers + admin middleware
  deep-merge.ts
middleware.ts           # Protects /admin/* routes (deprecated; Next.js 16 wants proxy.ts)
public/team/            # 13 team portrait .avif files + placeholder.svg
```

## Database Schema (auto-created by `lib/db.ts`)
- **`cms_posts`**: slug, title, excerpt, content (markdown), category, author, cover_image, tags (JSON), status (draft/published), featured
- **`cms_site_content`**: id='main', data (JSONB for hero/services/partners/testimonials/footer/teamPage sections), updated_at
- **`cms_contact_submissions`**: first_name, last_name, email, phone, service, stage, message, created_at

## SiteContent Type Sections (`lib/site-content-defaults.ts`)
| Key | What it controls |
|-----|-----------------|
| `nav` | Brand name, `subsidiaryText`, health check promo labels |
| `footer` | Brand name, `subsidiaryText`, description, newsletter, copyright |
| `home.hero` | Hero headline, stats, CTA buttons |
| `home.services` | Services section header + 6 service cards |
| `home.resourcesTeaser` | Blog preview strip |
| `home.partnerMarquee` | Partner network marquee (real: 706 Pictures, ICICI Bank, IIM Kashipur) |
| `home.founderStories` | Client testimonials (real: 706 Pictures quote) |
| `aboutPage` | Full /about page content |
| `teamPage` | Full /team page: hero, departments list, all 16 members with photos |
| `resourcesPage` | /resources page header and stat labels |

## Team Page (`/team`)
- Route: `app/team/page.tsx` (server) + `app/team/TeamCard.tsx` (client, handles hover)
- Data source: `getSiteContent().teamPage` — editable via Admin → Website content → Team page
- 16 members grouped into 5 departments: Leadership, Senior Consultants, Consultants, Associates, Interns
- Photos: local `.avif` files in `public/team/`. Members without photos use `public/team/placeholder.svg`
- Members with photos: Asmeet Bhatia, Achal Bhatt, Neha Agarwal, MS Rehsi, Vishi Agarwal, Nidhi Srivastava, CA Priya Arora, Mohit S., Thiruvenkat R, Chanpreet Singh Gujral, Shruti Meharia, Krupa Nagdeote, Tanupreet Kaur
- Members using placeholder: Revanth Rallabandi, Kiran Surana, Saksham Nagpal

## Real Data vs. Placeholder Data
- **Testimonials**: One real quote from 706 Pictures (Northville client). Add more via Admin → Home → Founder stories.
- **Partner network**: 3 real Northville partners (706 Pictures, ICICI Bank, IIM Kashipur). Add more via admin; remaining Northville logo-only partners are unidentified.
- **Hero stats**: 150+ Startups, ₹40Cr+ Funding, **25+ Investor Connects** (confirmed from Northville), 10 Days incorporation.

## Admin CMS Sections
All under `/admin/site/`:
- navigation, footer, home/hero, home/services, home/partners, home/founder-stories, home/teaser, resources-page, about, **team** (new)

## API Routes
| Endpoint | Auth | Purpose |
|----------|------|---------|
| POST /api/contact | ✗ | Save contact lead to DB |
| POST /api/chat | ✗ | OpenAI chat |
| POST /api/quiz | ✗ | Startup health check quiz |
| POST /api/subscribe | ✗ | Newsletter stub |
| POST /api/admin/login | ✗ | Create JWT session |
| GET/POST /api/admin/posts | ✓ | Blog CRUD |
| PUT/DELETE /api/admin/posts/[slug] | ✓ | Edit/delete post |
| GET/POST /api/admin/site | ✓ | Site content CRUD |
| POST /api/admin/upload | ✓ | Image → Vercel Blob |

## Environment Variables
```
NEXT_PUBLIC_SITE_URL=
DATABASE_URL=           # Neon PostgreSQL connection string
ADMIN_PASSWORD=         # Single admin password
ADMIN_JWT_SECRET=       # Optional, 32+ chars; falls back to ADMIN_PASSWORD
BLOB_READ_WRITE_TOKEN=  # Vercel Blob token
OPENAI_API_KEY=         # Optional; disables AI chat if missing
```

## Brand Colors (defined in `app/globals.css` @theme block)
- Primary green: `#1B4332`
- Accent green: `#66BB3F`
- Warm white: `#FAFAF8`
- Dark grey: `#4A5056` (footer background)

## Fonts
- Headlines: Playfair Display (serif)
- Body: Inter — both loaded via Google Fonts in `app/layout.tsx`

## Image Handling
- `next.config.ts` whitelists Unsplash + Vercel Blob hostnames for `next/image`
- Local `.avif` team photos served from `public/team/` — no config needed
- Admin image uploads go to `/api/admin/upload` → Vercel Blob

## Content Editing Flow
1. Code defaults in `site-content-defaults.ts` (TypeScript types + values)
2. `getSiteContent()` deep-merges DB JSONB over defaults
3. Admin submits form at `/admin/site/*` → PATCH `/api/admin/site`
4. `patchSiteContent()` saves to DB
5. ISR revalidates the relevant page within 60s

## Dev Setup Notes
- **Bundler**: `npm run dev` uses `--webpack` explicitly. Turbopack (Next.js 16 default) causes a fatal panic (`Next.js package not found`) on this machine, which makes the browser refresh in a loop via broken HMR. Do not switch back to Turbopack.
- **middleware.ts**: The `middleware` file convention is deprecated in Next.js 16. The runtime now calls it `proxy.ts`. It still works as `middleware.ts` but will break in a future version. Pending rename to `proxy.ts`.
- **Port**: Port 3000 is occupied by another process locally. Dev server runs on 3001.

## Writing Style Rules
- No em dashes (—) in copy — they read as AI-generated. Use a period, comma, or colon instead.
- Numbers must match confirmed Northville data where available (25+ investor connects, not 200+).
- Do not fabricate testimonials, partner names, or statistics.
