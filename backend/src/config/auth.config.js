export const authConfig = {
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (() => {
        throw new Error("JWT_SECRET is not defined");
      })(),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  session: {
    ttlSeconds: parseInt(process.env.SESSION_TTL_SECONDS || "604800", 10),
  },
  otp: {
    ttlSeconds: parseInt(process.env.OTP_TTL_SECONDS || "600", 10),
    length: parseInt(process.env.OTP_LENGTH || "6", 10),
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    login: { max: parseInt(process.env.RATE_LIMIT_LOGIN_MAX || "10", 10) },
    register: { max: parseInt(process.env.RATE_LIMIT_REGISTER_MAX || "5", 10) },
    forgotPassword: {
      max: parseInt(process.env.RATE_LIMIT_FORGOT_MAX || "5", 10),
    },
    verifyOtp: { max: parseInt(process.env.RATE_LIMIT_OTP_MAX || "10", 10) },
    resetPassword: {
      max: parseInt(process.env.RATE_LIMIT_RESET_MAX || "5", 10),
    },
  },
};
