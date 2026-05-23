import { redisClient } from "../config/redis.js";
import { REDIS_KEYS } from "../constants/auth.constants.js";
import { authConfig } from "../config/auth.config.js";

/**
 * SessionRepository — единственная точка работы с сессиями в Redis.
 */
export const SessionRepository = {
  async save(sessionId, userId) {
    await redisClient.set(REDIS_KEYS.session(sessionId), String(userId), {
      EX: authConfig.session.ttlSeconds,
    });
  },

  async findUserId(sessionId) {
    return redisClient.get(REDIS_KEYS.session(sessionId));
  },

  async delete(sessionId) {
    await redisClient.del(REDIS_KEYS.session(sessionId));
  },
};
