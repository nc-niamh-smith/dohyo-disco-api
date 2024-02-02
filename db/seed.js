const db = require('./connection.js')

const seed = async ({users, stables, rikishi}) => {
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS stables;`)
    await db.query(`DROP TABLE IF EXISTS sumos;`)
    await db.query(`DROP TABLE IF EXISTS stables_sumos_junc;`)
    //create stables
    await db.query(`CREATE TABLE stables (
        stable_name VARCHAR(500) UNIQUE,
        stable_id SERIAL PRIMARY KEY,
        ranking INTEGER
    );`)
    //create users
    await db.query(`CREATE TABLE users (
        username VARCHAR(50),
        stable_name VARCHAR REFERENCES stables(stable_name) NOT NULL,
        user_id SERIAL PRIMARY KEY NOT NULL
    );`)
    //create sumos
    //create junction table (many to many)
    //populate stables
    //populate users
    //populate sumos
    //populate junction table
}



module.exports = seed;