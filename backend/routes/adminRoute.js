import express from 'express';
import { getAllUser } from '../controller/admin.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
const router=express.Router();
router.get("/",isAuthenticated,roleMiddleware('ADMIN'),getAllUser);
export default router;