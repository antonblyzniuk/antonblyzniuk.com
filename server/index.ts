import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

dotenv.config({ override: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distPath = path.join(root, "dist");
const port = Number(process.env.PORT || 3000);
const forceDev = process.argv.includes("--dev");
const hasBuiltClient = fs.existsSync(path.join(distPath, "index.html"));
const isProduction = !forceDev && (process.env.NODE_ENV === "production" || hasBuiltClient);

const app = express();

app.use(express.json({ limit: "1mb" }));

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type CVContext = {
  first_name?: string;
  last_name?: string;
  profession?: string;
  email?: string;
  about?: string;
  pdf_resume?: string;
  skills?: Array<{ name?: string }>;
  links?: Array<{ name?: string; url?: string }>;
  languages?: Array<{ name?: string; level?: string }>;
  experience_units?: Array<{ name?: string; description?: string; from_date?: string; to_date?: string }>;
  education_units?: Array<{ name?: string; description?: string; from_date?: string; to_date?: string }>;
  projects?: Array<{ name?: string; description?: string; links?: Array<{ name?: string; url?: string }> }>;
};

app.get("/api/cv", async (_req: Request, res: Response) => {
  const url = process.env.PWB_API_URL;

  if (!url) {
    return res.status(500).json({
      error: "PWB_API_URL must be set in environment variables.",
    });
  }

  const headers: Record<string, string> = {};
  const apiKey = process.env.PWB_API_KEY;
  const apiSecret = process.env.PWB_API_SECRET;
  if (apiKey && apiSecret) {
    headers["X-Api-Key"] = apiKey;
    headers["X-Api-Secret"] = apiSecret;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const body = await response.text();
      return res.status(response.status).json({ error: body });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await response.json();

    // Map backend PWBUnit shape to the CVData shape the frontend expects
    const data = {
      first_name: raw.first_name ?? "",
      last_name: raw.last_name ?? "",
      profession: raw.headline ?? "",
      email: raw.email ?? "",
      phone: raw.phone ?? null,
      location: raw.location ?? null,
      about: raw.about ?? "",
      pdf_resume: raw.pdf_resume ?? null,
      photos: raw.photos ?? [],
      skills: raw.skills ?? [],
      links: raw.links ?? [],
      languages: raw.languages ?? [],
      experience_units: (raw.experience_units ?? []).map((exp: any) => ({
        name: exp.title ?? "",
        organization: exp.organization ?? null,
        description: exp.description ?? "",
        from_date: exp.from_date ?? "",
        to_date: exp.to_date ?? "Present",
      })),
      education_units: (raw.education_units ?? []).map((edu: any) => ({
        name: edu.institution ?? "",
        degree: edu.degree ?? null,
        field_of_study: edu.field_of_study ?? null,
        description: edu.description ?? "",
        from_date: edu.from_date ?? "",
        to_date: edu.to_date ?? "Present",
        image: edu.image ?? null,
      })),
      projects: (raw.portfolio_items ?? []).map((item: any) => ({
        name: item.title ?? "",
        description: item.description ?? "",
        links: item.links ?? [],
        image: item.image ?? null,
      })),
    };

    return res.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch CV data.";
    return res.status(502).json({ error: message });
  }
});

type OpenRouterAttemptError = {
  keyIndex: number;
  status: number | "network";
  message: string;
};

function getOpenRouterKeys() {
  return (process.env.OPENROUTER_KEYS || "")
    .split(/[,\n;]/)
    .map((key) => key.trim())
    .filter(Boolean);
}

function getRoutedOpenRouterKeys() {
  const keys = getOpenRouterKeys();

  return keys
    .map((key, index) => ({ key, index, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ key, index }) => ({ key, index }));
}

function shouldTryNextKey(status: number) {
  return [401, 402, 403, 408, 409, 425, 429, 500, 502, 503, 504].includes(status);
}

function compactCvContext(cv: CVContext) {
  const fullName = `${cv.first_name || ""} ${cv.last_name || ""}`.trim();

  return {
    name: fullName,
    profession: cv.profession,
    email: cv.email,
    about: cv.about,
    resume: cv.pdf_resume,
    skills: cv.skills?.map((skill) => skill.name).filter(Boolean),
    links: cv.links,
    languages: cv.languages,
    experience: cv.experience_units?.map((item) => ({
      role: item.name,
      dates: [item.from_date, item.to_date].filter(Boolean).join(" - "),
      description: item.description,
    })),
    education: cv.education_units?.map((item) => ({
      name: item.name,
      dates: [item.from_date, item.to_date].filter(Boolean).join(" - "),
      description: item.description,
    })),
    projects: cv.projects?.map((project) => ({
      name: project.name,
      description: project.description,
      links: project.links,
    })),
  };
}

app.post("/api/ai-chat", async (req: Request, res: Response) => {
  const routedKeys = getRoutedOpenRouterKeys();
  const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat";

  if (routedKeys.length === 0) {
    return res.status(500).json({
      error: "OPENROUTER_KEYS is not configured. Add your OpenRouter key to .env and restart the server.",
    });
  }

  const messages = Array.isArray(req.body?.messages) ? (req.body.messages as ChatMessage[]) : [];
  const cvContext = compactCvContext((req.body?.cvContext || {}) as CVContext);

  const sanitizedMessages = messages
    .filter((message) => message && (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 2000),
    }));

  if (sanitizedMessages.length === 0) {
    return res.status(400).json({ error: "Message is required." });
  }

  const openRouterMessages = [
    {
      role: "system",
      content:
        "You are the AI assistant for Anton Blyzniuk's portfolio website. Always answer in English, even when the visitor writes in another language. Use only the provided CV/resume context for facts about Anton. Be concise, polished, friendly, and useful. Do not use emoji. Format portfolio answers with clean Markdown: short intro, numbered or bulleted lists, bold names, and Markdown links when URLs are available. If the visitor asks for projects, list each project as '**Project Name**' followed by one clear sentence and relevant links. If the context does not contain an answer, say that briefly in English and suggest contacting Anton by email or opening the resume link. Do not invent experience, dates, projects, education, or skills.",
    },
    {
      role: "system",
      content: `CV/resume context:\n${JSON.stringify(cvContext, null, 2)}`,
    },
    ...sanitizedMessages,
  ];

  const attemptErrors: OpenRouterAttemptError[] = [];

  for (const routedKey of routedKeys) {
    try {
      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${routedKey.key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
          "X-Title": process.env.OPENROUTER_SITE_NAME || "antonblyzniuk.com",
        },
        body: JSON.stringify({
          model,
          temperature: 0.35,
          max_tokens: 700,
          messages: openRouterMessages,
        }),
      });

      const payload = await openRouterResponse.json();

      if (!openRouterResponse.ok) {
        const message = payload?.error?.message || payload?.message || "OpenRouter request failed.";
        attemptErrors.push({
          keyIndex: routedKey.index,
          status: openRouterResponse.status,
          message,
        });

        if (shouldTryNextKey(openRouterResponse.status)) {
          continue;
        }

        return res.status(openRouterResponse.status).json({
          error: message,
          attempts: attemptErrors.map((attempt) => ({
            keyIndex: attempt.keyIndex,
            status: attempt.status,
            message: attempt.message,
          })),
        });
      }

      const answer = payload?.choices?.[0]?.message?.content;

      if (typeof answer !== "string" || !answer.trim()) {
        return res.status(502).json({ error: "OpenRouter returned an empty answer." });
      }

      return res.json({
        answer: answer.trim(),
        model,
        keyIndex: routedKey.index,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected AI chat error.";
      attemptErrors.push({
        keyIndex: routedKey.index,
        status: "network",
        message,
      });
    }
  }

  return res.status(502).json({
    error: "All OpenRouter keys failed. Check OPENROUTER_KEYS limits, balances, and permissions.",
    attempts: attemptErrors.map((attempt) => ({
      keyIndex: attempt.keyIndex,
      status: attempt.status,
      message: attempt.message,
    })),
  });
});

if (isProduction) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const vite = await createViteServer({
    root,
    server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== "true" },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
