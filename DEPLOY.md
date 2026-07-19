# Deployment & Recovery Guide

This app is made of **three separate pieces**. All three must be running for the
public site to fully work.

| Piece | What it is | Where it's hosted | Status |
|-------|-----------|-------------------|--------|
| **Frontend** | The website visitors see (Next.js) | **Netlify** — https://ayoolaogunrekunn.netlify.app | ✅ Live |
| **Backend** | The API that serves data (Node/Express) | **Koyeb** (moved here from Render) | ⬅️ redeploy below |
| **Database** | Blog posts & projects (MongoDB) | **MongoDB Atlas** (free M0 tier) | ✅ Data intact |

> **Why the move?** The backend used to run on Render at
> `ayoola-platform.onrender.com`, but that service was **suspended over an unpaid
> invoice**. Rather than wait on that, we redeploy the backend on Koyeb's free
> tier (no credit card). If the Render invoice is settled later, the original
> service can simply be resumed and this move reversed.

---

## Step 1 — Get your MongoDB connection string (data)

1. Log into https://cloud.mongodb.com
2. If your cluster shows **"Paused"**, click **Resume**.
3. Click **Connect → Drivers** and copy the connection string. It looks like:
   `mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net`
4. Under **Network Access**, make sure `0.0.0.0/0` is allowed (so Koyeb can reach it).

Keep this string handy — it's the `MONGODB_URI` value in Step 3.

## Step 2 — Generate your admin password hash

On your computer, in this project:

```bash
cd backend
npx ts-node src/scripts/hashAdminPassword.ts "YourChosenPassword"
```

Copy the `Hash:` value it prints — that's your `ADMIN_PASSWORD_HASH` in Step 3.
(The password itself is never stored; only the hash.)

## Step 3 — Deploy the backend on Koyeb

1. Sign up / log in at https://www.koyeb.com (use **Sign in with GitHub** — no credit card needed).
2. **Create Web Service → GitHub** → pick repo **`OgunrekunAyoola/Ayoola-Platform`**, branch **`master`**.
3. Expand the **Builder** section:
   - **Work directory** → toggle **Override** → enter `backend`
   - **Build command** → `npm install && npm run build`
   - **Run command** → `npm start`
4. **Instance** → choose the **Free** instance.
5. **Environment variables** — add these (do **NOT** add `PORT`; Koyeb sets it automatically):

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | *(from Step 1)* |
   | `DB_NAME` | `ayoola-platform` |
   | `ADMIN_EMAIL` | *(your admin login email)* |
   | `ADMIN_PASSWORD_HASH` | *(from Step 2)* |
   | `ADMIN_JWT_SECRET` | *(any long random string, e.g. 40+ characters)* |
   | `FRONTEND_URL` | `https://ayoolaogunrekunn.netlify.app` |
   | `RESEND_API_KEY` | *(optional — leave blank to disable email)* |
   | `RESEND_WEBHOOK_SECRET` | *(optional)* |
   | `AI_PROVIDER_API_KEY` | *(optional — leave blank to disable AI features)* |
   | `AI_PROVIDER_BASE_URL` | *(optional)* |
   | `AI_PROVIDER_MODEL` | *(optional)* |

6. **Health check** (optional but recommended): under the port settings, set an
   HTTP health check with path `/api/health` on port `8000`.
7. Click **Deploy**. When it finishes you'll get a URL like
   `https://ayoola-platform-XXXX.koyeb.app`.
8. **Test it** — open `https://YOUR-KOYEB-URL/api/health` in a browser. You should
   see `{"status":"ok"}`.

## Step 4 — Point the website at the new backend

1. Log into https://app.netlify.com → your site → **Site configuration → Environment variables**.
2. Set **`NEXT_PUBLIC_API_URL`** to your Koyeb URL **plus `/api`**, e.g.
   `https://ayoola-platform-XXXX.koyeb.app/api`
3. ⚠️ **Important:** this value is baked in at build time, so you must **redeploy**:
   go to **Deploys → Trigger deploy → Deploy site**.
4. Once the deploy finishes, visit https://ayoolaogunrekunn.netlify.app — the site
   is fully back.

---

## Notes

- **Cold starts:** on the free tier the backend sleeps after ~1 hour idle; the first
  request then takes ~30–60s to wake it. Normal for free hosting (Render did this too).
- **CORS is already handled:** the backend allows any `*.netlify.app` origin, so your
  site connects without code changes.
- **No secrets are in git.** All keys live in the Koyeb/Netlify dashboards and your
  local `.env` files (which are gitignored).
