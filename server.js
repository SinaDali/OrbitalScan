const express = require('express');
const path = require('path');
const app = express();

// Set the port for the server
const port = process.env.PORT || 10000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve alpha page
app.get('/alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

// Serve airdrop page
app.get('/airdrops', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

// Serve NFT page
app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

// Serve about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Listen on the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
