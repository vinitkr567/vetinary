const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. GET /api/vets - Fetch all veterinarians
app.get('/api/vets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM vets ORDER BY rating DESC, id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching vets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. POST /api/vets/onboard - Onboard a new veterinarian
app.post('/api/vets/onboard', async (req, res) => {
  const { name, initials, spec, exp, loc, fee, avail, tags, av_bg, av_col, phone, email, bio } = req.body;
  
  if (!name || !spec || !exp || !loc || !fee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO vets (name, initials, spec, exp, loc, rating, reviews, fee, avail, tags, av_bg, av_col, phone, email, bio)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING *`,
      [
        name,
        initials || 'VET',
        spec,
        exp,
        loc,
        5.0, // Default rating
        0,   // Default reviews
        parseInt(fee),
        avail || 'Today',
        tags || ['General'],
        av_bg || '#EFF6FF',
        av_col || '#1D4ED8',
        phone || '',
        email || '',
        bio || ''
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error onboarding vet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 3. GET /api/semen - Fetch semen catalogue
app.get('/api/semen', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM semen_catalogue ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching semen catalogue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. GET /api/feed - Fetch feed catalogue
app.get('/api/feed', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feed_products ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching feed products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 5. GET /api/medicine - Fetch medicines catalogue
app.get('/api/medicine', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM medicines ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 6. GET /api/listings - Fetch marketplace animal listings
app.get('/api/listings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM listings ORDER BY verified DESC, id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching animal listings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 7. POST /api/listings - Create a new animal listing
app.post('/api/listings', async (req, res) => {
  const { type, breed, price, yield: dailyYield, age, lac, status, loc, contact_name, contact_mobile, description } = req.body;

  if (!type || !breed || !price || !dailyYield || !age || !loc || !contact_name || !contact_mobile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const isCow = type.toLowerCase() === 'cow';
  const emoji = isCow ? '🐄' : '🐃';
  const bg = isCow ? '#EAF3DE' : '#E0F5EE';

  try {
    const result = await db.query(
      `INSERT INTO listings (emoji, type, breed, price, yield, age, lac, status, loc, verified, bg, contact_name, contact_mobile, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        emoji,
        type,
        breed,
        parseInt(price),
        dailyYield,
        age,
        lac || '1st',
        status || 'Healthy',
        loc,
        false, // Unverified by default
        bg,
        contact_name,
        contact_mobile,
        description || ''
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 8. POST /api/bookings - Book a vet visit
app.post('/api/bookings', async (req, res) => {
  const { vet_id, animal, count, farmer_name, mobile, reason, address, booking_date, slot, total_fee } = req.body;

  if (!vet_id || !animal || !farmer_name || !mobile || !reason || !booking_date || !slot || !total_fee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO bookings (vet_id, animal, count, farmer_name, mobile, reason, address, booking_date, slot, total_fee, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        parseInt(vet_id),
        animal,
        parseInt(count || 1),
        farmer_name,
        mobile,
        reason,
        address || '',
        booking_date,
        slot,
        parseInt(total_fee),
        'Confirmed'
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 9. POST /api/enquiries - Send an enquiry on an animal listing
app.post('/api/enquiries', async (req, res) => {
  const { listing_id, name, mobile, message } = req.body;

  if (!listing_id || !name || !mobile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      `INSERT INTO enquiries (listing_id, name, mobile, message, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        parseInt(listing_id),
        name,
        mobile,
        message || '',
        'Sent'
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Root check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'GauSeva Backend API is running perfectly!', status: 'OK' });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
