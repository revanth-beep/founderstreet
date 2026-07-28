"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, Minimize2, MessageCircle } from "lucide-react";
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
  "Where's your FAQ section?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Founder AI, powered by FounderStreet's knowledge base. I can help you with questions about company incorporation, fundraising, accounting, marketing, and more. What's on your mind?",
  timestamp: new Date(),
};

const c = {
  ink: "#3d4246",
  muted: "#5A5A5A",
  subtle: "#787878",
  border: "#E0E0DC",
  panel: "#F0F0ED",
  white: "#FFFFFF",
  green: "#66BB3F",
  greenHover: "#56AD32",
  greenSoft: "#E9F6E4",
  headerBg: "#4A5056",
  headerMuted: "#A0A0A0",
  online: "#9FE670",
};

export default function AIWidget({ whatsappUrl = "https://wa.me/919876543210" }: { whatsappUrl?: string }) {
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

  const panelVisible = open && !minimised;

  return (
    <>
            {/* Chat window */}
      <div
        className="ai-widget-anchor"
        style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "1rem",
          zIndex: 50,
          width: "min(calc(100vw - 2rem), 24rem)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          transformOrigin: "bottom right",
          opacity: panelVisible ? 1 : 0,
          transform: panelVisible ? "scale(1)" : "scale(0.96)",
          pointerEvents: panelVisible ? "auto" : "none",
        }}
      >
        <div
          style={{
            background: c.white,
            borderRadius: "8px",
            border: `1px solid ${c.border}`,
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.30), 0 8px 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            height: "500px",
            overflow: "hidden",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              background: c.headerBg,
              flexShrink: 0,
              borderBottom: `1px solid ${c.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: c.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={16} color={c.white} />
              </div>
              <div>
                <p style={{ color: c.white, fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>Founder AI</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "2px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: c.online,
                      flexShrink: 0,
                    }}
                  />
                  <p style={{ color: c.headerMuted, fontSize: "0.75rem", margin: 0 }}>Online now</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <button
                type="button"
                onClick={() => setMinimised(true)}
                style={{
                  width: "28px",
                  height: "28px",
                  border: "none",
                  background: "transparent",
                  color: c.headerMuted,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
                aria-label="Minimise"
              >
                <Minimize2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  width: "28px",
                  height: "28px",
                  border: "none",
                  background: "transparent",
                  color: c.headerMuted,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              background: c.panel,
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: c.green,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Bot size={12} color={c.white} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "80%",
                    borderRadius: "6px",
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    background: msg.role === "user" ? c.green : c.white,
                    color: msg.role === "user" ? c.white : c.muted,
                    border: msg.role === "user" ? "none" : `1px solid ${c.border}`,
                  }}
                >
                  {msg.content}
                  {msg.content.includes("book a call") && (
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        marginTop: "0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textDecoration: "underline",
                        color: msg.role === "user" ? "rgba(255,255,255,0.95)" : c.green,
                      }}
                    >
                      Book a free call →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-start" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: c.green,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={12} color={c.white} />
                </div>
                <div
                  style={{
                    background: c.white,
                    border: `1px solid ${c.border}`,
                    borderRadius: "6px",
                    padding: "0.5rem 0.75rem",
                    display: "flex",
                    gap: "0.25rem",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: c.subtle,
                        animation: `fs-chat-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div
              style={{
                padding: "0.5rem 0.75rem",
                borderTop: `1px solid ${c.border}`,
                background: c.white,
                flexShrink: 0,
              }}
            >
              <p style={{ color: c.subtle, fontSize: "0.75rem", marginBottom: "0.5rem", fontWeight: 500 }}>Suggested questions:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    style={{
                      fontSize: "0.75rem",
                      background: c.panel,
                      border: `1px solid ${c.border}`,
                      color: c.muted,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              borderTop: `1px solid ${c.border}`,
              background: c.white,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask me anything about your startup..."
              disabled={loading}
              style={{
                flex: 1,
                fontSize: "0.875rem",
                padding: "0.5rem 0.75rem",
                border: `1px solid ${c.border}`,
                borderRadius: "6px",
                outline: "none",
                fontFamily: "inherit",
                color: c.ink,
              }}
            />
            <button
              type="button"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: "36px",
                height: "36px",
                background: loading || !input.trim() ? "#C4C4C4" : c.green,
                color: c.white,
                border: "none",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                flexShrink: 0,
              }}
              aria-label="Send"
            >
              {loading ? <Loader2 size={16} style={{ animation: "fs-spin 0.8s linear infinite" }} /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>

      {open && minimised && (
        <div className="ai-widget-anchor" style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 50 }}>
          <button
            type="button"
            onClick={() => setMinimised(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              background: c.headerBg,
              color: c.white,
              padding: "0.625rem 1rem",
              borderRadius: "8px",
              border: `1px solid ${c.border}`,
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.30), 0 8px 20px rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <Bot size={16} color={c.online} />
            <span>Founder AI</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.online }} />
          </button>
        </div>
      )}

      {!open && (
        <div className="ai-widget-anchor" style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.625rem" }}>
          {/* WhatsApp button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "#25D366", color: "#FFFFFF", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 30px rgba(37,211,102,0.35), 0 6px 20px rgba(0,0,0,0.2)",
              transition: "transform 0.2s ease",
              textDecoration: "none",
            }}
            aria-label="Chat on WhatsApp"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            <MessageCircle size={20} />
          </a>
          {/* AI chat button */}
          <button
            type="button"
            onClick={() => { setOpen(true); setMinimised(false); }}
            style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: c.green, color: c.white, border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(102,187,63,0.40), 0 10px 40px rgba(0,0,0,0.25)",
              transition: "transform 0.2s ease, background 0.2s ease",
              position: "relative",
            }}
            aria-label="Open Founder AI chat"
            onMouseEnter={(e) => { e.currentTarget.style.background = c.greenHover; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = c.green; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <MessageSquare size={24} />
            {hasUnread && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "16px", height: "16px", background: "#DC2626", borderRadius: "50%", fontSize: "9px", fontWeight: 700, color: c.white, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>
            )}
          </button>
        </div>
      )}
    </>
  );
}
