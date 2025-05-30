
const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static("public"));
app.use(express.json());

const USERS_FILE = path.join(__dirname, "data", "users.json");
const ALWAYS_ALLOWED = ["@Sina_Salmasi", "@Alonedegan", "@Arisavak"];

function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function isAccessAllowed(username) {
  const users = loadUsers();

  if (ALWAYS_ALLOWED.includes(username)) return true;
  const user = users[username];
  if (!user) return false;

  const now = Date.now();
  if (user.subscription && now < new Date(user.subscription).getTime()) return true;

  const created = new Date(user.created).getTime();
  return now - created <= 7 * 24 * 60 * 60 * 1000;
}

app.get("/auth-check", (req, res) => {
  const username = req.query.username;
  if (!username) return res.json({ access: false });

  const users = loadUsers();
  if (!users[username]) {
    users[username] = {
      created: new Date().toISOString(),
      subscription: null,
    };
    saveUsers(users);
  }

  res.json({ access: isAccessAllowed(username) });
});

app.get("/add-subscription", (req, res) => {
  const { username, days } = req.query;
  if (!username || !days) return res.status(400).json({ success: false, error: "Missing parameters" });

  const users = loadUsers();
  const now = Date.now();
  const user = users[username] || { created: new Date().toISOString(), subscription: null };

  const newExpiration = new Date(now + parseInt(days) * 24 * 60 * 60 * 1000);
  user.subscription = newExpiration.toISOString();
  users[username] = user;
  saveUsers(users);

  res.json({ success: true, until: newExpiration });
});

app.listen(PORT, () => {
  console.log(`Subscription server running on port ${PORT}`);
});
