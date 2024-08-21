const {
  createNewUser,
  getUserById,
  verifyUser,
  passwordChange,
  updatePassword,
} = require("../services/userServices");

// create new user
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await createNewUser({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserAccount = async (req, res, next) => {
  try {
    const { token: verificationToken } = req.body;
    const verifiedUser = await verifyUser(verificationToken);

    return res.status(200).json({
      message: "User account verified successfully",
      user: verifiedUser,
    });
  } catch (error) {
    next(error);
  }
};

// get current user
const getCurrentUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const currentUser = await getUserById(userId);

    return res.status(200).json({ message: "success", currentUser });
  } catch (error) {
    next(error);
  }
};

// password reset request
const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    const passwordRequestChange = await passwordChange(email);

    if (passwordRequestChange) {
      return res.status(200).json({
        message: `Password reset request sent to ${email}`,
        passwordRequestChange,
      });
    }
  } catch (error) {
    next(error);
  }
};

// update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const updatedPassword = await updatePassword(token, password);

    return res.status(200).json({
      message: "Password updated successfully",
      updatedPassword,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  verifyUserAccount,
  requestPasswordReset,
  updateUserPassword,
};
