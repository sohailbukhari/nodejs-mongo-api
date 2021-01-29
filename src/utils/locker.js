const jwt = require("jsonwebtoken");
const common = require("./common");
const { secret } = require("../config/keys");

module.exports = {
  unlock: async (request, response, next) => {
    try {
      let authHeader = request.headers["authorization"] || "";
      const tokenType = "Bearer ";
      if (typeof authHeader === "undefined" || !authHeader.includes(tokenType)) {
        throw Error("Authentication token missing");
      }
      authHeader = authHeader.replace(tokenType, "");
      request.user = jwt.verify(authHeader, secret);
      return next();
    } catch (err) {
      console.log("Auth failed:", err.message);
      return response.reply({ statusCode: 401 });
    }
  },
  lock: (obj) => {
    obj["iat"] = common.time();
    // obj["exp"] = common.time() + 60 * 60 * 24;
    obj["accessToken"] = jwt.sign(obj, secret);
    return obj;
  },
};
