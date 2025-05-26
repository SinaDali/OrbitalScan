const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/check-subscription", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ access: "denied", reason: "Missing username" });
  }

  fs.readFile("./data/users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json:", err);
      return res.status(500).json({ access: "denied", reason: "Server error" });
    }

    try {
      const users = JSON.parse(data).authorized_users || [];
      const formattedUsername = `@${username}`;

      const found = users.some(user =>
        user.telegram_username.toLowerCase() === formattedUsername.toLowerCase()
      );

      if (found) {
        return res.json({ access: "granted" });
      } else {
        return res.json({ access: "denied" });
      }
    } catch (e) {
      console.error("JSON parse error:", e);
      return res.status(500).json({ access: "denied", reason: "Parse error" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Subscription server running at http://localhost:${PORT}`);
});
