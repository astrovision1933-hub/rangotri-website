// ============================================================
// EK HI FILE — YAHAN SAB KUCH BADLO, POORI WEBSITE UPDATE HOGI
// ============================================================
// Naye client ke liye: sirf is file ki values badlo.
// page.js ya route.js mein kuch bhi chhedne ki zarurat nahi.

const config = {
  // ---------- BUSINESS IDENTITY ----------
  businessName: "Rangotri Hosiery Mills",
  tagline: "Wholesale Manufacturing Since Day One",
  city: "Ludhiana",
  state: "Punjab",
  fullAddress: "Tiba Road, Ludhiana, Punjab",
  phone: "+91 70875 61933",
  whatsappNumber: "917087561933", // country code + number, no + or spaces

  // ---------- HERO SECTION TEXT ----------
  heroHeadline: "Your t-shirt brand, cut and stitched to spec.",
  heroSubtext:
    "From 100-piece boutique runs to 5,000-piece export orders — combed cotton, poly-blends, and supima, printed, embroidered, and labelled the way your buyers expect.",

  // ---------- BRAND COLORS ----------
  colors: {
    header: "#1B3350",      // top navigation bar
    footer: "#1B3350",      // bottom contact/footer section
    background: "#EFE7D8",  // main page background
    chatbox: "#1B3350",     // chat widget header bar
    accent: "#C1622D",      // buttons, highlights, links
    text: "#24211D",        // main body text color
    card: "#FBF7EE",        // fabric card / chat bubble backgrounds
  },

  // ---------- STATS STRIP (4 numbers shown near top) ----------
  stats: [
    { value: "100+", label: "MOQ per design (domestic)" },
    { value: "12–15", label: "days standard lead time" },
    { value: "S–5XL", label: "size range, kids on request" },
    { value: "3", label: "fabric grades in-house" },
  ],

  // ---------- FABRIC / PRODUCT CARDS ----------
  fabrics: [
    { tag: "F-01", name: "Combed Cotton", gsm: "160–220 GSM", use: "Everyday tees, brand basics, retail-ready fits" },
    { tag: "F-02", name: "Cotton-Poly Blend", gsm: "180 GSM", use: "Durable prints, uniforms, high-volume export orders" },
    { tag: "F-03", name: "Supima Cotton", gsm: "200 GSM", use: "Premium DTC brands, soft-hand feel, boutique labels" },
  ],

  // ---------- BUSINESS FACTS (chatbot inhi ke hisaab se jawab dega) ----------
  moqDomestic: "100 pieces per design/color",
  moqExport: "500 pieces per design/color",
  leadTimeStandard: "12-15 working days",
  leadTimeExport: "20-25 working days for orders above 1000 pieces",
  sampleTime: "5-7 days, cost adjusted against the bulk order",
  paymentTerms: "50% advance to confirm, 50% before dispatch. Export orders via LC or advance wire transfer",
  sizeRange: "S to 5XL, kids sizes on request",
  customizationOptions: "screen printing, DTF printing, embroidery, custom labels/tags",

  // ---------- CHATBOT GREETING ----------
  chatGreeting:
    "Namaste! 👋 Rangotri Hosiery Mills mein aapka swagat hai. Bulk t-shirt order, fabric options ya custom printing ke baare mein poochh sakte hain.",
};

export default config;
