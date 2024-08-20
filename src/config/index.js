require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI:
    process.env.NODE_ENV === "development"
      ? process.env.DEVELOPMENT_MONGO_URI
      : process.env.PRODUCTION_MONGO_URI,
};
