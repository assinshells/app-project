import { SessionRepository } from "../repositories/session.repository.js";
import { SessionProvider } from "../providers/session.provider.js";
import { SessionExpiredException } from "../exceptions/auth.exceptions.js";

export const SessionService = {
  async createSession(userId) {
    const sessionId = SessionProvider.generateSessionId();
    await SessionRepository.save(sessionId, userId);
    return sessionId;
  },

  async validateSession(sessionId) {
    const userId = await SessionRepository.findUserId(sessionId);
    if (!userId) throw new SessionExpiredException();
    return userId;
  },

  async invalidateSession(sessionId) {
    await SessionRepository.delete(sessionId);
  },
};
