import { Server } from 'socket.io';
import logger from './logger.js';

const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    logger.info(`Socket.IO client connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      logger.info(`Socket.IO client disconnected: ${socket.id} — reason: ${reason}`);
    });
  });

  return io;
};

export { createSocketServer };
