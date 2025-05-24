const db = require('../config/db');


// Show current inventory + low stock flag
exports.getInventory = async (req, res) => {
  const [inventory] = await db.query(`
    SELECT i.productId, p.name, p.category, i.quantity,
      CASE WHEN i.quantity < 10 THEN 'LOW' ELSE 'OK' END AS stockStatus
    FROM inventory i
    JOIN products p ON i.productId = p.id
  `);
  res.json(inventory);
};


exports.updateInventory = async (req, res) => {
  const { productId } = req.params;
  let { quantity, reason } = req.body;

  // Validate input
  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ error: 'Invalid quantity value' });
  }

  if (!reason) {
    reason = 'Restock';
  }

  const [[current]] = await db.query('SELECT quantity FROM inventory WHERE productId = ?', [productId]);
  const oldQuantity = current?.quantity;

  await db.query('UPDATE inventory SET quantity = ?, updatedAt = NOW() WHERE productId = ?', [quantity, productId]);

  await db.query(
    'INSERT INTO inventory_logs (productId, oldQuantity, newQuantity,reason) VALUES (?, ?, ?,?)',
    [productId, oldQuantity, quantity, reason]
  );

  res.json({ message: 'Inventory updated and change logged' });
};


exports.getInventoryLogs = async (req, res) => {
  try {
    const { productId } = req.query;


    // Validate input
    if (!productId) {
      return res.status(400).json({ error: 'productIdRequired' });
    }

    const [rows] = await db.query(`
      SELECT 
        il.id,
        p.name AS productName,
        il.productId,
        il.reason,
        il.oldQuantity,
        il.newQuantity,
        il.changedAt
      FROM inventory_logs il
      JOIN products p ON il.productId = p.id
      WHERE il.productId = ?
      ORDER BY il.changedAt DESC `, [productId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve inventory change history' });
  }
};


