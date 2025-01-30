import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Verification du Token JWT

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token invalide." });
  }
};