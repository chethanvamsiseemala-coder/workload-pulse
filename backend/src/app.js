import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,https://workload-pulse-one.vercel.app')
  .split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
}));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Workload Pulse API' }));
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
