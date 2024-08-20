const express = require("express");
const {
  createUser,
  getCurrentUser,
} = require("../controllers/userControllers");
const {
  validateCreateUserInput,
  checkValidationErrors,
} = require("../middlewares/dataValidator");

const { sanitizeBodyData } = require("../middlewares/dataSanitizer");
const userRouter = express.Router();

userRouter.post(
  "/create",
  validateCreateUserInput(),
  checkValidationErrors,
  sanitizeBodyData,
  createUser
);
userRouter.get("/me", getCurrentUser);

module.exports = userRouter;
