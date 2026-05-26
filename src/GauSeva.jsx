import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  green:      "#2D6A1F",
  greenLight: "#EAF3DE",
  greenDark:  "#173A0D",
  greenMid:   "#3B8A27",
  amber:      "#BA7517",
  amberLight: "#FDF3DC",
  teal:       "#0D7A60",
  tealLight:  "#E0F5EE",
  red:        "#B91C1C",
  redLight:   "#FEE2E2",
  blue:       "#1D4ED8",
  blueLight:  "#EFF6FF",
  purple:     "#6D28D9",
  purpleLight:"#EDE9FE",
  gray:       "#6B7280",
  border:     "rgba(0,0,0,0.08)",
  bg:         "#F7F5F0",
  surface:    "#FFFFFF",
  text:       "#1A1A1A",
  textMuted:  "#6B7280",
};

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const css = {
  app: {
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    background: T.bg,
    minHeight: "100vh",
    color: T.text,
  },
  topbar: {
    background: T.surface,
    borderBottom: `1px solid ${T.border}`,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 56,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: T.green,
    cursor: "pointer",
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: T.green,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  nav: {
    display: "flex",
    gap: 2,
    flex: 1,
    marginLeft: 16,
    overflowX: "auto",
  },
  navBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 8,
    border: "none",
    background: active ? T.greenLight : "transparent",
    color: active ? T.greenDark : T.gray,
    fontWeight: active ? 700 : 500,
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: 5,
  }),
  main: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "20px 16px",
  },
  card: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: T.text,
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  badge: (color, bg) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    color,
    background: bg,
    whiteSpace: "nowrap",
  }),
  btn: (bg, color="#fff", outline=false) => ({
    padding: "9px 18px",
    borderRadius: 9,
    border: outline ? `1.5px solid ${bg}` : "none",
    background: outline ? "transparent" : bg,
    color: outline ? bg : color,
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "opacity .15s",
  }),
  input: {
    width: "100%",
    padding: "10px 12px",
    border: `1.5px solid ${T.border}`,
    borderRadius: 9,
    fontFamily: "inherit",
    fontSize: 13,
    color: T.text,
    background: T.surface,
    outline: "none",
    boxSizing: "border-box",
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: T.gray,
    marginBottom: 4,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  chip: (active) => ({
    padding: "5px 13px",
    borderRadius: 20,
    border: `1.5px solid ${active ? T.green : T.border}`,
    background: active ? T.greenLight : T.surface,
    color: active ? T.greenDark : T.gray,
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  }),
  row: (gap=10) => ({
    display: "flex",
    alignItems: "center",
    gap,
  }),
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
  },
  statBox: {
    background: T.bg,
    borderRadius: 9,
    padding: "10px 12px",
    textAlign: "center",
  },
  tag: {
    fontSize: 11,
    color: T.gray,
    background: T.bg,
    borderRadius: 6,
    padding: "2px 8px",
    fontWeight: 600,
  },
  divider: {
    height: 1,
    background: T.border,
    margin: "10px 0",
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Chip = ({ label, active, onClick }) => (
  <span style={css.chip(active)} onClick={onClick}>{label}</span>
);

const Badge = ({ label, color, bg, icon }) => (
  <span style={css.badge(color, bg)}>{icon && <span>{icon}</span>}{label}</span>
);

const Btn = ({ children, onClick, bg = T.green, color = "#fff", outline = false, full = false, style = {} }) => (
  <button onClick={onClick} style={{ ...css.btn(bg, color, outline), ...(full ? { width: "100%" } : {}), ...style }}>
    {children}
  </button>
);

const FG = ({ label, required, children, hint }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <label style={css.label}>{label}{required && <span style={{ color: T.red }}> *</span>}</label>}
    {children}
    {hint && <div style={{ fontSize: 11, color: T.gray, marginTop: 4 }}>{hint}</div>}
  </div>
);

const Input = ({ placeholder, type = "text", value, onChange, min, max }) => (
  <input style={css.input} type={type} placeholder={placeholder} value={value} onChange={onChange} min={min} max={max} />
);

const Select = ({ options, value, onChange }) => (
  <select style={{ ...css.input, cursor: "pointer" }} value={value} onChange={onChange}>
    {options.map((o, i) => <option key={i} value={typeof o === "string" ? o : o.value}>{typeof o === "string" ? o : o.label}</option>)}
  </select>
);

const UploadBox = ({ label, uploaded, onUpload }) => (
  <div>
    {!uploaded ? (
      <div
        onClick={onUpload}
        style={{
          border: `1.5px dashed ${T.border}`,
          borderRadius: 9,
          padding: "18px 16px",
          textAlign: "center",
          cursor: "pointer",
          background: T.bg,
          color: T.gray,
          fontSize: 13,
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 4 }}>📄</div>
        <div><span style={{ color: T.blue, fontWeight: 700 }}>Click to upload</span> — {label}</div>
        <div style={{ fontSize: 11, marginTop: 3 }}>PDF or image, max 5 MB</div>
      </div>
    ) : (
      <div style={{ ...css.row(8), background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 9, padding: "10px 14px" }}>
        <span>✅</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#15803D" }}>{uploaded} — uploaded successfully</span>
      </div>
    )}
  </div>
);

