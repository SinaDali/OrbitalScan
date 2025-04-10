const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;  // استفاده از پورت مشخص شده

// Serve alpha.html
app.get('/alpha', (req, res) => {
    res.sendFile(path.join(__dirname, 'alpha.html'));
});

// Serve other pages
app.get('/nft', (req, res) => {
    res.sendFile(path.join(__dirname, 'nft.html'));
});

// Serve about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Listen on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
