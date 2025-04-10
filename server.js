const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;  // پورت سرور

// Serve the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // صفحه اصلی که به نظر شما می‌خواهید
});

// Serve alpha.html
app.get('/alpha', (req, res) => {
    res.sendFile(path.join(__dirname, 'alpha.html'));  // مطمئن شوید که فایل در ریشه پروژه قرار دارد
});

// Serve nft.html
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
