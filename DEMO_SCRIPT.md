# 1Fi Marketplace demo script (2–3 minutes)

1. Open `/products/iphone-17-pro` and introduce the marketplace: product detail, MRP vs marketplace price, and the mutual-fund-backed EMI proposition.
2. Change storage/finish. Point out that the displayed price and monthly instalment update together.
3. Select each EMI card. Call out tenure, interest rate, cashback, and the recommended-plan state.
4. Use the product rail to navigate to Galaxy S24 Ultra and MacBook Air M4. Note the unique browser URL for each product.
5. Open `/api/products` and `/api/products/iphone-17-pro` to show live JSON served by Express.
6. Show `server/schema.sql` and `server/seed.sql`: products, variants, and EMI plans are database tables, not frontend constants.
7. Finish by clicking “Continue to checkout” and showing the selected-plan confirmation.
