const express = require("express");
const {
  loginUser,
  logoutUser,
  generateNewAccessToken,
} = require("../controllers/authControllers");
const { sanitizeBodyData } = require("../middlewares/dataSanitizer");
const Authenticate = require("../middlewares/Authenticate");
const authRouter = express.Router();

authRouter.post("/login", sanitizeBodyData, loginUser);
authRouter.get("/access-token", generateNewAccessToken);
authRouter.get("/logout", Authenticate, logoutUser);

module.exports = authRouter;
