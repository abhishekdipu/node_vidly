const jwt = require("jsonwebtoken");
const config = require("config");

//module.exports = function (req, res, next) {
function auth(req, res, next) {
  //get the token from request header
  const token = req.header("x-auth-token");
  //if token not passed
  if (!token) return res.status(401).send("Access denied. No token provided");

  //if present then verify jwt token's private key
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //it'll decode and return the payload if token is correct otherwise it'll return exception
    req.user = decoded; //add 'user' property to req object and set it equal to our payload i.e. {_id : user._id)
    // so in route handlrs we will be ale to access payload as user property eg. user._id
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;
