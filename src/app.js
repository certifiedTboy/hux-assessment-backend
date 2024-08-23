const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiV1Router = require("./routes/apiV1");
const GlobalErrorHandler = require("./lib/GlobalErrorHandler");
const app = express();

// global express middleware configuration for json data
app.use(express.json());

//global express middleware configuration for cookie parser
app.use(cookieParser());

//global express middleware configuration for cors
app.use(
  cors({
    origin: "https://hux-assessment-frontend-iota.vercel.app",
    credentials: true,
  })
);

//global express middleware configuration for api routes
app.use("/api/v1", apiV1Router);
app.use(GlobalErrorHandler);

// api server health check
app.get("/", (req, res) => {
  res.json({ message: "Server is live!" });
});

module.exports = app;
