const bcrypt = require("bcryptjs");
const CustomErrorHandler = require("../lib/CustomErrorHander");

const hashPassword = (plainTextPasword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPasword, salt);
};

const verifyPassword = (plainTextPasword, hashedPassword) => {
  if (!bcrypt.compareSync(plainTextPasword, hashedPassword)) {
    throw new CustomErrorHandler("invalid login credentials", 401);
  }
};

module.exports = { hashPassword, verifyPassword };
