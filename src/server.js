import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  })
);



// GET /students/:studentId
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

// GET /notes/:noteId
app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({
    message: `Retrieved note with ID: ${req.params.noteId}`,
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// error middleware
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd ? 'Щось пішло не так :)' : err.stack,
  });  
});

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});