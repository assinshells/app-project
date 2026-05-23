import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

if (!socketUrl) {
  console.error(
    "[socket] VITE_SOCKET_URL is not set. Socket will not connect.",
  );
}

const socket = io(socketUrl ?? "", {
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socket;