const SectionHead = ({ title, sub }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: T.text }}>{title}</div>
    {sub && <div style={{ fontSize: 13, color: T.gray, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Alert = ({ type = "info", children }) => {
  const styles = {
    info:    { bg: T.blueLight,   border: "#BFDBFE", icon: "ℹ️" },
    warn:    { bg: "#FFFBEB",     border: "#FCD34D", icon: "⚠️" },
    danger:  { bg: T.redLight,    border: "#FECACA", icon: "🚨" },
    success: { bg: "#F0FDF4",     border: "#86EFAC", icon: "✅" },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ fontSize: 12, color: T.text, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const VETS = [
  { id: 1, name: "Dr. Ramesh Yadav",  initials: "RY", spec: "Bovine Specialist", exp: "15 yrs", loc: "Mathura, UP",   rating: 4.9, reviews: 218, fee: 500,  avail: "Today",    tags: ["Cow","Buffalo","AI Insemination","Emergency"], av_bg: T.greenLight,  av_col: T.greenDark },
  { id: 2, name: "Dr. Sunita Devi",   initials: "SD", spec: "Buffalo & Dairy Expert", exp: "10 yrs", loc: "Agra, UP", rating: 4.6, reviews: 134, fee: 450,  avail: "Tomorrow", tags: ["Buffalo","Post-calving","Mastitis"],             av_bg: T.tealLight,   av_col: T.teal },
  { id: 3, name: "Dr. Ajay Pratap",   initials: "AP", spec: "AI Insemination Expert", exp: "12 yrs", loc: "Lucknow, UP", rating: 4.9, reviews: 309, fee: 600, avail: "Today", tags: ["Cow","AI Insemination","Govt. Approved"],       av_bg: T.blueLight,   av_col: T.blue },
  { id: 4, name: "Dr. Meena Kumari",  initials: "MK", spec: "Livestock Surgeon", exp: "8 yrs", loc: "Varanasi, UP",  rating: 4.5, reviews: 87,  fee: 700,  avail: "Today",    tags: ["Cow","Buffalo","Surgery","Gynaecology"],         av_bg: T.amberLight,  av_col: T.amber },
];

const SEMEN = [
  { id: 1, emoji: "🐄", breed: "HF / Holstein", bull: "NDDB 1147 — Ranjit", cert: "NDDB Certified · Hissar", motility: "85%", yield: "18–20 L", conception: "95%", price: 120, stock: 240, bg: T.greenLight },
  { id: 2, emoji: "🐃", breed: "Murrah Buffalo", bull: "CIRB 204 — Sher Singh", cert: "CIRB Certified · Hisar", motility: "80%", yield: "12–14 L", conception: "90%", price: 100, stock: 180, bg: T.tealLight },
  { id: 3, emoji: "🐄", breed: "Sahiwal (Desi)", bull: "GBPUAT 09 — Shankar", cert: "A2 Certified · Pantnagar", motility: "78%", yield: "8–10 L",  conception: "88%", price: 90,  stock: 320, bg: T.greenLight },
  { id: 4, emoji: "🐄", breed: "Jersey",         bull: "KAU 55 — Arjun",        cert: "KAU Certified · Kerala",  motility: "82%", yield: "15–17 L", conception: "92%", price: 110, stock: 150, bg: T.amberLight },
];

const FEED = [
  { id: 1, emoji: "🌾", name: "Dairy Cattle Concentrate", desc: "High-protein pellet feed for lactating cows & buffaloes. Boosts milk yield.", price: 1200, unit: "50 kg bag" },
  { id: 2, emoji: "🧂", name: "Mineral & Vitamin Mix",    desc: "Prevents deficiency, improves fertility & coat health.",                     price: 350,  unit: "5 kg pack" },
  { id: 3, emoji: "🌿", name: "Maize Silage",             desc: "Fermented maize — ideal for dry & wet season. High energy roughage.",         price: 4500, unit: "200 kg bale" },
  { id: 4, emoji: "🫘", name: "Cotton Seed Cake",         desc: "Protein-rich supplement. Improves milk fat percentage.",                     price: 900,  unit: "40 kg bag" },
  { id: 5, emoji: "🌱", name: "Calcium Supplement",       desc: "Prevents milk fever & hypocalcemia. Essential post-calving.",                 price: 480,  unit: "10 kg pack" },
  { id: 6, emoji: "🍬", name: "Jaggery (Gur) Block",     desc: "Natural energy booster. Improves feed palatability & gut health.",           price: 280,  unit: "10 kg block" },
];

const MEDICINE = [
  { id: 1, emoji: "💉", name: "FMD Vaccine",            desc: "Foot & Mouth Disease vaccine. Govt. approved. 6-month protection.",         price: 45,  unit: "per dose",    rx: false },
  { id: 2, emoji: "💊", name: "Albendazole Bolus",       desc: "Broad-spectrum dewormer. Effective against roundworms & tapeworms.",        price: 25,  unit: "per bolus",   rx: false },
  { id: 3, emoji: "🧴", name: "Oxytetracycline Inj.",    desc: "Broad-spectrum antibiotic injection. ★ Prescription required.",             price: 180, unit: "100 ml vial", rx: true },
  { id: 4, emoji: "🩺", name: "HS Vaccine",              desc: "Haemorrhagic Septicaemia. Mandatory in endemic zones.",                     price: 35,  unit: "per dose",    rx: false },
  { id: 5, emoji: "🌡️", name: "Meloxicam Pain Relief",  desc: "Anti-inflammatory for post-calving pain, mastitis, joint issues.",          price: 220, unit: "50 ml bottle",rx: true },
  { id: 6, emoji: "🫙", name: "Rumen Tonic",             desc: "Restores rumen activity, treats bloat & indigestion.",                      price: 130, unit: "500 ml bottle",rx: false },
];

const LISTINGS = [
  { id: 1, emoji: "🐄", type: "Cow",    breed: "HF Crossbred",   price: 65000, yield: "18 L/day", age: "4 yrs", lac: "3rd", status: "Healthy", loc: "Mathura, UP",         verified: true,  bg: T.greenLight },
  { id: 2, emoji: "🐃", type: "Buffalo",breed: "Murrah",         price: 80000, yield: "14 L/day", age: "5 yrs", lac: "2nd", status: "Pregnant",loc: "Karnal, Haryana",      verified: true,  bg: T.tealLight },
  { id: 3, emoji: "🐄", type: "Cow",    breed: "Sahiwal (Desi)", price: 55000, yield: "10 L/day", age: "6 yrs", lac: "4th", status: "A2 Milk", loc: "Lucknow, UP",          verified: true,  bg: T.greenLight },
  { id: 4, emoji: "🐃", type: "Buffalo",breed: "Surti",          price: 72000, yield: "12 L/day", age: "4 yrs", lac: "2nd", status: "Healthy", loc: "Anand, Gujarat",       verified: false, bg: T.amberLight },
  { id: 5, emoji: "🐄", type: "Cow",    breed: "Jersey High Yield",price:90000,yield: "22 L/day", age: "3 yrs", lac: "1st", status: "Excellent",loc: "Pune, Maharashtra",    verified: true,  bg: T.greenLight },
  { id: 6, emoji: "🐄", type: "Cow",    breed: "Gir (A2 Milk)",  price: 48000, yield: "8 L/day",  age: "5 yrs", lac: "3rd", status: "A2 Milk", loc: "Rajkot, Gujarat",      verified: true,  bg: T.purpleLight },
];

const TABS = [
  { id: "feed",       label: "🌿 Feed",        title: "GauSeva Feed" },
  { id: "market",     label: "🏪 Marketplace",  title: "Buy & Sell Animals" },
  { id: "semen",      label: "🧬 Semen",        title: "Semen Catalogue" },
  { id: "fodder",     label: "🌾 Feed & Food",  title: "Cattle Feed & Nutrition" },
  { id: "medicine",   label: "💊 Medicine",     title: "Livestock Medicines" },
  { id: "vet",        label: "👨‍⚕️ Vets",        title: "Find a Vet" },
  { id: "onboard",    label: "➕ Join as Vet",  title: "Vet Onboarding" },
];

// ─── CART ─────────────────────────────────────────────────────────────────────
const CartDrawer = ({ cart, onRemove, onClose }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 320, background: T.surface, boxShadow: "-4px 0 24px rgba(0,0,0,0.12)", zIndex: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ ...css.row(10), padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16 }}>🛒 Cart ({cart.reduce((s,i)=>s+i.qty,0)})</span>
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.gray }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {cart.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.gray }}>
            <div style={{ fontSize: 40 }}>🛒</div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>Cart is empty</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Add items from Feed, Medicine or Semen tabs</div>
          </div>
        )}
        {cart.map((item, i) => (
          <div key={i} style={{ ...css.row(10), padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 20 }}>{item.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: T.gray }}>₹{item.price.toLocaleString()} × {item.qty}</div>
            </div>
            <div style={{ fontWeight: 700, color: T.green, fontSize: 14 }}>₹{(item.price * item.qty).toLocaleString()}</div>
            <button onClick={() => onRemove(i)} style={{ background: T.redLight, border: "none", color: T.red, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>✕</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: 16, borderTop: `1px solid ${T.border}` }}>
          <div style={{ ...css.row(0), justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.green }}>₹{total.toLocaleString()}</span>
          </div>
          <Btn full bg={T.green} onClick={() => alert("Proceeding to Razorpay payment gateway...")}>Proceed to Payment →</Btn>
        </div>
      )}
    </div>
  );
};

