import Link from "next/link";

const SECTIONS = [
  {
    href: "/admin/site/navigation",
    title: "Top navigation",
    desc: "Site name in the header, startup health-check promo text, and short menu labels.",
  },
  {
    href: "/admin/site/footer",
    title: "Footer",
    desc: "Footer description, newsletter headings, and copyright line. Use {year} where the year should appear.",
  },
  {
    href: "/admin/site/home/hero",
    title: "Home page — main banner",
    desc: "The large headline area on the homepage: titles, intro text, buttons, and the four statistics under the banner.",
  },
  {
    href: "/admin/site/home/services",
    title: "Home page — services grid",
    desc: "The “What we do” section: section title and the six service cards (titles and descriptions).",
  },
  {
    href: "/admin/site/home/partners",
    title: "Home page — partner network",
    desc: "The scrolling partner logos band: headline and each partner’s name and category.",
  },
  {
    href: "/admin/site/home/founder-stories",
    title: "Home page — founder stories",
    desc: "Testimonial carousel: section title, quotes, photos, and result lines.",
  },
  {
    href: "/admin/site/home/teaser",
    title: "Home page — articles preview",
    desc: "The strip that links to your blog: small heading and “View all articles” label.",
  },
  {
    href: "/admin/site/resources-page",
    title: "Resources / blog listing page",
    desc: "The top of the articles page: eyebrow, main title, intro, and labels for the stat row.",
  },
  {
    href: "/admin/site/about",
    title: "About page",
    desc: "Full /about page: hero, story, stats, values, team, bottom CTA, and SEO title/description.",
  },
];

export default function AdminSiteHubPage() {
  return (
    <>
      <h1 className="admin-page-title">Website content</h1>
      <p className="admin-page-desc">
        Choose a page and section below. Each screen has plain fields — no code or JSON. Changes go live on the public site after you
        click <strong>Save changes</strong>. Blog articles are edited under <Link href="/admin/posts">Blog posts</Link>.
      </p>

      <div className="admin-hub-grid">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="admin-hub-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
