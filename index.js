import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import errorMiddleware from './middlewares/error-middleware.js';
import * as dotenv from 'dotenv';
import testRouter from './router/testRouter.js';
import questionRouter from './router/questionRouter.js';
import answerRouter from './router/answerRouter.js';
import currentRouter from './router/currentRouter.js';
import completedRouter from './router/completedRouter.js';
import passRouter from './router/passRouter.js';
import resultRouter from './router/resultRouter.js';

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);
app.use('/api/test', testRouter);
app.use('/api/users', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/current', currentRouter);
app.use('/api/completed', completedRouter);
app.use('/api/result', resultRouter);
app.use(errorMiddleware);

// app.get('/', (req, res) => {
//   res.end('<h1>Hi! I am working here!</h1>');
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    app.listen(PORT, () => console.log(`Server started on PORT =${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
