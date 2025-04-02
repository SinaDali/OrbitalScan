// bot.js
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// وقتی کاربر /start بزنه
bot.start((ctx) => {
  const firstName = ctx.from.first_name || 'friend';
  ctx.reply(`👋 Hello ${firstName}!\nWelcome to OrbitalScan Mini App.\nReady to scan the Web3 galaxy 🚀`);
});

bot.launch();
console.log("🤖 OrbitalScan Bot is running.");
