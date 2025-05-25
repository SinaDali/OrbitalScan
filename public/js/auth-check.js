// auth-check.js
// This script runs inside the MiniApp and checks user's Telegram username via your backend API

window.addEventListener('DOMContentLoaded', async () => {
  const tg = window.Telegram.WebApp;
  const username = tg?.initDataUnsafe?.user?.username;

  const serviceContainer = document.getElementById('service-container');
  const accessMessage = document.getElementById('access-message');

  // Clear previous content
  serviceContainer.style.display = 'none';
  accessMessage.textContent = 'Checking access...';

  if (!username) {
    accessMessage.textContent = 'Access Denied: Telegram username not found.';
    return;
  }

  try {
    const response = await fetch('https://orbitalscan.onrender.com/check-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (data.access === 'granted') {
      accessMessage.style.display = 'none';
      serviceContainer.style.display = 'block';
    } else {
      accessMessage.textContent = 'Access Denied: You must subscribe to access services.';
    }
  } catch (error) {
    console.error('Error checking subscription:', error);
    accessMessage.textContent = 'Access Denied: Server error.';
  }
});