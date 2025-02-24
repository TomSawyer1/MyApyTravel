import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import packingListRoutes from "./routes/packingListRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); //Cursor


app.use("/api/auth", authRoutes);
app.use("/api/trips", authenticateUser, tripRoutes);
app.use("/api/packing-lists", authenticateUser, packingListRoutes);

export default app;
