const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);
apiV1Router.use("/auth", authRoutes);

module.exports = apiV1Router;
