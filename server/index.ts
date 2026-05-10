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
  headline?: string;
  email?: string;
  phone?: string | null;
  location?: string | null;
  about?: string | null;
  pdf_resume?: string | null;
  skills?: Array<{ name?: string; category?: string | null; level?: string | null }>;
  links?: Array<{ name?: string; url?: string }>;
  languages?: Array<{ name?: string; level?: string }>;
  experience_units?: Array<{ title?: string; organization?: string | null; description?: string | null; from_date?: string; to_date?: string | null }>;
  education_units?: Array<{ institution?: string; degree?: string | null; field_of_study?: string | null; description?: string | null; from_date?: string; to_date?: string | null }>;
  portfolio_items?: Array<{ title?: string; description?: string | null; links?: Array<{ name?: string; url?: string }> }>;
  certifications?: Array<{ name?: string; issuing_organization?: string }>;
  awards?: Array<{ title?: string; issuer?: string | null; description?: string | null }>;
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

    const data = {
      unit_name: raw.unit_name ?? "",
      first_name: raw.first_name ?? "",
      last_name: raw.last_name ?? "",
      headline: raw.headline ?? "",
      email: raw.email ?? "",
      phone: raw.phone ?? null,
      location: raw.location ?? null,
      about: raw.about ?? null,
      pdf_resume: raw.pdf_resume ?? null,
      photos: raw.photos ?? [],
      skills: raw.skills ?? [],
      links: raw.links ?? [],
      languages: raw.languages ?? [],
      experience_units: raw.experience_units ?? [],
      education_units: raw.education_units ?? [],
      portfolio_items: raw.portfolio_items ?? [],
      certifications: raw.certifications ?? [],
      awards: raw.awards ?? [],
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
    headline: cv.headline,
    email: cv.email,
    phone: cv.phone,
    location: cv.location,
    about: cv.about,
    resume: cv.pdf_resume,
    skills: cv.skills?.map((s) => [s.name, s.level].filter(Boolean).join(" - ")).filter(Boolean),
    links: cv.links,
    languages: cv.languages,
    experience: cv.experience_units?.map((item) => ({
      role: item.title,
      organization: item.organization,
      dates: [item.from_date, item.to_date ?? "Present"].join(" — "),
      description: item.description,
    })),
    education: cv.education_units?.map((item) => ({
      institution: item.institution,
      degree: [item.degree, item.field_of_study].filter(Boolean).join(", "),
      dates: [item.from_date, item.to_date ?? "Present"].join(" — "),
      description: item.description,
    })),
    projects: cv.portfolio_items?.map((item) => ({
      name: item.title,
      description: item.description,
      links: item.links,
    })),
    certifications: cv.certifications?.map((c) => `${c.name} — ${c.issuing_organization}`),
    awards: cv.awards?.map((a) => `${a.title}${a.issuer ? " from " + a.issuer : ""}`),
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

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function buildIndexHtml(): Promise<string> {
  const raw = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
  const apiUrl = process.env.PWB_API_URL;
  if (!apiUrl) return raw;

  try {
    const headers: Record<string, string> = {};
    const apiKey = process.env.PWB_API_KEY;
    const apiSecret = process.env.PWB_API_SECRET;
    if (apiKey && apiSecret) {
      headers["X-Api-Key"] = apiKey;
      headers["X-Api-Secret"] = apiSecret;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cv: any = await fetch(apiUrl, { headers }).then((r) => r.json());

    const name = `${cv.first_name ?? ""} ${cv.last_name ?? ""}`.trim();
    const headline = cv.headline ?? "";
    const title = headline ? `${name} — ${headline}` : name;
    const about: string = cv.about ?? "";
    const description = escapeHtml(about.slice(0, 160) || title);
    const image: string = cv.photos?.find((p: { is_main: boolean }) => p.is_main)?.image
      ?? cv.photos?.[0]?.image
      ?? "";

    const ogTags = [
      `<meta name="description" content="${escapeHtml(description)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      image ? `<meta property="og:image" content="${image}" />` : "",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      image ? `<meta name="twitter:image" content="${image}" />` : "",
    ].filter(Boolean).join("\n    ");

    return raw
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace("<!-- OG tags injected by server in production -->", ogTags);
  } catch {
    return raw;
  }
}

if (isProduction) {
  let cachedHtml: string | null = null;
  app.use(express.static(distPath));
  app.get("*", async (_req, res) => {
    try {
      if (!cachedHtml) cachedHtml = await buildIndexHtml();
      res.setHeader("Content-Type", "text/html");
      res.send(cachedHtml);
    } catch {
      res.sendFile(path.join(distPath, "index.html"));
    }
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
