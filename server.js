const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// برای دسترسی به فایل‌های استاتیک (public)
app.use(express.static(path.join(__dirname, 'public')));

// روت برای صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// روت برای سایر صفحات
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

// اگر صفحه‌ای پیدا نشد
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// سرور را ران کن
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
