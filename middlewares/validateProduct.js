module.exports = function validateProduct(req, res, next) {
    const { name, category, price } = req.body;
  
    if (!name || !category || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields: name, category, price' });
    }
  
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number' });
    }
  
    next();
  };
  