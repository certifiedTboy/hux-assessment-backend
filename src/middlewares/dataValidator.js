const { check, validationResult } = require("express-validator");
const CustomErrorHandler = require("../lib/CustomErrorHander");

// validate all body data for new user creation
const validateCreateUserInput = () => {
  return [
    check("firstName").notEmpty().withMessage("first name is required"),
    check("lastName").notEmpty().withMessage("last name is required"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email address"),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must not be less than 8 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new CustomErrorHandler("Passwords do not match", 400);
      }
      return true;
    }),
  ];
};

// validate reset password email
const validateResetPasswordEmail = () => {
  return [
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email address"),
  ];
};

// validate update user password data
const validateUpdateUserPasswordData = () => {
  return [
    check("token")
      .notEmpty()
      .withMessage("token is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("token must be 6 characters"),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must not be less than 8 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new CustomErrorHandler("Passwords do not match", 400);
      }
      return true;
    }),
  ];
};

// validate verification and password reset tokens
const validateToken = () => {
  return [
    check("token")
      .notEmpty()
      .withMessage("token is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("token must be 6 characters"),
  ];
};

// validate body data for new contact creation
const validateContactCreate = () => {
  return [
    check("firstName").notEmpty().withMessage("first name is required"),
    check("lastName").notEmpty().withMessage("last name is required"),
    check("phoneNumber")
      .notEmpty()
      .withMessage("phone number is required")
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage("Please enter a valid phone number."),
  ];
};

// check for all validator errors
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    throw new CustomErrorHandler(errors.errors[0].msg, 400);
  }

  next();
};

module.exports = {
  validateCreateUserInput,
  validateToken,
  validateResetPasswordEmail,
  validateUpdateUserPasswordData,
  validateContactCreate,
  checkValidationErrors,
};
