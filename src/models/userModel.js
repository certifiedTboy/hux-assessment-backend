const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresIn: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
