import { Fragment, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { CVData } from "../types";
import { AIChatMessage, sendAIChatMessage } from "../services/aiChat";
import { Button } from "./ui/button";
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
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(
        <strong key={`${match.index}-strong`} className="font-bold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[4] && match[5]) {
      nodes.push(
        <a
          key={`${match.index}-link`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-accent"
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function AssistantContent({ content }: { content: string }) {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        const headingMatch = line.match(/^#{1,3}\s+(.*)$/);
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        const bulletMatch = line.match(/^[-*]\s+(.*)$/);

        if (headingMatch) {
          return (
            <h3 key={`${line}-${index}`} className="pt-1 text-sm font-bold text-primary">
              {renderInlineMarkdown(headingMatch[1])}
            </h3>
          );
        }

        if (numberedMatch) {
          return (
            <div key={`${line}-${index}`} className="grid grid-cols-[1.5rem_1fr] gap-2">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-primary/15 text-[10px] font-bold text-primary">
                {numberedMatch[1]}
              </span>
              <div>{renderInlineMarkdown(numberedMatch[2])}</div>
            </div>
          );
        }

        if (bulletMatch) {
          return (
            <div key={`${line}-${index}`} className="grid grid-cols-[0.75rem_1fr] gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <div>{renderInlineMarkdown(bulletMatch[1])}</div>
            </div>
          );
        }

        return <p key={`${line}-${index}`}>{renderInlineMarkdown(line)}</p>;
      })}
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

    const nextMessages: AIChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: trimmedInput,
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const answer = await sendAIChatMessage(nextMessages, data);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "AI assistant is temporarily unavailable.");
    } finally {
      setIsSending(false);
    }
  };

  const submitPrompt = async (prompt: string) => {
    if (isSending) return;

    const nextMessages: AIChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: prompt,
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const answer = await sendAIChatMessage(nextMessages, data);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
        },
      ]);
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
            className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl border border-primary/20 bg-background/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-primary/10 bg-secondary/40 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Bot className="h-4 w-4 text-primary" />
                  <span>AI Assistant</span>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  Ask about Anton's experience, stack, or projects.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close AI chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[min(360px,calc(100dvh-190px))] min-h-[180px] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.role === "user"
                        ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                        : "border border-primary/10 bg-primary/10 text-foreground"
                    )}
                  >
                    {message.role === "assistant" ? <AssistantContent content={message.content} /> : message.content}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-primary/10 bg-primary/10 px-4 py-3 text-sm text-muted-foreground">
                    <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                    Thinking...
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs leading-relaxed text-destructive">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-primary/10 bg-secondary/20 p-4">
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitPrompt(prompt)}
                      className="rounded-md border border-primary/15 bg-primary/5 px-2.5 py-1.5 text-left text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-3 rounded-2xl bg-background/70 p-2">
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
                  placeholder="Write a message..."
                  className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  size="icon-lg"
                  className="rounded-2xl"
                  disabled={!input.trim() || isSending}
                  aria-label="Send message"
                >
                  {isSending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="h-12 gap-3 rounded-full px-6 text-sm font-bold shadow-xl shadow-black/30"
        aria-expanded={isOpen}
        aria-label="Open AI chat"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">AI chat</span>
      </Button>
    </div>
  );
}
