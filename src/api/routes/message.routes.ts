import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { MessageController } from '../controllers/message.controller';

export const messageRoutes = () => {
  const router = Router();

  router.post('/send/:receiverId', authenticate, MessageController.sendMessage);
  router.get('/:receiverId', authenticate, MessageController.getMessages);

  return router;
};
