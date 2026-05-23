import logger from "../config/logger.js";

export const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.id} — ${reason}`);
    });
  });

  logger.info("Socket.IO handlers registered");
};
