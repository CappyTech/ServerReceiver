require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authService = require('../services/auth');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const SHOW_ENV = process.env.SHOW_ENV === 'true';
const BIND_ADDRESS = SHOW_ENV ? '127.0.0.1' : '0.0.0.0';

if (SHOW_ENV) {
  console.warn("⚠️ DEVELOPMENT MODE: SHOW_ENV is enabled.");
  console.warn("🛑 External connections are DISABLED.");
  console.warn("🔍 Loaded .env configuration:");
  console.log(process.env);
}

app.post('/api/push', authMiddleware, (req, res) => {
  console.log(`[${new Date().toISOString()}] From ${req.body.server_id}`);
  console.log(req.body);
  res.status(200).json({ success: true, received: req.body });
});

app.listen(PORT, BIND_ADDRESS, () => {
  console.log(`🚀 ServerPusher listening on http://${BIND_ADDRESS}:${PORT}`);
});
