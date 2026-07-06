import { kv } from "@vercel/kv";
import defaultConfig from "../../config.js";

async function getLiveConfig() {
  try {
    const saved = await kv.get("site-config");
    return saved || defaultConfig;
  } catch (err) {
    return defaultConfig;
  }
}

function buildSystemPrompt(config) {
  return `You are the order-desk assistant for "${config.businessName}", a t-shirt and hosiery manufacturer based in ${config.city}, ${config.state}, India. You speak to B2B buyers: boutique owners, brand founders, wholesalers, and export houses.

Business facts to use consistently:
- MOQ (minimum order quantity): ${config.moqDomestic} for domestic, ${config.moqExport} for export
- Fabrics: ${config.fabrics.map((f) => `${f.name} (${f.gsm})`).join(", ")}
- Customization: ${config.customizationOptions}
- Lead time: ${config.leadTimeStandard} for standard orders, ${config.leadTimeExport}
- Sampling: ${config.sampleTime}
- Payment: ${config.paymentTerms}
- Sizes: ${config.sizeRange}
- Reply in Hinglish if the buyer writes in Hindi/Hinglish, otherwise reply in English

Tone: warm, confident, practical — like an experienced factory sales manager. Keep replies short (2-5 sentences), ask one clarifying question when useful, and steer toward next step: sample or quote. Never invent a price per piece — pricing depends on fabric + quantity + printing.

Frequently asked questions — answer these confidently:
- Sample requests: yes, across fabrics, cost adjusted against bulk order, dispatch time as above.
- Advance payment: as per payment terms above.
- Factory visit: welcome, by prior appointment.
- Courier/post: yes, pan-India and export via freight forwarders.
- Shipping to buyer's state: yes, cost depends on quantity/weight/destination, don't guess an exact number.
- Discount requests: don't concede immediately — rates depend on fabric, GSM, printing, and quantity; invite them to share required quantity for a proper quote, mention bulk buyers get better slabs.`;
}

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Server is missing GEMINI_API_KEY. Add it in Vercel > Settings > Environment Variables." },
        { status: 500 }
      );
    }

    const config = await getLiveConfig();
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: buildSystemPrompt(config) }] },
          generationConfig: { maxOutputTokens: 500 },
        }),
      }
    );

    const data = await geminiRes.json();

    if (data?.error) {
      return Response.json({ error: data.error.message || "Gemini API error" }, { status: 500 });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("\n").trim() ||
      "Maaf kijiye, kuch gadbad ho gayi. Dobara try karein.";

    return Response.json({ reply });
  } catch (err) {
    return Response.json({ error: "Something went wrong on the server." }, { status: 500 });
  }
}
