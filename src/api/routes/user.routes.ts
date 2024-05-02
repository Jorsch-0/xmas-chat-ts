import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { UserController } from '../controllers/user.controller';

export const userRoutes = () => {
  const router = Router();

  router.get('/', authenticate, UserController.getUsersForSidebar);

  return router;
};
