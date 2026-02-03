import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      dbName: config.DB_NAME,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};
