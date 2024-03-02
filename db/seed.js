const db = require('./connection.js')
const {insertStables, insertUsers, insertRikishi} = require('./utils/insertData.js')

const seed = async ({users, stables, rikishi}) => {
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS stables_sumos_junc;`)
    await db.query(`DROP TABLE IF EXISTS stables;`)
    await db.query(`DROP TABLE IF EXISTS rikishi;`)
    //create stables
    await db.query(`CREATE TABLE stables (
        stable_name VARCHAR(500) UNIQUE,
        stable_id SERIAL PRIMARY KEY,
        ranking INTEGER DEFAULT 0
    );`)
    //create users
    await db.query(`CREATE TABLE users (
        username VARCHAR(50),
        stable_name VARCHAR REFERENCES stables(stable_name) NOT NULL,
        user_id SERIAL PRIMARY KEY NOT NULL
    );`)
    //create sumos
    await db.query(`CREATE TABLE rikishi (
        id SERIAL PRIMARY KEY NOT NULL,
        sumoapi_id INT NOT NULL,
        sumodb_id INT NOT NULL,
        nsk_id INT NOT NULL,
        shikona_en VARCHAR(50),
        shikona_jp VARCHAR(50),
        current_rank VARCHAR(100),
        heya VARCHAR(50),
        birth_date VARCHAR(50),
        shusshin VARCHAR(100),
        height DECIMAL,
        weight DECIMAL,
        debut VARCHAR(6)
    );`)
    //populate stables
    await insertStables(stables)
    //populate users
    await insertUsers(users)
    //populate sumos
    await insertRikishi(rikishi)
}


module.exports = seed;