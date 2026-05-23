import logger from '../config/logger.js';

const registerSocketHandlers = (io) => {
  logger.info('Socket.IO handlers registered');
};

export { registerSocketHandlers };
