import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken, getRefreshExpiry, hashToken, verifyRefreshToken } from "../utils/tokens.js";
import RefreshSession from '../models/RefreshSession.js';
const COOKIE_NAME = "refreshToken";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/auth"
};
const setRefreshCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
const clearRefreshCookie = (res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
};

export const register=async(req,resp)=>{
    try {
        const {name,email,password,role}=req.body;
        if(!name || !email || !password){
            return resp.status(400).json({
                message:"Feild cannot be empty",
                success:false
            })
        }
        const exsist=await User.findOne({email});
        if(exsist){
            return resp.status(400).json({
                message:"User already exsist",
                success:false
            })
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashPassword,role});
        await user.save();
        return resp.status(201).json({
            message:"Registration success",
            success:true
        })
    } catch (error) {
       return resp.status(500).json({
        message:error.message,
        success:false
       }) 
    }
}
export const login=async(req,resp)=>{
    try {
        const {email,password}=req.body;
        if(!email.trim() || !password){
            return resp.status(400).json({
                message:"feild cannot be empty",
                success:false
            })
        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return resp.status(400).json({
                message:"User not registered",
                success:false
            })
        }
        //compare password 
        const isMatched=await bcrypt.compare(password,user.password);
        if(!isMatched){
            return resp.status(400).json({
                message:"Invalid Credential",
                success:false
            })
        }
        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);
        await RefreshSession.create({
            userId:user._id,
            tokenHash:hashToken(refreshToken),
            expiresAt:getRefreshExpiry(refreshToken)
        })
        setRefreshCookie(resp,refreshToken);
        return resp.status(200).json({
            message:"Login success",
            success:true,
            id:user._id,
            name:user.name,
            email:user.email,
            accessToken
        })
    } catch (error) {
        return resp.status(500).json({
            message:error.message,
            success:false
        })
    }
}
export const refreshAccessToken=async(req,resp)=>{
    const oldsession=req.cookies?.refreshToken;
    if(!oldsession){
       return resp.status(401).json({
            message:"Token is missing",
            success:false
        }) 
    }
    const decode=verifyRefreshToken(oldsession);
    // console.log(decode);
    if(!decode || decode.type!=="refresh"){
        return resp.status(401).json({
            message:"Invalid Token",
            success:false
        })
    }
    const {sub,role}=decode;
    const accessToken=generateAccessToken({_id:sub,role});
    const refreshToken=generateRefreshToken({_id:sub,role});
    const oldsessionToken=await RefreshSession.findOneAndUpdate(
        {
            userId:sub,
            tokenHash:hashToken(oldsession),
            expiresAt:{$gt: new Date()}
        },
        {
            $set:{
                revokedAt:new Date()
            }
        },
        {new:true}
    )
    if(!oldsessionToken){
        return resp.status(401).json({
            message:"Refresh Token has been expired",
            success:false
        })
    }
     await RefreshSession.create({
            userId:sub,
            tokenHash:hashToken(refreshToken),
            expiresAt:getRefreshExpiry(refreshToken)
    });
    setRefreshCookie(resp,refreshToken);
    return resp.status(200).json({
        message:"New Access Token",
        success:true,
        accessToken
    })
}