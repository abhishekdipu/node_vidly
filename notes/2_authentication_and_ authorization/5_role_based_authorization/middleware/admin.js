module.exports = function (req, res, next) {
  //this MW fun will be executed after authMW function,
  //so we can access 'req.user' object which we have set in authMW
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};

//401 Unauthorized
//403 Forbidden
