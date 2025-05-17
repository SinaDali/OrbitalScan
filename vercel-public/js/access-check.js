// access-check.js

const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

// Check if a given username is authorized
function isUserAuthorized(telegramUsername) {
  try {
    const data = fs.readFileSync(usersPath);
    const users = JSON.parse(data);
    return users.authorized_users.some(user => user.telegram_username === telegramUsername);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return false;
  }
}

// Example usage (test)
const testUser = '@SinaSalmasi';
if (isUserAuthorized(testUser)) {
  console.log(`${testUser} is authorized ✅`);
} else {
  console.log(`${testUser} is NOT authorized ❌`);
}

module.exports = {
  isUserAuthorized,
};
