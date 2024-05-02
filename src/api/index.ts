import { Router } from 'express';
import { authRoutes, messageRoutes } from './routes';

export const routes = () => {
  const router = Router();

  router.use('/auth', authRoutes());
  router.use('/messages', messageRoutes());

  return router;
};
