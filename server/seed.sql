INSERT INTO products (id, slug, name, category, tagline, description, badge, rating, review_count, image_url, accent) VALUES
  (1, 'iphone-17-pro', 'iPhone 17 Pro', 'Smartphones', 'Built for every brilliant idea.', 'A powerful pro camera system, all-day performance and an exceptionally refined titanium finish.', 'Most loved', 4.8, 124, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=90', '#dbe6e4'),
  (2, 'galaxy-s24-ultra', 'Galaxy S24 Ultra', 'Smartphones', 'Galaxy AI is here.', 'An epic display, a legendary camera and effortless productivity in one powerful device.', 'AI favourite', 4.7, 89, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=90', '#dce9ff'),
  (3, 'macbook-air-m4', 'MacBook Air M4', 'Laptops', 'Lean. Mean. M4 machine.', 'Supercharged for work, play and everything in between — in a beautifully thin, silent design.', 'New launch', 4.9, 67, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90', '#f1e4d9');

INSERT INTO variants (id, product_id, label, color_name, swatch, price, mrp, image_url) VALUES
  (1, 1, '128 GB', 'Silver', '#e5e5e2', 119900, 134900, NULL),
  (2, 1, '256 GB', 'Desert Titanium', '#cbb79b', 129900, 144900, NULL),
  (3, 1, '512 GB', 'Black Titanium', '#242424', 149900, 164900, NULL),
  (4, 2, '256 GB', 'Titanium Gray', '#777d82', 109999, 129999, NULL),
  (5, 2, '512 GB', 'Titanium Violet', '#60526f', 119999, 139999, NULL),
  (6, 2, '1 TB', 'Titanium Black', '#202124', 139999, 159999, NULL),
  (7, 3, '16 GB / 256 GB', 'Midnight', '#20242a', 114900, 124900, NULL),
  (8, 3, '16 GB / 512 GB', 'Starlight', '#e9e7df', 134900, 144900, NULL),
  (9, 3, '24 GB / 512 GB', 'Sky Blue', '#bdd4e7', 154900, 164900, NULL);

INSERT INTO emi_plans (product_id, tenure_months, interest_rate, monthly_payment, total_payable, cashback, label, is_recommended) VALUES
  (1, 6, 0, 19983, 119900, 1500, 'No-cost EMI', 0), (1, 12, 0, 9992, 119900, 3000, 'Best value', 1), (1, 18, 10.5, 7201, 129618, 4500, 'Lower monthly', 0),
  (2, 6, 0, 18333, 109999, 1200, 'No-cost EMI', 0), (2, 12, 0, 9167, 109999, 2500, 'Best value', 1), (2, 18, 10.5, 6605, 118890, 4000, 'Lower monthly', 0),
  (3, 6, 0, 19150, 114900, 1500, 'No-cost EMI', 0), (3, 12, 0, 9575, 114900, 3000, 'Best value', 1), (3, 18, 10.5, 6900, 124200, 4500, 'Lower monthly', 0);
