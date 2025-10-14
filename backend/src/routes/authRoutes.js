import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authenticateUser, getMoneySettings, loginAuthenticatedUser, updateMoney } from "../controllers/userControllers.js";
import authenticateToken from "../middleware/auth.js";


const router = express.Router();

router.post("/register", authenticateUser)
router.post("/login", loginAuthenticatedUser)
router.put('/update-money', authenticateToken, updateMoney);
router.get('/update-money', authenticateToken, getMoneySettings)



export default router;