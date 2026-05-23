export const AUTH_ERRORS = Object.freeze({
  INVALID_CREDENTIALS: "Invalid login or password",
  LOGIN_TAKEN: "Login already taken",
  EMAIL_TAKEN: "Email already taken",
  USER_NOT_FOUND: "User not found",
  OTP_EXPIRED: "OTP expired or not found",
  OTP_INVALID: "Invalid OTP",
  RESET_TOKEN_INVALID: "Reset token expired or invalid",
  UNAUTHORIZED: "Unauthorized",
  SESSION_INVALID: "Session expired or invalid",
  RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
  INTERNAL_ERROR: "Internal server error",
  VALIDATION_FAILED: "Validation failed",
});

export const REDIS_KEYS = Object.freeze({
  session: (id) => `session:${id}`,
  otp: (uid) => `otp:${uid}`,
  otpVerified: (tok) => `otp_verified:${tok}`,
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY: 429,
  INTERNAL: 500,
});
