const db = require('../config/db');

exports.getSales = async (req, res) => {
  const [sales] = await db.query('SELECT * FROM sales');
  res.json(sales);
};

exports.filterSales = async (req, res) => {
  const { startDate, endDate, productId, category } = req.query;
  let query = `
    SELECT s.*, p.name, p.category
    FROM sales s
    JOIN products p ON s.productId = p.id
    WHERE 1=1
  `;
  const params = [];

  if (startDate) {
    query += " AND s.saleDate >= ?";
    params.push(startDate);
  }

  if (endDate) {
    query += " AND s.saleDate <= ?";
    params.push(endDate);
  }

  if (productId) {
    query += " AND s.productId = ?";
    params.push(productId);
  }

  if (category) {
    query += " AND p.category = ?";
    params.push(category);
  }

  const [results] = await db.query(query, params);
  res.json(results);
};

exports.revenueByPeriod = async (req, res) => {
  const { period } = req.query;
  let groupBy;

  switch (period) {
    case 'daily':
      groupBy = 'DATE(saleDate)';
      break;
    case 'weekly':
      groupBy = 'YEARWEEK(saleDate)';
      break;
    case 'monthly':
      groupBy = 'DATE_FORMAT(saleDate, "%Y-%m")';
      break;
    case 'annual':
      groupBy = 'YEAR(saleDate)';
      break;
    default:
      return res.status(400).json({ error: 'Invalid period' });
  }

  const [results] = await db.query(
    `SELECT ${groupBy} as period, SUM(s.quantity * p.price) AS revenue
     FROM sales s
     JOIN products p ON s.productId = p.id
     GROUP BY period
     ORDER BY period`
  );

  try {
    const [rows] = await db.query(`
      SELECT ${groupBy} as period,
             SUM(s.quantity * p.price) AS revenue
      FROM sales s
      JOIN products p ON s.productId = p.id
      GROUP BY period
      ORDER BY period ASC
    `);

    // Convert revenue from string to number
    const result = rows.map(row => ({
      period: row.period,
      revenue: parseFloat(row.revenue)
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error calculating revenue' });
  }
};

exports.compareRevenue = async (req, res) => {
  const { category1, category2 } = req.query;

  const query = `
    SELECT p.category, SUM(p.price * s.quantity) AS revenue
    FROM sales s
    JOIN products p ON s.productId = p.id
    WHERE p.category IN (?, ?)
    GROUP BY p.category
  `;

  const [results] = await db.query(query, [category1, category2]);
  res.json(results);
};
