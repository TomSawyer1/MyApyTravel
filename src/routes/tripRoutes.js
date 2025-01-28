import express from "express";
import { createTrip, getTrips } from "../controllers/tripController.js";

const router = express.Router();

// Route pour créer un voyage
router.post("/", createTrip);

// Route pour obtenir les voyages d'un utilisateur
router.get("/", getTrips);

export default router;
