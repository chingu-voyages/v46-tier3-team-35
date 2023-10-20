const jwt = require("jsonwebtoken");

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, access_token_secret, (err, jwtPayload) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Assigning user id to req object can be useful for downstream middleware/routes.
    req.userId = jwtPayload.userId;

    // console.log("successfully verify token");
    next();
  });
};

module.exports = verifyJWT;
