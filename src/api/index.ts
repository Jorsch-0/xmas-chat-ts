import { Router } from 'express';
import { authRoutes, messageRoutes, userRoutes } from './routes';

export const routes = () => {
  const router = Router();

  router.use('/auth', authRoutes());
  router.use('/messages', messageRoutes());
  router.use('/users', userRoutes());

  return router;
};
