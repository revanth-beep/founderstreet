"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's the difference between LLP and Pvt Ltd?",
  "How much does it cost to incorporate a company?",
  "How do I start raising funds?",
  "What services do you offer?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Founder AI, powered by Founderstreet's knowledge base. I can help you with questions about company incorporation, fundraising, accounting, marketing, and more. What's on your mind?",
  timestamp: new Date(),
};

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimised]);

  // Show notification dot after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setHasUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [open]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please email us at hello@founderstreet.in or book a call directly.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300 origin-bottom-right",
          open && !minimised
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-sm shadow-strong border border-border flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-grey-950 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Founder AI</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-grey-400 text-xs">Online now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimised(true)}
                className="w-7 h-7 text-grey-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Minimise"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 text-grey-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-grey-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-sm px-3 py-2 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-grey-700"
                  )}
                >
                  {msg.content}
                  {msg.content.includes("book a call") && (
                    <Link
                      href="/contact"
                      className="block mt-2 text-xs font-semibold underline"
                      onClick={() => setOpen(false)}
                    >
                      Book a free call →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white border border-border rounded-sm px-3 py-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-grey-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions (only on fresh chat) */}
          {messages.length === 1 && (
            <div className="px-3 py-2 border-t border-border bg-white flex-shrink-0">
              <p className="text-grey-400 text-xs mb-2 font-medium">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-grey-50 border border-border text-grey-600 hover:border-primary hover:text-primary px-2.5 py-1 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-border bg-white flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask me anything about your startup..."
              className="flex-1 text-sm px-3 py-2 border border-border rounded-sm focus:outline-none focus:border-primary transition-colors"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-8 h-8 bg-primary text-white rounded-sm flex items-center justify-center hover:bg-primary-light disabled:opacity-50 transition-colors flex-shrink-0"
              aria-label="Send"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Minimised bar */}
      {open && minimised && (
        <div className="fixed bottom-4 right-4 sm:right-6 z-50">
          <button
            onClick={() => setMinimised(false)}
            className="flex items-center gap-2.5 bg-grey-950 text-white px-4 py-2.5 rounded-sm shadow-strong hover:bg-grey-800 transition-colors"
          >
            <Bot className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Founder AI</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          </button>
        </div>
      )}

      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimised(false); }}
          className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 bg-primary hover:bg-primary-light text-white rounded-full shadow-green-glow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Open Founder AI chat"
        >
          <MessageSquare className="w-6 h-6" />
          {hasUnread && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">1</span>
            </div>
          )}
        </button>
      )}
    </>
  );
}
