module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    error: {
      name: err.name || 'Error',
      message,
      statusCode
    }
  });
};
