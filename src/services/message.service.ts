import { GetMessagesInput, SendMessageInput } from '../api/validators/message';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { User } from '../models/user';
import { getReceiverSocketId, io } from '../socket/socket';

export class MessageService {
  static async create({ body: { message }, params: { receiverId }, user: { userId: senderId } }: SendMessageInput) {
    let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
    if (!conversation) {
      conversation = await Conversation.create({ participants: [senderId, receiverId] });
    }

    const newMessage = new Message({ senderId, receiverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    return newMessage;
  }

  static async getMessages({ params: { receiverId }, user: { userId: senderId } }: GetMessagesInput) {
    const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate(
      'messages'
    );

    if (!conversation) return [];

    return conversation.messages;
  }
}
