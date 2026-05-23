import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
});

socket.on('connect', () => {
  console.info(`[Socket.IO] Connected: ${socket.id}`);
});

socket.on('disconnect', (reason) => {
  console.info(`[Socket.IO] Disconnected: ${reason}`);
});

socket.on('connect_error', (err) => {
  console.error(`[Socket.IO] Connection error: ${err.message}`);
});

export default socket;
