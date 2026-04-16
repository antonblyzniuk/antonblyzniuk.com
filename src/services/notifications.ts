export const sendTelegramNotification = async (event: string) => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  console.log("Telegram function triggered");
  console.log(token);
  console.log(chatId);

  if (!token || !chatId) return;
  console.log("Telegram function triggered");

  const info = {
    browser: navigator.userAgent,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || "Direct",
    url: window.location.href,
  };

  const message = `
<b>${event}</b>
━━━━━━━━━━━━━━━━━━
<b>🌐 Browser/OS:</b> <code>${info.browser}</code>
<b>🌍 Language:</b> <code>${info.language}</code>
<b>🖥 Screen:</b> <code>${info.screen}</code>
<b>🕒 Timezone:</b> <code>${info.timezone}</code>
<b>🔗 Referrer:</b> <code>${info.referrer}</code>
<b>📍 URL:</b> <code>${info.url}</code>
`.trim();

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
};
