const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}`});

if (!process.env.PGDATABASE) {
    throw new Error("No PGDATABASE configured!");
}

const pool = new Pool();

module.exports = pool;