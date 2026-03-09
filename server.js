const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// No-cache headers (mirrors netlify.toml behaviour)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// API route — replaces netlify/functions/analyze.js
app.post('/api/analyze', async (req, res) => {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'CLAUDE_API_KEY not configured in environment variables' });
  }

  const { messages } = req.body;
  if (!messages) {
    return res.status(400).json({ error: 'Missing messages field' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all: serve app.html for any unmatched route (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Edgewise server running on port ${PORT}`);
});
