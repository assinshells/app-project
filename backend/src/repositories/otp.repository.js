import { redisClient } from "../config/redis.js";
import { REDIS_KEYS } from "../constants/auth.constants.js";
import { authConfig } from "../config/auth.config.js";

/**
 * OtpRepository — работа с OTP и verified-токенами в Redis.
 */
export const OtpRepository = {
  async saveOtp(userId, otp) {
    await redisClient.set(REDIS_KEYS.otp(userId), otp, {
      EX: authConfig.otp.ttlSeconds,
    });
  },

  async getOtp(userId) {
    return redisClient.get(REDIS_KEYS.otp(userId));
  },

  async deleteOtp(userId) {
    await redisClient.del(REDIS_KEYS.otp(userId));
  },

  async saveVerifiedToken(token, userId) {
    await redisClient.set(REDIS_KEYS.otpVerified(token), String(userId), {
      EX: authConfig.otp.ttlSeconds,
    });
  },

  async getVerifiedToken(token) {
    return redisClient.get(REDIS_KEYS.otpVerified(token));
  },

  async deleteVerifiedToken(token) {
    await redisClient.del(REDIS_KEYS.otpVerified(token));
  },
};
