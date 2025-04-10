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

    let linksHTML = '';
    if (signal.links) {
      if (signal.links.dexscreener) {
        linksHTML += `<a href="${signal.links.dexscreener}" target="_blank">DexScreener</a>`;
      }
      if (signal.links.twitter) {
        linksHTML += `<a href="${signal.links.twitter}" target="_blank">Twitter</a>`;
      }
      if (signal.links.telegram) {
        linksHTML += `<a href="${signal.links.telegram}" target="_blank">Telegram</a>`;
      }
    }

    card.innerHTML = `
      <h3>${signal.name || 'Unnamed Coin'}</h3>
      ${signal.contract ? `
        <p><strong>Contract:</strong> 
          <span class="contract-address">${signal.contract}</span> 
          <button class="copy-btn" onclick="copyToClipboard('${signal.contract}')">Copy</button>
        </p>` : ''
      }
      ${signal.network ? `<p><strong>Network:</strong> ${signal.network}</p>` : ''}
      ${signal.marketcap ? `<p><strong>Marketcap:</strong> ${signal.marketcap}</p>` : ''}
      <div class="links">${linksHTML}</div>
    `;
    container.appendChild(card);
  });

  // Always DYOR message
  const dyor = document.createElement('div');
  dyor.className = 'dyor-message';
  dyor.innerHTML = "Always DYOR — Do Your Own Research. OrbitalScan provides early calls but not financial advice.";
  container.appendChild(dyor);
}

// 📋 Function to Copy Contract Address
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Contract address copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

window.onload = loadSignals;
