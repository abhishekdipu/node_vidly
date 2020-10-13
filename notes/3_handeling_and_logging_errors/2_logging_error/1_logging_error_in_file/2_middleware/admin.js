module.exports = function (req, res, next) {
  //this MW fun will be executed after auth MW function, so we can access 'req.user' object which we have set in auth
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};

//401 Unauthorized
//403 Forbidden