// ─── FEED TAB ─────────────────────────────────────────────────────────────────
const FeedTab = ({ onBook, onEnquire }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All","Vet","Semen","Marketplace","Feed","Medicine"];
  return (
    <div>
      <Alert type="danger"><strong>FMD Outbreak Alert — Mathura & Agra districts.</strong> Vaccinate your livestock immediately. Free vaccination drive by Govt. vet teams this week.</Alert>
      <div style={{ ...css.row(8), flexWrap: "wrap", marginBottom: 14 }}>
        {filters.map(f => <Chip key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />)}
      </div>

      {/* Vet card */}
      {["All","Vet"].includes(filter) && <div style={css.card}>
        <div style={{ ...css.row(10), marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: T.greenDark, fontSize: 14, flexShrink: 0 }}>RY</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Dr. Ramesh Yadav</div>
            <div style={{ fontSize: 11, color: T.gray }}>Bovine Specialist · Mathura · 2 hrs ago</div>
          </div>
          <Badge label="Available today" color={T.greenDark} bg={T.greenLight} icon="✓" />
        </div>
        <p style={{ fontSize: 13, color: T.text, lineHeight: 1.6, marginBottom: 10 }}>Accepting farm visits in Mathura. Specialising in <strong>AI insemination, pregnancy diagnosis</strong> and general bovine health. 15 yrs experience. Govt. registered.</p>
        <div style={{ ...css.row(6), flexWrap: "wrap", marginBottom: 10 }}>
          {["Cow","Buffalo","AI Insemination","Mathura"].map(t => <span key={t} style={css.tag}>{t}</span>)}
        </div>
        <div style={css.divider} />
        <div style={{ ...css.row(12) }}>
          <span style={{ fontSize: 13, color: T.gray }}>⭐ 4.9 (218)</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontWeight: 700, color: T.green, fontSize: 15 }}>₹500/visit</span>
          <Btn bg={T.green} onClick={() => onBook(VETS[0])}>Book visit →</Btn>
        </div>
      </div>}

      {/* Semen feed card */}
      {["All","Semen"].includes(filter) && <div style={css.card}>
        <div style={{ ...css.row(10), marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.amberLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: T.amber, fontSize: 14, flexShrink: 0 }}>ND</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>NDDB Semen Station</div>
            <div style={{ fontSize: 11, color: T.gray }}>Verified supplier · Hissar · 4 hrs ago</div>
          </div>
          <Badge label="NDDB Certified" color={T.amber} bg={T.amberLight} icon="🏅" />
        </div>
        <p style={{ fontSize: 13, color: T.text, lineHeight: 1.6, marginBottom: 10 }}>New batch of <strong>HF / Holstein frozen semen</strong> — Bull NDDB 1147 (Ranjit). High conception rate, proven milk yield improvement.</p>
        <div style={{ ...css.grid2, marginBottom: 10 }}>
          {[["85%","Motility"],["18–20 L","Expected yield"],["95%","Conception rate"],["₹120/straw","240 straws in stock"]].map(([v,k])=>(
            <div key={k} style={css.statBox}><div style={{ fontWeight: 700, fontSize: 15, color: T.green }}>{v}</div><div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{k}</div></div>
          ))}
        </div>
        <div style={{ ...css.row(0), justifyContent: "flex-end" }}>
          <Btn bg={T.amber} color="#fff">Order now →</Btn>
        </div>
      </div>}

      {/* Marketplace feed card */}
      {["All","Marketplace"].includes(filter) && <div style={css.card}>
        <div style={{ ...css.row(10), marginBottom: 10 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🐄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>HF Crossbred Cow — For Sale</div>
            <div style={{ fontSize: 11, color: T.gray }}>Mathura, UP · Listed 2 hrs ago</div>
            <Badge label="Verified listing" color={T.greenDark} bg={T.greenLight} icon="✓" />
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.green }}>₹65,000</div>
        </div>
        <div style={{ ...css.grid2, marginBottom: 10 }}>
          {[["18 L/day","Milk yield"],["4 yrs","Age"],["3rd","Lactation"],["Healthy","Status"]].map(([v,k])=>(
            <div key={k} style={css.statBox}><div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{v}</div><div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{k}</div></div>
          ))}
        </div>
        <div style={css.row(8)}>
          <Btn bg={T.green} onClick={() => onEnquire(LISTINGS[0])}>Enquire →</Btn>
          <Btn bg={T.teal} color="#fff">Request vet check</Btn>
        </div>
      </div>}

      {/* Govt scheme */}
      <Alert type="info"><strong>Govt. Scheme:</strong> Free AI insemination under Rashtriya Gokul Mission available in Uttar Pradesh, Haryana & Punjab. Check eligibility at your nearest KVK.</Alert>

      {/* Feed shop card */}
      {["All","Feed"].includes(filter) && <div style={css.card}>
        <div style={{ ...css.row(10), marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: T.greenDark, fontSize: 14, flexShrink: 0 }}>KA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Kisaan Agro Supplies</div>
            <div style={{ fontSize: 11, color: T.gray }}>Verified seller · Lucknow · Yesterday</div>
          </div>
          <Badge label="10% off" color={T.greenDark} bg={T.greenLight} icon="🏷" />
        </div>
        {FEED.slice(0,3).map(f => (
          <div key={f.id} style={{ ...css.row(10), padding: "8px 12px", background: T.bg, borderRadius: 9, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>{f.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: T.gray }}>{f.unit}</div>
            </div>
            <span style={{ fontWeight: 700, color: T.green, fontSize: 13 }}>₹{f.price.toLocaleString()}</span>
          </div>
        ))}
      </div>}
    </div>
  );
};

