# ServerReceiver

Node.js backend for receiving JSON POSTs from Minecraft servers and storing them in MongoDB.

Accepts data from plugins using [ServerPusher](https://github.com/CappyTech/ServerPusher), enforces per-server authentication, and stores JSON documents for offline dashboards and server analytics.

---

## Features

- Receives `/api/push` POSTs
- Configurable server auth (`none`, `token`, `hmac`)
- Multiple server support via `.env`
- MongoDB storage for raw JSON events
- Works with [ServerEmitter](https://github.com/CappyTech/ServerEmitter)

---

## Usage

1. Install dependencies

   Run the following in the project directory:

   ```bash
   npm install
   ```

2. Create your `.env` file

   Copy the example and customize it:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` to define:
   - The port to listen on
   - Your MongoDB connection URI
   - Server IDs allowed to push data
   - Authentication modes (`none`, `token`, or `hmac`) and their secrets

3. Start the receiver

   ```bash
   node index.js
   ```

4. Send a test payload

   Use a plugin like [ServerEmitter](https://github.com/CappyTech/ServerEmitter), or manually with curl:

   ```bash
   curl -X POST http://localhost:3000/api/push \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer abc123" \
     -d '{"server_id":"us","event":"heartbeat","players":4}'
   ```

5. Check logs and MongoDB

   If valid, the request will appear in the terminal and be stored in your MongoDB database.

---

## .env Example

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

---

## Example Payload

```json
{
  "server_id": "us",
  "event": "heartbeat",
  "timestamp": "...",
  "players": 4
}
```

---

## License

MIT

```
Copyright 2025 CappyTech (https://github.com/CappyTech/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```