import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();
const connectDB = async () => {
  try {
    const db=await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...".red.bgYellow,db);
  } catch (error) {
    console.log("Error connection DataBase", error);
  }
};
export default connectDB;
