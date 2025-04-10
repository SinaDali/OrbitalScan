const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// MiniApp static files
app.use(express.static(path.join(__dirname, 'public')));

// API route to serve signals
app.get('/api/signals', (req, res) => {
  const signalsPath = path.join(__dirname, 'signals.json');
  fs.readFile(signalsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading signals.json:', err);
      return res.status(500).send('Error reading signals');
    }
    const signals = JSON.parse(data);
    res.json(signals);
  });
});

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Other pages
app.get('/alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

app.get('/airdrops', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Important: use Render's provided port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 OrbitalScan MiniApp is running on port ${PORT}`);
});
