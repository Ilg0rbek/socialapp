import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).json({ msg: "Access denied " });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWY_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
