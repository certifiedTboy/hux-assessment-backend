const GlobalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const error = err.message;
  const metaData = err.metaData || {};

  res.status(statusCode || 500).json({ error, ...metaData });
};

module.exports = GlobalErrorHandler;
