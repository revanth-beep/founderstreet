@AGENTS.md

# Founderstreet — Project Context

## What This App Is
Founderstreet is a B2B SaaS marketing + services platform for Indian startups. It combines a marketing website, headless CMS, AI founder assistant, and admin dashboard. Target customers: early-stage Indian founders (Day Zero to pre-seed).

## Core Services Offered
1. Test Your Idea — market validation, SWOT, unit economics
2. Company Incorporation — Private Ltd/LLP in <10 days
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
- **ISR 60s**: Home page, resources page, and blog post pages all use `revalidate: 60`.

## Directory Structure
```
app/                    # Next.js App Router pages + API routes
  admin/                # CMS dashboard (JWT-protected via middleware.ts)
  api/                  # Backend: chat, contact, quiz, subscribe, admin/*
  services/             # 6 service detail pages (mostly static)
  resources/            # Blog listing + [slug] dynamic pages
  about/, contact/, startup-health-check/, privacy/, terms/
components/
  home/                 # Homepage section components
  sections/             # ContactForm, StartupQuiz, NewsletterForm
  layout/               # SiteChrome (wraps header/footer/nav/AI widget)
  ui/                   # Reusable UI: ServiceHero, Accordion, Button
  AIWidget.tsx          # Floating bottom-right chat widget
lib/
  cms.ts                # Blog CRUD (PostgreSQL)
  site-content.ts       # Save/load homepage content from DB
  site-content-defaults.ts  # TypeScript types + defaults for all sections
  db.ts                 # Neon connection + auto-creates 3 tables on first run
  contact-submissions.ts
  auth-admin.ts         # JWT helpers + admin middleware
  deep-merge.ts
middleware.ts           # Protects /admin/* routes
```

## Database Schema (auto-created by `lib/db.ts`)
- **`cms_posts`**: slug, title, excerpt, content (markdown), category, author, cover_image, tags (JSON), status (draft/published), featured
- **`cms_site_content`**: id='main', data (JSONB for hero/services/partners/testimonials/footer sections), updated_at
- **`cms_contact_submissions`**: first_name, last_name, email, phone, service, stage, message, created_at

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
- Warm white: `#FAFAF8`
- Accent colors defined as CSS custom properties

## Fonts
- Headlines: Playfair Display (serif)
- Body: Inter — both loaded via Google Fonts in `app/layout.tsx`

## Image Handling
- `next.config.ts` whitelists Unsplash + Vercel Blob hostnames for `next/image`
- Admin image uploads go to `/api/admin/upload` → Vercel Blob

## Content Editing Flow
1. Code defaults in `site-content-defaults.ts` (TypeScript types)
2. `getSiteContent()` deep-merges DB JSONB over defaults
3. Admin submits form at `/admin/site` → PATCH `/api/admin/site`
4. `patchSiteContent()` saves to DB
5. ISR revalidates homepage within 60s

## Untracked Files (git status)
- `app/admin/page.tsx` — admin dashboard home (not yet committed)
- `app/admin/posts/` — admin posts management (not yet committed)
