import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authenticateUser, loginAuthenticatedUser } from "../controllers/userControllers.js";


const router = express.Router();

router.post("/register", authenticateUser)
router.post("/login", loginAuthenticatedUser)



export default router;