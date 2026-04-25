import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import adminRoutes from './routes/adminRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import errorMiddleware from './middleware/errorMiddleware';

dotenv.config();

const app = express();

// Middleware for requests
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());

// Api routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error middleware for any request error
app.use(errorMiddleware);

export default app;
