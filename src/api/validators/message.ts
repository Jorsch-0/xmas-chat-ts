import { z } from 'zod';

const sendMessageSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(1000),
  }),
  params: z.object({
    receiverId: z.string(),
  }),
  user: z.object({
    userId: z.string(),
  }),
});
const getMessagesSchema = z.object({
  params: z.object({
    receiverId: z.string(),
  }),
  user: z.object({
    userId: z.string(),
  }),
});

export const validateSendMessage = (data: unknown) => {
  return sendMessageSchema.parse(data);
};
export const validateGetMessages = (data: unknown) => {
  return getMessagesSchema.parse(data);
};

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;
