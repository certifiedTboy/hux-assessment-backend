const { verifyToken } = require("../helpers/jwtHelpers");
const { JWT_SECRET } = require("../config/index");
const CustomErrorHandler = require("../lib/CustomErrorHander");

const Authenticate = (req, res, next) => {
  try {
    // destructure access token from req.cookies object

    const { a_t } = req.cookies;

    // return 401 error if cookie is not provided by client
    if (!a_t) {
      throw new CustomErrorHandler("Access Denied", 401);
    }

    // verify token with verifyToken helpers function using the accessToken and the accesToken Secret
    const payload = verifyToken(a_t, JWT_SECRET);

    // if payload is not returned from the verifyToken function, return 403 error
    if (!payload) {
      throw new CustomErrorHandler("Access Denied", 403);
    }

    // append payload to  api req(request) object
    req.user = payload;

    // call the next function to move forward
    next();
  } catch (error) {
    // handle any error returned from jwt verify method
    throw new CustomErrorHandler("invalid token", 403);
  }
};

module.exports = Authenticate;
