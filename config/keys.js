require("dotenv").config();

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

mongoURI =
  "mongodb+srv://" + encodeURIComponent(userName) + ":" +
  encodeURIComponent(password) +
  "@planet-code-mgw6a.mongodb.net/planet-code?retryWrites=true";

module.exports = {
  mongoAuth: mongoURI,
  secretOrKey: "secret"
};
