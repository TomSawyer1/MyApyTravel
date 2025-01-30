import express from "express";
import { createPackingList, getPackingList, deleteItemFromPackingList, updateItemInPackingList} from "../controllers/packingListController.js";

const router = express.Router();

router.post("/", createPackingList);

router.get("/:tripId", getPackingList);

router.delete("/:tripId/items", deleteItemFromPackingList);

router.put("/:tripId/items", updateItemInPackingList)

export default router;
