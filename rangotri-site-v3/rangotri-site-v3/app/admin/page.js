"use client";
import React, { useState, useEffect } from "react";
import { Lock, Save, CheckCircle2, AlertCircle } from "lucide-react";

const emptyConfig = {
  businessName: "", tagline: "", city: "", state: "", fullAddress: "", phone: "", whatsappNumber: "",
  heroHeadline: "", heroSubtext: "",
  colors: { header: "#1B3350", footer: "#1B3350", background: "#EFE7D8", chatbox: "#1B3350", accent: "#C1622D", text: "#24211D", card: "#FBF7EE" },
  stats: [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }],
  fabrics: [{ tag: "", name: "", gsm: "", use: "" }, { tag: "", name: "", gsm: "", use: "" }, { tag: "", name: "", gsm: "", use: "" }],
  moqDomestic: "", moqExport: "", leadTimeStandard: "", leadTimeExport: "", sampleTime: "",
  paymentTerms: "", sizeRange: "", customizationOptions: "", chatGreeting: "",
};

function Field({ label, value, onChange, textarea }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#1B3350", marginBottom: 4 }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #1B335055", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #1B335055", fontSize: 14, boxSizing: "border-box" }} />
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [config, setConfig] = useState(emptyConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        setConfig({ ...emptyConfig, ...data, colors: { ...emptyConfig.colors, ...data.colors } });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Real check happens on save (server verifies password). This just unlocks the form.
    if (!password.trim()) {
      setLoginError("Password daalein.");
      return;
    }
    setAuthed(true);
    setLoginError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, config }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Save ho gaya! Website 30 second mein update ho jayegi." });
      } else {
        setStatus({ type: "error", message: data.error || "Galat password ya server error." });
      }
    } catch (e) {
      setStatus({ type: "error", message: "Connection error. Dobara try karein." });
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setConfig((c) => ({ ...c, [key]: value }));
  const updateFabric = (i, key, value) => {
    const fabrics = [...config.fabrics];
    fabrics[i] = { ...fabrics[i], [key]: value };
    setConfig((c) => ({ ...c, fabrics }));
  };
  const updateStat = (i, key, value) => {
    const stats = [...config.stats];
    stats[i] = { ...stats[i], [key]: value };
    setConfig((c) => ({ ...c, stats }));
  };
  const updateColor = (key, value) => setConfig((c) => ({ ...c, colors: { ...c.colors, [key]: value } }));

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#EFE7D8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <form onSubmit={handleLogin} style={{ background: "#FBF7EE", border: "2px dashed #1B3350", borderRadius: 8, padding: 32, width: 320, maxWidth: "90vw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Lock size={20} color="#C1622D" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1B3350" }}>Admin Login</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #1B335055", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
          />
          {loginError && <div style={{ color: "#c0392b", fontSize: 13, marginBottom: 10 }}>{loginError}</div>}
          <button type="submit" style={{ width: "100%", background: "#1B3350", color: "#fff", border: "none", padding: "10px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div style={{ minHeight: "100vh", background: "#EFE7D8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>Loading…</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EFE7D8", fontFamily: "'Inter', sans-serif", padding: "32px 6vw" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1B3350", marginBottom: 4 }}>Website Admin Panel</h1>
        <p style={{ fontSize: 13.5, color: "#5b5348", marginBottom: 24 }}>
          Yahan jo bhi badloge, website aur chatbot dono automatically update ho jayenge.
        </p>

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Business Details</h2>
        <Field label="Business Name" value={config.businessName} onChange={(v) => update("businessName", v)} />
        <Field label="Tagline" value={config.tagline} onChange={(v) => update("tagline", v)} />
        <Field label="City" value={config.city} onChange={(v) => update("city", v)} />
        <Field label="State" value={config.state} onChange={(v) => update("state", v)} />
        <Field label="Full Address" value={config.fullAddress} onChange={(v) => update("fullAddress", v)} />
        <Field label="Phone Number" value={config.phone} onChange={(v) => update("phone", v)} />
        <Field label="WhatsApp Number (country code + number, no +)" value={config.whatsappNumber} onChange={(v) => update("whatsappNumber", v)} />

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Homepage Text</h2>
        <Field label="Hero Headline" value={config.heroHeadline} onChange={(v) => update("heroHeadline", v)} />
        <Field label="Hero Subtext" value={config.heroSubtext} onChange={(v) => update("heroSubtext", v)} textarea />
        <Field label="Chatbot Greeting Message" value={config.chatGreeting} onChange={(v) => update("chatGreeting", v)} textarea />

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Brand Colors</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 14 }}>
          {Object.entries(config.colors).map(([key, val]) => {
            const colorLabels = {
              header: "Header Bar",
              footer: "Footer Section",
              background: "Website Background",
              chatbox: "Chatbox Header",
              accent: "Buttons / Accent",
              text: "Body Text",
              card: "Card Background",
            };
            return (
              <div key={key}>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#1B3350", marginBottom: 4 }}>{colorLabels[key] || key}</label>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input type="color" value={val} onChange={(e) => updateColor(key, e.target.value)} style={{ width: 32, height: 32, border: "none", padding: 0, cursor: "pointer" }} />
                  <input value={val} onChange={(e) => updateColor(key, e.target.value)} style={{ flex: 1, padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 12.5 }} />
                </div>
              </div>
            );
          })}
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Stats Strip (4 numbers)</h2>
        {config.stats.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="e.g. 100+" style={{ width: 90, padding: "8px 10px", borderRadius: 6, border: "1px solid #1B335055", fontSize: 13.5 }} />
            <input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Label" style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #1B335055", fontSize: 13.5 }} />
          </div>
        ))}

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Fabric / Product Cards</h2>
        {config.fabrics.map((f, i) => (
          <div key={i} style={{ border: "1px solid #1B335033", borderRadius: 6, padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input value={f.tag} onChange={(e) => updateFabric(i, "tag", e.target.value)} placeholder="Tag e.g. F-01" style={{ width: 90, padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 13 }} />
              <input value={f.name} onChange={(e) => updateFabric(i, "name", e.target.value)} placeholder="Fabric name" style={{ flex: 1, padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 13 }} />
              <input value={f.gsm} onChange={(e) => updateFabric(i, "gsm", e.target.value)} placeholder="GSM" style={{ width: 110, padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 13 }} />
            </div>
            <input value={f.use} onChange={(e) => updateFabric(i, "use", e.target.value)} placeholder="Use case description" style={{ width: "100%", padding: "6px 8px", borderRadius: 5, border: "1px solid #1B335055", fontSize: 13, boxSizing: "border-box" }} />
          </div>
        ))}

        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1B3350", marginTop: 24, marginBottom: 10 }}>Chatbot Business Facts</h2>
        <Field label="MOQ — Domestic" value={config.moqDomestic} onChange={(v) => update("moqDomestic", v)} />
        <Field label="MOQ — Export" value={config.moqExport} onChange={(v) => update("moqExport", v)} />
        <Field label="Lead Time — Standard" value={config.leadTimeStandard} onChange={(v) => update("leadTimeStandard", v)} />
        <Field label="Lead Time — Export" value={config.leadTimeExport} onChange={(v) => update("leadTimeExport", v)} />
        <Field label="Sample Time" value={config.sampleTime} onChange={(v) => update("sampleTime", v)} />
        <Field label="Payment Terms" value={config.paymentTerms} onChange={(v) => update("paymentTerms", v)} textarea />
        <Field label="Size Range" value={config.sizeRange} onChange={(v) => update("sizeRange", v)} />
        <Field label="Customization Options" value={config.customizationOptions} onChange={(v) => update("customizationOptions", v)} />

        {status && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 6, marginTop: 16, background: status.type === "success" ? "#DFF5E1" : "#FBE0DE", color: status.type === "success" ? "#1e7a34" : "#c0392b", fontSize: 13.5 }}>
            {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.message}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#C1622D", color: "#fff", border: "none", padding: "13px", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 16, marginBottom: 40 }}
        >
          <Save size={17} /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
