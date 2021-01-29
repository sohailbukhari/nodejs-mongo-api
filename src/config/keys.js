const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  secret: process.env.secret || "some(^^4&23encrtyped%#!@secret",
};
