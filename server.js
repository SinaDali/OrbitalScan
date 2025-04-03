const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (style.css, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/alpha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

app.get('/nft.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

app.get('/airdrops.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// API route placeholder (optional)
app.get('/api/signals', (req, res) => {
  res.json({
    eth: [],
    sol: [],
    bsc: []
  });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).send('❌ Page not found');
});

app.listen(PORT, () => {
  console.log(`✅ OrbitalScan running on http://localhost:${PORT}`);
});
