const config = require("config"); // for jwt private key

module.exports = function () {
  //to verify if jwtPrivateKey is set in env var when app starts
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
