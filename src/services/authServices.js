const { getUserByEmail } = require("./userServices");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const { verifyPassword } = require("../helpers/passwordHelper");
const CustomErrorHandler = require("../lib/CustomErrorHander");
const {
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/index");

// user login
const userLogin = async (email, password) => {
  //check if user with email address exist
  const userExist = await getUserByEmail(email);

  // throw 404 error if user does not exist
  if (!userExist) {
    throw new CustomErrorHandler("user with email address does not exist", 404);
  }

  // throw 403 error if user is not verified
  if (!userExist.isVerified) {
    throw new CustomErrorHandler("user account is not verified", 403);
  }

  // check if password is valid
  const passwordMatch = await verifyPassword(password, userExist.password);

  // throw 403 error if password is not match
  if (!passwordMatch) {
    throw new CustomErrorHandler("invalid login credentials", 403);
  }

  // create jwt payload object
  const payload = {
    userId: userExist._id,
    email: userExist.email,
    firstName: userExist.firstName,
    lastName: userExist.lastName,
  };

  // generate jwt access token
  const accessToken = generateToken(
    payload,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_SECRET
  );

  // generate jwt refresh token
  const refreshToken = generateToken(
    payload,
    JWT_REFRESH_TOKEN_EXPIRES_IN,
    JWT_SECRET
  );

  return { refreshToken, accessToken };
};

const newAccessToken = async (refreshTokenHeader) => {
  // check if refresh token is valid
  if (refreshTokenHeader.split(" ")[0] !== "Bearer") {
    throw new CustomErrorHandler("invalid token", 403);
  }
  // get the refresh token
  const refreshToken = refreshTokenHeader.split(" ")[1];

  // verify refresh token
  const verifiedPayload = verifyToken(refreshToken, JWT_SECRET);

  if (verifiedPayload) {
    // create jwt payload object
    const payload = {
      userId: verifiedPayload.userId,
      email: verifiedPayload.email,
      firstName: verifiedPayload.firstName,
      lastName: verifiedPayload.lastName,
    };

    // generate jwt access token
    const accessToken = generateToken(
      payload,
      JWT_ACCESS_TOKEN_EXPIRES_IN,
      JWT_SECRET
    );

    return { accessToken };
  }
};

module.exports = { userLogin, newAccessToken };
