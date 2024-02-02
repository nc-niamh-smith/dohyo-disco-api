const db = require('./connection.js')

const seed = async ({users, stables, rikishi}) => {
    await db.query(`DROP TABLE IF EXISTS users;`)
    await db.query(`DROP TABLE IF EXISTS stables;`)
    await db.query(`DROP TABLE IF EXISTS rikishi;`)
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

    await db.query(`CREATE TABLE rikishi (
        id SERIAL PRIMARY KEY NOT NULL,
        sumodb_id INT NOT NULL,
        nsk_id INT NOT NULL,
        shikona_en VARCHAR(50),
        shikona_jp VARCHAR(50),
        current_rank VARCHAR(100),
        heya VARCHAR(50),
        birth_date DATE,
        shusshin VARCHAR(100),
        height INT,
        weight INT,
        debut VARCHAR(6)
    );`)
    
    //create junction table (many to many)
    
    await db.query(`CREATE TABLE stables_sumos_junc (
        stable_id INTEGER REFERENCES stables(stable_id),
        sumo_id INTEGER REFERENCES rikishi(id),
        id SERIAL PRIMARY KEY
    );`)
    //populate stables
    //populate users
    //populate sumos
    //populate junction table
}



module.exports = seed;