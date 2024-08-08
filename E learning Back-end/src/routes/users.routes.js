import { Router } from "express";
import {
  login,
  register,
  getUsers,
  getUserClasses,
  getAllUsersInClasses,
  isAdmin
} from "../controllers/auth.controller.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = new Router();
import authMiddleware from '../middleware/authMiddleware.js';
router.post("/login", login);
router.post("/register", register);
router.get("/",authMiddleware, getUserClasses);
router.get("/all", getAllUsersInClasses);
router.get("/isAdmin",adminMiddleware, isAdmin);


export default router;
