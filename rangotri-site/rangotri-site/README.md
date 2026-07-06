# Rangotri Hosiery Mills — Website + Chatbot (Deploy Guide)

Ye ek complete Next.js project hai. Chatbot ka backend server pe chalta hai, isliye API key kabhi customer ke browser mein nahi dikhti — proper, secure setup.

## Files kya karte hain
- `app/page.js` — poori website + chatbot widget (frontend)
- `app/api/chat/route.js` — backend jo Gemini API ko call karta hai (yahan tumhari key safe rehti hai)
- `app/layout.js` — fonts aur page setup

## Deploy karne ke steps (laptop se)

### 1. Gemini API key lo
- [aistudio.google.com](https://aistudio.google.com) pe jao
- Google account se login karo
- "Get API Key" pe click karo, key copy kar lo (kahin safe daal lo, abhi paste mat karo kisi code mein)

### 2. GitHub pe code upload karo
- [github.com](https://github.com) pe free account banao (agar nahi hai)
- Naya repository banao (naam: `rangotri-website`)
- Is poore folder (`rangotri-site`) ka content us repository mein upload karo
  - Sabse aasan: GitHub Desktop app use karo, ya GitHub website pe "uploading an existing file" se drag-drop karo

### 3. Vercel se connect karo
- [vercel.com](https://vercel.com) pe jao, "Continue with GitHub" se sign in karo
- "Add New Project" dabao
- Apni `rangotri-website` repository select karo, "Import" dabao

### 4. API key safe daalo (zaroori step)
- Import screen pe "Environment Variables" section milega
- Name: `GEMINI_API_KEY`
- Value: (apni Gemini key paste karo)
- "Add" dabao, phir "Deploy" dabao

### 5. Live link milega
- 1-2 minute mein deploy ho jayega
- Kuch aisa link milega: `rangotri-website.vercel.app`
- Ye link kisi ko bhi bhej sakte ho — koi login nahi chahiye, koi API key nahi dikhegi

## Baad mein badlav karna ho to
- Fabric details, MOQ, pricing wagera badalne ke liye `app/api/chat/route.js` aur `app/page.js` mein text edit karo
- GitHub pe naya changes push karoge to Vercel khud-ba-khud naya version deploy kar dega

## Apna domain lagana ho (jaise rangotrihosiery.com)
- Vercel project settings mein "Domains" section mein jaake apna domain add kar sakte ho (domain kahin se bhi khareeda ho — GoDaddy, Namecheap, etc.)
