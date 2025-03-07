const Database = require ("better-sqlite3");
const dotenv = require ("dotenv");

dotenv.config();

const db = new Database(process.env.DATABASE_FILE, { verbose: console.log });

// Exécuter les migrations
const fs = require ("fs");
const migrations = fs.readFileSync("database/migrations.sql", "utf8");
db.exec(migrations);

console.log("✅ SQLite initialisé");

module.exports = db;
