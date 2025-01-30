import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import packingListRoutes from "./routes/packingListRoutes.js";

const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/packing-lists", packingListRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur serveur" });
});

export default app;
