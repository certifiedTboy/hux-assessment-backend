const express = require("express");
const {
  createUser,
  verifyUserAccount,
  getCurrentUser,
  requestPasswordReset,
  updateUserPassword,
} = require("../controllers/userControllers");
const {
  validateCreateUserInput,
  validateToken,
  validateUpdateUserPasswordData,
  validateResetPasswordEmail,
  checkValidationErrors,
} = require("../middlewares/dataValidator");

const { sanitizeBodyData } = require("../middlewares/dataSanitizer");
const Authenticate = require("../middlewares/Authenticate");

const userRouter = express.Router();

userRouter.post(
  "/create",
  validateCreateUserInput(),
  checkValidationErrors,
  sanitizeBodyData,
  createUser
);

userRouter.put(
  "/verify",
  validateToken(),
  checkValidationErrors,
  sanitizeBodyData,
  verifyUserAccount
);

userRouter.put(
  "/password/reset",
  validateResetPasswordEmail(),
  checkValidationErrors,
  sanitizeBodyData,
  requestPasswordReset
);

userRouter.put(
  "/password/update",
  validateUpdateUserPasswordData(),
  checkValidationErrors,
  sanitizeBodyData,
  updateUserPassword
);

userRouter.get("/me", Authenticate, getCurrentUser);

module.exports = userRouter;
