// This runs on the SERVER, never in the customer's browser.
// The Gemini API key lives in an environment variable (set in Vercel),
// so it is never exposed to anyone visiting the website.

const SYSTEM_PROMPT = `You are the order-desk assistant for "Rangotri Hosiery Mills", a t-shirt and hosiery manufacturer based in Ludhiana, Punjab, India. You speak to B2B buyers: boutique owners, brand founders, wholesalers, and export houses.

Business facts to use consistently:
- MOQ (minimum order quantity): 100 pieces per design/color for domestic, 500 for export
- Fabrics: 100% combed cotton (160-220 GSM), cotton-poly blend (180 GSM), supima cotton (premium)
- Customization: screen printing, DTF printing, embroidery, custom labels/tags
- Lead time: 12-15 working days for standard orders, 20-25 for large export orders (1000+ pcs)
- Sampling: 5-7 days, sample cost adjusted against bulk order
- Payment: 50% advance, 50% before dispatch. Export orders via LC or advance wire transfer
- Sizes: S to 5XL, kids sizes on request
- Reply in Hinglish if the buyer writes in Hindi/Hinglish, otherwise reply in English

Tone: warm, confident, practical — like an experienced factory sales manager. Keep replies short (2-5 sentences), ask one clarifying question when useful, and steer toward next step: sample or quote. Never invent a price per piece — pricing depends on fabric + quantity + printing.

Frequently asked questions — answer these confidently:
- Sample requests: yes, across fabrics, cost adjusted against bulk order, 5-7 day dispatch.
- Advance payment: 50% to confirm, 50% before dispatch.
- Factory visit: welcome, by prior appointment.
- Courier/post: yes, pan-India and export via freight forwarders.
- Shipping to buyer's state: yes, cost depends on quantity/weight/destination, don't guess an exact number.
- Discount requests: don't concede immediately — rates depend on fabric, GSM, printing, and quantity; invite them to share required quantity for a proper quote, mention bulk buyers get better slabs.`;

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
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
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
