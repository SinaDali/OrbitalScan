const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { fetchGeckoSignals } = require('./utils/fetchGeckoSignals');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// صفحه اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// صفحات Mini App
app.get('/alpha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'alpha.html'));
});

app.get('/airdrops.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'airdrops.html'));
});

app.get('/donate.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'donate.html'));
});

// API: سیگنال‌های زنده از Geckoterminal
app.get('/api/signals', async (req, res) => {
  try {
    const result = await fetchGeckoSignals();
    res.json(result);
  } catch (err) {
    console.error("❌ Failed to fetch Gecko signals:", err.message);
    res.status(500).json({ error: "Failed to fetch signals" });
  }
});

// API: Airdrops تستی (فعلاً)
app.get('/api/airdrops', (req, res) => {
  res.json([
    {
      name: "Galxe – Web3 Quest",
      description: "Complete simple on-chain and social tasks to earn GAL tokens.",
      link: "https://galxe.com"
    },
    {
      name: "Zealy – Community Sprint",
      description: "Join this Zealy sprint to earn project points and get whitelisted.",
      link: "https://zealy.io"
    },
    {
      name: "LayerZero Airdrop Hunt",
      description: "Eligible users interacting with bridging protocols may qualify.",
      link: "https://layerzeroscan.com"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ OrbitalScan running on http://localhost:${PORT}`);
});
