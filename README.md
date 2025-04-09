# ChuckleDrop

**ChuckleDrop** is a JavaScript-based "Joke of the Day" bot that fetches dad jokes from the **icanhazdadjoke API** and posts them to a Discord channel using a webhook. It's a fun way to deliver daily laughter to your server!

## Features

- Fetches a new dad joke every day from the **icanhazdadjoke** API
- Sends the joke to a Discord channel via webhook in a visually appealing embed
- Configurable time and timezone for joke delivery
- Simple, lightweight, and easy to run anywhere

## Requirements

- Node.js (v14 or higher recommended)
- A Discord Webhook URL
- Internet connection (to fetch jokes from the API)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chuckledrop.git
cd chuckledrop
```

### 2. Install dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Configure your environment
Create a .env file in the root of the project with the following configuration:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_id/your_webhook_token
POST_TIME=09:00           # Time of day to send the joke (24-hour format, e.g., 14:30)
TIMEZONE=Australia/Sydney  # Timezone name (IANA format, e.g., America/New_York)
```

* **DISCORD_WEBHOOK_URL:** The webhook URL for your Discord channel.
* **POST_TIME:** The time of day when the bot should send the joke (in 24-hour format, e.g., 09:00).
* **TIMEZONE:** The timezone where the joke should be sent, using the IANA timezone format (e.g., America/New_York).

### 4. Run the bot
Start the bot by running:

```bash
node app.js
```