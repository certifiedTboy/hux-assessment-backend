const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const contactRoutes = require("./contactRoutes");
const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);
apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/contacts", contactRoutes);

module.exports = apiV1Router;
