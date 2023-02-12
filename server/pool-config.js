const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "exitmap",
  password: process.env.POSTGRES_PW,
  port: 5432,
});

module.exports = {
  pool,
};
