import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config.js";

export const JwtProvider = {
  generateAccessToken(payload) {
    return jwt.sign(payload, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });
  },

  verifyAccessToken(token) {
    return jwt.verify(token, authConfig.jwt.secret);
  },

  decodeAccessToken(token) {
    return jwt.decode(token);
  },
};