// ─── MARKETPLACE TAB ─────────────────────────────────────────────────────────
const MarketTab = ({ onEnquire, onSell, onAddCart }) => {
  const [filter, setFilter] = useState("All");
  const [showSell, setShowSell] = useState(false);
  const filters = ["All","Cow","Buffalo","Pregnant","High yield","Verified"];
  const filtered = LISTINGS.filter(l => {
    if (filter === "All") return true;
    if (filter === "Cow") return l.type === "Cow";
    if (filter === "Buffalo") return l.type === "Buffalo";
    if (filter === "Pregnant") return l.status === "Pregnant";
    if (filter === "High yield") return parseInt(l.yield) >= 14;
    if (filter === "Verified") return l.verified;
    return true;
  });

  return (
    <div>
      <Alert type="info"><strong>GauSeva Verified</strong> — all listings are reviewed by our team before going live. Look for the ✓ Verified badge.</Alert>

      <div style={{ ...css.row(0), justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div style={{ ...css.row(8), flexWrap: "wrap" }}>
          {filters.map(f => <Chip key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />)}
        </div>
        <Btn bg={T.amber} color="#fff" onClick={() => setShowSell(!showSell)}>{showSell ? "← Back to listings" : "➕ Post your listing"}</Btn>
      </div>

      {showSell ? <SellForm /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {filtered.map(l => (
            <div key={l.id} style={{ ...css.card, padding: 0, overflow: "hidden", marginBottom: 0 }}>
              <div style={{ height: 110, background: l.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
                {l.emoji}
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  {l.verified
                    ? <Badge label="Verified" color={T.greenDark} bg={T.greenLight} icon="✓" />
                    : <Badge label="Unverified" color={T.amber} bg={T.amberLight} />}
                </div>
                <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "3px 10px", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: T.green }}>
                  ₹{l.price.toLocaleString()}
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{l.breed} {l.type}</div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 10 }}>📍 {l.loc}</div>
                <div style={css.grid2}>
                  {[["Milk yield",l.yield],["Age",l.age],["Lactation",l.lac],["Status",l.status]].map(([k,v])=>(
                    <div key={k} style={css.statBox}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{v}</div>
                      <div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>{k}</div>
                    </div>
                  ))}
                </div>
                <div style={{ ...css.row(8), marginTop: 12 }}>
                  <Btn bg={T.green} onClick={() => onEnquire(l)} style={{ flex: 1, justifyContent: "center" }}>Enquire →</Btn>
                  <Btn bg={T.teal} color="#fff" onClick={() => {}} style={{ flex: 1, justifyContent: "center" }}>Vet check</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SellForm = () => {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: T.green }}>Listing Submitted!</div>
      <div style={{ fontSize: 13, color: T.gray, marginBottom: 16 }}>Your listing will be reviewed within 24 hrs and go live once verified.</div>
      <div style={{ display: "inline-block", padding: "8px 20px", background: T.blueLight, borderRadius: 9, fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 700, color: T.blue, marginBottom: 20 }}>LST-GAU-2026-7842</div>
      <div><Btn bg={T.green} onClick={() => setSubmitted(false)}>← Back to listings</Btn></div>
    </div>
  );
  return (
    <div style={css.card}>
      <div style={css.cardTitle}>📋 Post a New Listing</div>
      <div style={css.grid2}>
        <FG label="Animal type" required><Select options={["Cow","Buffalo","Calf","Bull"]} /></FG>
        <FG label="Breed" required><Select options={["HF / Holstein","Jersey","Sahiwal","Gir","Murrah Buffalo","Surti Buffalo","Other"]} /></FG>
      </div>
      <div style={css.grid2}>
        <FG label="Age (years)" required><Input type="number" placeholder="e.g. 4" /></FG>
        <FG label="Lactation no."><Select options={["1st","2nd","3rd","4th","5th+","Pregnant / dry"]} /></FG>
      </div>
      <div style={css.grid2}>
        <FG label="Daily milk yield (L)" required><Input type="number" placeholder="e.g. 14" /></FG>
        <FG label="Asking price (₹)" required><Input type="number" placeholder="e.g. 65000" /></FG>
      </div>
      <FG label="Health status"><Select options={["Healthy — vaccinated","Healthy — not vaccinated","Pregnant","Post-calving","Under treatment"]} /></FG>
      <FG label="Location" required><Input placeholder="Village, Block, District, State" /></FG>
      <FG label="Description"><textarea style={{ ...css.input, minHeight: 80, resize: "vertical" }} placeholder="Feeding habits, temperament, vaccination history..." /></FG>
      <div style={css.grid2}>
        <FG label="Your name" required><Input placeholder="Full name" /></FG>
        <FG label="Mobile number" required><Input type="tel" placeholder="+91 XXXXX XXXXX" /></FG>
      </div>
      <Btn bg={T.green} full onClick={() => setSubmitted(true)}>Submit listing →</Btn>
    </div>
  );
};

// ─── SEMEN TAB ───────────────────────────────────────────────────────────────
const SemenTab = ({ onAddCart }) => {
  const [filter, setFilter] = useState("All");
  const breeds = ["All","HF / Holstein","Murrah Buffalo","Sahiwal","Jersey","Gir"];
  return (
    <div>
      <Alert type="info">All semen straws dispatched in liquid nitrogen containers with quality certification. Bulk orders (10+ straws) get free delivery.</Alert>
      <div style={{ ...css.row(8), flexWrap: "wrap", marginBottom: 14 }}>
        {breeds.map(b => <Chip key={b} label={b} active={filter===b} onClick={() => setFilter(b)} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {SEMEN.filter(s => filter === "All" || s.breed.includes(filter.split(" ")[0])).map(s => (
          <div key={s.id} style={{ ...css.card, marginBottom: 0 }}>
            <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: s.bg, fontWeight: 700, fontSize: 11, color: T.greenDark, marginBottom: 10 }}>{s.breed}</div>
            <div style={{ ...css.row(10), marginBottom: 10 }}>
              <span style={{ fontSize: 32 }}>{s.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Bull: {s.bull}</div>
                <div style={{ fontSize: 11, color: T.gray }}>{s.cert}</div>
              </div>
            </div>
            <div style={{ ...css.grid2, marginBottom: 12 }}>
              {[["Motility",s.motility],["Sperm/straw","30M+"],["Expected yield",s.yield],["Conception",s.conception]].map(([k,v])=>(
                <div key={k} style={css.statBox}><div style={{ fontWeight: 700, fontSize: 14, color: T.green }}>{v}</div><div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>{k}</div></div>
              ))}
            </div>
            <div style={{ ...css.row(0), justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.amber }}>₹{s.price}<span style={{ fontSize: 12, fontWeight: 400, color: T.gray }}>/straw</span></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.green }}>In stock · {s.stock} straws</span>
            </div>
            <Btn bg={T.green} full onClick={() => onAddCart({ ...s, name: `${s.breed} Semen — ${s.bull}`, emoji: s.emoji })}>Add to Cart</Btn>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FEED/FOOD TAB ───────────────────────────────────────────────────────────
const FodderTab = ({ onAddCart }) => (
  <div>
    <Alert type="info">Bulk orders above ₹5,000 get free delivery within 50 km. Call 1800-XXX-XXXX for farm-gate delivery.</Alert>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
      {FEED.map(f => (
        <div key={f.id} style={{ ...css.card, textAlign: "center", marginBottom: 0 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{f.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.name}</div>
          <div style={{ fontSize: 12, color: T.gray, marginBottom: 12, lineHeight: 1.5 }}>{f.desc}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.green, marginBottom: 4 }}>₹{f.price.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: T.gray, marginBottom: 12 }}>per {f.unit}</div>
          <Btn bg={T.greenLight} color={T.greenDark} full onClick={() => onAddCart({ ...f })}>+ Add to Cart</Btn>
        </div>
      ))}
    </div>
  </div>
);

// ─── MEDICINE TAB ─────────────────────────────────────────────────────────────
const MedicineTab = ({ onAddCart }) => (
  <div>
    <Alert type="warn">Administer under veterinary supervision. Items marked ★ require a valid prescription.</Alert>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
      {MEDICINE.map(m => (
        <div key={m.id} style={{ ...css.card, textAlign: "center", marginBottom: 0 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{m.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.name} {m.rx && <span style={{ color: T.red }}>★</span>}</div>
          <div style={{ fontSize: 12, color: T.gray, marginBottom: 12, lineHeight: 1.5 }}>{m.desc}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.green, marginBottom: 4 }}>₹{m.price}</div>
          <div style={{ fontSize: 11, color: T.gray, marginBottom: 12 }}>per {m.unit}</div>
          <Btn bg={T.blueLight} color={T.blue} full onClick={() => onAddCart({ ...m })}>+ Add to Cart</Btn>
        </div>
      ))}
    </div>
  </div>
);

// ─── VET TAB ──────────────────────────────────────────────────────────────────
const VetTab = ({ onBook }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All","Cow Specialist","Buffalo Specialist","AI Expert","Emergency","Govt. Approved"];
  return (
    <div>
      <div style={{ ...css.card, background: T.green, marginBottom: 14 }}>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginBottom: 6 }}>Find expert livestock vets near you, available today</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...css.input, flex: 1 }} placeholder="Search by name, area, specialty..." />
          <Btn bg="#fff" color={T.green}>Search</Btn>
        </div>
      </div>
      <div style={{ ...css.row(8), flexWrap: "wrap", marginBottom: 14 }}>
        {filters.map(f => <Chip key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />)}
      </div>
      {VETS.map(v => (
        <div key={v.id} style={css.card}>
          <div style={{ ...css.row(12), marginBottom: 10 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: v.av_bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: v.av_col, flexShrink: 0 }}>{v.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15 }}>{v.name}</div>
              <div style={{ fontSize: 12, color: T.gray }}>{v.spec} · {v.exp} · {v.loc}</div>
              <div style={{ fontSize: 12, color: T.amber, marginTop: 2 }}>{"★".repeat(Math.floor(v.rating))} <span style={{ color: T.gray }}>({v.reviews} reviews)</span></div>
            </div>
            <Badge label={v.avail} color={v.avail === "Today" ? T.greenDark : T.blue} bg={v.avail === "Today" ? T.greenLight : T.blueLight} />
          </div>
          <div style={{ ...css.row(6), flexWrap: "wrap", marginBottom: 10 }}>
            {v.tags.map(t => <span key={t} style={css.tag}>{t}</span>)}
          </div>
          <div style={css.divider} />
          <div style={css.row(10)}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: T.green }}>₹{v.fee}<span style={{ fontSize: 12, fontWeight: 400, color: T.gray }}>/visit</span></span>
            <div style={{ flex: 1 }} />
            <Btn bg={T.green} onClick={() => onBook(v)}>Book visit →</Btn>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
const BookingModal = ({ vet, onClose }) => {
  const [step, setStep] = useState(1);
  const [slot, setSlot] = useState("10:00 AM");
  const [animal, setAnimal] = useState("Cow (Desi / HF / Jersey)");
  const slots = ["7:00 AM","8:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM"];
  const busy = ["7:00 AM","12:00 PM"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: T.surface, borderRadius: 14, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ ...css.row(10), padding: "16px 20px", borderBottom: `1px solid ${T.border}` }}>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16 }}>Book Appointment</div>
            <div style={{ fontSize: 12, color: T.gray }}>{vet.name} · {vet.loc}</div>
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: T.gray }}>×</button>
        </div>

        {step === 1 && <div style={{ padding: 20 }}>
          <div style={{ ...css.row(10), background: T.greenLight, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{vet.initials}</div>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>{vet.name}</div><div style={{ fontSize: 12, color: T.greenDark }}>{vet.spec} · ₹{vet.fee}/visit</div></div>
          </div>
          <FG label="Animal type" required>
            <Select options={["Cow (Desi / HF / Jersey)","Buffalo (Murrah / Surti)","Calf","Bull"]} value={animal} onChange={e => setAnimal(e.target.value)} />
          </FG>
          <div style={css.grid2}>
            <FG label="No. of animals"><Input type="number" placeholder="e.g. 4" /></FG>
            <FG label="Farmer name" required><Input placeholder="Full name" /></FG>
          </div>
          <FG label="Mobile number" required><Input type="tel" placeholder="+91 XXXXX XXXXX" /></FG>
          <FG label="Reason for visit">
            <Select options={["General health checkup","Artificial Insemination (AI)","Pregnancy diagnosis","Vaccination","Illness / Injury","Deworming","Post-calving care","Mastitis treatment","Emergency"]} />
          </FG>
          <FG label="Farm / village address"><Input placeholder="Village, Block, District" /></FG>
          <FG label="Preferred date" required><Input type="date" /></FG>
          <FG label="Time slot" required>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {slots.map(s => (
                <div key={s} onClick={() => !busy.includes(s) && setSlot(s)} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: busy.includes(s) ? "not-allowed" : "pointer",
                  border: `1.5px solid ${slot===s ? T.green : T.border}`,
                  background: slot===s ? T.green : busy.includes(s) ? T.bg : T.surface,
                  color: slot===s ? "#fff" : busy.includes(s) ? T.gray : T.text,
                  opacity: busy.includes(s) ? 0.5 : 1,
                }}>{s}</div>
              ))}
            </div>
          </FG>
          <div style={{ ...css.row(0), justifyContent: "space-between", background: T.greenLight, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.greenDark }}>Total (incl. travel)</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: T.green }}>₹{vet.fee + 100}</span>
          </div>
          <Btn bg={T.green} full onClick={() => setStep(2)}>Confirm Appointment →</Btn>
        </div>}

        {step === 2 && <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: T.green, marginBottom: 6 }}>Booking Confirmed!</div>
          <div style={{ fontSize: 13, color: T.gray, marginBottom: 16, lineHeight: 1.6 }}>{vet.name} will visit your farm on the selected date. SMS confirmation sent to your number.</div>
          <div style={{ display: "inline-block", padding: "8px 22px", background: T.blueLight, borderRadius: 9, fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: T.blue, marginBottom: 20 }}>GAU-{Math.floor(Math.random()*9000+1000)}</div>
          <div style={{ background: T.bg, borderRadius: 10, padding: 14, marginBottom: 20, textAlign: "left" }}>
            {[["Vet",vet.name],["Time",slot],["Animal",animal],["Fee paid",`₹${vet.fee + 100}`]].map(([k,v])=>(
              <div key={k} style={{ ...css.row(0), justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13, color: T.gray }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: k==="Fee paid"?T.green:T.text }}>{v}</span>
              </div>
            ))}
          </div>
          <Btn bg={T.green} onClick={onClose}>Done →</Btn>
        </div>}
      </div>
    </div>
  );
};

