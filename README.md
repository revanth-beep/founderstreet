# Founderstreet

> The unseen engine behind India's next great startups.

A multi-page, full-stack website built with Next.js 15, Tailwind CSS v4, GSAP animations, and a serverless CMS powered by Vercel Blob.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | GSAP + ScrollTrigger |
| Fonts | Playfair Display + Inter (via next/font) |
| CMS | Vercel Blob (JSON-based, serverless) |
| AI Widget | OpenAI GPT-4o-mini |
| Hosting | Vercel |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home (Hero, Services, Process, Testimonials) |
| `/services/validation` | Test Your Idea (with interactive quiz) |
| `/services/incorporation` | Company Incorporation (comparison table) |
| `/services/accounting` | Accounting & Virtual CFO |
| `/services/marketing` | Marketing & Retail Expansion |
| `/services/web-development` | Web & Tech Development (Before/After slider) |
| `/services/funding` | Investor Funding & Pitch Decks |
| `/resources` | Blog / The Founder's Brief |
| `/resources/[slug]` | Individual blog post |
| `/startup-health-check` | Interactive 5-question quiz |
| `/about` | About page |
| `/contact` | Contact form |
| `/admin` | CMS Admin dashboard |
| `/admin/posts` | Blog post management |
| `/admin/posts/new` | Create new post |

---

## Getting Started

```bash
# Clone and install
npm install

# Add environment variables
cp .env.local .env.local
# Fill in OPENAI_API_KEY and other values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY` — your OpenAI API key
   - `ADMIN_SECRET` — secret token for CMS admin (default: `founderstreet-admin-2025`)
4. Enable **Vercel Blob** storage from Storage tab → Create Store → name it `founderstreet-cms`
5. Deploy!

The `BLOB_READ_WRITE_TOKEN` is automatically added to environment variables when you connect Vercel Blob.

---

## CMS Usage

Blog posts are stored in Vercel Blob as JSON files. The admin panel at `/admin` allows you to:
- Create, edit, and publish blog posts
- Manage post metadata (category, tags, featured status)
- Preview posts before publishing

**To create your first post in production:**
1. Go to `yourdomain.com/admin/posts/new`
2. Write the post in the Markdown editor
3. Set status to "Published" and click Save

---

## AI Chat Widget (Founder AI)

The floating chat widget in the bottom-right corner uses OpenAI's GPT-4o-mini with a custom system prompt trained on Founderstreet's services.

To activate: add `OPENAI_API_KEY=sk-...` to your environment variables.

Without an API key, the widget falls back to pre-programmed responses for common questions.

---

## Customisation

**Colors** — Edit `app/globals.css` under the `@theme` block:
```css
@theme {
  --color-primary: #1B4332; /* main green */
  --color-background: #FAFAF8; /* warm white */
}
```

**Content** — Update text directly in page files under `app/`

**Sample blog posts** — Edit `lib/cms.ts` → `SAMPLE_POSTS` array

---

## License

© 2025 Founderstreet. All rights reserved.
