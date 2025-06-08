// middleware/logger.js
const logger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next(); // move to the next middleware or route handler
};

module.exports = logger;