// ─── ENQUIRE MODAL ────────────────────────────────────────────────────────────
const EnquireModal = ({ listing, onClose }) => {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: T.surface, borderRadius: 14, width: "100%", maxWidth: 420, padding: 24 }}>
        <div style={{ ...css.row(0), justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16 }}>Enquire About Animal</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: T.gray }}>×</button>
        </div>
        {!sent ? <>
          <div style={{ ...css.row(10), background: listing.bg, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>{listing.emoji}</span>
            <div><div style={{ fontWeight: 700 }}>{listing.breed} {listing.type}</div><div style={{ fontSize: 12, color: T.gray }}>{listing.loc}</div></div>
            <div style={{ marginLeft: "auto", fontFamily: "'Sora', sans-serif", fontWeight: 700, color: T.green, fontSize: 17 }}>₹{listing.price.toLocaleString()}</div>
          </div>
          <FG label="Your name" required><Input placeholder="Full name" /></FG>
          <FG label="Mobile number" required><Input type="tel" placeholder="+91 XXXXX XXXXX" /></FG>
          <FG label="Your message">
            <textarea style={{ ...css.input, minHeight: 80, resize: "vertical" }} placeholder={`I am interested in this ${listing.type}. Please share more details...`} />
          </FG>
          <Btn bg={T.green} full onClick={() => setSent(true)}>Send Enquiry →</Btn>
        </> : <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📩</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17, color: T.green, marginBottom: 6 }}>Enquiry Sent!</div>
          <div style={{ fontSize: 13, color: T.gray, marginBottom: 16 }}>The seller will contact you within 24 hours on your mobile number.</div>
          <Btn bg={T.green} onClick={onClose}>Close →</Btn>
        </div>}
      </div>
    </div>
  );
};

