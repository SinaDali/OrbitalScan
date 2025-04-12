const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// سرو کردن فایل‌های داخل پوشه public
app.use(express.static('public'));

// روت صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// روت صفحه EarlyCall
app.get('/alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

// روت صفحه NFT
app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'nft.html'));
});

// روت صفحه Airdrops
app.get('/airdrops', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

// روت صفحه About
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// هندل کردن صفحات ناموجود
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// ران کردن سرور
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
