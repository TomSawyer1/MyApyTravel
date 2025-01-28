import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const db = new Database(process.env.DATABASE_FILE, { verbose: console.log });

// Exécuter les migrations
import fs from "fs";
const migrations = fs.readFileSync("database/migrations.sql", "utf8");
db.exec(migrations);

console.log("✅ SQLite initialisé");

export default db;
