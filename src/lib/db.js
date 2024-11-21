// db.js

import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("MongoDB URI: ", uri); // Check if it's undefined

  if (mongoose.connection.readyState >= 1) return;

  try {
    if (!uri) {
      throw new Error("MongoDB URI is missing in environment variables.");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Database connection error");
  }
};

export default connectDB;
