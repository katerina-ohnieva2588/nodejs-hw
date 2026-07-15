import mongoose from 'mongoose';
import dns from 'node:dns';

export const connectMongoDB = async () => {
  try {
    dns.setServers(['8.8.8.8']);

    const mongoUrl = process.env.MONGO_URL;

    await mongoose.connect(mongoUrl);

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};