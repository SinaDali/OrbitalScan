const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// سرو کردن تمام فایل‌های استاتیک از پوشه public
app.use(express.static(path.join(__dirname, 'public')));

// روت صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// روت برای صفحه EarlyCall
app.get('/alpha', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'alpha.html'));
});

// روت برای صفحه NFT Zone
app.get('/nft', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nft.html'));
});

// روت برای صفحه Airdrops
app.get('/airdrops', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'airdrops.html'));
});

// روت برای صفحه About Us
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// روت برای خواندن signals.json به عنوان API
app.get('/api/signals', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signals.json'));
});

// هندل کردن صفحات ناموجود (404)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// ران کردن سرور
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
