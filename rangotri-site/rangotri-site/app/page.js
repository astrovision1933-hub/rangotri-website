"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Shirt, Send, MessageCircle, X, Package, CheckCircle2, Factory, Truck, Award, MapPin, Phone,
} from "lucide-react";

const OWNER_WHATSAPP_NUMBER = "917087561933";

const FABRICS = [
  { name: "Combed Cotton", gsm: "160–220 GSM", use: "Everyday tees, brand basics, retail-ready fits", tag: "F-01" },
  { name: "Cotton-Poly Blend", gsm: "180 GSM", use: "Durable prints, uniforms, high-volume export orders", tag: "F-02" },
  { name: "Supima Cotton", gsm: "200 GSM", use: "Premium DTC brands, soft-hand feel, boutique labels", tag: "F-03" },
];

const PROCESS = [
  { n: "01", title: "Sample", desc: "Choose fabric, get a sample in 5–7 days. Cost adjusts against your bulk order.", icon: Package },
  { n: "02", title: "Confirm", desc: "Approve the sample, lock size breakup, pay 50% advance.", icon: CheckCircle2 },
  { n: "03", title: "Production", desc: "Cutting, stitching, printing/embroidery on our Ludhiana floor.", icon: Factory },
  { n: "04", title: "Dispatch", desc: "12–15 working days standard. Pan-India courier, export via freight.", icon: Truck },
];

const STATS = [
  { value: "100+", label: "MOQ per design (domestic)" },
  { value: "12–15", label: "days standard lead time" },
  { value: "S–5XL", label: "size range, kids on request" },
  { value: "3", label: "fabric grades in-house" },
];

