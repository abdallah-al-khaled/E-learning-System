import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve('C:/Users/fafaf/Desktop/E learning/.env') });

const connectToDatabase = async () => {
  await mongoose.connect(process.env.DATABASE_URL);

  console.log("Connected to database");
};
export default connectToDatabase;
