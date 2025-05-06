import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './models/index.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

server.use('/api/auth', userRouter);
server.use('/api/appointment', doctorRouter);

server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
