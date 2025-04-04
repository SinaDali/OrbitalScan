const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes for HTML pages
app.get('/', (req, res) => {
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

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>❌ Page not found</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ OrbitalScan running on http://localhost:${PORT}`);
});
