const User = require("../models/userModel");
const generateOTP = require("../helpers/randomCodeGenerator");
const { hashPassword } = require("../helpers/passwordHelper");
const {
  sendVerificationToken,
  sendPasswordResetToken,
} = require("./emailServices");
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
  const user = await User.findById(userId).select("-password");
  if (user) {
    return user;
  }

  throw new CustomErrorHandler("user not found", 404);
};

// check if user exist on database by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }

  throw new CustomErrorHandler("user with email does not exist", 404);
};

// check if user with verification token exist on database
const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  //check if user with verification token does not exit
  if (!user) {
    throw new CustomErrorHandler("invalid verification token", 404);
  }

  // check if verification token is expired
  if (new Date() - user?.verificationTokenExpiresIn >= 60 * 60 * 1000) {
    // delete user account from database
    await User.findByIdAndDelete(user._id.toString());

    // throw exception error
    throw new CustomErrorHandler("verification token is expired", 403);
  }

  // update verification data on database
  user.verificationToken = undefined;
  user.verificationTokenExpiresIn = undefined;
  user.isVerified = true;

  await user.save();
  return { email: user?.email };
};

// request for password change
const passwordChange = async (email) => {
  // check user with email exist
  const user = await getUserByEmail(email);

  if (user) {
    //current date
    let currentDate = new Date();
    // Add one hour to current date
    currentDate.setHours(currentDate.getHours() + 1);

    // generate password reset token
    user.passwordResetToken = generateOTP();

    // set password reset token expiration time
    user.passwordResetTokenExpiresIn = currentDate;

    // save password reset token to user document
    await user.save();

    // send password reset token to user email
    await sendPasswordResetToken(user.email, user.passwordResetToken);

    return { email: user?.email };
  }
};

// check if user with password reset token exist on database
const updatePassword = async (passwordResetToken, password) => {
  const user = await User.findOne({ passwordResetToken });

  //check if user with password reset token does not exit
  if (!user) {
    throw new CustomErrorHandler("invalid password reset token", 404);
  }

  // check if password reset token is expired
  if (new Date() - user?.passwordResetTokenExpiresIn >= 60 * 60 * 1000) {
    // delete password reset token from user document
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    await user.save();

    // throw exception error
    throw new CustomErrorHandler("token is expired", 403);
  }

  // update user password
  user.password = hashPassword(password);
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;
  await user.save();

  return { email: user?.email };
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
  verifyUser,
  passwordChange,
  updatePassword,
};
