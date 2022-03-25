const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "12032002",
  host: "localhost",
  port: 5432,
  database: "bookshop"
});

module.exports = pool;
