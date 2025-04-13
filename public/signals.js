async function loadSignals() {
  const response = await fetch('/signals.json');  // ✅ مسیر درست اینه
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
      <p><strong>Marketcap:</strong> ${signal.marketcap}</p>
      <p><strong>Confidence:</strong> ${signal.confidence}%</p>
      <p><strong>Contract:</strong> ${signal.contract}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadSignals);
