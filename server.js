const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const USERS_FILE = path.join(__dirname, "data", "users.json");

// Always allowed usernames
const alwaysAuthorized = ["@Sina_Salmasi", "@Alonedegan", "@Arisavak"];

app.post("/check-subscription", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ access: "denied", reason: "No username provided" });
  }

  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    const parsed = JSON.parse(data);
    const user = parsed.authorized_users.find(u => u.telegram_username === "@" + username);

    const now = Date.now();

    if (alwaysAuthorized.includes("@" + username)) {
      return res.json({ access: "granted", reason: "Always authorized user" });
    }

    if (user) {
      const registeredAt = user.registered_at;
      const expired = now - registeredAt > 2 * 24 * 60 * 60 * 1000;

      if (!expired) {
        return res.json({ access: "granted", reason: "Within free trial" });
      } else {
        return res.json({ access: "denied", reason: "Free trial expired" });
      }
    } else {
      parsed.authorized_users.push({
        telegram_username: "@" + username,
        registered_at: now
      });

      fs.writeFileSync(USERS_FILE, JSON.stringify(parsed, null, 2));
      return res.json({ access: "granted", reason: "New user trial started" });
    }
  } catch (err) {
    console.error("Error reading users file:", err);
    return res.status(500).json({ access: "denied", reason: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Subscription server running at http://localhost:${PORT}`);
});