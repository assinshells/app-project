import 'dotenv/config';
import http from 'http';
import app from './app.js';
import logger from './config/logger.js';
import { connectDatabase, pool } from './config/database.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { createSocketServer } from './config/socket.js';
import { registerSocketHandlers } from './sockets/index.js';

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);
const io = createSocketServer(httpServer);
registerSocketHandlers(io);

const shutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  httpServer.close(async () => {
    logger.info('HTTP server closed');

    try {
      io.close();
      logger.info('Socket.IO closed');

      await pool.end();
      logger.info('PostgreSQL pool closed');

      await disconnectRedis();

      logger.info('Graceful shutdown complete');
      process.exit(0);
    } catch (err) {
      logger.error(`Error during shutdown: ${err.message}`);
      process.exit(1);
    }
  });
};

const start = async () => {
  try {
    await connectDatabase();
    await connectRedis();

    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
