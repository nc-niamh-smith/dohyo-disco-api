const { Pool } = require('pg');
require("dotenv").config({ path: "../.env"});

if (!process.env.PGDATABASE) {
    throw new Error("No PGDATABSE configured!");
}

const pool = new Pool();

module.exports = pool;