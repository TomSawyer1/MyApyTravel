const express = require("express");
const { createPackingList, getPackingList } = require("../controllers/packingListController");

const router = express.Router();

router.post("/", createPackingList);
router.get("/:tripId", getPackingList);

module.exports = router;