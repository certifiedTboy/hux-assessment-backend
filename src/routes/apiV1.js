const express = require("express");
const userRoutes = require("./userRoutes");
const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);

module.exports = apiV1Router;
