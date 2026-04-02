import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    category: "Finance",
    title: "Unit Economics 101: What Every Founder Must Know Before Raising",
    excerpt: "Before any investor writes a cheque, they will scrutinise your unit economics. Here's the complete framework.",
    readingTime: 8,
    href: "/resources/unit-economics-101-what-every-founder-must-know",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
  },
  {
    category: "Legal",
    title: "Pvt Ltd vs LLP in India: The Definitive 2025 Guide for Founders",
    excerpt: "Choosing the wrong entity structure can cost you your next funding round. Here's exactly which one to pick.",
    readingTime: 10,
    href: "/resources/private-limited-vs-llp-india-2025",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
  },
  {
    category: "Fundraising",
    title: "Pitch Deck Teardown: What India's Top VCs Actually Want to See",
    excerpt: "We've reviewed 200+ pitch decks. Here are the exact slides that make investors lean forward.",
    readingTime: 12,
    href: "/resources/pitch-deck-teardown-what-sequoia-wants-to-see",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop",
  },
];

const categoryColors: Record<string, string> = {
  Finance: "bg-blue-50 text-blue-700",
  Legal: "bg-purple-50 text-purple-700",
  Fundraising: "bg-green-100 text-green-700",
};

export default function ResourcesTeaser() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="section-label mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              The Founder&apos;s Brief
            </span>
            <h2 className="heading-md mt-3">
              Frameworks, Not Fluff
            </h2>
          </div>
          <Link
            href="/resources"
            className="btn-ghost text-sm font-semibold self-start sm:self-auto"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group card-base rounded-sm overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-grey-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category] || "bg-grey-100 text-grey-700"}`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-grey-400 text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readingTime} min read
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-grey-900 group-hover:text-primary transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-grey-600 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold">
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
