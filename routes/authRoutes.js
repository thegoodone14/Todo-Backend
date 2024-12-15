// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Route pour l'inscription
router.post("/login", login);       // Route pour la connexion

export default router;
