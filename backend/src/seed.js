const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function runSeed() {
  console.log("Starting Database Seeding...");
  const client = await pool.connect();

  try {
    // 1. Run schema.sql
    console.log("Reading schema.sql...");
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log("Executing schema SQL queries...");
    await client.query(schemaSql);
    console.log("Tables created successfully.");

    // 2. Seed Vets
    console.log("Seeding vets...");
    const vets = [
      { name: "Dr. Ramesh Yadav", initials: "RY", spec: "Bovine Specialist", exp: "15 yrs", loc: "Mathura, UP", rating: 4.9, reviews: 218, fee: 500, avail: "Today", tags: ["Cow","Buffalo","AI Insemination","Emergency"], av_bg: "#EAF3DE", av_col: "#173A0D", bio: "Accepting farm visits in Mathura. Specialising in AI insemination, pregnancy diagnosis and general bovine health. Govt. registered." },
      { name: "Dr. Sunita Devi", initials: "SD", spec: "Buffalo & Dairy Expert", exp: "10 yrs", loc: "Agra, UP", rating: 4.6, reviews: 134, fee: 450, avail: "Tomorrow", tags: ["Buffalo","Post-calving","Mastitis"], av_bg: "#E0F5EE", av_col: "#0D7A60", bio: "Expert in post-calving care, mastitis management, and high-yield buffalo operations." },
      { name: "Dr. Ajay Pratap", initials: "AP", spec: "AI Insemination Expert", exp: "12 yrs", loc: "Lucknow, UP", rating: 4.9, reviews: 309, fee: 600, avail: "Today", tags: ["Cow","AI Insemination","Govt. Approved"], av_bg: "#EFF6FF", av_col: "#1D4ED8", bio: "Specialized in Artificial Insemination (AI) using top genetic straws. Govt. approved practitioner." },
      { name: "Dr. Meena Kumari", initials: "MK", spec: "Livestock Surgeon", exp: "8 yrs", loc: "Varanasi, UP", rating: 4.5, reviews: 87, fee: 700, avail: "Today", tags: ["Cow","Buffalo","Surgery","Gynaecology"], av_bg: "#FDF3DC", av_col: "#BA7517", bio: "Surgical and gynecological procedures on large animals. Extensive local experience." }
    ];

    for (const v of vets) {
      await client.query(
        `INSERT INTO vets (name, initials, spec, exp, loc, rating, reviews, fee, avail, tags, av_bg, av_col, bio) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [v.name, v.initials, v.spec, v.exp, v.loc, v.rating, v.reviews, v.fee, v.avail, v.tags, v.av_bg, v.av_col, v.bio]
      );
    }

    // 3. Seed Semen
    console.log("Seeding semen catalogue...");
    const semen = [
      { emoji: "🐄", breed: "HF / Holstein", bull: "NDDB 1147 — Ranjit", cert: "NDDB Certified · Hissar", motility: "85%", yield: "18–20 L", conception: "95%", price: 120, stock: 240, bg: "#EAF3DE" },
      { emoji: "🐃", breed: "Murrah Buffalo", bull: "CIRB 204 — Sher Singh", cert: "CIRB Certified · Hisar", motility: "80%", yield: "12–14 L", conception: "90%", price: 100, stock: 180, bg: "#E0F5EE" },
      { emoji: "🐄", breed: "Sahiwal (Desi)", bull: "GBPUAT 09 — Shankar", cert: "A2 Certified · Pantnagar", motility: "78%", yield: "8–10 L", conception: "88%", price: 90, stock: 320, bg: "#EAF3DE" },
      { emoji: "🐄", breed: "Jersey", bull: "KAU 55 — Arjun", cert: "KAU Certified · Kerala", motility: "82%", yield: "15–17 L", conception: "92%", price: 110, stock: 150, bg: "#FDF3DC" }
    ];

    for (const s of semen) {
      await client.query(
        `INSERT INTO semen_catalogue (emoji, breed, bull, cert, motility, yield, conception, price, stock, bg) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [s.emoji, s.breed, s.bull, s.cert, s.motility, s.yield, s.conception, s.price, s.stock, s.bg]
      );
    }

    // 4. Seed Feed Products
    console.log("Seeding feed products...");
    const feed = [
      { emoji: "🌾", name: "Dairy Cattle Concentrate", description: "High-protein pellet feed for lactating cows & buffaloes. Boosts milk yield.", price: 1200, unit: "50 kg bag" },
      { emoji: "🧂", name: "Mineral & Vitamin Mix", description: "Prevents deficiency, improves fertility & coat health.", price: 350, unit: "5 kg pack" },
      { emoji: "🌿", name: "Maize Silage", description: "Fermented maize — ideal for dry & wet season. High energy roughage.", price: 4500, unit: "200 kg bale" },
      { emoji: "🫘", name: "Cotton Seed Cake", description: "Protein-rich supplement. Improves milk fat percentage.", price: 900, unit: "40 kg bag" },
      { emoji: "🌱", name: "Calcium Supplement", description: "Prevents milk fever & hypocalcemia. Essential post-calving.", price: 480, unit: "10 kg pack" },
      { emoji: "🍬", name: "Jaggery (Gur) Block", description: "Natural energy booster. Improves feed palatability & gut health.", price: 280, unit: "10 kg block" }
    ];

    for (const f of feed) {
      await client.query(
        `INSERT INTO feed_products (emoji, name, description, price, unit) VALUES ($1, $2, $3, $4, $5)`,
        [f.emoji, f.name, f.description, f.price, f.unit]
      );
    }

    // 5. Seed Medicines
    console.log("Seeding medicines...");
    const medicines = [
      { emoji: "💉", name: "FMD Vaccine", description: "Foot & Mouth Disease vaccine. Govt. approved. 6-month protection.", price: 45, unit: "per dose", rx: false },
      { emoji: "💊", name: "Albendazole Bolus", description: "Broad-spectrum dewormer. Effective against roundworms & tapeworms.", price: 25, unit: "per bolus", rx: false },
      { emoji: "🧴", name: "Oxytetracycline Inj.", description: "Broad-spectrum antibiotic injection. ★ Prescription required.", price: 180, unit: "100 ml vial", rx: true },
      { emoji: "🩺", name: "HS Vaccine", description: "Haemorrhagic Septicaemia. Mandatory in endemic zones.", price: 35, unit: "per dose", rx: false },
      { emoji: "🌡️", name: "Meloxicam Pain Relief", description: "Anti-inflammatory for post-calving pain, mastitis, joint issues.", price: 220, unit: "50 ml bottle", rx: true },
      { emoji: "🫙", name: "Rumen Tonic", description: "Restores rumen activity, treats bloat & indigestion.", price: 130, unit: "500 ml bottle", rx: false }
    ];

    for (const m of medicines) {
      await client.query(
        `INSERT INTO medicines (emoji, name, description, price, unit, rx) VALUES ($1, $2, $3, $4, $5, $6)`,
        [m.emoji, m.name, m.description, m.price, m.unit, m.rx]
      );
    }

    // 6. Seed Listings
    console.log("Seeding listings...");
    const listings = [
      { emoji: "🐄", type: "Cow", breed: "HF Crossbred", price: 65000, yield: "18 L/day", age: "4 yrs", lac: "3rd", status: "Healthy", loc: "Mathura, UP", verified: true, bg: "#EAF3DE", contact_name: "Ram Kumar", contact_mobile: "9876543210", description: "Excellent high-yield HF Crossbred cow. Very docile, easy to milk, and perfectly healthy." },
      { emoji: "🐃", type: "Buffalo", breed: "Murrah", price: 80000, yield: "14 L/day", age: "5 yrs", lac: "2nd", status: "Pregnant", loc: "Karnal, Haryana", verified: true, bg: "#E0F5EE", contact_name: "Sukhbir Singh", contact_mobile: "8765432109", description: "Pure breed Murrah buffalo. Pregnant with 3rd calf, high milk yield background." },
      { emoji: "🐄", type: "Cow", breed: "Sahiwal (Desi)", price: 55000, yield: "10 L/day", age: "6 yrs", lac: "4th", status: "A2 Milk", loc: "Lucknow, UP", verified: true, bg: "#EAF3DE", contact_name: "Prem Shanker", contact_mobile: "7654321098", description: "Desi Sahiwal cow giving premium quality A2 milk. High fat percentage." },
      { emoji: "🐃", type: "Buffalo", breed: "Surti", price: 72000, yield: "12 L/day", age: "4 yrs", lac: "2nd", status: "Healthy", loc: "Anand, Gujarat", verified: false, bg: "#FDF3DC", contact_name: "Dinesh Patel", contact_mobile: "6543210987", description: "Surti buffalo in very good health. Second lactation, regular breeder." },
      { emoji: "🐄", type: "Cow", breed: "Jersey High Yield", price: 90000, yield: "22 L/day", age: "3 yrs", lac: "1st", status: "Excellent", loc: "Pune, Maharashtra", verified: true, bg: "#EAF3DE", contact_name: "Amit Patil", contact_mobile: "9123456789", description: "High yielding Jersey heifer. Beautiful health and high fat milk yield." },
      { emoji: "🐄", type: "Cow", breed: "Gir (A2 Milk)", price: 48000, yield: "8 L/day", age: "5 yrs", lac: "3rd", status: "A2 Milk", loc: "Rajkot, Gujarat", verified: true, bg: "#EDE9FE", contact_name: "Mansukh Bhai", contact_mobile: "9012345678", description: "Traditional Gir cow, gentle and fully vaccinated. Delivers classic A2 milk." }
    ];

    for (const l of listings) {
      await client.query(
        `INSERT INTO listings (emoji, type, breed, price, yield, age, lac, status, loc, verified, bg, contact_name, contact_mobile, description) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [l.emoji, l.type, l.breed, l.price, l.yield, l.age, l.lac, l.status, l.loc, l.verified, l.bg, l.contact_name, l.contact_mobile, l.description]
      );
    }

    console.log("Database Seed completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  } finally {
    client.release();
    pool.end();
  }
}

runSeed();
