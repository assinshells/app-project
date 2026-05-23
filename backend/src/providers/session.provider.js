import crypto from "crypto";

export const SessionProvider = {
  generateSessionId() {
    return crypto.randomBytes(32).toString("hex");
  },
};
