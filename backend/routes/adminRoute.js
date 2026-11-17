import express from 'express';
import { getAllUser } from '../controller/admin.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const router=express.Router();
router.get("/",isAuthenticated,getAllUser);
export default router;