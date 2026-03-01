const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Replaces all shareholders for a company then inserts new ones
// Safe to call multiple times (re-submit won't duplicate)
const createBulkShareholders = async (company_id, shareholders) => {
  await pool.query(`DELETE FROM shareholders WHERE company_id = $1`, [company_id]);

  const results = [];
  for (const s of shareholders) {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO shareholders (id, company_id, first_name, last_name, nationality)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, company_id, s.first_name, s.last_name, s.nationality]
    );
    results.push(result.rows[0]);
  }
  return results;
};

module.exports = { createBulkShareholders }