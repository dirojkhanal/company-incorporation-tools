const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const createCompany = async ({ name, shareholders_count, total_capital }) => {
  const id = uuidv4();
  const result = await pool.query(
    `INSERT INTO companies (id, name, shareholders_count, total_capital, status)
     VALUES ($1, $2, $3, $4, 'draft') RETURNING *`,
    [id, name, shareholders_count, total_capital]
  );
  return result.rows[0];
};

const updateCompany = async (id, data) => {
  const fields = [];
  const values = [];
  let i = 1;

  if (data.name !== undefined)               { fields.push(`name = $${i++}`);               values.push(data.name); }
  if (data.shareholders_count !== undefined) { fields.push(`shareholders_count = $${i++}`); values.push(data.shareholders_count); }
  if (data.total_capital !== undefined)      { fields.push(`total_capital = $${i++}`);      values.push(data.total_capital); }
  if (data.status !== undefined)             { fields.push(`status = $${i++}`);             values.push(data.status); }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await pool.query(
    `UPDATE companies SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`,
    values
  );
  return result.rows[0];
};

const getAllCompanies = async () => {
  const result = await pool.query(`
    SELECT c.*,
      COALESCE(
        json_agg(json_build_object(
          'id', s.id,
          'first_name', s.first_name,
          'last_name', s.last_name,
          'nationality', s.nationality
        )) FILTER (WHERE s.id IS NOT NULL), '[]'
      ) AS shareholders
    FROM companies c
    LEFT JOIN shareholders s ON c.id = s.company_id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `);
  return result.rows;
};

const getCompanyById = async (id) => {
  const result = await pool.query(`
    SELECT c.*,
      COALESCE(
        json_agg(json_build_object(
          'id', s.id,
          'first_name', s.first_name,
          'last_name', s.last_name,
          'nationality', s.nationality
        )) FILTER (WHERE s.id IS NOT NULL), '[]'
      ) AS shareholders
    FROM companies c
    LEFT JOIN shareholders s ON c.id = s.company_id
    WHERE c.id = $1
    GROUP BY c.id
  `, [id]);
  return result.rows[0];
};

module.exports = { createCompany, updateCompany, getAllCompanies, getCompanyById };
