import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const authRoutes = () => {
  const router = Router();

  router.post('/signup', AuthController.signup);
  router.post('/login', AuthController.login);
  router.post('/logout', AuthController.logout);

  return router;
};
