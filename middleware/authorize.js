const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const actkn = req.header("actkn");

  if (!actkn)
    return res
      .status(401)
      .send({ error: "Unauthorzied request. Access Denied." });

  try {
    const decoded = jwt.verify(actkn, process.env.TOKEN_SECRET);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401)
      res.removeHeader("actkn")
      res.send({ error: "TokenExpired" });
    } else {
      res.status(401)
      res.removeHeader("actkn")
      res.send({ error: "TokenInvalid" });
    }
  }
};
