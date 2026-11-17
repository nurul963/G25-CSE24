import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../utils/env.js';
export const isAuthenticated = (req, resp, next) => {
    const token = req.headers?.token?.split(" ")[1] || req.cookies?.token?.split(" ")[1] || null;
    try {
        if (!token) {
            resp.status(401).json({
                message: "Un Authorized",
                success: false
            })
        }
        const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return resp.status(500).json({
            message: error.message,
            success: false
        })
    }
}