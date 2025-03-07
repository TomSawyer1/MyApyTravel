const express = require ("express");
const cors = require ("cors");
const helmet = require ("helmet");
const morgan = require ("morgan");
const db = require ("./config/db.js");
const authRoutes = require ("./routes/authRoutes.js");
const tripRoutes = require ("./routes/tripRoutes.js");
const packingListRoutes = require ("./routes/packingListRoutes.js");
const { authenticateUser } = require ("./middlewares/authMiddleware.js");


const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); //Cursor


app.use("/api/auth", authRoutes);
app.use("/api/trips", authenticateUser, tripRoutes);
app.use("/api/packing-lists", authenticateUser, packingListRoutes);

module.exports = app;
