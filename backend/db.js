// backend/db.js
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

// Connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // PostgreSQL default port
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL DB:', err);
  } else {
    console.log('Connected to PostgreSQL database!');
  }
});

export default pool;