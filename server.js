const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html on root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// File to track users and trial access
const USERS_FILE = path.join(__dirname, "data", "users.json");

// Endpoint to check subscription
app.post("/check-subscription", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ access: "denied", reason: "Missing username" });
  }

  fs.readFile(USERS_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json:", err);
      return res.status(500).json({ access: "denied", reason: "Server error" });
    }

    try {
      const json = JSON.parse(data);
      const users = json.authorized_users || [];
      const formattedUsername = `@${username}`;
      const now = Date.now();

      let user = users.find(u =>
        u.telegram_username.toLowerCase() === formattedUsername.toLowerCase()
      );

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
        return res.json({ access: "granted", trial: true });
      }

      const registeredAt = user.registered_at || now;
      const expired = now - registeredAt > 2 * 24 * 60 * 60 * 1000;

      if (expired) {
        return res.json({ access: "denied", reason: "Trial expired" });
      } else {
        return res.json({ access: "granted", trial: true });
      }

    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({ access: "denied", reason: "Invalid data format" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Subscription server with trial running at http://localhost:${PORT}`);
});