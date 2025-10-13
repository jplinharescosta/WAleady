"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
const pool = new pg_1.Pool(dbConfig);
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});
pool.on("error", (err) => {
  console.error("❌ PostgreSQL connection error:", err);
});
exports.default = pool;
//# sourceMappingURL=database.js.map
