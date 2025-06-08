// middleware/auth.js
const API_KEY = 'mysecretkey'; // You can also store this in .env

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }

  next();
};

module.exports = authenticate;
