import crypto from "crypto";
import { authConfig } from "../config/auth.config.js";

export const OtpProvider = {
  generate() {
    return String(
      crypto.randomInt(0, Math.pow(10, authConfig.otp.length)),
    ).padStart(authConfig.otp.length, "0");
  },
};
