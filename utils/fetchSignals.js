const axios = require('axios');

async function fetchRealSignals() {
  const result = {
    ethereum: [],
    solana: [],
    ton: []
  };

  try {
    // ETH توکن‌های ترند از CoinGecko
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    const coins = res.data.coins;

    for (const item of coins) {
      const coin = item.item;
      result.ethereum.push({
        name: coin.name,
        type: "Token",
        description: `Symbol: ${coin.symbol.toUpperCase()} | Rank: ${coin.market_cap_rank || 'N/A'}`,
        risk: coin.market_cap_rank && coin.market_cap_rank < 100 ? "Low" : "Medium"
      });
    }

    // افزودن دستی 1 توکن سولانا
    result.solana.push({
      name: "BONK",
      type: "Token",
      description: "Popular memecoin on Solana. Community-driven and trending.",
      risk: "Medium"
    });

    // افزودن دستی 1 توکن TON
    result.ton.push({
      name: "STON",
      type: "Token",
      description: "Fresh memecoin on TON network with active Telegram hype.",
      risk: "Medium"
    });

  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
  }

  return result;
}

module.exports = { fetchRealSignals };
