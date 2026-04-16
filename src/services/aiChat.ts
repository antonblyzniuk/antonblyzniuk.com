import { CVData } from "../types";

export type AIChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function sendAIChatMessage(messages: AIChatMessage[], cvContext: CVData) {
  const response = await fetch("/api/ai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      cvContext,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error || "AI assistant is temporarily unavailable.");
  }

  if (typeof payload?.answer !== "string") {
    throw new Error("AI assistant returned an invalid response.");
  }

  return payload.answer;
}
