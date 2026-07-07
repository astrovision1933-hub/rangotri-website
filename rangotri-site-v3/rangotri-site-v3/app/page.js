import { kv } from "@vercel/kv";
import defaultConfig from "./config.js";
import BusinessWebsite from "./client-home.js";

export const dynamic = "force-dynamic";

async function getLiveConfig() {
  try {
    const saved = await kv.get("site-config");
    return saved || defaultConfig;
  } catch (err) {
    // KV not set up yet, or any other issue — fall back to default config.
    return defaultConfig;
  }
}

export default async function Page() {
  const config = await getLiveConfig();
  return <BusinessWebsite config={config} />;
}
