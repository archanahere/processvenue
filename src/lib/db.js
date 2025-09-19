import mysql from "mysql2/promise";

// create connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "processvenue",
});

export default pool;

// export default db;
