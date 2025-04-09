import fetch from "node-fetch";
import cron from "node-cron";
import { DateTime } from "luxon";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DISCORD_WEBHOOK_URL) {
  console.error("Missing DISCORD_WEBHOOK_URL in .env");
  process.exit(1);
}

// Convert POST_TIME (HH:mm) to cron format (m h * * *)
const [hour, minute] = process.env.POST_TIME.split(":").map(Number);
const cronTime = `${minute} ${hour} * * *`;

async function getJoke() {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch joke from icanhazdadjoke");
  const data = await res.json();
  return data.joke;
}

async function sendJoke() {
  try {
    const joke = await getJoke();

    const embed = {
      title: "New ChuckleDrop!",
      description: `${joke}`,
      color: 0x00ff00, // Green color for positive vibes
      timestamp: new Date(),
      footer: {
        text: "ChuckleDrop | Your daily dose of laughs",
      },
    };

    const body = {
      embeds: [embed], // Sends the joke in the embed format
    };

    const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to send to Discord");
    console.log(
      `[${DateTime.now().setZone(process.env.TIMEZONE).toISO()}] Joke sent!`
    );
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Schedule the job
cron.schedule(
  cronTime,
  () => {
    console.log(
      `Running scheduled joke at ${process.env.POST_TIME} ${process.env.TIMEZONE}`
    );
    sendJoke();
  },
  {
    timezone: process.env.TIMEZONE,
  }
);

sendJoke();
