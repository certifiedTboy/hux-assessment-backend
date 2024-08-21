const bcrypt = require("bcryptjs");
const CustomErrorHandler = require("../lib/CustomErrorHander");

const hashPassword = (plainTextPasword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainTextPasword, salt);
};

const verifyPassword = (plainTextPasword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPasword, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
