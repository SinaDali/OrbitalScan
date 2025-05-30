
require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const botToken = process.env.BOT_TOKEN;
const bot = new Telegraf(botToken);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// OPEN ACCESS — NO SUBSCRIPTION CHECK
app.get('/auth-check', (req, res) => {
  return res.json({ access: "granted" });
});

// Launch Telegram Bot
bot.launch().then(() => {
  console.log('Telegram bot started');
}).catch(err => {
  console.error('Bot launch failed:', err);
});

// Start server
app.listen(port, () => {
  console.log(`Subscription server running at http://localhost:${port}`);
});
