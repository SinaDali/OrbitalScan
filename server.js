const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
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

// 404 Page Not Found
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
