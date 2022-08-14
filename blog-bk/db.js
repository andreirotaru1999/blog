const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "icedmg99",
    database: "blog",
    host: "localhost",
    port: 5432
})

module.exports = pool;