const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_CLIENT_ACCESS_TOKEN,
  EMAIL_CLIENT_REFRESH_TOKEN,
  OAUTH_REDIRECT_URI,
  EMAIL_USER,
  SMTP_HOST,
} = require("../config/index");

const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  OAUTH_REDIRECT_URI
);

myOauth2Client.setCredentials({ refresh_token: EMAIL_CLIENT_REFRESH_TOKEN });

const transport = nodemailer.createTransport({
  service: SMTP_HOST,
  auth: {
    type: "OAuth2",
    user: EMAIL_USER,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_CLIENT_REFRESH_TOKEN,
    accessToken: EMAIL_CLIENT_ACCESS_TOKEN,
  },
});

module.exports = transport;
