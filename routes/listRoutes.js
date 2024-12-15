import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getOrCreateList } from "../controllers/listController.js";
const router = express.Router();

router.get("/unique", authenticateToken, getOrCreateList);
export default router;