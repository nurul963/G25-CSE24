import express from 'express';
import { PORT } from './utils/env.js';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoutes.js';
import adminRoute from './routes/adminRoute.js';
import cors from 'cors';
const app=express();
app.use(express.json());
const corsOption={
    origin:"*"
};
app.use(cors(corsOption));
app.get("/",(req,resp)=>{
    return resp.status(200).json({
        message:"API is working...",
        success:true
    })
})
app.use("/api/auth",userRoute)
app.use("/api/admin",adminRoute)
app.listen(PORT,()=>{
    console.log('server is running on port 8080');
    connectDB();
})