// ─── VET ONBOARDING ───────────────────────────────────────────────────────────
const STEPS_INFO = [
  { n: 1, label: "Personal info" },
  { n: 2, label: "Qualifications & Docs" },
  { n: 3, label: "Speciality" },
  { n: 4, label: "Availability & Fees" },
  { n: 5, label: "Preview & Submit" },
];

const SERVICES_LIST = ["General checkup","AI insemination","Pregnancy diagnosis","Vaccination","Deworming","Post-calving care","Mastitis treatment","Surgery","Milk fever treatment","Bloat & indigestion","Wound dressing","Emergency visits","Pre-purchase inspection","Govt. scheme AI"];
const ANIMALS_LIST  = ["🐄 Cow (Desi)","🐄 HF / Holstein","🐄 Jersey","🐃 Murrah Buffalo","🐃 Surti Buffalo","🐄 Gir (A2)","🐂 Bull management","🐄 Calf care"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const OnboardTab = () => {
  const [step, setStep] = useState(1);
  const [uploads, setUploads] = useState({});
  const [services, setServices] = useState(["General checkup","AI insemination","Pregnancy diagnosis","Post-calving care"]);
  const [animals, setAnims]   = useState(["🐄 Cow (Desi)","🐄 HF / Holstein","🐃 Murrah Buffalo"]);
  const [days, setDays]       = useState(["Mon","Tue","Wed","Thu","Fri","Sat"]);
  const [done, setDone]       = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const fakeUpload = (key, name) =>
    setTimeout(() => setUploads(u => ({ ...u, [key]: name })), 600);

  const Stepper = () => (
    <div style={{ display: "flex", marginBottom: 24 }}>
      {STEPS_INFO.map((s, i) => (
        <div key={s.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          {i < STEPS_INFO.length - 1 && (
            <div style={{ position: "absolute", top: 15, left: "50%", width: "100%", height: 2, background: step > s.n ? T.greenLight : T.border, zIndex: 0 }} />
          )}
          <div style={{
            width: 32, height: 32, borderRadius: "50%", zIndex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700,
            background: step > s.n ? "#F0FDF4" : step === s.n ? T.blueLight : T.surface,
            border: `2px solid ${step > s.n ? "#86EFAC" : step === s.n ? "#93C5FD" : T.border}`,
            color: step > s.n ? "#15803D" : step === s.n ? T.blue : T.gray,
          }}>{step > s.n ? "✓" : s.n}</div>
          <div style={{ fontSize: 10, color: step === s.n ? T.blue : step > s.n ? "#15803D" : T.gray, marginTop: 5, fontWeight: step === s.n ? 700 : 500, textAlign: "center" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );

  if (done) return (
    <div style={{ ...css.card, textAlign: "center", padding: "40px 20px" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F0FDF4", border: "2px solid #86EFAC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✅</div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: T.green }}>Application Submitted!</div>
      <div style={{ fontSize: 13, color: T.gray, maxWidth: 360, margin: "0 auto 16px", lineHeight: 1.6 }}>
        Thank you! Our verification team will review your qualifications and documents within 24–48 hours.
      </div>
      <div style={{ display: "inline-block", padding: "8px 22px", background: T.blueLight, borderRadius: 9, fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: T.blue, marginBottom: 20 }}>VET-GAU-2026-3841</div>
      <div style={{ background: T.bg, borderRadius: 10, padding: 16, marginBottom: 20, textAlign: "left", maxWidth: 360, margin: "0 auto 20px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>What happens next</div>
        {["Our team reviews qualifications & documents (24–48 hrs)","You receive SMS & email once your profile is live","Farmers in your area can discover and book you","Payouts every Monday to your bank account"].map((s,i)=>(
          <div key={i} style={{ ...css.row(10), padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.blueLight, color: T.blue, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i+1}</div>
            <span style={{ fontSize: 13 }}>{s}</span>
          </div>
        ))}
      </div>
      <Btn bg={T.green} onClick={() => { setStep(1); setDone(false); }}>Register another vet →</Btn>
    </div>
  );

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <Stepper />

      {/* STEP 1 */}
      {step === 1 && <>
        <div style={css.card}>
          <div style={css.cardTitle}>👤 Personal Information</div>
          <div style={css.grid2}>
            <FG label="Full name" required><Input placeholder="Dr. Ramesh Yadav" /></FG>
            <FG label="Mobile number" required><Input type="tel" placeholder="+91 XXXXX XXXXX" /></FG>
          </div>
          <div style={css.grid2}>
            <FG label="Email address"><Input type="email" placeholder="doctor@email.com" /></FG>
            <FG label="Gender" required><Select options={["Male","Female","Prefer not to say"]} /></FG>
          </div>
          <FG label="Profile photo">
            <UploadBox label="JPG or PNG, max 2 MB" uploaded={uploads.photo} onUpload={() => fakeUpload("photo","profile_photo.jpg")} />
          </FG>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>📍 Location & Service Area</div>
          <div style={css.grid2}>
            <FG label="State" required><Select options={["Uttar Pradesh","Punjab","Haryana","Rajasthan","Madhya Pradesh","Maharashtra","Gujarat","Bihar","West Bengal","Other"]} /></FG>
            <FG label="District" required><Input placeholder="e.g. Mathura" /></FG>
          </div>
          <FG label="Clinic / farm visit address"><Input placeholder="Village, block, pin code" /></FG>
          <FG label="Service radius" hint="Set how far you're willing to travel for farm visits">
            <Select options={["Up to 10 km","Up to 20 km","Up to 30 km","Up to 50 km","Up to 100 km"]} />
          </FG>
        </div>
        <Btn bg={T.green} full onClick={() => setStep(2)}>Next — Qualifications →</Btn>
      </>}

      {/* STEP 2 */}
      {step === 2 && <>
        <div style={css.card}>
          <div style={css.cardTitle}>🎓 Qualifications</div>
          <div style={css.grid2}>
            <FG label="Highest degree" required><Select options={["BVSc & AH","MVSc","PhD (Veterinary)","Diploma in AH"]} /></FG>
            <FG label="Graduating institution" required><Input placeholder="e.g. IVRI Bareilly" /></FG>
          </div>
          <div style={css.grid2}>
            <FG label="Year of graduation" required><Input type="number" placeholder="2010" /></FG>
            <FG label="Years of experience" required><Input type="number" placeholder="15" /></FG>
          </div>
          <div style={css.grid2}>
            <FG label="Vet Council Reg. No." required><Input placeholder="UP/VET/2010/4521" /></FG>
            <FG label="State Vet Council" required>
              <Select options={["UP State Veterinary Council","Punjab Veterinary Council","Haryana Veterinary Council","Maharashtra Veterinary Council","Gujarat Veterinary Council","VCI (Central)","Other"]} />
            </FG>
          </div>
          <FG label="Additional certifications"><Input placeholder="e.g. AI technician, BAIF trained..." /></FG>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>📄 Document Uploads</div>
          <FG label="Degree certificate" required>
            <UploadBox label="PDF or image, max 5 MB" uploaded={uploads.degree} onUpload={() => fakeUpload("degree","degree_certificate.pdf")} />
          </FG>
          <FG label="Vet Council registration" required>
            <UploadBox label="PDF or image, max 5 MB" uploaded={uploads.regcert} onUpload={() => fakeUpload("regcert","vet_registration.pdf")} />
          </FG>
          <FG label="Govt. ID (Aadhaar / PAN)" required>
            <UploadBox label="PDF or image, max 5 MB" uploaded={uploads.govid} onUpload={() => fakeUpload("govid","aadhaar_card.pdf")} />
          </FG>
        </div>
        <div style={css.row(10)}>
          <Btn bg={T.surface} color={T.gray} outline full onClick={() => setStep(1)}>← Back</Btn>
          <Btn bg={T.green} full onClick={() => setStep(3)}>Next — Speciality →</Btn>
        </div>
      </>}

      {/* STEP 3 */}
      {step === 3 && <>
        <div style={css.card}>
          <div style={css.cardTitle}>🐄 Animal Speciality</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ANIMALS_LIST.map(a => (
              <Chip key={a} label={a} active={animals.includes(a)} onClick={() => toggle(animals, setAnims, a)} />
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>🩺 Services Offered</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SERVICES_LIST.map(s => (
              <Chip key={s} label={s} active={services.includes(s)} onClick={() => toggle(services, setServices, s)} />
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>✏️ About You</div>
          <FG label="Short bio (shown on your profile)">
            <textarea style={{ ...css.input, minHeight: 90, resize: "vertical" }} placeholder="Describe your experience and approach to animal care..." />
          </FG>
          <FG label="Languages spoken">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Hindi","English","Punjabi","Marathi","Gujarati","Bengali"].map(l => (
                <Chip key={l} label={l} active={["Hindi"].includes(l)} onClick={() => {}} />
              ))}
            </div>
          </FG>
        </div>
        <div style={css.row(10)}>
          <Btn bg={T.surface} color={T.gray} outline full onClick={() => setStep(2)}>← Back</Btn>
          <Btn bg={T.green} full onClick={() => setStep(4)}>Next — Availability →</Btn>
        </div>
      </>}

      {/* STEP 4 */}
      {step === 4 && <>
        <div style={css.card}>
          <div style={css.cardTitle}>📅 Working Days</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {DAYS.map(d => (
              <div key={d} onClick={() => toggle(days, setDays, d)} style={{
                padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                border: `1.5px solid ${days.includes(d) ? T.green : T.border}`,
                background: days.includes(d) ? T.greenLight : T.surface,
                color: days.includes(d) ? T.greenDark : T.gray,
              }}>{d}</div>
            ))}
          </div>
          <div style={css.grid2}>
            <FG label="Start time"><Input type="time" value="08:00" /></FG>
            <FG label="End time"><Input type="time" value="18:00" /></FG>
          </div>
          <FG label="Emergency availability">
            <Select options={["Available for emergencies (any time)","Available evenings only","Not available for emergencies"]} />
          </FG>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>💰 Consultation Fees</div>
          {[["General farm visit / checkup","₹/visit","500"],["AI insemination","₹/session","300"],["Pregnancy diagnosis","₹/animal","250"],["Emergency call","₹/visit","800"],["Travel charge","₹/km","10"]].map(([label,unit,ph])=>(
            <div key={label} style={{ ...css.row(10), padding: "8px 12px", background: T.bg, borderRadius: 9, marginBottom: 6 }}>
              <span style={{ fontSize: 13, flex: 1 }}>{label}</span>
              <Input type="number" placeholder={ph} style={{ width: 90, textAlign: "right" }} />
              <span style={{ fontSize: 12, color: T.gray, minWidth: 60 }}>{unit}</span>
            </div>
          ))}
          <div style={{ fontSize: 11, color: T.gray, marginTop: 6 }}>GauSeva charges a 5% platform fee on completed bookings. You receive 95% of each payment.</div>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>🏦 Bank Account (Payouts)</div>
          <div style={css.grid2}>
            <FG label="Account holder name" required><Input placeholder="Name as on bank account" /></FG>
            <FG label="Bank name" required><Input placeholder="e.g. SBI" /></FG>
          </div>
          <div style={css.grid2}>
            <FG label="Account number" required><Input placeholder="XXXX XXXX XXXX" /></FG>
            <FG label="IFSC code" required><Input placeholder="e.g. SBIN0001234" /></FG>
          </div>
          <FG label="UPI ID (optional)"><Input placeholder="doctor@upi" /></FG>
        </div>
        <div style={css.row(10)}>
          <Btn bg={T.surface} color={T.gray} outline full onClick={() => setStep(3)}>← Back</Btn>
          <Btn bg={T.green} full onClick={() => setStep(5)}>Preview profile →</Btn>
        </div>
      </>}

      {/* STEP 5 - Preview */}
      {step === 5 && <>
        <Alert type="warn">Review your profile before submitting. This is how farmers will see you on GauSeva.</Alert>
        <div style={{ ...css.card, padding: 0, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ background: T.blueLight, padding: "18px 20px", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, color: "#1D4ED8", flexShrink: 0 }}>RY</div>
            <div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18 }}>Dr. Ramesh Yadav</div>
              <div style={{ fontSize: 13, color: T.gray, marginBottom: 6 }}>Bovine Specialist · Mathura, Uttar Pradesh</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Badge label="BVSc & AH" color={T.blue} bg={T.blueLight} />
                <Badge label="15 yrs experience" color={T.greenDark} bg={T.greenLight} />
                <Badge label="Govt. Registered" color={T.amber} bg={T.amberLight} />
              </div>
            </div>
          </div>
          <div style={{ padding: "14px 20px" }}>
            {[
              ["🩺","Speciality", animals.slice(0,3).map(a=>a.split(" ").slice(1).join(" ")).join(" · ")],
              ["📋","Services", services.slice(0,4).join(" · ")],
              ["🕐","Availability", `${days.join(", ")} · 8:00 AM – 6:00 PM · Emergency available`],
              ["📍","Service area", "Mathura district · Up to 25 km radius"],
              ["₹","Starting fee", "₹500 / visit"],
              ["📄","Documents", "Degree · Vet Council Reg. · Govt. ID — uploaded"],
            ].map(([icon, k, v]) => (
              <div key={k}>
                <div style={{ ...css.row(10), padding: "8px 0" }}>
                  <span style={{ fontSize: 16, flexShrink: 0, width: 20 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: T.gray, minWidth: 100 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: k==="Starting fee" ? T.green : T.text }}>{v}</span>
                </div>
                <div style={css.divider} />
              </div>
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.cardTitle}>📋 Terms & Agreement</div>
          {["I confirm all information and documents submitted are accurate and genuine.","I agree to GauSeva's terms of service, code of conduct for veterinarians, and 5% platform fee.","I hold a valid registration with the State / Central Veterinary Council and consent to verification."].map((t, i) => (
            <label key={i} style={{ ...css.row(10), marginBottom: 10, cursor: "pointer", fontSize: 13, alignItems: "flex-start" }}>
              <input type="checkbox" style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{t}</span>
            </label>
          ))}
        </div>
        <div style={css.row(10)}>
          <Btn bg={T.surface} color={T.gray} outline full onClick={() => setStep(4)}>← Back</Btn>
          <Btn bg="#15803D" color="#fff" full onClick={() => setDone(true)}>✓ Submit Application</Btn>
        </div>
      </>}
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("feed");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingVet, setBookingVet] = useState(null);
  const [enquireListing, setEnquireListing] = useState(null);

  const addToCart = (item) => {
    setCart(c => {
      const idx = c.findIndex(x => x.id === item.id && x.name === item.name);
      if (idx >= 0) { const n = [...c]; n[idx] = { ...n[idx], qty: n[idx].qty + 1 }; return n; }
      return [...c, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (i) => setCart(c => c.filter((_, idx) => idx !== i));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={css.app}>
      {/* Topbar */}
      <div style={css.topbar}>
        <div style={css.logo} onClick={() => setTab("feed")}>
          <div style={css.logoIcon}>🐄</div>
          GauSeva
        </div>
        <div style={css.nav}>
          {TABS.map(t => (
            <button key={t.id} style={css.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCartOpen(true)}
          style={{ ...css.btn(T.amberLight, T.amber), position: "relative", flexShrink: 0 }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: T.red, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Main */}
      <div style={css.main}>
        <SectionHead title={TABS.find(t => t.id === tab)?.title} />
        {tab === "feed"     && <FeedTab onBook={setBookingVet} onEnquire={setEnquireListing} />}
        {tab === "market"   && <MarketTab onEnquire={setEnquireListing} onSell={() => {}} onAddCart={addToCart} />}
        {tab === "semen"    && <SemenTab onAddCart={addToCart} />}
        {tab === "fodder"   && <FodderTab onAddCart={addToCart} />}
        {tab === "medicine" && <MedicineTab onAddCart={addToCart} />}
        {tab === "vet"      && <VetTab onBook={setBookingVet} />}
        {tab === "onboard"  && <OnboardTab />}
      </div>

      {/* Cart drawer */}
      {cartOpen && <CartDrawer cart={cart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />}

      {/* Booking modal */}
      {bookingVet && <BookingModal vet={bookingVet} onClose={() => setBookingVet(null)} />}

      {/* Enquire modal */}
      {enquireListing && <EnquireModal listing={enquireListing} onClose={() => setEnquireListing(null)} />}
    </div>
  );
}
