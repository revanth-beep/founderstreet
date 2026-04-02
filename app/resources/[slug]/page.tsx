import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { SAMPLE_POSTS } from "@/lib/cms";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = SAMPLE_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  return SAMPLE_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = SAMPLE_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = SAMPLE_POSTS.filter(
    (p) => p.slug !== params.slug && p.category === post.category
  ).slice(0, 2);

  return (
    <article className="pt-24">
      {/* Hero */}
      <div className="bg-background-dark pb-0">
        <div className="container-custom pt-12 pb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-grey-400 text-xs">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{post.author}</p>
                <p className="text-grey-400 text-xs">{post.authorRole}</p>
              </div>
              <div className="ml-auto">
                <button className="flex items-center gap-2 text-grey-400 hover:text-white text-sm transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container-custom pb-0">
            <div className="max-w-4xl mx-auto aspect-[16/7] rounded-t-sm overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container-custom py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-grey-100 text-grey-600 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Article body */}
          <div className="prose prose-lg prose-green max-w-none">
            <div
              className="text-grey-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.+)$/gm, '<h2 class="font-serif text-2xl font-bold text-grey-900 mt-10 mb-4">$1</h2>')
                  .replace(/^## (.+)$/gm, '<h3 class="font-serif text-xl font-bold text-grey-900 mt-8 mb-3">$1</h3>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^/, '<p class="mb-4">'),
              }}
            />
          </div>

          {/* CTA Box */}
          <div className="mt-12 p-6 lg:p-8 bg-primary rounded-sm text-white">
            <h3 className="font-serif text-xl font-bold mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-white/75 text-sm leading-relaxed mb-5">
              Our team can help you build your {post.category.toLowerCase()} strategy from scratch.
              Book a free 30-minute call with one of our specialists.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-sm hover:bg-green-50 transition-colors"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-grey-50 border-t border-border">
          <div className="container-custom">
            <h2 className="font-serif text-xl font-bold text-grey-900 mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resources/${p.slug}`}
                  className="group bg-white border border-border rounded-sm overflow-hidden hover:shadow-medium transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-primary">{p.category}</span>
                    <h3 className="font-serif font-bold text-grey-900 text-sm mt-1 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
