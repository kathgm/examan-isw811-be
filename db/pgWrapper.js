const Pool = require("pg").Pool;
function query(queryString, cbFunc) {
  const pool = new Pool({
    user: "postgres",
    host: "postgresql://postgres:krecKjyO5KOacSSEjtnT@containers-us-west-138.railway.app:6808/railway",
    database: "railway",
    password: "krecKjyO5KOacSSEjtnT",
    port: 6808,
  });
  pool.query(queryString, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}
function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null,
  };
}
module.exports = {
  query,
};