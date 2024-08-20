const express = require("express");
const app = express();

// api server health check
app.get("/", (req, res) => {
  res.json({ message: "Server is live!" });
});

module.exports = app;
