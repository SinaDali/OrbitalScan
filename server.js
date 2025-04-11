const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML files directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/alpha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'alpha.html'));
});

app.get('/airdrops.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'airdrops.html'));
});

app.get('/nft.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nft.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Serve signals API
app.get('/api/signals', (req, res) => {
  const signalsPath = path.join(__dirname, 'public', 'signals.json');
  if (fs.existsSync(signalsPath)) {
    const signalsData = fs.readFileSync(signalsPath);
    res.setHeader('Content-Type', 'application/json');
    res.send(signalsData);
  } else {
    res.status(404).json({ error: 'Signals file not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
