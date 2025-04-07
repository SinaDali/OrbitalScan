async function loadSignals() {
  const response = await fetch('/api/signals');
  const signals = await response.json();

  const container = document.getElementById('signals-container');
  container.innerHTML = '';

  if (signals.length === 0) {
    container.innerHTML = '<p class="info-text">No signals available yet. Please check back later.</p>';
    return;
  }

  signals.forEach(signal => {
    const card = document.createElement('div');
    card.className = 'signal-card';

    card.innerHTML = `
      <h3>${signal.name}</h3>
      <p><strong>Contract:</strong> ${signal.contract}</p>
      <p><strong>Network:</strong> ${signal.network}</p>
      <p><strong>Marketcap:</strong> ${signal.marketcap}</p>
      <div class="links">
        ${signal.links.dexscreener ? `<a href="${signal.links.dexscreener}" target="_blank">DexScreener</a>` : ''}
        ${signal.links.twitter ? `<a href="${signal.links.twitter}" target="_blank">Twitter</a>` : ''}
        ${signal.links.telegram ? `<a href="${signal.links.telegram}" target="_blank">Telegram</a>` : ''}
      </div>
    `;
    container.appendChild(card);
  });

  // Always DYOR message
  const dyor = document.createElement('div');
  dyor.className = 'dyor-message';
  dyor.innerHTML = "Always DYOR — Do Your Own Research. OrbitalScan provides early calls but not financial advice.";
  container.appendChild(dyor);
}

window.onload = loadSignals;
