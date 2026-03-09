# Edgewise — Trading Journal

A trading journal web app powered by Claude AI and Supabase.

## Stack

- **Frontend**: Single-page app (`public/app.html`)
- **Backend**: Express.js server (`server.js`)
- **AI**: Anthropic Claude API (proxied via `/api/analyze`)
- **Auth & DB**: Supabase

---

## Deploy to Render via GitHub

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/edgewise.git
git push -u origin main
```

### 2. Create a Render Web Service

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub account and select the `edgewise` repo
3. Render auto-detects settings from `render.yaml`, but verify:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Add Environment Variables

In the Render dashboard → your service → **Environment**:

| Key | Value |
|-----|-------|
| `CLAUDE_API_KEY` | Your Anthropic API key (`sk-ant-...`) |

> `PORT` is set automatically by Render — do not add it manually.

### 4. Update Supabase Auth Redirect URL

In your Supabase dashboard → **Authentication → URL Configuration**,
add your Render URL to **Redirect URLs**:
```
https://edgewise.onrender.com
```

### 5. Deploy

Render auto-deploys on every push to `main`.

---

## Local Development

```bash
npm install
echo "CLAUDE_API_KEY=sk-ant-your-key-here" > .env
node -r dotenv/config server.js
# → http://localhost:3000
```

---

## Project Structure

```
edgewise/
├── public/
│   └── app.html        # Full SPA frontend
├── server.js           # Express server + /api/analyze route
├── package.json
├── render.yaml         # Render deployment config
└── .gitignore
```
