const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}`});


if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("No PGDATABASE or DATABASE_URL configured!");
}

const pool = new Pool();

module.exports = pool;