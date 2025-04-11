const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (html, css, js, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Routes
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

// Serve signals.json
app.get('/signals.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'signals.json'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
