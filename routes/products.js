const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper');
const validateProduct = require('../middleware/validateProduct');
const NotFoundError = require('../errors/NotFoundError');

let products = []; // In-memory product list

// GET /api/products?category=&page=&limit=
router.get('/products', asyncWrapper(async (req, res) => {
  let { category, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page,
    limit,
    data: paginated
  });
}));

// POST /api/products
router.post('/products', validateProduct, asyncWrapper(async (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product created', product: newProduct });
}));

// GET /api/products/search?q=
router.get('/products/search', asyncWrapper(async (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  res.json({
    total: results.length,
    query,
    results
  });
}));

// GET /api/products/stats
router.get('/products/stats', asyncWrapper(async (req, res) => {
  const stats = {};

  products.forEach(product => {
    const category = product.category.toLowerCase();
    stats[category] = (stats[category] || 0) + 1;
  });

  res.json({ countByCategory: stats });
}));

module.exports = router;
