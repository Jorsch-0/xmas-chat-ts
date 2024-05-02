import { Router } from 'express';

export const messageRoutes = () => {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json('Message page');
  });

  return router;
};
