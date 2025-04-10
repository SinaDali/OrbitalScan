const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;  // پورت سرور

// Serve the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // صفحه اصلی
});

// Serve alpha.html
app.get('/alpha', (req, res) => {
    res.sendFile(path.join(__dirname, 'alpha.html'));  // صفحه alpha
});

// Serve nft.html
app.get('/nft', (req, res) => {
    res.sendFile(path.join(__dirname, 'nft.html'));  // صفحه nft
});

// Serve about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));  // صفحه about
});

// Serve static files (like images, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Listen on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
