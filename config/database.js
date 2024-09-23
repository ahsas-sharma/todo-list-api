import mongoose from "mongoose";
import CONFIG from "./config.js";

export async function connectToMongoDb() {
  try {
    await mongoose.connect(CONFIG.MONGO_URL);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
}
