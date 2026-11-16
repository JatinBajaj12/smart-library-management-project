import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
let io;
export const initSocket = (httpServer, origin) => {
  // SOCKET_PATH lets Vercel route sockets under /api (set SOCKET_PATH=/api/socket.io there)
  io = new Server(httpServer, { path: process.env.SOCKET_PATH || '/socket.io', cors: { origin, credentials: true } });
  io.use((socket, next) => {
    try { socket.user = jwt.verify(socket.handshake.auth?.token, process.env.JWT_SECRET); next(); }
    catch { next(new Error('unauthorized')); }
  });
  io.on('connection', socket => console.log(`socket connected: ${socket.user.id}`));
  return io;
};
// Call ONLY after a successful DB operation.
export const broadcast = (event, payload, message) => {
  if (!io) return;
  io.emit(event, payload);
  io.emit('notification', { id: `${Date.now()}${Math.random()}`, type: event, message, at: new Date() });
};
