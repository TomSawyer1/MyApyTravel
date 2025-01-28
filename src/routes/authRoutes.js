import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Route pour l'enregistrement d'un utilisateur
router.post("/register", register);

// Route pour la connexion de l'utilisateur
router.post("/login", login);

export default router;
