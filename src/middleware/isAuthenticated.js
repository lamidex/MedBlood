const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
      .status(401)
          .json({ message: "Authentication failed: Token mising or invalid"});
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res
        .status(401)
            .json({ message: "Authentication failed: Invalid token"});
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Authentication Error:", error);
    return res
    .status(401)
          .json({ message: "Authentication failed: Token expired or invalid"});
  }
};

const createJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });
};

const verifyJwtToken = (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return null;
  }
};

const passwordJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });
};

module.exports = { isAuthenticated, createJwtToken, verifyJwtToken, passwordJwtToken };
