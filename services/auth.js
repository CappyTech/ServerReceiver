const crypto = require('crypto');

function getEnvVar(name, fallback = null) {
  return process.env[name] || fallback;
}

function validateHMAC(body, secret, signatureHeader) {
  const hmac = crypto.createHmac('sha256', secret);
  const data = JSON.stringify(body);
  const digest = hmac.update(data).digest('hex');
  return digest === signatureHeader;
}

function authenticateRequest(req, res, next) {
  const serverId = req.body.server_id;

  if (!serverId) {
    return res.status(400).json({ error: 'Missing server_id in body' });
  }

  const allowedServers = (process.env.SERVERS || '').split(',').map(s => s.trim());
  if (!allowedServers.includes(serverId)) {
    return res.status(403).json({ error: `Server '${serverId}' is not authorized` });
  }

  const mode = getEnvVar(`AUTH_${serverId}_MODE`, 'none').toLowerCase();
  const secret = getEnvVar(`AUTH_${serverId}_SECRET`, '');

  switch (mode) {
    case 'none':
      return next();

    case 'token': {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token === secret) {
        return next();
      }
      return res.status(401).json({ error: 'Invalid or missing bearer token' });
    }

    case 'hmac': {
      const sig = req.headers['x-signature'];
      if (!sig) {
        return res.status(401).json({ error: 'Missing X-Signature header' });
      }
      if (validateHMAC(req.body, secret, sig)) {
        return next();
      }
      return res.status(401).json({ error: 'Invalid HMAC signature' });
    }

    default:
      return res.status(500).json({ error: `Unknown auth mode: ${mode}` });
  }
}

module.exports = authenticateRequest;
