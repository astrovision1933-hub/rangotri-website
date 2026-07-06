# Business Website + Chatbot + Admin Panel

## Naya feature: Admin Panel (client khud edit kar sakta hai)
Client apni website ka koi bhi content (naam, address, fabric, MOQ, colors, chatbot ka greeting)
khud edit kar sakta hai — koi coding, koi tumhari madad nahi chahiye, bas ek password.

Admin panel yahan hai: `yoursite.vercel.app/admin`

## Deploy karne ke steps (ek extra step hai is baar — free database)

### 1. Gemini API key lo
`aistudio.google.com` se, jaisa pehle liya tha.

### 2. Code GitHub pe upload karo
Poora folder ek naye repository mein upload karo.

### 3. Vercel pe import karo
- Root Directory: jahan `package.json` hai wahi path
- Framework Preset: Next.js

### 4. FREE DATABASE ADD KARO (naya step — zaroori hai admin panel ke liye)
1. Apne Vercel project ke andar **"Storage"** tab pe jao
2. **"Create Database"** dabao
3. **"KV"** (ya "Upstash for Redis") select karo — free tier hai
4. Database ka naam do, "Create" dabao
5. Apne project se **"Connect"** karo — Vercel khud-ba-khud environment variables add kar dega (KV_REST_API_URL, KV_REST_API_TOKEN, etc.) — tumhe kuch manually copy-paste nahi karna

### 5. Environment Variables add karo
Settings → Environment Variables mein:
- `GEMINI_API_KEY` = apni Gemini key
- `ADMIN_PASSWORD` = jo bhi password tum client ko doge (jaise `rangotri2026`)

### 6. Redeploy karo
Deployments tab → Redeploy

### 7. Admin panel test karo
`yoursite.vercel.app/admin` kholo, password daalo, koi bhi field badal ke "Save Changes" dabao.
Website 30 second mein khud update ho jayegi — refresh karke check karo.

## Client ko kya batana hai
- Unka apna admin link: `unki-site.vercel.app/admin`
- Unka apna password (jo tumne set kiya)
- "Jab bhi MOQ, fabric, pricing, address badalni ho, khud yahan se update kar sakte ho — website turant badal jayegi"

## Naye client ke liye reuse karna ho to
1. Folder copy karo
2. `app/config.js` mein starting/default values badal do (jo pehli baar dikhengi jab tak admin kuch save na kare)
3. Naya GitHub repo + naya Vercel project + naya KV database + naya ADMIN_PASSWORD banao
