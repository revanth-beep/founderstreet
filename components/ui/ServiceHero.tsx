import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceHeroProps {
  label: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  icon: LucideIcon;
  stats?: { value: string; label: string }[];
}

export default function ServiceHero({
  label,
  title,
  titleHighlight,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "/contact",
  icon: Icon,
  stats,
}: ServiceHeroProps) {
  return (
    <section className="relative bg-background-dark pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(27, 67, 50, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(45, 106, 79, 0.3) 0%, transparent 40%)
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
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-400 text-xs font-semibold uppercase tracking-[0.2em]">
              {label}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {title}{" "}
            {titleHighlight && (
              <span className="italic text-green-400">{titleHighlight}</span>
            )}
          </h1>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={ctaHref} className="btn-primary">
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/startup-health-check" className="btn-ghost text-white/70 hover:text-white">
              Take the Health Check →
            </Link>
          </div>

          {stats && (
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-green-400/80 text-xs font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
