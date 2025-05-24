const db = require('../config/db');



exports.createProduct = async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, category, price) VALUES (?, ?, ?)',
      [name, category, price]
    );
    res.status(201).json({ id: result.insertId, name, category, price });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Product name already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.getProducts = async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  res.json(products);
};
