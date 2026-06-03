import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(logger);

// Routes
app.use(notesRoutes);
app.use(authRoutes);
app.use(userRouter);

// Handlers
app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`,
  );
});