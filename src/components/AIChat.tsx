import { Fragment, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Send, X } from "lucide-react";
import { CVData } from "../types";
import { AIChatMessage, sendAIChatMessage } from "../services/aiChat";
import { cn } from "../lib/utils";

interface AIChatProps {
  data: CVData;
}

const initialMessage: AIChatMessage = {
  role: "assistant",
  content: "Hi! I am the AI assistant for this portfolio. Ask me about Anton's tech stack, experience, education, or projects.",
};

const quickPrompts = ["Tell me about Anton's projects", "What is Anton's tech stack?", "Summarize Anton's experience"];

function renderInlineMarkdown(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[2]) {
      nodes.push(<strong key={`${match.index}-strong`} className="font-bold text-foreground">{match[2]}</strong>);
    } else if (match[4] && match[5]) {
      nodes.push(
        <a key={`${match.index}-link`} href={match[5]} target="_blank" rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-accent-2">
          {match[4]}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function AssistantContent({ content }: { content: string }) {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const headingMatch = line.match(/^#{1,3}\s+(.*)$/);
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        const bulletMatch = line.match(/^[-*]\s+(.*)$/);
        if (headingMatch) return (
          <h3 key={`${line}-${index}`} className="pt-1 text-sm font-bold" style={{ color: "#a89aff" }}>
            {renderInlineMarkdown(headingMatch[1])}
          </h3>
        );
        if (numberedMatch) return (
          <div key={`${line}-${index}`} className="grid grid-cols-[1.5rem_1fr] gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold"
              style={{ background: "rgba(124,106,255,0.15)", color: "#a89aff" }}>
              {numberedMatch[1]}
            </span>
            <div>{renderInlineMarkdown(numberedMatch[2])}</div>
          </div>
        );
        if (bulletMatch) return (
          <div key={`${line}-${index}`} className="grid grid-cols-[0.75rem_1fr] gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
            <div>{renderInlineMarkdown(bulletMatch[1])}</div>
          </div>
        );
        return <p key={`${line}-${index}`}>{renderInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#7c6aff" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function AIChat({ data }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AIChatMessage[]>([initialMessage]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen, isSending]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;
    const nextMessages: AIChatMessage[] = [...messages, { role: "user", content: trimmedInput }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);
    try {
      const answer = await sendAIChatMessage(nextMessages, data);
      setMessages((cur) => [...cur, { role: "assistant", content: answer }]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "AI assistant is temporarily unavailable.");
    } finally {
      setIsSending(false);
    }
  };

  const submitPrompt = async (prompt: string) => {
    if (isSending) return;
    const nextMessages: AIChatMessage[] = [...messages, { role: "user", content: prompt }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);
    try {
      const answer = await sendAIChatMessage(nextMessages, data);
      setMessages((cur) => [...cur, { role: "assistant", content: answer }]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "AI assistant is temporarily unavailable.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-[90] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] liquid-card rounded-2xl overflow-hidden relative z-[1] shadow-2xl"
            style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,106,255,0.1)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 relative z-[1]"
              style={{ borderBottom: "1px solid rgba(124,106,255,0.1)", background: "rgba(13,13,32,0.6)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Monogram */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-none"
                  style={{
                    background: "rgba(124,106,255,0.15)",
                    border: "1px solid rgba(124,106,255,0.3)",
                  }}
                >
                  <span className="font-display font-black text-xs" style={{ color: "#a89aff" }}>
                    {data.first_name[0]}{data.last_name[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-sm font-bold text-foreground flex items-center gap-2">
                    AI ASSISTANT
                    {/* Pulsing green dot */}
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    Ask about {data.first_name}'s experience
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors ml-2"
                aria-label="Close AI chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="max-h-[min(360px,calc(100dvh-190px))] min-h-[180px] overflow-y-auto px-4 py-4 space-y-3 relative z-[1]"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.role === "user"
                        ? "font-mono"
                        : "font-mono text-foreground/90"
                    )}
                    style={
                      message.role === "user"
                        ? { background: "rgba(124,106,255,0.2)", border: "1px solid rgba(124,106,255,0.3)", color: "#e8e8f0" }
                        : { background: "rgba(13,13,32,0.8)", border: "1px solid rgba(124,106,255,0.1)" }
                    }
                  >
                    {message.role === "assistant" ? (
                      <AssistantContent content={message.content} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl"
                    style={{ background: "rgba(13,13,32,0.8)", border: "1px solid rgba(124,106,255,0.1)" }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-xs leading-relaxed text-destructive font-mono"
                  style={{ background: "rgba(243,139,168,0.1)", border: "1px solid rgba(243,139,168,0.3)" }}
                >
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 relative z-[1]"
              style={{ borderTop: "1px solid rgba(124,106,255,0.1)", background: "rgba(8,8,22,0.6)" }}
            >
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitPrompt(prompt)}
                      className="rounded-md px-2.5 py-1.5 text-left text-[10px] font-mono transition-colors"
                      style={{
                        border: "1px solid rgba(124,106,255,0.15)",
                        background: "rgba(124,106,255,0.05)",
                        color: "#4a4a6a",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "rgba(124,106,255,0.4)";
                        el.style.color = "#a89aff";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "rgba(124,106,255,0.15)";
                        el.style.color = "#4a4a6a";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div
                className="flex items-end gap-3 rounded-xl p-2"
                style={{ background: "rgba(4,4,10,0.7)" }}
              >
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={1}
                  maxLength={1200}
                  placeholder="ASK ME ANYTHING..."
                  className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-foreground outline-none font-mono"
                  style={{ color: "rgba(232,232,240,0.85)" }}
                />
                <AnimatePresence>
                  {input.trim() && (
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      disabled={isSending}
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-none transition-all"
                      style={{
                        background: "rgba(124,106,255,0.2)",
                        border: "1px solid rgba(124,106,255,0.4)",
                        color: "#a89aff",
                      }}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((cur) => !cur)}
        whileHover={{ scale: 1.05, rotate: isOpen ? 0 : 5 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center glow-primary transition-all"
        style={{
          background: "rgba(124,106,255,0.2)",
          border: "1px solid rgba(124,106,255,0.4)",
          backdropFilter: "blur(20px)",
        }}
        aria-expanded={isOpen}
        aria-label="Open AI chat"
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0, color: isOpen ? "#ff6b6b" : "#a89aff" }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </motion.span>
      </motion.button>
    </div>
  );
}
