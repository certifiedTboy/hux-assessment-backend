const perfectExpressSanitizer = require("perfect-express-sanitizer");

const sanitizeBodyData = (req, res, next) => {
  const options = { xss: true, noSql: true, sql: true, level: 5 };

  const sanitizedData = perfectExpressSanitizer.sanitize.prepareSanitize(
    req.body,
    options
  );

  // update req.body with sanitized data
  req.body = sanitizedData;

  next();
};

module.exports = { sanitizeBodyData };
