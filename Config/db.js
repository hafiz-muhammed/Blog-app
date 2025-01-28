import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.url);
      console.log('mongoDB connected');
    }catch (error){
      console.error('mongoDb connection error',error.message);
      process.exit(1);
    }
  }; 