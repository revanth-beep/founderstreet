import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1F16] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-[#7BC95A] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          404 — Page Not Found
        </p>
        <h1 className="font-serif text-6xl font-bold text-white mb-4">
          Lost in the weeds?
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white font-semibold text-sm rounded-sm hover:border-white hover:bg-white/10 transition-all"
          >
            Talk to us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
