# Railway Deployment

This project is ready to deploy on Railway using the included `Dockerfile`.

## Required Variables

Set these in Railway service variables:

```env
VITE_API_URL=https://pwb.api.antonblyzniuk.com/api/v1/pwbunits/antonblyzniuk/
OPENROUTER_KEYS=sk-or-v1-key1,sk-or-v1-key2
OPENROUTER_MODEL=deepseek/deepseek-chat
OPENROUTER_SITE_URL=https://your-railway-domain.up.railway.app
OPENROUTER_SITE_NAME=antonblyzniuk.com
VITE_TELEGRAM_BOT_TOKEN=
VITE_TELEGRAM_CHAT_ID=
```

Railway provides `PORT` automatically. The server reads it at runtime.

## Local Docker

When Docker Desktop is running:

```bash
docker build -t antonblyzniuk-portfolio .
docker run --env-file .env -p 3000:3000 antonblyzniuk-portfolio
```

Open `http://localhost:3000`.
