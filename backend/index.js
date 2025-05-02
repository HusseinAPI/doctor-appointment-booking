import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';

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

server.use('/api', userRouter);

server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
