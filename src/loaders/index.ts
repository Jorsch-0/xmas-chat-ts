import express from 'express';
import { expressLoader } from './express';
import { mongooseLoader } from './mongoose';

export default async ({ app }: { app: express.Application }) => {
  mongooseLoader();
  expressLoader({ app });
};
