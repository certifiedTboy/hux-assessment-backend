const { createNewUser, getUserById } = require("../services/userServices");

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

module.exports = { createUser, getCurrentUser };
