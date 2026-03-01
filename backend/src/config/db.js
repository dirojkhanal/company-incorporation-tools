const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Neon DB connection failed:", err.message);
  } else {
    console.log("Neon PostgreSQL connected");
    release();
  }
});

module.exports = pool;