function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! 👋 Rangotri Hosiery Mills mein aapka swagat hai. Bulk t-shirt order, fabric options ya custom printing ke baare mein poochh sakte hain." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", order: "" });
  const [alertSent, setAlertSent] = useState(false);
  const scrollRef = useRef(null);

  const canNotify = customer.name.trim() && customer.phone.trim() && customer.order.trim();
  const buildWhatsAppLink = () => {
    const msg = `Naya lead - website chatbot se:\nNaam: ${customer.name}\nNumber: ${customer.phone}\nOrder details: ${customer.order}`;
    return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text) => {
    const userMsg = text ?? input;
    if (!userMsg.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || `Error: ${data.error || "unknown"}` }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection mein dikkat aa rahi hai." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div style={{ position: "fixed", bottom: 88, right: 20, width: 340, maxWidth: "calc(100vw - 32px)", background: "#FBF7EE", border: "2px dashed #1B3350", borderRadius: 6, boxShadow: "0 10px 30px rgba(27,51,80,0.25)", overflow: "hidden", zIndex: 1000, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "#1B3350", color: "#EFE7D8", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: 0.5 }}>ORDER DESK</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#EFE7D8", cursor: "pointer", padding: 2 }}><X size={16} /></button>
      </div>

      <div ref={scrollRef} style={{ height: 300, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? "#1B3350" : "#EFE0C8", color: m.role === "user" ? "#EFE7D8" : "#24211D", padding: "8px 11px", borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", fontSize: 13.5, lineHeight: 1.4, whiteSpace: "pre-wrap" }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: "#8a7f6d", fontStyle: "italic" }}>typing…</div>}
      </div>

      <div style={{ padding: 10, borderTop: "1px solid #1B335022", background: "#F5EEDF" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#1B3350", textTransform: "uppercase", marginBottom: 6 }}>Order confirm? Owner ko WhatsApp alert bhejein</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Naam" style={{ padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 12.5, outline: "none" }} />
          <input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="Mobile number" style={{ padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 12.5, outline: "none" }} />
          <input value={customer.order} onChange={(e) => setCustomer({ ...customer, order: e.target.value })} placeholder="Order details" style={{ padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 12.5, outline: "none" }} />
          <a href={canNotify ? buildWhatsAppLink() : undefined} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!canNotify) { e.preventDefault(); return; } setAlertSent(true); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 8px", borderRadius: 6, fontSize: 12.5, fontWeight: 700, textDecoration: "none", color: "#fff", background: canNotify ? "#25D366" : "#a9b3ba", pointerEvents: canNotify ? "auto" : "none" }}>
            <MessageCircle size={13} /> Notify Owner
          </a>
          {alertSent && <div style={{ fontSize: 11, color: "#1B3350", textAlign: "center" }}>✓ WhatsApp khul gaya, bas send dabao</div>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "8px 10px", borderTop: "1px solid #1B335022" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Apna sawaal likhein…" style={{ flex: 1, padding: "7px 10px", borderRadius: 16, border: "1px solid #1B335055", fontSize: 13, outline: "none" }} />
        <button onClick={() => send()} disabled={loading} style={{ background: "#C1622D", color: "#fff", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

export default function RangotriWebsite() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ background: "#EFE7D8", color: "#24211D", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .display { font-family: 'Oswald', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .swing-tag { background: #FBF7EE; border: 2px dashed #1B3350; border-radius: 4px; position: relative; }
        .swing-tag::before { content: ''; position: absolute; top: -8px; left: 20px; width: 14px; height: 14px; border-radius: 50%; background: #EFE7D8; border: 2px solid #1B3350; }
        .nav-link { display: inline; }
        @media (max-width: 700px) { .nav-link { display: none; } }
        a { color: inherit; }
      `}</style>

      <header style={{ background: "#1B3350", color: "#EFE7D8", padding: "16px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #C1622D", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="display" style={{ fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>
          RANGOTRI <span style={{ color: "#C1622D" }}>HOSIERY MILLS</span>
        </div>
        <nav style={{ display: "flex", gap: 28, alignItems: "center", fontSize: 13.5 }}>
          <a href="#fabrics" className="nav-link">Fabrics</a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button onClick={() => setChatOpen(true)} className="display" style={{ background: "#C1622D", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 4, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer", fontSize: 13 }}>
            GET A QUOTE
          </button>
        </nav>
      </header>

      <section style={{ padding: "72px 6vw 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, #1B3350 0, #1B3350 2px, transparent 2px, transparent 14px)" }} />
        <div style={{ maxWidth: 720, position: "relative" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "#C1622D", marginBottom: 14, textTransform: "uppercase" }}>
            Ludhiana, Punjab — Wholesale Manufacturing Since Day One
          </div>
          <h1 className="display" style={{ fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.05, fontWeight: 700, margin: "0 0 20px" }}>
            Your t-shirt brand, cut and stitched to spec.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#3d382f", maxWidth: 560, marginBottom: 28 }}>
            From 100-piece boutique runs to 5,000-piece export orders — combed cotton, poly-blends, and supima, printed, embroidered, and labelled the way your buyers expect.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => setChatOpen(true)} className="display" style={{ background: "#1B3350", color: "#EFE7D8", border: "none", padding: "13px 26px", borderRadius: 4, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer", fontSize: 14 }}>
              REQUEST A SAMPLE
            </button>
            <a href="#fabrics" className="display" style={{ border: "2px solid #1B3350", padding: "11px 24px", borderRadius: 4, fontWeight: 600, letterSpacing: 0.5, fontSize: 14, textDecoration: "none" }}>
              VIEW FABRICS
            </a>
          </div>
        </div>
      </section>

      <section style={{ background: "#1B3350", color: "#EFE7D8", padding: "28px 6vw", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20 }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: "#C1622D" }}>{s.value}</div>
            <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </section>

      <section id="fabrics" style={{ padding: "64px 6vw" }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "#C1622D", marginBottom: 8, textTransform: "uppercase" }}>Fabric Book</div>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 32 }}>Three grades, one floor</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
          {FABRICS.map((f) => (
            <div key={f.tag} className="swing-tag" style={{ padding: "24px 20px" }}>
              <div className="mono" style={{ fontSize: 11, color: "#8a7f6d", marginBottom: 10 }}>{f.tag}</div>
              <div className="display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{f.name}</div>
              <div className="mono" style={{ fontSize: 13, color: "#C1622D", marginBottom: 10 }}>{f.gsm}</div>
              <div style={{ fontSize: 14, color: "#3d382f", lineHeight: 1.5 }}>{f.use}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="process" style={{ padding: "64px 6vw", background: "#FBF7EE" }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: 2, color: "#C1622D", marginBottom: 8, textTransform: "uppercase" }}>How An Order Runs</div>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 32 }}>Sample to dispatch, four steps</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {PROCESS.map(({ n, title, desc, icon: Icon }) => (
            <div key={n}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span className="mono" style={{ fontSize: 13, color: "#C1622D", fontWeight: 700 }}>{n}</span>
                <Icon size={18} color="#1B3350" />
              </div>
              <div className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13.5, color: "#5b5348", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 6vw", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
        <div>
          <Award size={22} color="#C1622D" style={{ marginBottom: 10 }} />
          <div className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Small-run friendly</div>
          <div style={{ fontSize: 14, color: "#5b5348", lineHeight: 1.5 }}>100-piece MOQ means new brands don't need warehouse-scale budgets to start.</div>
        </div>
        <div>
          <Factory size={22} color="#C1622D" style={{ marginBottom: 10 }} />
          <div className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>In-house production</div>
          <div style={{ fontSize: 14, color: "#5b5348", lineHeight: 1.5 }}>Cutting, stitching, printing, and embroidery under one roof in Ludhiana.</div>
        </div>
        <div>
          <Truck size={22} color="#C1622D" style={{ marginBottom: 10 }} />
          <div className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Pan-India + export</div>
          <div style={{ fontSize: 14, color: "#5b5348", lineHeight: 1.5 }}>Courier delivery anywhere in India, freight-forwarded shipments abroad.</div>
        </div>
      </section>

      <section id="contact" style={{ background: "#1B3350", color: "#EFE7D8", padding: "56px 6vw 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32, marginBottom: 32 }}>
          <div>
            <div className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to place an order?</div>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6, maxWidth: 380, marginBottom: 18 }}>Chat with our order desk for a sample, or reach us directly.</p>
            <button onClick={() => setChatOpen(true)} className="display" style={{ background: "#C1622D", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 4, fontWeight: 600, cursor: "pointer", fontSize: 13.5 }}>
              CHAT WITH ORDER DESK
            </button>
          </div>
          <div style={{ fontSize: 14, lineHeight: 2.1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}><MapPin size={15} /> Tiba Road, Ludhiana, Punjab</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Phone size={15} /> +91 70875 61933</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Shirt size={15} /> MOQ 100 pcs · S–5XL</div>
          </div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.6, borderTop: "1px solid #ffffff22", paddingTop: 16 }}>
          © Rangotri Hosiery Mills
        </div>
      </section>

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{ position: "fixed", bottom: 20, right: 20, background: "#C1622D", color: "#fff", border: "none", borderRadius: "50%", width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.25)", zIndex: 999 }}>
          <MessageCircle size={24} />
        </button>
      )}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
