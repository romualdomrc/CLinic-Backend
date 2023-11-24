import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } from "./config.js";

export const pool = createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL server.");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the MySQL server:", error);
  }
})();
