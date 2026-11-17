import { User } from "../models/user.model.js"

export const getAllUser=async(req,resp)=>{
    try {
        const users=await User.find();
        return resp.status(200).json(users);
    } catch (error) {
       return resp.status(500).json({
        message:error.message,
        success:false
       }) 
    }
}