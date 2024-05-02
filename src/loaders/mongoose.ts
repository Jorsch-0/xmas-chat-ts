import mongoose from 'mongoose';
import { env } from '../config';

export const mongooseLoader = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
