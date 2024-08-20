const User = require("../models/userModel");
const generateOTP = require("../helpers/randomCodeGenerator");
const { hashPassword } = require("../helpers/passwordHelper");
const { sendVerificationToken } = require("./emailServices");
const CustomErrorHandler = require("../lib/CustomErrorHander");

// create new user account
const createNewUser = async (userData) => {
  // check if user with email already exist
  const userExist = await getUserByEmail(userData.email);

  // throw 409 error if user already exist and is verified
  if (userExist?.isVerified) {
    throw new CustomErrorHandler("user with email already exist", 409);
  }

  //current date
  let currentDate = new Date();

  // Add one hour to current date
  currentDate.setHours(currentDate.getHours() + 1);

  // check if verification token is expired
  if (
    userExist?.verificationToken &&
    new Date() - userExist.verificationTokenExpiresIn >= 60 * 60 * 1000
  ) {
    //generate new verification token for user
    userExist.verificationToken = generateOTP();

    //update verification token expiration time
    userExist.verificationTokenExpiresIn = currentDate;

    // update user data
    await userExist.save();

    // send new verification token to user email
    // await sendVerificationToken(userExist.email, userExist.verificationToken);

    // return new user information
    return { email: userExist.email };
  }

  // check if verification token is still valid
  if (
    userExist?.verificationToken &&
    new Date() - userExist.verificationTokenExpiresIn < 60 * 60 * 1000
  ) {
    // send existing verification token to user email
    // await sendVerificationToken(userExist.email, userExist.verificationToken);

    // return new user information
    return { email: userExist.email };
  }

  // create new user object
  const newUser = new User({
    ...userData,
    password: hashPassword(userData.password),
    verificationToken: generateOTP(),
    verificationTokenExpiresIn: currentDate,
  });

  // save new user information to database
  await newUser.save();

  // check if user registration failed
  if (!newUser) {
    throw new CustomErrorHandler("user registration failed", 500);
  }

  // send verification token to user email if registration is successful
  // await sendVerificationToken(newUser.email, newUser.verificationToken);
  // return new user information
  return { email: newUser.email };
};

// check if user exist on database by id
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    return user;
  }
};

// check if user exist on database by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }
};

// check if user with verification token exist on database
const verifyUser = async (verificationToken) => {
  const user = await User.fineOne({ verificationToken });

  if (user) {
    user.verificationToken = undefined;
    user.verificationTokenExpiresIn = undefined;
    await user.save();
    return user;
  }
};

// check if user with password reset token exist on database
const checkUserWithPasswordResetTokenExist = async (passwordResetToken) => {
  const user = await User.findOne({ passwordResetToken });

  if (user) {
    return user;
  }
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
  verifyUser,
  checkUserWithPasswordResetTokenExist,
};
