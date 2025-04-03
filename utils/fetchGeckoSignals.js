const axios = require('axios');

async function fetchGeckoSignals() {
  try {
    const response = await axios.get('https://api.geckoterminal.com/api/v2/networks/eth/pools');
    const pools = response.data.data;

    const signals = pools
      .filter(pool =>
        pool.attributes &&
        pool.attributes.base_token &&
        pool.attributes.base_token.symbol &&
        pool.attributes.base_token_price_usd &&
        pool.attributes.volume_usd &&
        pool.attributes.volume_usd.h24 > 5000
      )
      .slice(0, 10)
      .map(pool => {
        const attr = pool.attributes;
        return {
          name: `${attr.base_token.name} (${attr.base_token.symbol})`,
          description: `Price: $${parseFloat(attr.base_token_price_usd).toFixed(4)} | Volume 24h: $${Math.floor(attr.volume_usd.h24).toLocaleString()}`,
          link: `https://www.geckoterminal.com/eth/pools/${pool.id}`
        };
      });

    return {
      eth: signals,
      sol: [],
      ton: []
    };
  } catch (err) {
    console.error("❌ Error fetching from GeckoTerminal:", err.message);
    return {
      eth: [],
      sol: [],
      ton: []
    };
  }
}

module.exports = { fetchGeckoSignals };
