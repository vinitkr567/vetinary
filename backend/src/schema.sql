-- Drop tables if they exist
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS medicines;
DROP TABLE IF EXISTS feed_products;
DROP TABLE IF EXISTS semen_catalogue;
DROP TABLE IF EXISTS vets;

-- 1. Vets table
CREATE TABLE vets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initials VARCHAR(10) NOT NULL,
  spec VARCHAR(255) NOT NULL,
  exp VARCHAR(50) NOT NULL,
  loc VARCHAR(255) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  reviews INT DEFAULT 0,
  fee INT NOT NULL,
  avail VARCHAR(100) NOT NULL,
  tags TEXT[] NOT NULL,
  av_bg VARCHAR(50) NOT NULL,
  av_col VARCHAR(50) NOT NULL,
  phone VARCHAR(20) DEFAULT '',
  email VARCHAR(100) DEFAULT '',
  bio TEXT DEFAULT ''
);

-- 2. Semen Catalogue table
CREATE TABLE semen_catalogue (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  bull VARCHAR(100) NOT NULL,
  cert VARCHAR(255) NOT NULL,
  motility VARCHAR(20) NOT NULL,
  yield VARCHAR(50) NOT NULL,
  conception VARCHAR(20) NOT NULL,
  price INT NOT NULL,
  stock INT NOT NULL,
  bg VARCHAR(50) NOT NULL
);

-- 3. Feed Products table
CREATE TABLE feed_products (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  unit VARCHAR(100) NOT NULL
);

-- 4. Medicines table
CREATE TABLE medicines (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  unit VARCHAR(100) NOT NULL,
  rx BOOLEAN DEFAULT FALSE
);

-- 5. Listings table (animals for sale)
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  emoji VARCHAR(10) NOT NULL,
  type VARCHAR(100) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  yield VARCHAR(100) NOT NULL,
  age VARCHAR(50) NOT NULL,
  lac VARCHAR(50) NOT NULL,
  status VARCHAR(100) NOT NULL,
  loc VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  bg VARCHAR(50) NOT NULL,
  contact_name VARCHAR(255) DEFAULT '',
  contact_mobile VARCHAR(20) DEFAULT '',
  description TEXT DEFAULT ''
);

-- 6. Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  vet_id INT REFERENCES vets(id) ON DELETE SET NULL,
  animal VARCHAR(255) NOT NULL,
  count INT DEFAULT 1,
  farmer_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  address TEXT DEFAULT '',
  booking_date DATE NOT NULL,
  slot VARCHAR(50) NOT NULL,
  total_fee INT NOT NULL,
  status VARCHAR(50) DEFAULT 'Confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Enquiries table
CREATE TABLE enquiries (
  id SERIAL PRIMARY KEY,
  listing_id INT REFERENCES listings(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  message TEXT DEFAULT '',
  status VARCHAR(50) DEFAULT 'Sent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
