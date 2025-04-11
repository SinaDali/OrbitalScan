const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Route to serve signals.json
app.get('/api/signals', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signals.json'));
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Schedule scanner_ai.py to run every 10 minutes
setInterval(() => {
  console.log('Running scanner_ai.py...');
  exec('python scanner_ai.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running scanner_ai.py: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}, 10 * 60 * 1000); // 10 minutes

// Run scanner immediately once on start
exec('python scanner_ai.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running scanner_ai.py: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
