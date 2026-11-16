import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { initSocket } from './sockets/index.js';
import { notFound, errorHandler } from './middleware/error.js';
import { seed } from './seed.js';

const origins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');
const app = express();
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
initSocket(server, origins);
const PORT = process.env.PORT || 5000;

// Listen immediately so Vercel's startup probe succeeds,
// then connect to MongoDB in the background.
server.listen(PORT, () => console.log(`Server on :${PORT}`));

connectDB().then(async () => {
  await seed();
  console.log('DB connected and seed done');
}).catch(e => { console.error('DB connection failed:', e.message); });
