import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errorHandler from './core/middlewares/errorHandler';
import loadRoutes from './core/middlewares/routeLoader';
import logger from './core/utils/logger';
import expressWinston from 'express-winston';
import roleBasedAccess from './core/middlewares/roleBasedAccess';

const app: Express = express();
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import dbConnection from './core/database/DBConnection';
dbConnection();

app.use(roleBasedAccess);

const basePath = process.env.API_BASE_PATH || '/app/api/v1';
loadRoutes(app, basePath, path.join(__dirname, 'core/modules'));

app.use(errorHandler);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, 
    msg: "HTTP {{req.method}} {{req.url}}", 
    expressFormat: true, 
    colorize: false, 
    ignoreRoute: function (req, res) {
      return false; 
    }
  })
);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger
  })
);
export default app;
