// middleware/validateProduct.js
module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing name' });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing description' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Invalid or missing price' });
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing category' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Invalid or missing inStock (must be true or false)' });
  }

  next();
};
