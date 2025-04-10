const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve any other HTML file dynamically
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, page);

  res.sendFile(filePath, function (err) {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`OrbitalScan MiniApp is running on http://localhost:${PORT}`);
});
