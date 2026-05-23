import { SessionService } from "../services/session.service.js";
import { SessionExpiredException } from "../exceptions/auth.exceptions.js";

/**
 * authGuard — Express middleware.
 * Проверяет сессию и пробрасывает userId в req.
 */
export const authGuard = async (req, _res, next) => {
  const sessionId = req.headers["x-session-id"];
  if (!sessionId) return next(new SessionExpiredException());

  try {
    const userId = await SessionService.validateSession(sessionId);
    req.userId = userId;
    req.sessionId = sessionId;
    next();
  } catch (err) {
    next(err);
  }
};
