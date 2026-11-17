import express from 'express';
import { login, refreshAccessToken, register } from '../controller/user.controller.js';
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/refresh",refreshAccessToken)
export default router;