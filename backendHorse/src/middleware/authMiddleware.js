const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "Not found token" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET||"secrete-key");
    req.user = user;
    next();
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({ message: "Internal server Error:", error });
  }
};
