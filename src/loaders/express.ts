import express from 'express';
import path from 'path';
import { routes } from '../api';
import { globalErrorHandler } from '../utils';
import cookieParser from 'cookie-parser';

export const expressLoader = async ({ app }: { app: express.Application }) => {
  app.use(express.json());

  app.use(cookieParser());

  app.use('/api', routes());

  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'dist', 'index.html'));
  });

  app.use(globalErrorHandler);
};
