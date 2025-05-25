// server.js
// Express server for verifying Telegram usernames and serving static frontend

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static('public'));

// API: Check if a Telegram username is authorized
app.post('/check-subscription', (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ access: 'denied', error: 'No username provided' });
  }

  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ access: 'denied', error: 'Server error' });
    }

    try {
      const json = JSON.parse(data);
      const authorized = json.authorized_users.some(user =>
        user.telegram_username.replace('@', '') === username.replace('@', '')
      );

      if (authorized) {
        return res.json({ access: 'granted' });
      } else {
        return res.json({ access: 'denied' });
      }
    } catch (e) {
      console.error('Error parsing users.json:', e);
      return res.status(500).json({ access: 'denied', error: 'Parsing error' });
    }
  });
});

// Fallback to index.html for unmatched routes (for MiniApp compatibility)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Subscription server running at http://localhost:${PORT}`);
});