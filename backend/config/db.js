import { Pool } from "pg";

import "dotenv/config";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("pgSQL connected successfully");
    client.release();
  } catch (error) {
    console.log(`pgSQL error ${error.message}`);
    process.exit(1);
  }
};

export default pool;
