const express = require("express");
const { createTrip, getTrips } = require("../controllers/tripController");

const router = express.Router();

router.post("/", createTrip);
router.get("/", getTrips);

module.exports = router;