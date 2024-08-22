const { userLogin, newAccessToken } = require("../services/authServices");

//login user request function
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authCredentials = await userLogin(email, password);

    if (authCredentials) {
      // create cookie options object
      const cookieOptions = {
        expires: new Date(Date.now() + 3600), // Cookie expires in 1 hour,
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // save accessToken on client cookie storage
      return res
        .status(200)
        .cookie("a_t", authCredentials.accessToken, cookieOptions)
        .json({
          message: "login successful",
          refreshToken: authCredentials.refreshToken,
        });
    }
  } catch (error) {
    next(error);
  }
};

// generate new access token
const generateNewAccessToken = async (req, res, next) => {
  try {
    // get auth headers from req.headers
    const refreshTokenHeader = req.headers["authorization"];

    const authCredentials = await newAccessToken(refreshTokenHeader);

    if (authCredentials) {
      // create cookie options object
      const cookieOptions = {
        expires: new Date(Date.now() + 3600), // Cookie expires in 1 hour,
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // save accessToken on client cookie storage
      return res
        .cookie("a_t", authCredentials.accessToken, cookieOptions)
        .json({ message: "new access token generated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    return res.clearCookie("a_t").json({ message: "logged out successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, logoutUser, generateNewAccessToken };
