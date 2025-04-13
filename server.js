const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

app.get('/airdrops', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// if route not found
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
