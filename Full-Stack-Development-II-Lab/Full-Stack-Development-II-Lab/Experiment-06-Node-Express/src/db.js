// MySQL connection pool using the mysql2 driver. Credentials come from the .env file.
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "fsd2_lab",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
