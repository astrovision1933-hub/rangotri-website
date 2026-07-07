import { kv } from "@vercel/kv";
import defaultConfig from "../../config.js";

const CONFIG_KEY = "site-config";

// GET — anyone can read the current config (it's just public business info,
// the same info that's already shown on the website).
export async function GET() {
  try {
    const saved = await kv.get(CONFIG_KEY);
    return Response.json(saved || defaultConfig);
  } catch (err) {
    // If KV isn't set up yet, fall back to the default config so the site still works.
    return Response.json(defaultConfig);
  }
}

// POST — only works if the correct admin password is sent. Saves the new config.
export async function POST(request) {
  try {
    const body = await request.json();
    const { password, config } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return Response.json(
        { error: "Server is missing ADMIN_PASSWORD. Add it in Vercel > Settings > Environment Variables." },
        { status: 500 }
      );
    }
    if (password !== adminPassword) {
      return Response.json({ error: "Galat password." }, { status: 401 });
    }

    await kv.set(CONFIG_KEY, config);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Save karte waqt error aaya. KV database set up hai ya nahi check karein." }, { status: 500 });
  }
}
