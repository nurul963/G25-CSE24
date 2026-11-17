import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env.js";

export const connectDB=async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Data base connected")
    } catch (error) {
       console.error(error.message); 
    }
}