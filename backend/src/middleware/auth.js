import { redisClient } from "../config/redis.js";

const requireAuth = async (req, res, next) => {
  const sessionId = req.headers["x-session-id"];
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = await redisClient.get(`session:${sessionId}`);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = userId;
  req.sessionId = sessionId;
  next();
};

export default requireAuth;
