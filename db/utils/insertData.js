const db = require('../connection.js')
const pg = require('pg-format')
const {arrangeStables, arrangeUsers, arrangeRikishi} = require('./arrangeData.js')

const insertStables = async (stables) => {
    const nestedStables = await arrangeStables(stables)
    const query = pg(`INSERT INTO stables (stable_name) VALUES %L RETURNING*;`, nestedStables)
    return db.query(query)
}

const insertUsers = async (users) => {
    const nestedUsers = await arrangeUsers(users)
    const query = pg(`INSERT INTO users (username, stable_name) VALUES %L RETURNING*;`, nestedUsers)
    return db.query(query)
}

const insertRikishi = async (rikishi) => {
    const nestedRikishi = await arrangeRikishi(rikishi)
    const query = pg(`INSERT INTO rikishi (sumoapi_id, sumodb_id, nsk_id, shikona_en, shikona_jp, current_rank, heya, birth_date, shusshin, height, weight, debut) VALUES %L RETURNING*;`, nestedRikishi)
    return db.query(query)
}


module.exports = {insertStables, insertUsers, insertRikishi}