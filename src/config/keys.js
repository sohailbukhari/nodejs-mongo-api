const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

module.exports = {
  secret: process.env.SECRET || 'some(^^4&23encrtyped%#!@secret',
};
