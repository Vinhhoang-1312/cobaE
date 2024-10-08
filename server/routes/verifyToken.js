const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWTSECURITY, (err, account) => {
      if (err) res.status(403).json("Wrong token");
      req.account = account;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.account.id === req.params.id || req.account.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to access this");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.account.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that....!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
