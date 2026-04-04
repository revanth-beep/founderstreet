import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/cms";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

const PLACEHOLDER = "/og-image.png";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const posts = await getAllPosts("published");
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const published = await getAllPosts("published");
  const related = published.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <article style={{ paddingTop: "6rem" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingBottom: 0, position: "relative", overflow: "hidden" }}>
        {/* Ambient */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.4 }} />
          <div style={{ position: "absolute", width: "40vw", height: "40vw", top: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(102,187,63,0.4) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
        </div>

        <div className="container-custom" style={{ paddingTop: "3rem", paddingBottom: "2.5rem", position: "relative", zIndex: 1 }}>
          <Link
            href="/resources"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#9FE670", fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s ease", fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back to Resources
          </Link>

          <div style={{ maxWidth: "760px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "#66BB3F", color: "#fff", padding: "0.2rem 0.75rem", borderRadius: "999px" }}>
                {post.category}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Inter', sans-serif", color: "#A0A0A0", fontSize: "0.75rem" }}>
                <Clock style={{ width: "12px", height: "12px" }} />
                {post.readingTime} min read
              </span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.875rem, 3.5vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1rem" }}>
              {post.title}
            </h1>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "2rem", maxWidth: "640px" }}>
              {post.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(102,187,63,0.6)", border: "1px solid rgba(123,201,90,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BookOpen style={{ width: "18px", height: "18px", color: "#9FE670" }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#FFFFFF", fontSize: "0.875rem" }}>{post.author}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#A0A0A0", fontSize: "0.75rem" }}>{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container-custom" style={{ paddingBottom: 0 }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", aspectRatio: "16/7", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <section style={{ background: "#FAFAFA", paddingBlock: "4rem 5rem" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", background: "#F0F0ED", color: "#5A5A5A", padding: "0.25rem 0.75rem", borderRadius: "999px" }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article body */}
            <div
              style={{ fontFamily: "'Inter', sans-serif", color: "#3D3D3D", lineHeight: 1.8, fontSize: "1rem" }}
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.+)$/gm, '<h2 style="font-family:\'Playfair Display\',Georgia,serif;font-size:1.625rem;font-weight:700;color:#3d4246;margin-top:2.5rem;margin-bottom:1rem;line-height:1.2;letter-spacing:-0.01em;">$1</h2>')
                  .replace(/^## (.+)$/gm, '<h3 style="font-family:\'Playfair Display\',Georgia,serif;font-size:1.25rem;font-weight:700;color:#3d4246;margin-top:2rem;margin-bottom:0.75rem;">$1</h3>')
                  .replace(/\n\n/g, '</p><p style="margin-bottom:1.25rem;">')
                  .replace(/^/, '<p style="margin-bottom:1.25rem;">'),
              }}
            />

            {/* CTA Box */}
            <div style={{ marginTop: "3rem", padding: "2.25rem 2.5rem", background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", borderRadius: "8px", color: "#fff" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9FE670", marginBottom: "0.75rem" }}>
                Ready to act on this?
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                Let our team build your {post.category.toLowerCase()} strategy from scratch.
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Book a free 30-minute discovery call with one of our specialists.
              </p>
              <Link
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#fff", color: "#66BB3F", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.875rem", borderRadius: "4px", textDecoration: "none", transition: "background 0.2s ease" }}
              >
                Book a Free Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", paddingBlock: "4rem" }}>
          <div className="container-custom">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#3d4246", marginBottom: "1.75rem" }}>
              Related Articles
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "720px" }}>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resources/${p.slug}`}
                  style={{ display: "block", background: "#fff", border: "1px solid #E0E0DC", borderRadius: "6px", overflow: "hidden", textDecoration: "none", transition: "box-shadow 0.3s ease, border-color 0.2s ease" }}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#F0F0ED" }}>
                    <img
                      src={p.coverImage || PLACEHOLDER}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                    />
                  </div>
                  <div style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "#66BB3F" }}>{p.category}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "#3d4246", fontSize: "0.9375rem", marginTop: "0.25rem", lineHeight: 1.4 }}>
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
