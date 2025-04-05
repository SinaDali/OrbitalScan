async function showSignals(chain) {
  const container = document.getElementById('signals-container');
  container.innerHTML = '<p class="info-text">Loading signals...</p>';

  try {
    const response = await fetch('signals.json');
    const signals = await response.json();

    const filtered = signals.filter(signal => signal.chain === chain);

    if (filtered.length === 0) {
      container.innerHTML = '<p class="info-text">No signals for today.</p>';
      return;
    }

    container.innerHTML = '';

    filtered.forEach(signal => {
      const div = document.createElement('div');
      div.classList.add('signal-card');
      div.innerHTML = `
        <p>${signal.text}</p>
        <a href="${signal.buy_links[0]}" target="_blank">🔗 Buy Token</a>
        <p><small>${signal.date}</small></p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = '<p class="info-text">Error loading signals.</p>';
  }
}
