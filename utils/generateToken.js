import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY;

export function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d" });

  return token;
}
