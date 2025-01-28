import express from "express";
import { createPackingList, getPackingList } from "../controllers/packingListController.js";

const router = express.Router();

// Route pour créer une liste de packing
router.post("/", createPackingList);

// Route pour obtenir la liste de packing d'un voyage
router.get("/:tripId", getPackingList);

export default router;
