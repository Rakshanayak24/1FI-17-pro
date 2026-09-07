# 1Fi Marketplace

A polished 1Fi Marketplace feature that extends the Shop experience. The Shop entry point includes Top Brands, Nearby Stores, and 1Fi Marketplace; Marketplace provides dynamic product details, variants, selectable EMI plans, and a checkout confirmation flow.

## Highlights

- Responsive React product experience with a premium 1Fi-inspired visual language
- Three seeded products, each with three purchasable variants
- EMI plan selection, recommended-plan treatment, cashback, interest, and live monthly-payment recalculation per variant
- Shop entry point at `/shop`, intentionally blank Top Brands and Nearby Stores screens, and Marketplace at `/shop/marketplace`
- Express API backed by SQLite (Node's built-in `node:sqlite`), with no catalog or plan data hardcoded in the frontend
- Production configuration for Render

## Stack

| Layer | Technology |
| --- | --- |
| Client | React 19, Vite, CSS modules-style scoped stylesheet |
| Server | Node.js 24, Express |
| Database | SQLite via `node:sqlite` |
| Deployment | Render web service |

## Run locally

**Prerequisite:** Node.js 22.5 or newer (Node 24 recommended because it includes `node:sqlite`).

```bash
npm install
npm run dev
```

Open `http://localhost:5173/shop`. Vite proxies API requests to the Express server at port 3001.

For a production-like run:

```bash
npm run build
npm start
```

Open `http://localhost:3001/shop`.

## API

### `GET /api/health`

```json
{ "status": "ok", "database": "sqlite" }
```

### `GET /api/products`

Returns the compact catalogue used in the product switcher.

```json
[
  {
    "id": 1,
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "category": "Smartphones"
  }
]
```

### `GET /api/products/:slug`

Returns a product with its variants and available EMI plans. Example: `/api/products/iphone-17-pro`.

```json
{
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "variants": [{ "label": "128 GB", "price": 119900 }],
  "emiPlans": [{ "tenure_months": 12, "interest_rate": 0, "cashback": 3000 }]
}
```

## Database schema

The schema is in [`server/schema.sql`](server/schema.sql), with reproducible sample data in [`server/seed.sql`](server/seed.sql).

`products` is the parent table. `variants` and `emi_plans` each reference `products.id`, enabling every product to have its own finishes/configurations and repayment options. On first server run, `server/index.js` creates `server/marketplace.db` and applies both files automatically. The generated database is intentionally gitignored; schema and seed data are versioned for reproducibility.


