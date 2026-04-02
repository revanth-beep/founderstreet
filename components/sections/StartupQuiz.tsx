"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: "stage",
    question: "What stage is your startup at?",
    options: [
      { label: "Just an idea", value: "idea" },
      { label: "Building MVP", value: "mvp" },
      { label: "Have early users", value: "early_users" },
      { label: "Generating revenue", value: "revenue" },
    ],
  },
  {
    id: "sector",
    question: "Which sector are you building in?",
    options: [
      { label: "B2B SaaS / Enterprise", value: "b2b_saas" },
      { label: "D2C / Consumer Brand", value: "d2c" },
      { label: "FinTech / EdTech / HealthTech", value: "vertical_tech" },
      { label: "Marketplace / Platform", value: "marketplace" },
    ],
  },
  {
    id: "challenge",
    question: "What's your biggest challenge right now?",
    options: [
      { label: "Validating product-market fit", value: "pmf" },
      { label: "Building the product", value: "build" },
      { label: "Acquiring first customers", value: "acquisition" },
      { label: "Raising funding", value: "funding" },
    ],
  },
  {
    id: "team",
    question: "What does your founding team look like?",
    options: [
      { label: "Solo founder", value: "solo" },
      { label: "2 co-founders", value: "two" },
      { label: "3+ founders", value: "three_plus" },
      { label: "Have a small team (5+)", value: "team" },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to raise funding?",
    options: [
      { label: "Within 3 months", value: "3m" },
      { label: "3–6 months", value: "6m" },
      { label: "6–12 months", value: "12m" },
      { label: "Not focused on raising yet", value: "not_yet" },
    ],
  },
];

type Step = "quiz" | "email" | "done";

export default function StartupQuiz() {
  const [step, setStep] = useState<Step>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const q = questions[currentQ];
  const progress = ((currentQ + (answers[q?.id] ? 1 : 0)) / questions.length) * 100;

  function selectAnswer(value: string) {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
      } else {
        setStep("email");
      }
    }, 250);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers }),
      });
      setStep("done");
    } catch {
      // Fail silently, show done anyway
      setStep("done");
    } finally {
      setLoading(false);
    }
  }

  if (step === "done") {
    return (
      <div className="bg-white border border-border rounded-sm p-8 lg:p-10 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-serif text-xl font-bold text-grey-900 mb-2">
          Your SWOT Report is on its way!
        </h3>
        <p className="text-grey-600 text-sm leading-relaxed mb-6">
          Check your inbox within 5 minutes. We&apos;ve also tagged your profile so our team
          can follow up with personalised insights for your specific stage and sector.
        </p>
        <div className="grid grid-cols-3 gap-4 p-4 bg-grey-50 rounded-sm">
          {[
            { label: "Market Sizing", status: "Included" },
            { label: "SWOT Analysis", status: "Included" },
            { label: "Competitor Map", status: "Included" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xs font-semibold text-primary">{item.status}</p>
              <p className="text-xs text-grey-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === "email") {
    return (
      <div className="bg-white border border-border rounded-sm p-8 lg:p-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              All done!
            </span>
            <span className="text-xs text-grey-400">5 / 5 questions</span>
          </div>
          <div className="h-1.5 bg-grey-100 rounded-full">
            <div className="h-full bg-primary rounded-full w-full transition-all duration-500" />
          </div>
        </div>

        <h3 className="font-serif text-xl font-bold text-grey-900 mb-1">
          Where should we send your report?
        </h3>
        <p className="text-grey-600 text-sm mb-6">
          Get your free personalised SWOT report instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Send My Free SWOT Report
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-grey-400 text-xs text-center">
            No spam. Your data is private. Unsubscribe anytime.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-sm p-6 lg:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Startup Health Check
          </span>
          <span className="text-xs text-grey-400">
            {currentQ + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 bg-grey-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="font-serif text-lg font-bold text-grey-900 mb-5">{q.question}</h3>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => selectAnswer(opt.value)}
            className={cn(
              "text-left p-4 border rounded-sm text-sm font-medium transition-all duration-200",
              answers[q.id] === opt.value
                ? "border-primary bg-green-50 text-primary"
                : "border-border bg-white text-grey-700 hover:border-primary hover:bg-grey-50"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Back button */}
      {currentQ > 0 && (
        <button
          onClick={() => setCurrentQ((c) => c - 1)}
          className="mt-4 text-grey-400 hover:text-grey-600 text-xs transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
