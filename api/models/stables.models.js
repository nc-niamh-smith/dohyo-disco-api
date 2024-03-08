const db = require('../../db/connection.js')

exports.selectStables = async () => {
    const result = await db.query(`SELECT * FROM stables;`)
    return result.rows
}