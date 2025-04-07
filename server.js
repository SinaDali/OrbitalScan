const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Static folder
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// EarlyCall page
app.get('/alpha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html')); // ✅ اینجا درست شد
});

// NFT page
app.get('/nft.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

// Airdrops page
app.get('/airdrops.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

// About page
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// API endpoint to fetch signals
app.get('/api/signals', (req, res) => {
  const signalsPath = path.join(__dirname, 'signals.json');
  fs.readFile(signalsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading signals:', err);
      return res.status(500).json({ error: 'Error reading signals' });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OrbitalScan MiniApp is running on http://localhost:${PORT}`);
});
