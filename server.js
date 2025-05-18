// server.js
const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const USERS_FILE = path.join(__dirname, "data", "users.json");

function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { authorized_users: [] };
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

bot.start((ctx) => {
  const username = ctx.from.username ? `@${ctx.from.username}` : null;

  if (!username) {
    return ctx.reply("⚠️ Your Telegram username is required.");
  }

  const users = loadUsers();
  const alreadyExists = users.authorized_users.find((u) => u.telegram_username === username);

  if (alreadyExists) {
    ctx.reply("✅ You already have access to OrbitalScan MiniApp.");
  } else {
    users.authorized_users.push({
      telegram_username: username,
      wallet: "",
      network: "",
      txhash: "",
    });
    saveUsers(users);
    ctx.reply("✅ Access granted! You can now use the OrbitalScan MiniApp.");
  }
});

bot.launch();
console.log("🤖 Bot is running...");
