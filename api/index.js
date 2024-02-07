import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import scanRouter from '../api/router/scanSite.router.js';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
  .then(() => {
    app.listen(3000,() => {
      console.log('listening on port 3000');
    });
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('error', error)
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use('/api', scanRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});