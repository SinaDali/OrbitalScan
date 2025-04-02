const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { fetchRealSignals } = require('./utils/fetchSignals');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 صفحه اصلی Mini App
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔹 صفحه سیگنال‌ها
app.get('/signals.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signals.html'));
});
// 🔹 صفحه AlphaCall
app.get('/alpha.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'alpha.html'));
  });  

// 🔹 API سیگنال‌های زنده از CoinGecko – چندبخشی
app.get('/api/signals', async (req, res) => {
  try {
    const result = await fetchRealSignals();
    res.json(result);
  } catch (err) {
    console.error("❌ Failed to fetch real signals:", err.message);
    res.status(500).json({ error: "Failed to fetch signals" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ OrbitalScan running on http://localhost:${PORT}`);
});
