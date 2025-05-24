const db = require('../config/db');

async function seedData() {



  // Disable foreign key checks
  await db.query('SET FOREIGN_KEY_CHECKS = 0');

  // Truncate all tables
  await db.query('TRUNCATE TABLE inventory_logs');
  await db.query('TRUNCATE TABLE sales');
  await db.query('TRUNCATE TABLE inventory');
  await db.query('TRUNCATE TABLE products');

  // Re-enable foreign key checks
  await db.query('SET FOREIGN_KEY_CHECKS = 1');


  await db.query("INSERT INTO products (name, category, price) VALUES ('Samsung TV', 'Electronics', 450.00)");
  await db.query("INSERT INTO products (name, category, price) VALUES ('Apple iPhone', 'Electronics', 999.99)");
  await db.query("INSERT INTO products (name, category, price) VALUES ('Nike Sneakers', 'Footwear', 120.00)");
  await db.query("INSERT INTO products (name, category, price) VALUES ('Bata Sleeper', 'Footwear', 90.50)");

  await db.query("INSERT INTO inventory (productId, quantity) VALUES (1, 100)");
  await db.query("INSERT INTO inventory (productId, quantity) VALUES (2, 50)");
  await db.query("INSERT INTO inventory (productId, quantity) VALUES (3, 75)");
  await db.query("INSERT INTO inventory (productId, quantity) VALUES (4, 750)");

  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (1, 5, '2025-01-01')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (2, 3, '2025-01-03')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (3, 10, '2025-02-04')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (4, 11, '2025-02-04')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (4, 12, '2025-03-04')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (4, 13, '2025-04-04')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (4, 22, '2025-05-04')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (4, 22, '2025-05-22')");
  await db.query("INSERT INTO sales (productId, quantity, saledate) VALUES (3, 22, '2025-05-22')");
  console.log('Demo data inserted');
}

seedData();
