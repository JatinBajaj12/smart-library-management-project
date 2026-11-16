import { io } from 'socket.io-client';
// docker-compose / local dev: VITE_SOCKET_URL points at the server (path /socket.io).
// Vercel (no VITE_SOCKET_URL): same origin, and the socket lives under /api so the rewrite reaches the backend.
const url = import.meta.env.VITE_SOCKET_URL || (import.meta.env.PROD ? undefined : 'http://localhost:5000');
const path = import.meta.env.VITE_SOCKET_PATH || (url && import.meta.env.VITE_SOCKET_URL ? '/socket.io' : import.meta.env.PROD ? '/api/socket.io' : '/socket.io');
export const createSocket = token =>
  io(url, { path, auth: { token }, transports: ['websocket'], reconnection: true, reconnectionDelayMax: 5000 });
