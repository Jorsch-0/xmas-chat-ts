import { z } from 'zod';

const signupSchema = z.object({
  fullName: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  gender: z.enum(['male', 'female']),
});

export const validateSignup = (data: unknown) => {
  return signupSchema.parse(data);
};

export type SignupInput = z.infer<typeof signupSchema>;
