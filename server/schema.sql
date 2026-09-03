PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  badge TEXT,
  rating REAL NOT NULL,
  review_count INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  accent TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS variants (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  color_name TEXT NOT NULL,
  swatch TEXT NOT NULL,
  price INTEGER NOT NULL,
  mrp INTEGER NOT NULL,
  image_url TEXT,
  stock_status TEXT NOT NULL DEFAULT 'In stock'
);

CREATE TABLE IF NOT EXISTS emi_plans (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  interest_rate REAL NOT NULL,
  monthly_payment INTEGER NOT NULL,
  total_payable INTEGER NOT NULL,
  cashback INTEGER NOT NULL DEFAULT 0,
  label TEXT,
  is_recommended INTEGER NOT NULL DEFAULT 0
);
