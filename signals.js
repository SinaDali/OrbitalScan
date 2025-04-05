async function loadSignals(chain) {
    const response = await fetch('/api/signals');
    const data = await response.json();
    
    const container = document.getElementById('signals-container');
    container.innerHTML = '';  // Clear previous signals
  
    if (data[chain] && data[chain].length > 0) {
      data[chain].forEach(signal => {
        const signalElem = document.createElement('p');
        signalElem.textContent = `${signal.name} - Confidence: ${signal.confidence}%`;
        container.appendChild(signalElem);
      });
    } else {
      container.innerHTML = `<p class="info-text">No signals available right now.</p>`;
    }
  }
  