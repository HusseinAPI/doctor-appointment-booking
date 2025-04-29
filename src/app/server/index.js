import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
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

  server.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});
