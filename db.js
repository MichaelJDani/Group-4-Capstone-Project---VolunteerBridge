// backend/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('DB_USER:', process.env.DB_USER); // debug: must print volunteer_user
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // debug

// Connect to MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to DB:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

export default connection;