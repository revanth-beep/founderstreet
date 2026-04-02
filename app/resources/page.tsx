import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { SAMPLE_POSTS } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Resources — The Founder's Brief",
  description:
    "Frameworks, playbooks, and teardowns for Indian founders. Unit economics, pitch decks, incorporation guides, and more.",
};

const categories = ["All", "Finance", "Legal", "Fundraising", "Marketing", "Tech", "Strategy"];

const categoryColors: Record<string, string> = {
  Finance: "bg-blue-50 text-blue-700 border-blue-200",
  Legal: "bg-purple-50 text-purple-700 border-purple-200",
  Fundraising: "bg-green-100 text-green-700 border-green-200",
  Marketing: "bg-orange-50 text-orange-700 border-orange-200",
  Tech: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Strategy: "bg-teal-50 text-teal-700 border-teal-200",
};

export default async function ResourcesPage() {
  const posts = SAMPLE_POSTS;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-background-dark pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 50%, rgba(27, 67, 50, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 85% 30%, rgba(45, 106, 79, 0.25) 0%, transparent 40%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(184, 228, 199, 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em]">
              The Founder&apos;s Brief
            </span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Frameworks, Not Fluff.
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Deep-dive playbooks for Indian founders navigating unit economics, fundraising, legal,
            and everything in between.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  cat === "All"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-grey-600 border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {posts.filter((p) => p.featured)[0] && (
            <Link
              href={`/resources/${posts.filter((p) => p.featured)[0].slug}`}
              className="group block bg-white border border-border rounded-sm overflow-hidden hover:shadow-medium transition-all duration-300 mb-8"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto lg:min-h-[280px] overflow-hidden bg-grey-100">
                  <img
                    src={posts.filter((p) => p.featured)[0].coverImage}
                    alt={posts.filter((p) => p.featured)[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        categoryColors[posts.filter((p) => p.featured)[0].category] ||
                        "bg-grey-100 text-grey-700 border-grey-200"
                      }`}
                    >
                      {posts.filter((p) => p.featured)[0].category}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-grey-900 group-hover:text-primary transition-colors leading-tight mb-3">
                    {posts.filter((p) => p.featured)[0].title}
                  </h2>
                  <p className="text-grey-600 text-sm leading-relaxed mb-5">
                    {posts.filter((p) => p.featured)[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-grey-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {posts.filter((p) => p.featured)[0].readingTime} min read
                    </span>
                    <span>{posts.filter((p) => p.featured)[0].author}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .filter((p) => !p.featured || posts.filter((fp) => fp.featured).indexOf(p) > 0)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/resources/${post.slug}`}
                  className="group card-base rounded-sm overflow-hidden"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-grey-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          categoryColors[post.category] || "bg-grey-100 text-grey-700 border-grey-200"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-grey-400 text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
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

      {/* Newsletter CTA */}
      <section className="section-padding bg-grey-50 border-t border-border">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-bold text-grey-900 mb-3">
              Get the Founder&apos;s Edge, Every Week.
            </h2>
            <p className="text-grey-600 text-sm leading-relaxed mb-6">
              Weekly breakdown of unit economics, pitch tear-downs, and growth tactics — straight
              to your inbox. No spam, ever.
            </p>
            <form className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="btn-primary flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-grey-400 text-xs mt-3">
              Join 2,400+ founders reading every Friday.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
