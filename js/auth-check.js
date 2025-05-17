// js/auth-check.js

async function checkUserAuthorization() {
  const username = prompt('Enter your Telegram username (include @):');

  if (!username) {
    alert('Username is required to continue.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch('data/users.json');
    const data = await response.json();
    const authorized = data.authorized_users.some(user => user.telegram_username === username);

    if (!authorized) {
      alert('You are not authorized to access this page.');
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Error checking authorization:', error);
    alert('An error occurred. Please try again later.');
    window.location.href = 'index.html';
  }
}

// Run check on page load
window.onload = checkUserAuthorization;
