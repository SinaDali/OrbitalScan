const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// Show index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const USERS_FILE = path.join(__dirname, "data", "users.json");
const alwaysAuthorized = ["@Sina_Salmasi", "@Alonedegan", "@Arisavak"];

app.post("/check-subscription", (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({ access: "denied", reason: "Missing username" });
  }

  const formattedUsername = username.startsWith("@") ? username : "@" + username;

  // Always allow these users
  if (alwaysAuthorized.includes(formattedUsername)) {
    return res.json({ access: "granted", reason: "Always allowed user" });
  }

  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    try {
      const data = fs.readFileSync(USERS_FILE, "utf8");
      const json = JSON.parse(data);
      users = json.authorized_users || [];
    } catch (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ access: "denied", reason: "Server error" });
    }
  }

  const now = Date.now();
  const user = users.find(u => u.telegram_username.toLowerCase() === formattedUsername.toLowerCase());

  if (!user) {
    const newUser = {
      telegram_username: formattedUsername,
      registered_at: now,
      wallet: "",
      network: "",
      txhash: ""
    };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify({ authorized_users: users }, null, 2));
    return res.json({ access: "granted", trial: true, reason: "New user trial" });
  }

  const registeredAt = user.registered_at || now;
  const expired = now - registeredAt > 2 * 24 * 60 * 60 * 1000;

  if (expired) {
    return res.json({ access: "denied", reason: "Trial expired" });
  }

  return res.json({ access: "granted", trial: true, reason: "Within trial period" });
});

app.listen(PORT, () => {
  console.log(`Server fully running with access control at http://localhost:${PORT}`);
});