import { MessageService } from '../../services/message.service';
import { tryCatch } from '../../utils';
import { validateGetMessages, validateSendMessage } from '../validators/message';

export class MessageController {
  static sendMessage = tryCatch(async (req, res) => {
    const validatedInput = validateSendMessage(req);

    const newMessage = await MessageService.create(validatedInput);

    res.status(201).json(newMessage);
  });

  static getMessages = tryCatch(async (req, res) => {
    const validatedInput = validateGetMessages(req);

    const messages = await MessageService.getMessages(validatedInput);

    res.status(200).json(messages);
  });
}
