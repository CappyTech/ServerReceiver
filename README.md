# ServerReceiver
--------------

Node.js backend for receiving JSON POSTs from Minecraft servers and storing them in MongoDB.

Accepts data from plugins using [ServerPusher](https://github.com/CappyTech/ServerPusher), enforces per-server authentication, and stores JSON documents for offline dashboards and server analytics.

## Features:
- Receives /api/push POSTs
- Configurable server auth (none, token, hmac)
- Multiple server support via .env
- MongoDB storage for raw JSON events
- Works with [ServerEmitter](https://github.com/CappyTech/ServerEmitter)

## .env Example:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/serverpusher
SHOW_ENV=true
SERVERS=us,uk
AUTH_us_MODE=token
AUTH_us_SECRET=abc123
AUTH_uk_MODE=hmac
AUTH_uk_SECRET=xyz456
```
## Example Payload:
```json
{
  "server_id": "us",
  "event": "heartbeat",
  "timestamp": "...",
  "players": 4
}
```
## License:
MIT
