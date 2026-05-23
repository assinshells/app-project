import { useState, useEffect } from 'react';
import socket from './socket/socket.js';

export default function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Socket.IO: {connected ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}
