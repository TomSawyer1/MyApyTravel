import app from "./app.js";
import dotenv from "dotenv";
import express from "express";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
export default app;