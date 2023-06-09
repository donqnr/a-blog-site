require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
