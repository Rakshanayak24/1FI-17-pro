import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dbPath = path.join(__dirname, 'marketplace.db');
const databaseExists = fs.existsSync(dbPath);
const db = new DatabaseSync(dbPath);
if (!databaseExists) {
  db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
  db.exec(fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8'));
}

const mapProduct = (product) => ({
  ...product,
  variants: db.prepare('SELECT * FROM variants WHERE product_id = ? ORDER BY id').all(product.id),
  emiPlans: db.prepare('SELECT * FROM emi_plans WHERE product_id = ? ORDER BY tenure_months').all(product.id).map(plan => ({ ...plan, isRecommended: Boolean(plan.is_recommended) }))
});

const app = express();
app.use(express.json());
app.get('/api/health', (_, res) => res.json({ status: 'ok', database: 'sqlite' }));
app.get('/api/products', (_, res) => res.json(db.prepare('SELECT id, slug, name, category, tagline, badge, rating, review_count, image_url, accent FROM products ORDER BY id').all()));
app.get('/api/products/:slug', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.json(mapProduct(product));
});

const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('/{*splat}', (_, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(process.env.PORT || 3001, () => console.log('1Fi Marketplace API listening on http://localhost:3001'));
