const db = require('../connection.js')
const pg = require('pg-format')
const {arrangeStables} = require('./arrangeData.js')

const insertStables = async (stables) => {
    const nestedStables = await arrangeStables(stables)
    const query = pg(`INSERT INTO stables (stable_name) VALUES %L RETURNING*;`, nestedStables)
    return db.query(query)
}

module.exports = {insertStables}