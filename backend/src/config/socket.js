import { Server } from "socket.io";
import logger from "./logger.js";

export const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  logger.info("Socket.IO server created");

  return io;
};
