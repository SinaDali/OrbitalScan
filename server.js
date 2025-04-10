const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;  // پورت سرور

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Serve Home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve EarlyCall page (alpha.html)
app.get('/alpha.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'alpha.html'));
});

// Serve NFT page (nft.html)
app.get('/nft.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'nft.html'));
});

// Serve Airdrops page (airdrops.html)
app.get('/airdrops.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'airdrops.html'));
});

// Serve About page (about.html)
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`OrbitalScan MiniApp is running on port ${port}`);
});
